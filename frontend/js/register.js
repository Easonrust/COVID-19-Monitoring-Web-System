"use strict";
window.onload=function(){
    this.document.getElementById("btn").onclick=register;
}

function register() {

    var username = document.getElementById("username");
    var password = document.getElementById("password");
    var repassword=document.getElementById("rpassword")

    if (username.value == "") {

        alert("请输入用户名");

    } else if (password.value == "") {

        alert("请输入密码");

    } else if (password.value != repassword.value) {

        alert("两次密码输入不一致!");

    } else {

        //TODO：register ajax

    }
}