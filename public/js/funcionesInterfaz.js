export function actualizarProductosCarrito(arrayCarrito) {
    var productoCarrito = document.getElementsByClassName('producto-carrito');
    var precioTotalCarrito = document.getElementById('precio-total-carrito');
    var totalCarrito = 0;

    for (let i = 0; i < productoCarrito.length; i++) {
        var nombre =
            productoCarrito[i].lastElementChild.firstElementChild.innerText;
        var prod = arrayCarrito.find((p) => p.nombre == nombre);
        totalCarrito += prod.precioFinal;
        productoCarrito[i].lastElementChild.lastElementChild.innerText =
            '$' + prod.precioFinal;
        productoCarrito[i].lastElementChild.getElementsByClassName(
            'cantidad-producto-carrito'
        )[0].value = prod.cant;
    }
    precioTotalCarrito.innerText = '$' + totalCarrito;
    localStorage.carrito = JSON.stringify(arrayCarrito);
}

export function addProductoACarrito(producto, productosCarrito, arrayCarrito) {
    var div = document.createElement('div');
    var prod = `
  <div id="div" class="producto-carrito">
              <img class="imagen-producto-carrito" src="${producto.img}" />
              <div class="detalles-producto-carrito">
                <span class="titulo-producto-carrito"
                  >${producto.nombre}</span
                >
                <div class="eliminar-cantidad">
                  <span>Cantidad</span>
                  <input
                    type="number"
                    min="1"
                    class="cantidad-producto-carrito"
                    value="1"
                  />
                  <button class="boton-eliminar-carrito">X</button>
                </div>
                <span class="precio-producto-carrito">$${producto.precioFinal}</span>
              </div>
            </div>
  `;
    div.innerHTML = prod;

    var cantidadProducto = div.firstElementChild.getElementsByClassName(
        'cantidad-producto-carrito'
    )[0];

    var botonEliminarDeCarrito = div.getElementsByClassName(
        'boton-eliminar-carrito'
    )[0];

    cantidadProducto.addEventListener('change', (e) => {
        var cant = cantidadProducto.value;
        var prodCarrito =
            arrayCarrito[
                arrayCarrito.findIndex((p) => p.nombre == producto.nombre)
            ];
        prodCarrito.setCantidad(cant);
        prodCarrito.actualizarPrecio();
        actualizarProductosCarrito(arrayCarrito);
        console.log('Camiado valor carrito a ' + cant);
    });

    botonEliminarDeCarrito.addEventListener('click', (e) => {
        var indice = arrayCarrito.findIndex((p) => p.nombre == producto.nombre);
        e.target.parentElement.parentElement.parentElement.remove();
        arrayCarrito.splice(indice, 1);
        actualizarProductosCarrito(arrayCarrito);
    });

    productosCarrito.append(div);
}
