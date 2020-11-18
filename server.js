//Declaro la clase producto
function Producto(nombre, precio, img) {
    this.nombre = nombre;
    this.precio = precio;
    this.img = img;
}
//Declaro el array que contendra los productos
const productos = [];
var carrito = [];

//Meto al array algunos productos iniciales,
//para que la pagina no este vacia cuando reinicie el server
productos.push(new Producto('Intel Core i3 10100', 122, 'i3.png'));
productos.push(new Producto('Intel Core i3 10300', 143, 'i3.png'));
productos.push(new Producto('Intel Core i3 10320', 154, 'i3.png'));

productos.push(new Producto('Intel Core i5 10400F', 182, 'i5.png'));
productos.push(new Producto('Intel Core i5 10400', 192, 'i5.png'));
productos.push(new Producto('Intel Core i5 10600', 213, 'i5.png'));
productos.push(new Producto('Intel Core i5 10600KF', 237, 'i5.png'));
productos.push(new Producto('Intel Core i5 10600K', 262, 'i5.png'));

productos.push(new Producto('Intel Core i7 10700F', 298, 'i7.png'));
productos.push(new Producto('Intel Core i7 10700', 323, 'i7.png'));
productos.push(new Producto('Intel Core i7 10700KF', 349, 'i7.png'));
productos.push(new Producto('Intel Core i7 10700K', 374, 'i7.png'));

productos.push(new Producto('Intel Core i9 10900F', 422, 'i9.png'));
productos.push(new Producto('Intel Core i9 10900', 439, 'i9.png'));
productos.push(new Producto('Intel Core i9 10900KF', 472, 'i9.png'));
productos.push(new Producto('Intel Core i9 10900K', 488, 'i9.png'));

productos.push(new Producto('AMD Ryzen 5 5600X', 299, 'ryzen5.png'));
productos.push(new Producto('AMD Ryzen 7 5800X', 449, 'ryzen7.png'));
productos.push(new Producto('AMD Ryzen 9 5900X', 549, 'ryzen9.png'));
productos.push(new Producto('AMD Ryzen 9 5950X', 799, 'ryzen9.png'));

//Importo los módulos que me hacen falta
const express = require('express');
const bodyParser = require('body-parser');

//Creo una instancia de express llamada app
const app = express();

//Le digo a express que use body-parser
app.use(bodyParser.urlencoded({ extended: true }));
//Le digo a express donde estan mis archivos estaticos (CSS, imagenes, etc)
app.use(express.static('public'));

//Le digo a express que use ejs como motor de vistas
app.set('view engine', 'ejs');

//Cuando se haga una peticion get sobre "/", que es la pagina principal,
//se llama a la funcion callback que tiene dos parametros, req y res, req es la peticion del cliente
//y res es la respuesta que le damos
app.get('/', function (req, res) {
    //Como respuesta, le digo que renderize el archivo "index" situado en la carpeta "views"
    //Y le paso el array de productos para que pueda mostrarlos
    res.render('index', { productos: productos, carrito });
});

app.post('/', (req, res) => {
    var carrito = req.body.carritoVolver;
    carrito = JSON.parse(carrito);
    res.render('index', { productos: productos, carrito });
});

//Cuando se haga una peticion post sobre /realizarPedido,
app.post('/realizarPedido', (req, res) => {
    var carrito = req.body.arrayCarrito;
    var totalCarrito = req.body.precioTotalCarrito;
    carrito = JSON.parse(carrito);
    res.render('realizarPedido', {
        arrCarrito: carrito,
        precioTotalCarrito: totalCarrito
    });
});

//Arranco el server en el puerto 3000,
//o en el puerto correspondiente si la app esta hosteada en algun sitio
//y hago un log para comprobar si esta escuchando
app.listen(process.env.PORT || 3000, function () {
    console.log('server is up');
});
