
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App.jsx';

describe('Componentes React - Pastelería Mil Sabores', () => {
  let contenedor;
  let raiz;

  beforeEach(() => {
    globalThis.IS_REACT_ACT_ENVIRONMENT = true;
    localStorage.removeItem('productosMilSaboresReact');
    localStorage.removeItem('carritoMilSabores');

    contenedor = document.createElement('div');
    document.body.appendChild(contenedor);
    raiz = createRoot(contenedor);
  });

  afterEach(async () => {
    await act(async () => {
      raiz.unmount();
    });
    contenedor.remove();
  });

  async function mostrarPagina(ruta = '/productos') {
    await act(async () => {
      raiz.render(
        React.createElement(
          MemoryRouter,
          { initialEntries: [ruta] },
          React.createElement(App)
        )
      );
    });
  }

  it('muestra los 16 productos del catálogo', async () => {
    await mostrarPagina();
    const tarjetas = contenedor.querySelectorAll('.tarjeta-react');
    expect(tarjetas.length).toBe(16);
  });

  it('filtra los productos al seleccionar una categoría', async () => {
    await mostrarPagina();
    const botones = [...contenedor.querySelectorAll('.filtros button')];
    const boton = botones.find(b => b.textContent === 'Tortas Cuadradas');

    expect(boton).toBeTruthy();

    await act(async () => {
      boton.click();
    });

    const tarjetas = contenedor.querySelectorAll('.tarjeta-react');
    expect(tarjetas.length).toBe(2);
  });

  it('muestra los datos del producto seleccionado', async () => {
    await mostrarPagina('/productos/TC001');
    const contenido = contenedor.textContent;
    expect(contenido).toContain('Torta Cuadrada de Chocolate');
    expect(contenido).toContain('TC001');
  });

  it('agrega un producto al presionar el botón', async () => {
    await mostrarPagina();
    spyOn(window, 'alert');

    const botones = [...contenedor.querySelectorAll('.tarjeta-react button')];
    const boton = botones.find(b => b.textContent.includes('Añadir al carrito'));

    expect(boton).toBeTruthy();

    await act(async () => {
      boton.click();
    });

    const carrito = JSON.parse(localStorage.getItem('carritoMilSabores') || '[]');

    expect(carrito.length).toBe(1);
    expect(carrito[0].codigo).toBe('TC001');
    expect(window.alert).toHaveBeenCalled();
  });

  it('muestra un aviso cuando el carrito está vacío', async () => {
    await mostrarPagina('/checkout');
    expect(contenedor.textContent).toContain('Tu carrito está vacío');
  });

  it('muestra el total de los productos en checkout', async () => {
    localStorage.setItem('carritoMilSabores', JSON.stringify([
      { codigo: 'TEST001', nombre: 'Torta de prueba', precio: 12000, cantidad: 2 }
    ]));

    await mostrarPagina('/checkout');

    expect(contenedor.textContent).toContain('$24.000');
    expect(contenedor.querySelector('input[name="correo"]')).not.toBeNull();
  });

  it('muestra los productos en administración', async () => {
    await mostrarPagina('/admin');

    expect(contenedor.textContent).toContain('Panel de administración');
    expect(contenedor.textContent).toContain('Torta Cuadrada de Chocolate');
  });

  it('elimina un producto desde administración', async () => {
    const producto = {
      codigo: 'TEST001',
      nombre: 'Torta de prueba',
      categoria: 'Tortas Especiales',
      precio: 12000,
      descripcion: 'Producto para pruebas',
      imagen: 'images/imagestortachocolate.jpg'
    };

    localStorage.setItem('productosMilSaboresReact', JSON.stringify([producto]));
    spyOn(window, 'confirm').and.returnValue(true);

    await mostrarPagina('/admin');

    const botones = [...contenedor.querySelectorAll('button')];
    const boton = botones.find(b => b.textContent.trim() === 'Eliminar');

    expect(boton).toBeTruthy();

    await act(async () => {
      boton.click();
    });

    const productos = JSON.parse(localStorage.getItem('productosMilSaboresReact'));

    expect(productos.length).toBe(0);
    expect(window.confirm).toHaveBeenCalled();
  });

  
  it('aumenta la cantidad de productos del carrito', async () => {
    localStorage.setItem('carritoMilSabores', JSON.stringify([
      { codigo: 'TC001', nombre: 'Torta de Chocolate', precio: 15000, cantidad: 1 }
    ]));

    await mostrarPagina('/carrito');

    const botones = [...contenedor.querySelectorAll('button')];
    const boton = botones.find(b => b.textContent.trim() === '+');

    expect(boton).toBeTruthy();

    await act(async () => {
      boton.click();
    });

    const carrito = JSON.parse(localStorage.getItem('carritoMilSabores'));

    expect(carrito[0].cantidad).toBe(2);
    expect(contenedor.textContent).toContain('$30.000');
  });

  it('elimina un producto del carrito', async () => {
    localStorage.setItem('carritoMilSabores', JSON.stringify([
      { codigo: 'TC001', nombre: 'Torta de Chocolate', precio: 15000, cantidad: 1 }
    ]));

    await mostrarPagina('/carrito');

    const botones = [...contenedor.querySelectorAll('button')];
    const boton = botones.find(b => b.textContent.trim() === 'Eliminar');

    expect(boton).toBeTruthy();

    await act(async () => {
      boton.click();
    });

    const carrito = JSON.parse(localStorage.getItem('carritoMilSabores'));

    expect(carrito.length).toBe(0);
    expect(contenedor.textContent).toContain('Tu carrito está vacío');
  });

});
