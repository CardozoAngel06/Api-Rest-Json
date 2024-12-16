fetch('../data/datos.json')
  .then(respuesta => respuesta.json())
  .then(datos => mostrarProductos(datos.productos));

const mostrarProductos = (datos) => {
  let productos = "";
  const contenedor = document.querySelector('#contenedor');
  
  productos += `<div class="row justify-content-center g-4">`; 

  datos.forEach(dato => {
    productos += `
      <div class="card border border-1 border-dark d-flex flex-column align-items-center"
            style="width: 100%; max-width: 300px; margin: 30px;">
        <img src="${dato.imagen}" class="card-img-top" alt="Imagen de ${dato.titulo}">
        <div class="card-body">
          <h4 class="text-center">${dato.titulo}</h4>
          <p class="card-text text-center">${dato.descripcion}</p>
        </div>
        <div class="d-flex justify-content-between align-items-center w-100 mb-3 px-3">
          <p class="card-text p-2 mb-0 fs-4">
            <strong>$${dato.precio}</strong>
          </p>
          <button class="btn btn-success ms-auto">
            Comprar
          </button>
        </div>
      </div>
    `;
  });

  productos += `</div>`;
  contenedor.innerHTML = productos;
};

