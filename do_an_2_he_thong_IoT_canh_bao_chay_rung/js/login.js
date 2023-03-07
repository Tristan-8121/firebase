// tham khảo: https://unitop.com.vn/tao-form-dang-nhap-voi-html-css-sieu-dep.html/
// step 1
let showPassword = false

// step 2
const ipnElement = document.querySelector('#ipnPassword')
const btnElement = document.querySelector('#btnPassword')

// step 3
btnElement.addEventListener('click', function() {
  if (showPassword) {
    // Đang hiện password
    // Chuyển sang ẩn password
    ipnElement.setAttribute('type', 'password')
    showPassword = false
  } else {
    // Đang ẩn password
    // Chuyển sang hiện password
    ipnElement.setAttribute('type', 'text')
    showPassword = true
  }
})

function send(){
    // firebase -> web
    firebase.database().ref("FORESTFIREWARNING/DANGNHAP/MATKHAU").on("value",function(snapshot){
        var pw = snapshot.val();
        var mk = document.getElementById("ipnPassword").value;
    firebase.database().ref("FORESTFIREWARNING/DANGNHAP/TAIKHOAN").on("value",function(snapshot){
        var tk = snapshot.val();
        var tknhap = document.getElementById("tendangnhap").value;
      // web -> firebase
    firebase.database().ref("FORESTFIREWARNING/DANGNHAP/").update({
        MATKHAUDANHAP: mk})
    firebase.database().ref("FORESTFIREWARNING/DANGNHAP/").update({
        TAIKHOANDANHAP: tknhap})
      var choice =  confirm('TÀI KHOẢN BẠN NHẬP LÀ:\n'+tknhap+'\n'+'MẬT KHẨU BẠN NHẬP LÀ:\n'+mk);
      if(mk == pw && tk==tknhap)
        {
            confirm('TÀI KHOẢN VÀ MẬT KHẨU ĐÚNG\n'+'HỆ THỐNG IOT CẢNH BÁO CHÁY RỪNG');  
            var str = "CLICK VÀO ĐÂY ĐỂ VÀO TRANG CHỦ"; 
            var result = str.link("./khuvuc1.html");
            document.getElementById("login_service").innerHTML = result;
        }
      else{
          confirm('TÀI KHOẢN HOẶC MẬT KHẨU SAI VUI LÒNG NHẬP LẠI\n');
      }  
    });   
});
}