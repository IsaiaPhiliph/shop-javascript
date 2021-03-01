export function validar() {
    let form = document.contacto;
    let valido = true;

    if (!/(^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{3,16})+$/.test(form.nombre.value)) {
        form.nombre.style.border = '2px solid red';
        valido = false;
    }
    if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email.value)
    ) {
        form.email.style.border = '2px solid red';
        valido = false;
    }
    if (
        !/^\(?([\d]{3})\)?[-.]?([\d]{3})[-.]?([\d]{3})$/.test(
            form.telefono.value
        )
    ) {
        form.telefono.style.border = '2px solid red';
        valido = false;
    }
    if (valido) {
        document.getElementById('contacto').submit();
    }
}
