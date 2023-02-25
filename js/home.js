//Pintamos los productos
const pintarProductos = (data) => {
  const contenedor = document.getElementById("producto-contenedor");

  data.forEach((producto) => {
    //Estructura
    const div = document.createElement("div");
    div.classList.add("card");
    //Card Body + Título + Imagen + Precio+ Botón
    div.innerHTML += `<div class="card-image">
                          <img src=${producto.imagen}>
                          <span class="card-title">${producto.nombre}</span>
                          <a class="btn-floating halfway-fab wabes-effect waves-light green"><i id=${producto.id} class="material-icons agregar">add_shopping_cart</i></a>
                        </div>
                        <div class="card-content">
                            <p>${producto.desc}</p>
                            <p class="text-color">${producto.precio}</p>
                        </div>
                       `;
    contenedor.appendChild(div);
  });
};
