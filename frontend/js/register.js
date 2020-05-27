"use strict";
window.onload = function () {
    this.document.getElementById("btn").onclick = register;
}

function register() {

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var repassword = document.getElementById("rpassword").value;

    if (username.value == "") {

        alert("Put in the username!");

    } else if (password.value == "") {

        alert("Put in the password!");

    } else if (password.value != repassword.value) {

        alert("The password is not the same!");

    } else {
        var parme = 'name=' + username + '&password=' + password;
        //TODO：register ajax
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {

            if (4 === xmlHttp.readyState) {
                if (200 === xmlHttp.status) {
                    //局部刷新
                    console.log(xmlHttp.responseText);
                    if (xmlHttp.responseText == "succeed") {
                        alert("register succeed");
                        window.location.href = "login.html";
                    } else {
                        alert("username already exist!");
                    }
                } else {
                    alert("register failed");
                }

            }
        };
        var url = "http://123.57.229.179:8080/user/register"

        xmlHttp.open('POST', url);
        // 4. 设置请求头
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        // 5. 发送
        xmlHttp.send(parme); //请求体body，用&分隔。引用：req.body.name

    }
}