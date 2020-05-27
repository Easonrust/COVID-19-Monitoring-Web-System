"use strict";
window.onload = function () {
    this.document.getElementById("btn").onclick = login;
}

function login() {

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (username == "") {

        alert("请输入用户名");

    } else if (password == "") {

        alert("请输入密码");

    } else {
        var parme = 'name=' + username + '&password=' + password;
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {

            if (4 === xmlHttp.readyState) {
                if (200 === xmlHttp.status) {
                    //局部刷新
                    console.log(xmlHttp.responseText);
                    if (xmlHttp.responseText == "succeed") {
                        cookieObj.set({
                            name: "username",
                            value: username
                        });
                        window.location.href = "index.html";
                    } else {
                        alert("用户名或密码错误！");
                    }
                } else {
                    alert("login failed");
                }

            }
        };
        var url = "http://123.57.229.179:8080/user/login"

        xmlHttp.open('POST', url);
        // 4. 设置请求头
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        // 5. 发送
        xmlHttp.send(parme); //请求体body，用&分隔。引用：req.body.name

        //TODO:cookie保存登陆状态

    }
}