function getTop(e) {
    var offset = e.offsetTop;
    if (e.offsetParent != null) offset += getTop(e.offsetParent);
    return offset;
}

function getLeft(e) {
    var offset = e.offsetLeft;
    if (e.offsetParent != null) offset += getLeft(e.offsetParent);
    return offset;
}


//注销操作
function signOut() {
    cookieObj.del("username");
    location.reload();
}

function setGoods() {
    var parme = 'ok=ok';
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
                    for (var i = 0; i < data.length; i++) {
                        var tr = document.createElement("li");
                        tr.setAttribute("pid", data[i].goodsid);
                        //{"pid":值,"pImg":值,"pName":值,"pDesc":值,"price":值,"pCount":1},
                        tr.innerHTML = '<div class="goods">' +
                            '<img src="' + data[i].src + '" class="img_li">' +
                            '<div class="info">' +
                            '<h3>' + data[i].goodsname + '</h3>' +
                            '<p>' +
                            data[i].desc +
                            '</p>' +
                            '<div class="img_btn">' +

                            '<div class="price">¥ <span>' + data[i].price + '</span></div>' +


                            '<button class="add-to-cart" type="button">Add to cart</button>' +

                            '</div>' +
                            '</div>' +
                            '</div>';
                        //TODO:获得username
                        document.getElementById("list").appendChild(tr);
                    }
                    var btns = document.querySelectorAll(".add-to-cart"); //所有的购物车按钮
                    /*循环为每一个按钮添加点击事件*/
                    for (var i = 0, len = btns.length; i < len; i++) {
                        btns[i].onclick = addtocart;
                    }
                    var goodsList = document.querySelectorAll('.goods');
                    for (let i = 0; i < goodsList.length; i++) {
                        var add_button = goodsList[i].querySelector('.add-to-cart');
                        add_button.addEventListener("click", function (ev) {
                            var cart = document.querySelector('.shopping-cart');
                            var imgToDrag = goodsList[i].querySelector("img");
                            let imgClone = document.createElement("img");
                            imgClone.src = data[i].src;
                            imgClone.style.top = getTop(imgToDrag) + "px";
                            imgClone.style.left = getLeft(imgToDrag) + "px";
                            imgClone.className = "add-animate";
                            document.querySelector('body').appendChild(imgClone);

                            let destinationTop = getTop(cart);
                            let destinationLeft = getLeft(cart);
                            let deltaTop = (destinationTop - getTop(imgToDrag)) / 50;
                            let deltaLeft = (destinationLeft - getLeft(imgToDrag)) / 50;
                            let nowTop = getTop(imgToDrag);
                            let nowLeft = getLeft(imgToDrag);
                            let count = 0;

                            let deltaWidth = (imgClone.width - 0.2 * imgClone.width) / 50;
                            let deltaHeight = (imgClone.height - 0.2 * imgClone.height) / 50;
                            let nowWidth = imgClone.width;
                            let nowHeight = imgClone.height;

                            let move = setInterval(function () {
                                count++;
                                nowTop += deltaTop;
                                nowLeft += deltaLeft;

                                nowWidth -= deltaWidth;
                                nowHeight -= deltaHeight;

                                imgClone.style.top = parseInt(nowTop) + 'px';
                                imgClone.style.left = parseInt(nowLeft) + 'px';

                                imgClone.style.width = parseInt(nowWidth) + 'px';
                                imgClone.style.height = parseInt(nowHeight) + 'px';


                                if (count === 50) {
                                    clearInterval(move);
                                    document.querySelector('body').removeChild(imgClone);
                                }

                            }, 10);
                        });

                    }
                }

            } else {

            }

        }
    };
    var url = "http://localhost:8080/cart/getgoods";

    xmlHttp.open('POST', url);
    // 4. 设置请求头
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // 5. 发送
    xmlHttp.send(parme); //请求体body，用&分隔。引用：req.body.name
}
window.onload = function () {
    setGoods();
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
    }

    var ccount = document.getElementById("ccount"); //显示商品总数量的标签节点对象
    //约定好用名称为datas的cookie来存放购物车里的数据信息  datas里所存放的就是一个json字符串
    var listStr = cookieObj.get("datas");
    /*判断一下本地是否有一个购物车（datas），没有的话，创建一个空的购物车，有的话就直接拿来使用*/
    if (!listStr || listStr == this.undefined || listStr == "undefined") { //没有购物车     datas  json
        cookieObj.set({
            name: "datas",
            value: "[]"
        });
        listStr = cookieObj.get("datas");
        var listObj = [];
    } else {
        console.log(listStr);
        var listObj = JSON.parse(listStr); //数组
        console.log(listObj);
    }
    /*循环遍历数组，获取每一个对象中的pCount值相加总和*/
    var totalCount = 0; //默认为0
    for (var i = 0, len = listObj.length; i < len; i++) {
        totalCount = listObj[i].pCount + totalCount;
    }
    ccount.innerHTML = totalCount;







}

function addtocart() {
    var ccount = document.getElementById("ccount"); //显示商品总数量的标签节点对象
    //约定好用名称为datas的cookie来存放购物车里的数据信息  datas里所存放的就是一个json字符串
    var listStr = cookieObj.get("datas");
    /*判断一下本地是否有一个购物车（datas），没有的话，创建一个空的购物车，有的话就直接拿来使用*/
    if (!listStr || listStr == undefined) { //没有购物车     datas  json
        cookieObj.set({
            name: "datas",
            value: "[]"
        });
        listStr = cookieObj.get("datas");
    }
    console.log(listStr);
    var listObj = JSON.parse(listStr); //数组
    console.log(listObj);

    var dl = this.parentNode.parentNode.parentNode.parentNode;
    var pid = dl.getAttribute("pid"); //获取自定义属性
    var arrs1 = dl.firstElementChild.childNodes;
    var arrs2 = dl.firstElementChild.getElementsByClassName("info"); //获取所有子节点
    var info = arrs2[0].childNodes;
    console.log(info);
    if (checkObjByPid(pid)) {
        listObj = updateObjById(pid, 1)
    } else {
        var imgSrc = arrs1[0].src;
        var pName = info[0].innerHTML;
        var pDesc = info[1].innerHTML;
        var price = info[2].firstElementChild.firstElementChild.innerHTML;
        var obj = {
            pid: pid,
            pImg: imgSrc,
            pName: pName,
            pDesc: pDesc,
            price: price,
            pCount: 1
        };
        listObj.push(obj)
        listObj = updateData(listObj);
    }
    ccount.innerHTML = getTotalCount();
}

//检查是否已登陆
function checkOnboard() {

    if (cookieObj.get("username") == undefined) {
        return false;
    } else {
        return true;
    }
}