#include <SoftwareSerial.h>  
// Gọi thư viện DHT11
#include <SimpleDHT.h>            

#include <LiquidCrystal_I2C.h>

#include <Wire.h> 
LiquidCrystal_I2C lcd(0x27,16,2); 

int pinDHT11 = 2;
const int gas = A0;
SimpleDHT11 dht11;
byte Data[4];
int pkhoi,pnhietdo,pdoam;

byte temperature = 0;
byte humidity = 0;

float sensorValue;

void setup() {
  Serial.begin(9600);
  lcd.init();                    
  lcd.backlight();
  lcd.setCursor(0,0); // (col,row) row=1, col=1
  lcd.print("T=");
  lcd.setCursor(4,0);
  lcd.print("oC");
  lcd.setCursor(10,0);
  lcd.print("H=");
  lcd.setCursor(14,0);
  lcd.print("%");;
  lcd.setCursor(0,1);
  lcd.print("K=");
  lcd.setCursor(4,1);
  lcd.print("PPM");;
}
 
void loop() {
  readDHT11();
  Serial.println('T');
  Serial.println(temperature);     //Xuất nhiệt độ
  lcd.setCursor(2,0);
  lcd.print(temperature);
  delay(500);                     //Đợi 2 giây
  Serial.println('H');
  Serial.println(humidity);        //Xuất độ ẩm
  lcd.setCursor(12,0);
  lcd.print(humidity);
  delay(500);                     //Đợi 2 giây

  readMQ();
  Serial.println('K');
  Serial.println(sensorValue);     //Xuất Khoi
  lcd.setCursor(2,1);
  lcd.print(int(sensorValue));
  delay(500);                     //Đợi 2 giây
}

void readDHT11()
{
  // read without samples.
  if (dht11.read(pinDHT11, &temperature, &humidity, NULL)) {
    Serial.println("Read DHT11 failed.....");
  }  
}

void readMQ()
{
   for(int i = 0; i < 100; i++){
     sensorValue = sensorValue + analogRead(gas);       // read analog input pin 0
   }
   sensorValue = sensorValue /100/10;                  // get average reading
   delay(100);                        // wait 100ms for next reading
}
