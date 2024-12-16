document.addEventListener('DOMContentLoaded', () => {
    const btnIngresar = document.getElementById('btnIngresar');
    const btnSalir = document.getElementById('btnSalir');
    
    btnIngresar.style.display = 'block';

    btnIngresar.addEventListener('click', (ingresar) => {
      ingresar.preventDefault();
      btnIngresar.style.display = 'none';
      btnSalir.style.display = 'block';
    });
    btnSalir.addEventListener('click', (salir) => {
      salir.preventDefault();
      btnIngresar.style.display = 'block';
      btnSalir.style.display = 'none';
    });
  });