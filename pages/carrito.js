    const pintarCarrito = () =>{
        carritoContainer.innerHTML = "";
        carritoContainer.style.display = "block";
        const carritoHeader = document.createElement("div");
        carritoHeader.className = "carrito-header"
        carritoHeader.innerHTML = `
        <h1 class="carrito-header-titulo">CARRITO DE COMPRAS</h1> 
    `;
            carritoContainer.append(carritoHeader);


            const finalizarComparaBoton = document.createElement("h2");
            finalizarComparaBoton.innerHTML = "Finalizar compra";
            finalizarComparaBoton.className = "finalizar-header-boton";
    
            finalizarComparaBoton.addEventListener("click", () => {
                window.location.href = "../pages/finalizarCompra.html";
            })
    
                carritoHeader.append(finalizarComparaBoton); 
                
                
        const carritoButton = document.createElement("h2");
        carritoButton.innerHTML = "Cerrar carrito";
        carritoButton.className = "carrito-header-boton";

        carritoButton.addEventListener("click", () => {
            carritoContainer.style.display = "none";
        })

            carritoHeader.append(carritoButton);

    //forEach para recorrer cada producto y con innerHTML agregar la card correspondiente al carrito        
    carrito.forEach((producto) => {
        let carritoContenido = document.createElement("div");
        carritoContenido.className = "carrito-contenido"
        carritoContenido.innerHTML = `
         <img id="imagen-carrito" src="${producto.imagen}">
         <h3>${producto.nombre}</h3>
         <p>${producto.precio}$</p>
         <span class= "restar"> - </span>
         <p>Cantidad: ${producto.cantidad}</p>
         <span class= "sumar"> + </span>
         <p>Total: ${producto.cantidad * producto.precio}</p>
         <span class= "eliminar-producto"> ❌ </span>
        `
            carritoContainer.append(carritoContenido)

        let restar = carritoContenido.querySelector(".restar")
        restar.addEventListener("click",() =>{
            if(producto.cantidad !== 1){
                producto.cantidad--;
            }
            pintarCarrito(); 
        });

        let sumar = carritoContenido.querySelector(".sumar")
        sumar.addEventListener("click", () =>{
            producto.cantidad++;  
            saveLocal();
            pintarCarrito();   
        });

        let eliminar = carritoContenido.querySelector(".eliminar-producto")
        eliminar.addEventListener("click", () =>{
            eliminarProducto(producto.id)
        })
    });

    const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

    const totalCompra = document.createElement("div")
    totalCompra.className = "total-compra"
    totalCompra.innerHTML = `total a pagar: ${total}$`;
    carritoContainer.append(totalCompra);
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (id) => {
    const encontrarId = carrito.find((element) => element.id === id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== encontrarId;
    });
    contadorCarrito();
    saveLocal();
    pintarCarrito();
};

const contadorCarrito = () => {
    cantidadCarrito.style.display = "block";

    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

contadorCarrito();


//alert para avisar que la compra se realizó
const finalizarCompraButton = document.getElementById('finalizarCompraButton');

    finalizarCompraButton.addEventListener('click', function() {
        alert('¡Compra finalizada con éxito!');
    });