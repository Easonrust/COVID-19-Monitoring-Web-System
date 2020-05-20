window.onload=function () {
document.getElementById("btn").onclick=reg;
}
function reg() {
    var name = document.getElementById("name").value;   //获取到前端输入的用户名
    var id = document.getElementById("id").value;	//获取到前端输入的密码
    // 1. 创建一个xmlhttpRequest对象
    var parme = 'name=' + name + '&id='+ id;
    var xmlHttp = createXMLHttp();
    // 3. 打开一个连接
    xmlHttp.open('POST', '/user/register');

    // 4. 设置请求头
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");

    // 5. 发送
    xmlHttp.send(parme); //请求体body，用&分隔。引用：req.body.name
    // 2. 设置回调监听
    xmlHttp.onreadystatechange = function () {

        if(4 === xmlHttp.readyState && 200 === xmlHttp.status){
            //局部刷新
            alert("register succeed");
            console.log(xmlHttp.responseText);
            window.location.href="login";
        }
    };






}

function createXMLHttp() {
    var xmlhttp;
    if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {// code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xmlhttp;
}


