let carrito = [];

const productoContenedor = document.getElementById("producto-contenedor");

productoContenedor.addEventListener("click", (e) => {
  if (e.target.classList.contains("agregar")) {
    validarProductoRepetido(e.target.id);
  }
});

const validarProductoRepetido = (productoId) => {
  const productoRepetido = carrito.find(
    (producto) => producto.id == productoId
  );

  if (localStorage.getItem("carrito")) {
    carrito = obtenerCarritoStorage();
  }

  if (!productoRepetido) {
    const producto = productos.find((producto) => producto.id == productoId);
    carrito.push(producto);
    pintarProductoCarrito(producto);
    actualizarTotalesCarrito(carrito);
  } else {
    productoRepetido.cantidad++;
    const cantidadProducto = document.getElementById(
      `cantidad${productoRepetido.id}`
    );
    cantidadProducto.innerText = `Cantidad: ${productoRepetido.cantidad}`;
    actualizarTotalesCarrito(carrito);
  }
};

const pintarProductoCarrito = (producto) => {
  const contenedor = document.getElementById("carrito-contenedor");
  const div = document.createElement("div");
  div.classList.add("productoEnCarrito");
  div.innerHTML = `
        <p>${producto.nombre}</p>
        <p>Precio: ${producto.precio}</p>
        <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
        <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
    `;
  contenedor.appendChild(div);
};

const actualizarTotalesCarrito = (carrito) => {
  const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const totalCompra = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  pintarTotalesCarrito(totalCantidad, totalCompra);
  guardarCarritoStorage(carrito);
};

const pintarTotalesCarrito = (totalCantidad, totalCompra) => {
  const contadorCarrito = document.getElementById("contador-carrito");
  const precioTotal = document.getElementById("precioTotal");

  contadorCarrito.innerText = totalCantidad;
  precioTotal.innerText = totalCompra;
};

const pintarCarrito = (carrito) => {
  const contenedor = document.getElementById("carrito-contenedor");

  contenedor.innerHTML = "";

  carrito.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("productoEnCarrito");
    div.innerHTML = `
            <p>${producto.nombre}</p>
            <p>Precio: ${producto.precio}</p>
            <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
            <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
        `;
    contenedor.appendChild(div);
  });
};

const eliminarProductosCarrito = (productoId) => {
  const productoIndex = carrito.findIndex(
    (producto) => producto.id == productoId
  );
  carrito.splice(productoIndex, 1);
  pintarCarrito(carrito);
  actualizarTotalesCarrito(carrito);
};

const guardarCarritoStorage = (carrito) => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const obtenerCarritoStorage = () => {
  const carritoStorage = JSON.parse(localStorage.getItem("carrito"));
  return carritoStorage;
};

const cargarCarrito = () => {
  if (localStorage.getItem("carrito")) {
    carrito = obtenerCarritoStorage();
    pintarCarrito(carrito);
    actualizarTotalesCarrito(carrito);
  }
};

cargarCarrito();

const btn0 = document.querySelector("#cesta-carrito ");
btn0.addEventListener("click", () => {
  Swal.fire("Bienvenido a su carrito de compras!");
});

const btn1 = document.querySelector("#producto-contenedor");
btn1.addEventListener("click", () => {
  Swal.fire({
    icon: "success",
    title: "Producto agregado!",
    text: "Su producto ha sido agregado al carrito con éxito.",
    showConfirm: false,
    timer: 2000,
  });
});

const btn2 = document.querySelector("#btn-cerrar-carrito");
btn2.addEventListener("click", () => {
  Swal.fire("Se ha cerrado el carrito!");
});

const btn3 = document.querySelector("#carrito-contenedor");
btn3.addEventListener("click", () => {
  Swal.fire({
    icon: "warning",
    title: "¿Estás seguro de que quieres eliminar el producto?",
    text: "Se eliminara el producto del carrito.",
    showCancelButton: true,
    cancerlButtonColor: "#d33",
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        "Eliminado!",
        "El producto ha sido eliminado con éxito.",
        "success"
      );
    }
  });
});
