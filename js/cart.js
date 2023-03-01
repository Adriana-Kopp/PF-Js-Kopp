//Array para mi carrito de compras
let carrito = [];

const productoContenedor = document.getElementById("producto-contenedor");

//Nos permite saber sobre cual elemento el usuario hizo "click"
productoContenedor.addEventListener("click", (e) => {
  if (e.target.classList.contains("agregar")) {
    validarProductoRepetido(e.target.id);
  }
});

//Validamos la cantidad del producto agregado
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
    //Producto repetido si es que lo hay
  } else {
    productoRepetido.cantidad++;
    const cantidadProducto = document.getElementById(
      `cantidad${productoRepetido.id}`
    );
    cantidadProducto.innerText = `Cantidad: ${productoRepetido.cantidad}`;
    actualizarTotalesCarrito(carrito);
  }
};

//Pintamos el carrito con JavaScript
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
  //Agregamos el elemento al DOM
  contenedor.appendChild(div);
};

//Total del carrito actualizado
const actualizarTotalesCarrito = (carrito) => {
  //Contador de la cantidad de productos en el carrito
  const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  //Contador del total de la compra
  const totalCompra = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  pintarTotalesCarrito(totalCantidad, totalCompra);
  guardarCarritoStorage(carrito);
};

//Total del carrito (Precio total)
const pintarTotalesCarrito = (totalCantidad, totalCompra) => {
  const contadorCarrito = document.getElementById("contador-carrito");
  const precioTotal = document.getElementById("precioTotal");

  contadorCarrito.innerText = totalCantidad;
  precioTotal.innerText = totalCompra;
};

//Del carrito actualizado necesitamos pintarlo otra vez en el carrito
const pintarCarrito = (carrito) => {
  const contenedor = document.getElementById("carrito-contenedor");

  //Vaciamos el carrito
  contenedor.innerHTML = "";

  //Pintamos el carrito otra vez
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

//Eliminamos elementos del carrito mediante su ID
const eliminarProductosCarrito = (productoId) => {
  const productoIndex = carrito.findIndex(
    (producto) => producto.id == productoId
  );
  carrito.splice(productoIndex, 1);
  pintarCarrito(carrito);
  //Actualizamos el precio y la cantidad
  actualizarTotalesCarrito(carrito);
};

//Vaciamos el carrito
const vaciarCarrito = () => {
  carrito = [];
  //Limpiamos el storage
  localStorage.clear("carrito");

  pintarCarrito(carrito);
  actualizarTotalesCarrito(carrito);
};

//Almacenamos dentro del Storage
const guardarCarritoStorage = (carrito) => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

//Obtenemos el storage del carrito
const obtenerCarritoStorage = () => {
  const carritoStorage = JSON.parse(localStorage.getItem("carrito"));
  return carritoStorage;
};

//Cargamos el carrito
const cargarCarrito = () => {
  if (localStorage.getItem("carrito")) {
    carrito = obtenerCarritoStorage();
    pintarCarrito(carrito);
    actualizarTotalesCarrito(carrito);
  }
};

cargarCarrito();

//Alertas de SweetAlert2

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
