//Funcionalidades
const modalContenedor = document.querySelector(".modal-contenedor");
const abrirCarrito = document.getElementById("cesta-carrito");
const cerrarCarrito = document.getElementById("btn-cerrar-carrito");
const modalCarrito = document.querySelector(".modal-carrito");

//Abrir el modals
abrirCarrito.addEventListener("click", () => {
  modalContenedor.classList.toggle("modal-active");
});

//Cerrar el modals
cerrarCarrito.addEventListener("click", () => {
  modalContenedor.classList.toggle("modal-active");
});

modalContenedor.addEventListener("click", () => {
  cerrarCarrito.click();
});

//Función para eliminar los productos del carrito
modalCarrito.addEventListener("click", (e) => {
  //Evita la propagación del evento de los elementos hijos a los padres
  e.stopPropagation();
  if (e.target.classList.contains("boton-eliminar")) {
    eliminarProductosCarrito(e.target.value);
  }
});

//Función para vaciar el carrito
modalCarrito.addEventListener("click", (e) => {
  e.stopPropagation();
  if (e.target.classList.contains("btn-vaciar")) {
    if (carrito.length != 0) {
      Swal.fire({
        icon: "warning",
        title:
          "¿Estás seguro de que quieres eliminar todos los productos del carrito?",
        text: "Va a vaciar el carrito de compras!",
        showCancelButton: true,
        cancerlButtonColor: "#d33",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          vaciarCarrito();
          Swal.fire(
            "Eliminado!",
            "El producto ha sido eliminado con éxito.",
            "success"
          );
        }
      });
    } else {
      Swal.fire("El carrito ya se encuentra vacío!");
    }
  }
});
