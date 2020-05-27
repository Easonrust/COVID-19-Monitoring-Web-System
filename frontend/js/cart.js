/*
 	思路：
 		第一步：当页面加载完后，根据本地的数据，动态生成表格（购物车列表）
 			  获取所要操作的节点对象
 			 判断购物车中是否有数据？
 			 	有：
 			 		显示出购物列表
 			 	没有：
 			 		提示购物车为空
 		第二步：当购物车列表动态生成后，获取tbody里所有 的checkeBox标签节点对象，看那个被选中就获取对应行小计进行总价格运算。
 		第三步：
 			为每一个checkbox添加一个onchange事件，根据操作更改总价格
 		第四步：全选
 		第五步：
 			为加减按钮添加一个鼠标点击事件
 			更改该商品的数量
 		第六步：删除
 			获取所有的删除按钮
 			为删除按钮添加一个鼠标点击事件
 			删除当前行，并更新本地数据
 */
function signOut() {
	cookieObj.del("username");
	location.reload();
}
window.onload = function () {

	this.setTop();
	this.setContent();
	this.document.getElementById("orderbtn").onclick = setOrder;
}

function setOrder() {
	//TODO:AJAX 逻辑进行下单操作
	var time = new Date();
	var year = time.getFullYear();
	var month = time.getMonth() + 1;
	var date = time.getDate();
	var cart = new Array();
	var username = cookieObj.get("username");
	var allgoods = document.querySelectorAll(".goods");
	var cks = document.querySelectorAll("tbody .ck");
	for (var i = 0; i < allgoods.length; i++) {
		if (cks[i].checked) { //如果当前被选中
			var goods = {};

			var goodsid = allgoods[i].getAttribute("pid");
			var num = allgoods[i].firstElementChild.nextSibling.nextSibling.nextSibling.firstChild.nextSibling.value;
			var totalprice = getTotalPrice();
			goods.goodsid = goodsid;
			goods.num = num;
			goods.name = username;
			goods.date = year + "/" + month + "/" + date;
			goods.totalprice = totalprice;
			cart.push(goods);
			console.log(goodsid);
		}
	}
	var parme = JSON.stringify(cart);
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function () {

		if (4 === xmlHttp.readyState) {
			if (200 === xmlHttp.status) {
				//局部刷新
				console.log(xmlHttp.responseText);
				// if (xmlHttp.responseText == "succeed") {
				//     cookieObj.set({
				//         name: "username",
				//         value: username
				//     });
				//     window.location.href = "index.html";
				// } else {
				//     alert("用户名或密码错误！");
				// }
				cookieObj.del("datas");
				alert("Successfully Order!");
				location.reload();
			} else {
				alert("connected failed");
			}

		}
	};
	var url = "http://123.57.229.179:8080/cart/setorder"

	xmlHttp.open('POST', url);
	// 4. 设置请求头
	xmlHttp.setRequestHeader("Content-type", "application/json;charset=utf-8");

	// 5. 发送
	xmlHttp.send(parme); //请求体body，用&分隔。引用：req.body.name
}

function setTop() {
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
		loginStatus.innerHTML = "signin"
	}
}
/*
 	思路：
 		第一步：当页面加载完后，根据本地的数据，动态生成表格（购物车列表）
 			  获取所要操作的节点对象
 			 判断购物车中是否有数据？
 			 	有：
 			 		显示出购物列表
 			 	没有：
 			 		提示购物车为空
 		第二步：当购物车列表动态生成后，获取tbody里所有 的checkeBox标签节点对象，看那个被选中就获取对应行小计进行总价格运算。
 		第三步：
 			为每一个checkbox添加一个onchange事件，根据操作更改总价格
 		第四步：全选
 		第五步：
 			为加减按钮添加一个鼠标点击事件
 			更改该商品的数量
 		第六步：删除
 			获取所有的删除按钮
 			为删除按钮添加一个鼠标点击事件
 			删除当前行，并更新本地数据
 */

function setContent() {
	var listObj = getAllData();
	var table = document.getElementById("table")
	var box = document.getElementById("box")
	var tbody = document.getElementById("tbody");
	var totalPrice = document.getElementById("totalPrice");
	var allCheck = document.getElementById("allCheck");

	if (listObj.length == 0) { //购物车为空
		box.className = "box";
		table.className = "hide";
	} else {
		box.className = "box hide";
		table.className = "";
		for (var i = 0, len = listObj.length; i < len; i++) {
			var tr = document.createElement("tr");
			tr.setAttribute("pid", listObj[i].pid);
			tr.className = "goods";
			//{"pid":值,"pImg":值,"pName":值,"pDesc":值,"price":值,"pCount":1},
			tr.innerHTML = '<td>' +
				'<input type="checkbox" class="ck"  />' +
				'</td>' +
				'<td>' +
				'<img src="' + listObj[i].pImg + '" alt="" />' +
				'</td>' +
				'<td>' +
				listObj[i].pDesc +
				'</td>' +
				'<td>' +
				'<button class="down">-</button><input type="text" value="' + listObj[i].pCount + '" readonly="readonly" /><button class="up">+</button>' +
				'</td>' +
				'<td>' +
				'￥<span>' + listObj[i].price + '</span>' +
				'</td>' +
				'<td>' +
				'￥<span>' + listObj[i].price * listObj[i].pCount + '</span>' +
				'</td>' +
				'<td>' +
				'<button class="del" >delete</button>' +
				'</td>';
			tbody.appendChild(tr);
		}
	}

	/*
	 	功能：计算总价格
	 */
	var cks = document.querySelectorAll("tbody .ck");


	/*循环遍历为每一个checkbox添加一个onchange事件*/
	for (var i = 0, len = cks.length; i < len; i++) {
		cks[i].onchange = function () {
			checkAllChecked();
			totalPrice.innerHTML = getTotalPrice();
		}
	}

	/*全选实现*/
	allCheck.onchange = function () {
		if (this.checked) {
			for (var i = 0, len = cks.length; i < len; i++) {
				cks[i].checked = true;
			}
		} else {
			for (var i = 0, len = cks.length; i < len; i++) {
				cks[i].checked = false;
			}
		}
		totalPrice.innerHTML = getTotalPrice();
	}

	var downs = document.querySelectorAll(".down"); //一组减的按钮
	var ups = document.querySelectorAll(".up"); //一组加的按钮
	var dels = document.querySelectorAll(".del"); //一组删除按钮
	for (var i = 0, len = downs.length; i < len; i++) {
		downs[i].onclick = function () {
			var txtObj = this.nextElementSibling; //下一个兄弟节点
			var tr = this.parentNode.parentNode;
			var pid = tr.getAttribute("pid");
			txtObj.value = txtObj.value - 1;
			if (txtObj.value < 1) {
				txtObj.value = 1;
				updateObjById(pid, 0)
			} else {
				updateObjById(pid, -1)
			}
			tr.children[0].firstElementChild.checked = true;
			checkAllChecked();
			var price = tr.children[4].firstElementChild.innerHTML;
			tr.children[5].firstElementChild.innerHTML = price * txtObj.value;
			totalPrice.innerHTML = getTotalPrice();

		}

		ups[i].onclick = function () {
			var txtObj = this.previousElementSibling; //上一个兄弟节点
			var tr = this.parentNode.parentNode;
			var pid = tr.getAttribute("pid");
			txtObj.value = Number(txtObj.value) + 1;
			updateObjById(pid, 1)
			tr.children[0].firstElementChild.checked = true;
			checkAllChecked()
			var price = tr.children[4].firstElementChild.innerHTML;
			tr.children[5].firstElementChild.innerHTML = price * txtObj.value;
			totalPrice.innerHTML = getTotalPrice();
		}

		dels[i].onclick = function () {
			var tr = this.parentNode.parentNode;
			var pid = tr.getAttribute("pid")
			if (confirm("Confirm Click？")) {
				//remove()  自杀
				tr.remove();
				listObj = deleteObjByPid(pid);
			}
			if (listObj.length == 0) { //购物车为空
				box.className = "box";
				table.className = "hide";
			} else {
				box.className = "box hide";
				table.className = "";
			}
			totalPrice.innerHTML = getTotalPrice();
		}
	}
}

/*检测是否要全选*/
function checkAllChecked() {
	var isSelected = true; //全选是否会选中
	var cks = document.querySelectorAll("tbody .ck");
	for (var j = 0, len = cks.length; j < len; j++) {
		if (cks[j].checked == false) {
			isSelected = false;
			break;
		}
	}
	allCheck.checked = isSelected;
}

function checkOnboard() {

	if (cookieObj.get("username") == undefined) {
		return false;
	} else {
		return true;
	}
}

function getTotalPrice() {
	var cks = document.querySelectorAll("tbody .ck");
	var sum = 0;
	for (var i = 0, len = cks.length; i < len; i++) {
		if (cks[i].checked) { //如果当前被选中
			var tr = cks[i].parentNode.parentNode;
			var temp = tr.children[5].firstElementChild.innerHTML;
			sum = Number(temp) + sum;
		}
	}
	return sum;
}