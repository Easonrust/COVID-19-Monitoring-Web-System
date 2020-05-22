"use strict";
window.onload=function(){
    this.document.getElementById("btn").onclick=login;
}

function login() {

    var username = document.getElementById("username");
    var password = document.getElementById("password");

    if (username.value == "") {

        alert("请输入用户名");

    } else if (pass.value == "") {

        alert("请输入密码");

    } else if (checkInfo(username,password)) {

        window.location.href = "index.html";
        //TODO:cookie保存登陆状态

    } else {

        alert("请输入正确的用户名和密码！")

    }
}
function checkInfo(username,password){
    //TODO：ajax  检查登陆信息是否有效
    return true;
}