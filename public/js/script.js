var productos = document.getElementById('arrayProductos').innerText;
var carro = document.getElementById('arrayCarro');
carro = JSON.parse(carro.innerText);
productos = JSON.parse(productos);
//Declaro la clase producto
class ProductoCarrito {
    constructor(nombre, precio, img, cant = 1) {
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cant = cant;
        this.precioFinal = this.precio * this.cant;
    }
    aumentarCantidad() {
        this.cant++;
    }
    actualizarPrecio() {
        this.precioFinal = this.precio * this.cant;
    }
    setCantidad(c) {
        this.cant = c;
    }
}
var arrayCarrito = [];

var botonMiCarrito = document.getElementsByClassName(
    'boton-mostrar-carrito'
)[0];

var carrito = document.getElementsByClassName('carrito')[0];

var productosCarrito = document.getElementsByClassName('productos-carrito')[0];

var botonEliminarDeCarrito = document.getElementsByClassName(
    'boton-eliminar-carrito'
);

var cantidadProductoCarrito = document.getElementsByClassName(
    'cantidad-producto-carrito'
);

var botonAniadirCarrito = document.getElementsByClassName('boton-add-carrito');

var inputArrayCarrito = document.getElementById('input-array-carrito');
var inputPrecioTotal = document.getElementById('precioTotalCarrito');

botonMiCarrito.addEventListener('click', () => {
    carrito.classList.toggle('carrito-escondido');
});

if (carro.length > 0) {
    carro.forEach((p) => {
        var obj = new ProductoCarrito(p.nombre, p.precio, p.img, p.cant);
        arrayCarrito.push(obj);
        addProductoACarrito(obj);
        actualizarProductosCarrito();
        carrito.classList.remove('carrito-escondido');
    });
}

for (let i = 0; i < botonAniadirCarrito.length; i++) {
    botonAniadirCarrito[i].addEventListener('click', (e) => {
        var producto = e.target.parentElement.parentElement;
        var nombre = producto.children[1].innerText;
        var precio = producto.children[2].firstElementChild.innerText;
        precio = parseInt(precio.replace('$', ''));
        var img = producto.children[0].getAttribute('src');

        if (arrayCarrito.some((producto) => producto.nombre == nombre)) {
            arrayCarrito[
                arrayCarrito.findIndex((p) => p.nombre == nombre)
            ].aumentarCantidad();
            arrayCarrito[
                arrayCarrito.findIndex((p) => p.nombre == nombre)
            ].actualizarPrecio();
            actualizarProductosCarrito();
        } else {
            pCarrito = new ProductoCarrito(nombre, precio, img);
            arrayCarrito.push(pCarrito);
            addProductoACarrito(pCarrito);
            actualizarProductosCarrito();
            carrito.classList.remove('carrito-escondido');
        }
    });
}

function actualizarProductosCarrito() {
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
    inputArrayCarrito.setAttribute('value', JSON.stringify(arrayCarrito));
    inputPrecioTotal.setAttribute('value', totalCarrito);
}

function addProductoACarrito(producto) {
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

    botonEliminarDeCarrito = div.getElementsByClassName(
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
        actualizarProductosCarrito();
        console.log('Camiado valor carrito a ' + cant);
    });

    botonEliminarDeCarrito.addEventListener('click', (e) => {
        var indice = arrayCarrito.findIndex((p) => p.nombre == producto.nombre);
        e.target.parentElement.parentElement.parentElement.remove();
        arrayCarrito.splice(indice, 1);
        actualizarProductosCarrito();
    });

    productosCarrito.append(div);
}

// function actualizar
