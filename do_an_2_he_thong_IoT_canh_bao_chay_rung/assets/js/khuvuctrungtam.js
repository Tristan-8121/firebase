// FIREBASE -> WEB
// khu vực 1
firebase.database().ref("FORESTFIREWARNING/NODE1/NHIETDO").on("value",function(snapshot){
    var t = snapshot.val();
    document.getElementById("hienNhietdo").innerHTML = t;

    console.log(t);
});

firebase.database().ref("FORESTFIREWARNING/NODE1/DOAM").on("value",function(snapshot){
    var t = snapshot.val();
    document.getElementById("hienDoam").innerHTML = t;

    console.log(t);
});

firebase.database().ref("FORESTFIREWARNING/NODE1/KHOI").on("value",function(snapshot){
    var t = snapshot.val();
    document.getElementById("hienkhoi").innerHTML = t;

    console.log(t);
});

// khu vực 2
firebase.database().ref("FORESTFIREWARNING/NODE2/NHIETDO").on("value",function(snapshot){
    var t = snapshot.val();
    document.getElementById("hienNhietdo_V").innerHTML = t;

    console.log(t);
});

firebase.database().ref("FORESTFIREWARNING/NODE2/DOAM").on("value",function(snapshot){
    var t = snapshot.val();
    document.getElementById("hienDoam_V").innerHTML = t;

    console.log(t);
});

firebase.database().ref("FORESTFIREWARNING/NODE2/KHOI").on("value",function(snapshot){
    var t = snapshot.val();
    document.getElementById("hienKhoi_V").innerHTML = t;

    console.log(t);
});
