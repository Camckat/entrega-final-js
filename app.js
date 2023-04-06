
const contenedorPadre = document.getElementById("contenedorPadre");
const mostrar_carrito = document.getElementById("mostrar_carrito");
const modalContainer = document.getElementById("modal-container");


const carrito = JSON.parse(localStorage.getItem("carrito")) || [];


const getProductos = async () =>{
    const response = await fetch ("productos.json");
    const products = await response.json();


    products.forEach((ListaProductos) => {

        let content = document.createElement ("div");
        content.className = "cards";
        content.innerHTML = `
        <img src = "${ListaProductos.img}">
        <h2>${ListaProductos.nombre}</h2>
        <p>${ListaProductos.descripcion}</p>
        <span class= "precio">${ListaProductos.precio} </span>
        `;
    
        contenedorPadre.append(content);
    
        const btn_comprar = document.createElement("button");
        btn_comprar.innerText = "Comprar";
        btn_comprar.className = "comprar";
    
        content.append(btn_comprar);
    
        btn_comprar.addEventListener("click", () => {
    
            Toastify({
                text: "Agregado al carrito",
                duration: 3000,
                gravity: "bottom",
                position: "left",
                style:{
                    background:'linear-gradient(to right, #d7abf5, #6308a1)'
                }
            }).showToast();
    
            let repeat = carrito.some ((repeatProduct) => repeatProduct.nombre === ListaProductos.nombre);
            console.log(repeat);
    
            if(repeat === true){
                carrito.map((prod) =>{
                    if(prod.nombre === ListaProductos.nombre){
                        ListaProductos.cantidad ++;
                    }
                })
            } else{
                carrito.push({
                    img: ListaProductos.img,
                    nombre: ListaProductos.nombre,
                    cantidad: ListaProductos.cantidad,
                    precio: ListaProductos.precio,
            
    
            });
            console.log(carrito);
            guardarLocalS();
        }
    
        });
    
    
    });
};

getProductos();




/*Mostrar carrito*/

const renderCarrito = () => {

    modalContainer.innerHTML = "";
    modalContainer.style.display = "flex";
    let modalHeader = document.createElement("div");
    modalHeader.className= "modal-header"
    modalHeader.innerHTML = `
    <h1 class="modal-header-title">carrito</h1>
    `;
    modalContainer.append(modalHeader);

    let modalbutton = document.createElement("h1");
    modalbutton.innerText = "x";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click", () => {
        modalContainer.style.display = "none";
    })

    modalHeader.append(modalbutton);

    carrito.forEach((ListaProductos) => {
        let carritoContent = document.createElement("div")
        carritoContent.className = "modal-content"
        carritoContent.innerHTML = `
        <img src="${ListaProductos.img}">
        <h3>${ListaProductos.nombre}</h3>
        <p>${ListaProductos.precio} </p>
        <p>cant:${ListaProductos.cantidad}</p>
        `;

        modalContainer.append(carritoContent)

        let eliminar = document.createElement ("span");
        eliminar.innerText = "x";
        eliminar.className = "delete product";
        carritoContent.append(eliminar);

        eliminar.addEventListener("click", eliminarProducto);

        
    });

    const total = carrito.reduce((acc, el) => acc + el.precio, 0);

    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `El total de tu compra es: ${total} `;
    modalContainer.append(totalBuying);
};

mostrar_carrito.addEventListener("click", renderCarrito);

const eliminarProducto = () => {
    const foundId = carrito.find((element) => element.nombre);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });

    renderCarrito();
    saveLocal();
};


let guardarLocalS = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};



