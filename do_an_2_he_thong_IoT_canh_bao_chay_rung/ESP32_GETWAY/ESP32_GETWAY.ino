#include "WiFi.h"
#include <FirebaseESP32.h>

int LED = 25;
int BUZZER = 26;

byte Data[5];
int khoi,nhietdo,doam;
int khoi2,nhietdo2,doam2;

int p_doam,p_nhietdo,p_khoi;

//#define WIFI_SSID "iPhone"
//#define WIFI_PASSWORD "taodeptraikhong?"

#define WIFI_SSID "TAI"
#define WIFI_PASSWORD "111111111"

#define FIREBASE_HOST "https://test-7f080-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "ouQO3XvhZKmYWbMGEXRpwqy64wFZI3iqz07WqFAk"
//Define FirebaseESP32 data object
FirebaseData fbdo;
String path1,path2,warning,canhbao;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(LED, OUTPUT);
  pinMode(BUZZER, OUTPUT);
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi...");
  }
 
  Serial.println("Connected to the WiFi network");

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);
 
  //Set database read timeout to 1 minute (max 15 minutes)
  Firebase.setReadTimeout(fbdo, 1000 * 60);
  //tiny, small, medium, large and unlimited.
  //Size and its write timeout e.g. tiny (1s), small (10s), medium (30s) and large (60s).
  Firebase.setwriteSizeLimit(fbdo, "tiny");

  path1 = "/FORESTFIREWARNING/NODE1"; 

}

void loop() {
  // put your main code here, to run repeatedly:
  read_p_NODE();
  
  if (Serial.available()>4) { // gui 4 byte data
    Data[0] = Serial.read();
     // NODE
    switch (Data[0])
    {
      case 'T':
      {
          // Data[1],Data[2] bi nhieu
         Data[1] = Serial.read() - 48 ; //221
         Data[2] = Serial.read() - 48; //218
         // chuoi can nhan
         Data[3] = Serial.read() - 48;
         Data[4] = Serial.read() - 48;
         nhietdo = (Data[3]*10) + Data[4] ;
         if(nhietdo!=2277)
         {
            Serial.print("nhiet do: ");
            Serial.println(nhietdo); 
            Firebase.setInt(fbdo, path1 + "/NHIETDO",nhietdo);
         }
         break;
      }
      case 'H':
      {
          // Data[1],Data[2] bi nhieu
         Data[1] = Serial.read() - 48 ; //221
         Data[2] = Serial.read() - 48; //218
         // chuoi can nhan
         Data[3] = Serial.read() - 48;
         Data[4] = Serial.read() - 48;
         doam = (Data[3]*10) + Data[4];
         if(doam!=2277)
         {
            Serial.print("do am: ");
            Serial.println(doam);
            Firebase.setInt(fbdo, path1 + "/DOAM",doam);
         }
         break;  
       }  
      case 'K':
      {
          // Data[1],Data[2] bi nhieu
         Data[1] = Serial.read() - 48 ; //221
         Data[2] = Serial.read() - 48; //218
         // chuoi can nhan
         Data[3] = Serial.read() - 48;
         Data[4] = Serial.read() - 48;
         khoi  = (Data[3]*10) + Data[4];
         if(khoi!=2277) 
         {
           Serial.print("khoi: ");
           Serial.println(khoi);
           Firebase.setInt(fbdo, path1 + "/KHOI",khoi);
         }  
         break;
      }
    }
  }
}

void read_p_NODE()
{
  if(Firebase.getString(fbdo, path1 + "/p-DOAM"))
  {
      p_doam = fbdo.stringData().toInt();
  }

  if(Firebase.getString(fbdo, path1 + "/p-NHIETDO"))
  {
      p_nhietdo = fbdo.stringData().toInt();
  }

  if(Firebase.getString(fbdo, path1 + "/p-KHOI"))
  {
      p_khoi = fbdo.stringData().toInt();
  }

  if(nhietdo>p_nhietdo||doam<p_doam||khoi>p_khoi)
  {
      warning = "ON";
      digitalWrite(LED, HIGH);
      digitalWrite(BUZZER, HIGH);
  }
  else if(nhietdo<p_nhietdo&&doam>p_doam&&khoi<p_khoi)
  {
      warning = "OFF";
      digitalWrite(LED, LOW);
      digitalWrite(BUZZER, LOW);
  }

  Firebase.setString(fbdo, path1 + "/CANHBAO",warning);  
}
