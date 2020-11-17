var productos = document.getElementById("productos").innerText;
productos = JSON.parse(productos);

var botonMiCarrito = document.getElementsByClassName(
  "boton-mostrar-carrito"
)[0];

var carrito = document.getElementsByClassName("carrito")[0];

var botonEliminarDeCarrito = document.getElementsByClassName(
  "boton-eliminar-carrito"
);

var cantidadProductoCarrito = document.getElementsByClassName(
  "boton-eliminar-carrito"
);

var botonAniadirCarrito = document.getElementsByClassName(
  "boton-eliminar-carrito"
);

botonMiCarrito.addEventListener("click", () => {
  carrito.classList.toggle("carrito-escondido");
});

botonEliminarDeCarrito.forEach((element) => {
  console.log(element);
});
