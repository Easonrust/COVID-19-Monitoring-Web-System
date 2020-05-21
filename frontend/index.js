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
window.onload = function () {
    var goodsList = this.document.querySelectorAll('.goods');
    for (let i = 0; i < goodsList.length; i++) {
        var add_button = goodsList[i].querySelector('.add-to-cart');
        add_button.addEventListener("click", function (ev) {
            var cart = document.querySelector('.shopping-cart');
            var imgToDrag = goodsList[i].querySelector("img");
            let imgClone = document.createElement("img");
            imgClone.src = "image/wumingnvlang.jpg";
            imgClone.style.top = getTop(imgToDrag) + "px";
            imgClone.style.left = getLeft(imgToDrag) + "px";
            imgClone.className = "add-animate";
            document.querySelector('body').appendChild(imgClone);

            let destinationTop = getTop(cart);
            let destinationLeft = getLeft(cart);
            let deltaTop = (destinationTop - getTop(imgToDrag)) / 50;
            let deltaLeft = (destinationLeft - getLeft(imgToDrag)) / 50;
            console.log(deltaTop, deltaLeft);
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

                console.log(nowWidth, imgClone.width);
                if (count === 50) {
                    clearInterval(move);
                    document.querySelector('body').removeChild(imgClone);
                }

            }, 10);
        });

    }
}