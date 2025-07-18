import Swal from 'sweetalert2'

export function Mensaje(titulo, text, icon, textoBoton) {
    Swal.fire({
        title: titulo,
        text: text,
        icon: icon,
        confirmButtonText: textoBoton
      })
}