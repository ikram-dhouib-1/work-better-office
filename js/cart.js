if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    let products = null;
    if (localStorage.getItem('currentCart')) {
        products = JSON.parse(localStorage.getItem('currentCart'));
    }
    if (products) {
        for (var pdt of products) {
            addItemToCart(pdt.productId, pdt.price, pdt.image, pdt.quantity);
            updateCartTotal();
        }
    }

    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    var quantityAddInputs = document.getElementsByClassName('button-plus')
    for (var i = 0; i < quantityAddInputs.length; i++) {
        var input = quantityAddInputs[i]
        input.addEventListener('click', plusItemClicked)
    }
    var quantityMinusInputs = document.getElementsByClassName('button-minus')
    for (var i = 0; i < quantityMinusInputs.length; i++) {
        var input = quantityMinusInputs[i]
        input.addEventListener('click', minusItemClicked)
    }
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);
    Array.from(document.querySelectorAll('.fa-heart')).map(i => {
        i.addEventListener('click', () => {
            i.classList.toggle('fa-heart-red');
        })
    });




    function purchaseClicked() {
        alert('Thank you for your purchase')
        var cartItems = document.getElementsByClassName('cart-items')[0]
        while (cartItems.hasChildNodes()) {
            cartItems.removeChild(cartItems.firstChild)
        }
        localStorage.removeItem('currentCart')
        updateCartTotal()
    }

    function removeCartItem(event) {
        var buttonClicked = event.target;
        const id = event.target.getAttribute('data-id');
        removeProduct(id);
        buttonClicked.parentElement.parentElement.remove();
        updateCartTotal();
    }

    function plusItemClicked(event) {
        const id = event.target.getAttribute('data-field');
        if (id) {
            value = document.getElementById(id).value++;
            updateItemQuantity(id, parseInt(value + 1))
        }
        updateCartTotal()
    }

    function minusItemClicked(event) {
        const id = event.target.getAttribute('data-field');
        if (id) {
            value = document.getElementById(id).value;
            if (value > 1) {
                document.getElementById(id).value = value - 1;
                updateItemQuantity(id, parseInt(value - 1))
            } else {
                removeProduct(id)
                event.target.parentElement.parentElement.parentElement.remove()
            }
        }
        updateCartTotal()
    }

    function quantityChanged(event) {
        var input = event.target
        var id = input.getAttribute('id')
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1
        }
        updateItemQuantity(id, input.value)
        updateCartTotal()
    }



    function updateItemQuantity(id, quantity) {
        let products = null;
        if (localStorage.getItem('currentCart')) {
            products = JSON.parse(localStorage.getItem('currentCart'));
        }
        if (products) {
            var index = products.findIndex(elt => elt.productId == id);
            products[index].quantity = quantity;
        }
        localStorage.setItem("currentCart", JSON.stringify(products))

    }

    function removeProduct(id) {
        let products = null;
        if (localStorage.getItem('currentCart')) {
            products = JSON.parse(localStorage.getItem('currentCart'));
        }
        if (products) {
            var index = products.findIndex(elt => elt.productId == id);
            products.splice(index, 1)
        }
        localStorage.setItem("currentCart", JSON.stringify(products))

    }

    function addItemToCart(title, price, imageSrc, qty) {
        var cartRow = document.createElement('div')
        cartRow.classList.add('cart-row')


        var cartItems = document.getElementsByClassName('cart-items')[0]
        var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
        for (var i = 0; i < cartItemNames.length; i++) {
            if (cartItemNames[i].innerText == title) {
                alert('This item is already added to the cart')
                return
            }
        }
        var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
        <div class="input-group">
        <input type="button" value="-" class="button-minus" data-field="${title}">
        <input type="number" id="${title}" step="1" min="1" value="${qty}" name="quantity" class="cart-quantity-input" id="${title}">
        <input type="button" value="+" class="button-plus" data-field="${title}">
      </div>
            <button class="btn btn-danger" data-id="${title}" type="button">REMOVE</button>
        </div>`
        cartRow.innerHTML = cartRowContents;
        cartItems.append(cartRow);
        cartRow.getElementsByClassName("button-plus")[0].addEventListener('click', plusItemClicked);
        cartRow.getElementsByClassName("button-minus")[0].addEventListener('click', minusItemClicked);

        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
    }

    function updateCartTotal() {
        var cartItemContainer = document.getElementsByClassName('cart-items')[0]
        var cartRows = cartItemContainer.getElementsByClassName('cart-row')
        var total = 0
        for (var i = 0; i < cartRows.length; i++) {
            var cartRow = cartRows[i]
            var priceElement = cartRow.getElementsByClassName('cart-price')[0]
            var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
            var price = parseFloat(priceElement.innerText.replace('$', ''))
            var quantity = quantityElement.value
            total = total + (price * quantity)
        }
        total = Math.round(total * 100) / 100
        document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
    }
}