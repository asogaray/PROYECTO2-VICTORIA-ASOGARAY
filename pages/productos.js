const categoriasProductos = [
    { id: 1, nombre: 'remeras' },
    { id: 2, nombre: 'jackets' },
    { id: 3, nombre: 'hoodies' }
];

const contenidoShop = document.getElementById("contenidoShop");
const categoriasShop = document.getElementById("categoriaProducto");
const carritoContainer = document.getElementById("carrito-container");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const traeProductos = async () => {
    //promesas asincronicas y fetch para llamar al json con los productos
    const respuesta = await fetch('data.json');
    const data = await respuesta.json();

    data.forEach((producto) => {
        //estructura card HTML
        let contenido = document.createElement("div");
        contenido.className = 'card';
        contenido.innerHTML = `
        <img src="${producto.imagen}">
        <h3>${producto.nombre}</h3>
        <p>${producto.precio}$</p>
        <a href="../pages/descripcion.html" class="verMas" id="verMas${producto.id}">Ver más</a> 
        `;
        contenidoShop.append(contenido)
        
        //objeto que agrega a la card el boton de 'agregar carrito'
        let comprar = document.createElement('button')
        comprar.innerText = 'agregar al carrito';
        comprar.className = 'comprar';

        contenido.append(comprar);

        //evento 'click' para que el boton de agregar al carrito funcione 
        comprar.addEventListener("click", () => {
            const repetir = carrito.some((repetirProducto) => repetirProducto.id === producto.id);

            if (repetir) {
                carrito.map((prod) => {
                    if (prod.id === producto.id) {
                        prod.cantidad++;
                    }
                });
            } else {
                carrito.push({
                    id: producto.id,
                    imagen: producto.imagen,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    cantidad: producto.cantidad,
                });
            }
            contadorCarrito();
            saveLocal();
        });     

    });
};
traeProductos();

//set item
const saveLocal = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// FILTRAR POR CATEGORIA 
for (const categoria of categoriasProductos) {
        // console.log(categoria)
        categoriasShop.innerHTML += `
        <a class="item-categoria" id="categoria-${categoria.id}">${categoria.nombre}</a>`
}