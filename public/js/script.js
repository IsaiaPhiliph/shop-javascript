import { ProductoCarrito } from './ProductoCarrito.js';
import { validar } from './validacion.js';
import {
    contadorVisitas,
    botonMiCarrito,
    carrito,
    productosCarrito,
    cantidadProductoCarrito,
    botonAniadirCarrito,
    barraBusqueda,
    botonCerrarCarritoHeader,
    formularioContacto,
    inputArrayCarrito,
    inputPrecioTotal,
    botonRealizarPedido,
    precioBitcoin,
    productos
} from './dom.js';
import {
    actualizarProductosCarrito,
    addProductoACarrito
} from './funcionesInterfaz.js';
import { precios } from './api.js';
var arrayCarrito = [];
var visitas = 1;

if (localStorage.visitas) {
    visitas = parseInt(localStorage.visitas);
    visitas++;
    localStorage.visitas = visitas;
    contadorVisitas.innerText = visitas;
} else {
    contadorVisitas.innerText = visitas;
    localStorage.visitas = visitas;
    alert(
        'El la primera vez que visitas el sitio, disfruta y no te gastes todo tu dinero...'
    );
}

if (localStorage.carrito) {
    let carritoStorage = localStorage.carrito;
    carritoStorage = JSON.parse(carritoStorage);
    carritoStorage.forEach((p) => {
        let obj = new ProductoCarrito(p.nombre, p.precio, p.img, p.cant);
        arrayCarrito.push(obj);
        addProductoACarrito(obj, productosCarrito, arrayCarrito);
        actualizarProductosCarrito(arrayCarrito);
        carrito.classList.remove('carrito-escondido');
    });
} else {
    arrayCarrito = [];
}

precios.then((response) => {
    addPrecioBitcoin(response.data);
});

function addPrecioBitcoin(objeto) {
    precioBitcoin.innerText = objeto.EUR + ' EUR | ' + objeto.USD + ' $';
}

barraBusqueda.addEventListener('keyup', (e) => {
    let valorBusqueda = e.target.value.replaceAll(' ', '').toLowerCase();
    productos.forEach((element) => {
        var titulo = element
            .querySelector('.titulo-producto')
            .innerText.replaceAll(' ', '')
            .toLowerCase();
        if (titulo.includes(valorBusqueda)) {
            element.classList.remove('escondido');
        } else {
            element.classList.add('escondido');
        }
    });
});
botonRealizarPedido.addEventListener('click', (e) => {
    e.preventDefault();
});
botonMiCarrito.addEventListener('click', () => {
    carrito.classList.toggle('carrito-escondido');
});
botonCerrarCarritoHeader.addEventListener('click', () => {
    carrito.classList.add('carrito-escondido');
});

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
            actualizarProductosCarrito(arrayCarrito);
        } else {
            let pCarrito = new ProductoCarrito(nombre, precio, img);
            arrayCarrito.push(pCarrito);
            addProductoACarrito(pCarrito, productosCarrito, arrayCarrito);
            actualizarProductosCarrito(arrayCarrito);
            carrito.classList.remove('carrito-escondido');
        }
    });
}

formularioContacto.addEventListener('submit', (e) => {
    e.preventDefault();
    validar();
});
