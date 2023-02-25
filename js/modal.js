const modalContenedor = document.querySelector(".modal-contenedor");
const abrirCarrito = document.getElementById("cesta-carrito");
const cerrarCarrito = document.getElementById("btn-cerrar-carrito");
const modalCarrito = document.querySelector(".modal-carrito");

abrirCarrito.addEventListener("click", () => {
  modalContenedor.classList.toggle("modal-active");
});

cerrarCarrito.addEventListener("click", () => {
  modalContenedor.classList.toggle("modal-active");
});

modalContenedor.addEventListener("click", () => {
  cerrarCarrito.click();
});

modalCarrito.addEventListener("click", (e) => {
  e.stopPropagation();
  if (e.target.classList.contains("boton-eliminar")) {
    eliminarProductosCarrito(e.target.value);
  }
});

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
          vaciarCarito();
          Swal.fire(
            "Eliminado!",
            "El producto ha sido eliminado con éxito.",
            "success"
          );
        }
      });
    }
  }
});
