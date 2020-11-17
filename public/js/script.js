carrito = $(".carrito");
productosCarrito = $(".productos-carrito");
botonAbrirCarrito = $(".boton-mostrar-carrito");
botonAddCarrito = $(".boton-add-carrito");
botonEliminarCarrito = $(".boton-eliminar-carrito");
listaCarrito = [];

botonAbrirCarrito.click((e) => {
  e.preventDefault();
  carrito.toggleClass("carrito-escondido");
});

botonAddCarrito.click((e) => {
  carrito.removeClass("carrito-escondido");

  var carta = e.target.parentElement.parentElement.children;

  var img = carta[0].getAttribute("src");
  var nombre = carta[1].innerText;
  var precio = carta[2].children[0].innerText;

  var precio = precio.replace("$", "");
  repetido = false;
  listaCarrito.forEach((element) => {
    if (element.nombre == nombre) {
      repetido = true;
    }
  });
  if (!repetido) {
    listaCarrito.push({ nombre: nombre, precio: precio, cantidad: 1 });
    addItemToCarrito(img, nombre, (cantidad = 1), precio);
  } else {
    actualizarCantidad(nombre);
  }
});

botonEliminarCarrito.click((e) => {
  console.log(e.target);
});

function addItemToCarrito(img, nombre, cantidad, precio) {
  var prod = document.createElement("div");
  prod.classList.add("producto-carrito");
  var contenidoProd = `
    
      <img class="imagen-producto-carrito" src="${img}" />
      <div class="detalles-producto-carrito">
        <span class="titulo-producto-carrito" value="${nombre}">${nombre}</span>
        <div class="eliminar-cantidad">
          <span>Cantidad</span>
          <input
            type="number"
            class="cantidad-producto-carrito"
            value="${cantidad}"
          />
          <button class="boton-eliminar-carrito">X</button>
        </div>
        <span class="precio-producto-carrito">$${precio}</span>
      </div>
    `;
  prod.innerHTML = contenidoProd;
  prod
    .getElementsByClassName("boton-eliminar-carrito")[0]
    .addEventListener("click", (e) => {
      e.target.parentElement.parentElement.parentElement.parentElement.remove();
    });
  prod
    .getElementsByClassName("cantidad-producto-carrito")[0]
    .addEventListener("change", (e) => {
      listaCarrito.forEach((producto) => {
        if (producto.nombre == nombre) {
          producto.cantidad = parseInt(e.target.value);
        }
      });

      actualizarTotal();
    });
  productosCarrito.append(prod);
  actualizarTotal();
}
function actualizarCantidad(nombre) {
  var cantActual = parseInt(
    $(
      ".titulo-producto-carrito[value='" +
        nombre +
        "'] ~.eliminar-cantidad input"
    ).val()
  );
  console.log(cantActual);
  var cant = cantActual + 1;
  console.log(cant);
  $(
    ".titulo-producto-carrito[value='" + nombre + "'] ~.eliminar-cantidad input"
  ).val(cant);
  listaCarrito.forEach((prod) => {
    if (prod.nombre == nombre) {
      prod.cantidad = cant;
    }
  });
  actualizarTotal();
}
function actualizarTotal() {
  var suma = 0;
  listaCarrito.forEach((producto) => {
    suma += parseInt(producto.precio * producto.cantidad);
  });
  document.getElementById("precio-total-carrito").innerText = suma;
}
