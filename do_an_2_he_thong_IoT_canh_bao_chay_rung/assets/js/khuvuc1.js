// canh bao
var mylamp_On = document.getElementById("mylamp_on_01");
var mylamp_Off = document.getElementById("mylamp_off_01");

mylamp_On.onclick = function(){
    document.getElementById("mylamp_01").src = "./assets/img/pic_bulbon.gif"
    // WED -> FIREBASE
    firebase.database().ref("FORESTFIREWARNING/NODE1").update({
            CANHBAO: "ON"})

}

mylamp_Off.onclick = function(){
  document.getElementById("mylamp_01").src = "./assets/img/pic_bulboff.gif"
  // WED -> FIREBASE
  firebase.database().ref("FORESTFIREWARNING/NODE1").update({
            CANHBAO: "OFF"})
}

// FIREBASE -> WEB
firebase.database().ref("FORESTFIREWARNING/NODE1/CANHBAO").on("value",function(snapshot){
  var canhbao = snapshot.val();
  if(canhbao === "ON"){
    document.getElementById("mylamp_01").src = "./assets/img/pic_bulbon.gif"
  }
  else if(canhbao === "OFF"){
    document.getElementById("mylamp_01").src = "./assets/img/pic_bulboff.gif"
  }
});

//Slider Tron 01-----------------------------------
// NHIỆT ĐỘ
function initial_sliderTron_01(data1){
  $("#sliderTronId_01").roundSlider({
    sliderType: "min-range",
    width: 22,
    radius: 100,
    readOnly: false,
    value: data1,
    circleShape: "half-top",
    lineCap: "round",
    editableTooltip: false,
    max: 100,
    svgMode: true,
    rangeColor: "red",
    change: function (args) {
      var obj = $("#sliderTronId_01").data("roundSlider");
      $('#sliderTronId_01').roundSlider('setValue', obj.getValue());
      document.getElementById("nd").innerHTML = obj.getValue();
    }
  });
};

initial_sliderTron_01(50); //Start first time

// WED -> FIREBASE
var sliderTron_01 = document.getElementById("sliderTronId_01");
sliderTron_01.addEventListener("mousemove", function(){
  var obj = $("#sliderTronId_01").data("roundSlider");
  var slider = obj.getValue();
  firebase.database().ref("FORESTFIREWARNING/NODE1/").update({
    NHIETDO: slider
  })
})

// FIREBASE -> WED 
firebase.database().ref("FORESTFIREWARNING/NODE1/NHIETDO/").on("value",function(snapshot){
  initial_sliderTron_01(snapshot.val());
})


//Slider Tron 02-----------------------------------
// Độ ẩm

function initial_sliderTron_02(data2){
  $("#sliderTronId_02").roundSlider({
    sliderType: "min-range",
    width: 22,
    radius: 100,
    readOnly: false,
    value: data2,
    circleShape: "half-top",
    lineCap: "round",
    editableTooltip: false,
    max: 100,
    svgMode: true,
    rangeColor: "#2cc4d3"
  });
};

initial_sliderTron_02(30); //Start first time

// WED -> FIREBASE
var sliderTron_02 = document.getElementById("sliderTronId_02");
sliderTron_02.addEventListener("mousemove", function(){
  var obj1 = $("#sliderTronId_02").data("roundSlider");
  var slider1 = obj1.getValue();
  firebase.database().ref("FORESTFIREWARNING/NODE1/").update({
    DOAM: slider1
  })
})

// FIREBASE -> WED 
firebase.database().ref("FORESTFIREWARNING/NODE1/DOAM/").on("value",function(snapshot){
  initial_sliderTron_02(snapshot.val());
})

//Slider Tron 03-----------------------------------
// Khói

function initial_sliderTron_03(data3){
  $("#sliderTronId_03").roundSlider({
    sliderType: "min-range",
    width: 22,
    radius: 100,
    readOnly: false,
    value: data3,
    circleShape: "half-top",
    lineCap: "round",
    editableTooltip: false,
    max: 100,
    svgMode: true,
    rangeColor: "#eef51d"
  });
};

initial_sliderTron_03(30); //Start first time

// WED -> FIREBASE
var sliderTron_03 = document.getElementById("sliderTronId_03");
sliderTron_03.addEventListener("mousemove", function(){
  var obj1 = $("#sliderTronId_03").data("roundSlider");
  var slider1 = obj1.getValue();
  firebase.database().ref("FORESTFIREWARNING/NODE1/").update({
    KHOI: slider1
  })
})

// FIREBASE -> WED 
firebase.database().ref("FORESTFIREWARNING/NODE1/KHOI/").on("value",function(snapshot){
  initial_sliderTron_03(snapshot.val());
})

//SliderNgang...............
// nhiệt độ
var sliderNgang = document.getElementById("sliderNgangId");

sliderNgang.addEventListener("mousemove", function(){
  document.getElementById("sliderNgangValue").innerHTML = sliderNgang.value;
  // WED -> FIREBASE
  var slider = sliderNgang.value;
  firebase.database().ref("FORESTFIREWARNING/NODE1/").update({
    "p-NHIETDO": slider
    })
})

// độ ẩm
var sliderNgang1 = document.getElementById("sliderNgangId1");

sliderNgang1.addEventListener("mousemove", function(){
  document.getElementById("sliderNgangValue1").innerHTML = sliderNgang1.value;
  // WED -> FIREBASE
  var slider1 = sliderNgang1.value;
  firebase.database().ref("FORESTFIREWARNING/NODE1/").update({
    "p-DOAM": slider1
  })
})

var sliderNgang2 = document.getElementById("sliderNgangId2");

sliderNgang2.addEventListener("mousemove", function(){
  document.getElementById("sliderNgangValue2").innerHTML = sliderNgang2.value;
  // WED -> FIREBASE
  var slider2 = sliderNgang2.value;
  firebase.database().ref("FORESTFIREWARNING/NODE1/").update({
    "p-KHOI": slider2
  })
})

// FIREBASE -> WEB
//ngưỡng nhiệt độ
firebase.database().ref("FORESTFIREWARNING/NODE1/p-NHIETDO/").on("value",function(snapshot){
  var slider = snapshot.val();
  document.getElementById("sliderNgangId").value = slider;
  document.getElementById("sliderNgangValue").innerHTML = sliderNgang.value;
})  ;

// Ngưỡng độ ẩm 
firebase.database().ref("FORESTFIREWARNING/NODE1/p-DOAM/").on("value",function(snapshot){
  var slider1 = snapshot.val();
  document.getElementById("sliderNgangId1").value = slider1;
  document.getElementById("sliderNgangValue1").innerHTML = sliderNgang1.value;
});

// Ngưỡng khoi
firebase.database().ref("FORESTFIREWARNING/NODE1/p-KHOI/").on("value",function(snapshot){
  var slider2 = snapshot.val();
  document.getElementById("sliderNgangId2").value = slider2;
  document.getElementById("sliderNgangValue2").innerHTML = sliderNgang2.value;
});

// FIREBASE -> WEB
// hiển thị giá trị ngưỡng
firebase.database().ref("FORESTFIREWARNING/NODE1/p-NHIETDO").on("value",function(snapshot){
    var t = snapshot.val();
    document.getElementById("hienpNhietdo").innerHTML = t;

    console.log(t);
});

firebase.database().ref("FORESTFIREWARNING/NODE1/p-DOAM").on("value",function(snapshot){
    var t = snapshot.val();
    document.getElementById("hienpDoam").innerHTML = t;

    console.log(t);
});

firebase.database().ref("FORESTFIREWARNING/NODE1/p-KHOI").on("value",function(snapshot){
    var t = snapshot.val();
    document.getElementById("hienpkhoi").innerHTML = t;

    console.log(t);
});

