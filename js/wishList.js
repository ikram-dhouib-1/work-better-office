if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    let products = null;
    if (localStorage.getItem('currentWishList')) {
        products = JSON.parse(localStorage.getItem('currentWishList'));
    }
    if (products) {
        for (var pdt of products) {
            addItemToList(pdt.productId, pdt.image);
        }
    }

    function removeProduct(id) {
        let products = null;
        if (localStorage.getItem('currentWishList')) {
            products = JSON.parse(localStorage.getItem('currentWishList'));
        }
        if (products) {
            var index = products.findIndex(elt => elt.productId == id);
            products.splice(index, 1)
        }
        localStorage.setItem("currentWishList", JSON.stringify(products))
    }

    function removeItem(event) {
        var buttonClicked = event.target;
        const id = event.target.getAttribute('data-id');
        removeProduct(id);
        buttonClicked.parentElement.parentElement.remove();
    }

    function addItemToList(title, imageSrc) {
        var box = document.createElement('div')
        box.classList.add("box");
        box.innerHTML = `
            <div class="image">
                <img src="${imageSrc}" alt="">
            </div>
            <div class="info">
                <h3>${title}</h3>
            </div>
            <div class="overlay">
                <a href="#" style="--i:1;" class="fas fa-trash removeFromWishList"  data-id=${title}></a>
            </div>`

        var listItems = document.getElementById("favorit-List");
        box.getElementsByClassName("removeFromWishList")[0].addEventListener('click', removeItem);

        listItems.appendChild(box);

    }


}