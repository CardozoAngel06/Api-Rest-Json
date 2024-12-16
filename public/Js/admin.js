const endpoint = 'productos';
let prodRecibidos = [];  // Hacerlo global para poder acceder a los productos en cualquier parte del código

// Obtener los productos del servidor
fetch(endpoint)
  .then(respuesta => respuesta.json())
  .then(datos => {
    prodRecibidos = datos;  // Guardar los productos globalmente
    mostrarProductos(datos); // Mostrar los productos al cargar
  });

// Función para mostrar los productos
const mostrarProductos = (prodRecibidos) => {
  try {
    let productos = `<div class="row g-4 justify-content-center">`;

    prodRecibidos.forEach((dato) => {
      productos += `
        <div class="card border border-1 border-dark d-flex flex-column align-items-center"
             style="width: 100%; max-width: 300px; margin:30px;">
          <img src="${dato.imagen}" class="card-img-top" alt="${dato.titulo}" 
               style="width: 100%; max-height: 200px; object-fit: contain;">
          <div class="card-body">
            <h4 class="text-center">${dato.titulo}</h4>
            <p class="card-text text-center">${dato.descripcion}</p>
          </div>
          <div class="d-flex justify-content-between align-items-center w-100 mb-2 px-2 fs-5">
            <p class="card-text p-2 mb-0"><strong>$${dato.precio}</strong></p>
            <div class="d-flex ms-auto">
              <a class="btn btn-outline-primary me-2" onClick="editar(${dato.id})">
                <i class="bi bi-pencil"></i>
              </a>
              <a class="btn btn-outline-danger" onClick="eliminar(${dato.id})">
                <i class="bi bi-trash"></i>
              </a>
            </div>
          </div>
        </div>`;
    });

    productos += `</div>`;
    const contenedor = document.querySelector("#contenedor");
    contenedor.className = "d-flex flex-wrap justify-content-center align-items-center min-vh-100";
    contenedor.innerHTML = productos;

  } catch (error) {
    mostrarMensaje("Error al cargar productos");
    console.error(error);
  }
};

// Función para mostrar mensajes de éxito o error
const mostrarMensaje = (mensaje) => {
  document.querySelector('#mensajeBack').innerHTML = mensaje;
};

// Función para añadir un nuevo producto
const añadir = () => {
  document.querySelector("#nuevoProd").style.display = 'block';
  const formulario = document.forms['formCrear'];

  formulario.addEventListener('submit', (event) => {
    event.preventDefault();

    let titulo = formulario.titulo.value;
    let descripcion = formulario.desc.value;
    let precio = formulario.precio.value;
    let imagen = "imagenes/" + formulario.titulo.value + ".jpg";

    let newDatos = { imagen: imagen, titulo: titulo, descripcion: descripcion, precio: precio };

    if (!newDatos.titulo || !newDatos.descripcion || !newDatos.precio) {
      document.querySelector('#mensaje').innerHTML = 'Complete todos los campos';
      return;
    }
    document.querySelector('#mensaje').innerHTML = '';

    let nuevosDatosJson = JSON.stringify(newDatos);

    const enviarNewProducto = async () => {
      try {
        const enviarDatos = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: nuevosDatosJson
        });
        const respuesta = await enviarDatos.json();
        console.log(respuesta);
        document.querySelector('#formCrear').style.display = 'none';
        mostrarMensaje(respuesta.mensaje);
        setTimeout(() => { location.reload(); }, 1000);
      } catch (error) {
        console.log(error);
      }
    };
    enviarNewProducto();
  });
};

// Función para eliminar un producto
const eliminar = (id) => {
  if (confirm('¿Seguro que desea eliminar el producto?')) {
    const eliminarProd = async () => {
      try {
        const res = await fetch(endpoint + '/' + id, {
          method: 'DELETE'
        });
        const respuesta = await res.json();
        mostrarMensaje(respuesta.mensaje);
      } catch {
        mostrarMensaje('Error al eliminar producto :(');
      }
      setTimeout(() => { location.reload(); }, 1000);
    };
    eliminarProd();
  }
};

// Función para editar un producto
const editar = (id) => {
  console.log(id)
  document.querySelector("#editar").style.display = 'block';
  const formEditar = document.forms['form-editar'];
  formEditar.scrollIntoView({ behavior: "smooth", block: "start" });

  // Buscar el producto a editar en la lista de productos cargados
  const prodEditar = prodRecibidos.find(prod => prod.id === id);

  if (prodEditar) {
    formEditar.id.value = prodEditar.id;
    formEditar.titulo.value = prodEditar.titulo;
    formEditar.desc.value = prodEditar.descripcion;
    formEditar.precio.value = prodEditar.precio;
  }

  // Enviar los datos editados al servidor
  formEditar.addEventListener('submit', (event) => {
    event.preventDefault();
    const nuevosDatos = {
      id: formEditar.id.value,
      titulo: formEditar.titulo.value,
      descripcion: formEditar.desc.value,
      precio: formEditar.precio.value
    };

    if (!nuevosDatos.titulo || !nuevosDatos.descripcion || !nuevosDatos.precio) {
      document.querySelector('#mensajeEditar').innerHTML = 'Complete todos los campos';
      return;
    }
    document.querySelector('#mensajeEditar').innerHTML = '';

    let nuevosDatosJson = JSON.stringify(nuevosDatos);

    const enviarNuevosDatos = async () => {
      try {
        const enviarDatos = await fetch(`${endpoint}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: nuevosDatosJson
        });
        const respuesta = await enviarDatos.json();
        mostrarMensaje(respuesta.mensaje);
      } catch (error) {
        mostrarMensaje('Error al modificar datos');
      }
      setTimeout(() => { location.reload(); }, 1000);
    };
    enviarNuevosDatos();
  });
};
const cerrarFormulario = (id) => {
  document.getElementById(id).style.display = "none";
};
