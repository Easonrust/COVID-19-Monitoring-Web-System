"use strict"

function signOut() {
    cookieObj.del("username");
    location.reload();
}
window.onload = function () {

    var username = cookieObj.get("username");
    var loginStatus = this.document.getElementById("loginStatus");
    if (this.checkOnboard()) {
        loginStatus.innerHTML = username;
        loginStatus.href = "";
        var signout = document.createElement("span");
        signout.innerHTML = "Sign out";
        signout.className = "infotext";
        signout.id = "signout";
        signout.onclick = signOut;
        document.getElementById("userinfo").appendChild(signout);
    } else {
        loginStatus.innerHTML = "login"
        window.location.href = "login.html";
    }

    var table = document.getElementById("table");
    var box = document.getElementById("box");
    var parme = 'name=' + username;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {

        if (4 === xmlHttp.readyState) {
            if (200 === xmlHttp.status) {
                //局部刷新
                var responseText = xmlHttp.responseText
                // console.log(xmlHttp.responseText);
                if (responseText != "[]") {
                    var data = JSON.parse(responseText);
                    console.log(data);
                    box.className = "box hide";
                    table.className = "";
                    for (var i = 0; i < data.length; i++) {
                        var tr = document.createElement("tr");

                        //{"pid":值,"pImg":值,"pName":值,"pDesc":值,"price":值,"pCount":1},
                        tr.innerHTML = '<td>' +
                             +data[i].orderid +
                            '</td>' +
                            '<td>' +
                            data[i].date +
                            '</td>' +
                            '<td>' +
                            data[i].totalprice +
                            '</td>' +
                            '<td>' +
                            data[i].content+
                            '</td>';
                        tbody.appendChild(tr);
                    }
                } else {
                    box.className = "box";
                    table.className = "hide";
                }

            } else {
               
            }

        }
    };
    var url = "http://123.57.229.179:8080/cart/getorder";

    xmlHttp.open('POST', url);
    // 4. 设置请求头
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // 5. 发送
    xmlHttp.send(parme); //请求体body，用&分隔。引用：req.body.name
};

function checkOnboard() {

    if (cookieObj.get("username") == undefined) {
        return false;
    } else {
        return true;
    }
}