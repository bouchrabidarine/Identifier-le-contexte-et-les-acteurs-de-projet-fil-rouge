// ============================
// PRODUITS
// ============================

let products = [

    {
        id: 1,
        name: "Chaussures Nike",
        price: 250,
        quantity: 10,
        phone: "0612345678"
    },

    {
        id: 2,
        name: "Montre classique",
        price: 150,
        quantity: 5,
        phone: "0623456789"
    },

    {
        id: 3,
        name: "T-shirt",
        price: 80,
        quantity: 20,
        phone: "0634567890"
    }

];


// ============================
// PANIER
// ============================

let cart = [];


// Ajouter un produit au panier

function addToCart(productId) {

    const product = products.find(
        product => product.id === productId
    );

    if (!product) {
        return;
    }

    const quantityInput =
        document.getElementById(`quantity-${productId}`);

    const quantity = parseInt(quantityInput.value);

    if (quantity <= 0 || isNaN(quantity)) {
        alert("Veuillez choisir une quantité valide.");
        return;
    }

    if (quantity > product.quantity) {
        alert(
            "Désolé, il ne reste que " +
            product.quantity +
            " article(s)."
        );

        return;
    }


    const existingProduct = cart.find(
        item => item.id === productId
    );


    if (existingProduct) {

        if (
            existingProduct.selectedQuantity + quantity
            > product.quantity
        ) {

            alert("La quantité demandée n'est pas disponible.");
            return;
        }

        existingProduct.selectedQuantity += quantity;

    } else {

        cart.push({
            ...product,
            selectedQuantity: quantity
        });

    }


    displayCart();

    alert("Article ajouté au panier !");
}


// ============================
// AFFICHER LE PANIER
// ============================

function displayCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartTotal =
        document.getElementById("cart-total");


    if (cart.length === 0) {

        cartItems.innerHTML =
            `<p class="empty-cart">
                Votre panier est vide.
            </p>`;

        cartTotal.textContent = "0";

        return;
    }


    cartItems.innerHTML = "";

    let total = 0;


    cart.forEach((item, index) => {

        const subtotal =
            item.price * item.selectedQuantity;

        total += subtotal;


        const div =
            document.createElement("div");

        div.className = "cart-item";


        div.innerHTML = `

            <div class="cart-item-info">

                <h3>${item.name}</h3>

                <p>
                    Prix : ${item.price} DH
                </p>

                <p>
                    Quantité :
                    ${item.selectedQuantity}
                </p>

                <strong>
                    Sous-total :
                    ${subtotal} DH
                </strong>

            </div>

            <button
                class="remove-btn"
                onclick="removeFromCart(${index})"
            >
                Supprimer
            </button>

        `;


        cartItems.appendChild(div);

    });


    cartTotal.textContent = total;
}


// ============================
// SUPPRIMER DU PANIER
// ============================

function removeFromCart(index) {

    cart.splice(index, 1);

    displayCart();
}


// ============================
// AJOUTER UN NOUVEL ARTICLE
// ============================

const productForm =
    document.getElementById("product-form");


productForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const name =
        document.getElementById("productName").value;

    const price =
        Number(
            document.getElementById("productPrice").value
        );

    const quantity =
        Number(
            document.getElementById("productQuantity").value
        );

    const image =
        document.getElementById("productImage").value;

    const description =
        document.getElementById("productDescription").value;

    const phone =
        document.getElementById("sellerPhone").value;


    const newProduct = {

        id: Date.now(),

        name: name,

        price: price,

        quantity: quantity,

        image: image,

        description: description,

        phone: phone

    };


    products.push(newProduct);


    createProductCard(newProduct);


    productForm.reset();


    alert(
        "Votre article a été ajouté avec succès !"
    );

});


// ============================
// CREER LA CARTE PRODUIT
// ============================

function createProductCard(product) {

    const productList =
        document.getElementById("product-list");


    const card =
        document.createElement("div");

    card.className = "product-card";


    card.innerHTML = `

        <img
            src="${product.image}"
            alt="${product.name}"
        >

        <div class="product-info">

            <h3>
                ${product.name}
            </h3>

            <p class="description">
                ${product.description || "Article disponible à petit prix."}
            </p>

            <p class="price">
                ${product.price} DH
            </p>

            <div class="quantity">

                <label>
                    Quantité :
                </label>

                <input
                    type="number"
                    id="quantity-${product.id}"
                    value="1"
                    min="1"
                    max="${product.quantity}"
                >

            </div>

            <button
                onclick="addToCart(${product.id})"
                class="cart-btn"
            >
                Ajouter au panier
            </button>

        </div>

    `;


    productList.appendChild(card);
}


// ============================
// CONTACTER LES VENDEURS
// ============================

function contactSellers() {

    if (cart.length === 0) {

        alert(
            "Votre panier est vide."
        );

        return;
    }


    let message =
        "Bonjour, je suis intéressé(e) par :\n\n";


    cart.forEach(item => {

        message +=
            "- " +
            item.name +
            " x " +
            item.selectedQuantity +
            "\n";

    });


    message +=
        "\nJe souhaite contacter le vendeur pour récupérer ma commande.";


    const firstSeller =
        cart[0].phone;


    const whatsappURL =
        "https://wa.me/212" +
        firstSeller.substring(1) +
        "?text=" +
        encodeURIComponent(message);


    window.open(
        whatsappURL,
        "_blank"
    );
}
