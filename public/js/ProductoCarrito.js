export class ProductoCarrito {
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
