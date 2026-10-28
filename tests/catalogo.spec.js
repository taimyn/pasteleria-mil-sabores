import { listaProductos } from '../src/productos.js';
import { obtenerCategorias, filtrarProductos, calcularPrecioOferta, obtenerOfertas, buscarProducto } from '../src/catalogo-utils.js';

describe('Catálogo de productos - parte individual', () => {
  it('carga los productos originales', () => {
    expect(listaProductos.length).toBeGreaterThan(0);
    expect(listaProductos[0].codigo).toBe('TC001');
  });
  it('muestra todas las categorías sin repetir', () => {
    const categorias = obtenerCategorias(listaProductos);
    expect(categorias[0]).toBe('Todos');
    expect(categorias.filter(c => c === 'Tortas Cuadradas').length).toBe(1);
  });
  it('filtra productos por categoría', () => {
    const resultado = filtrarProductos(listaProductos, 'Productos Sin Gluten');
    expect(resultado.length).toBeGreaterThan(0);
    expect(resultado.every(p => p.categoria === 'Productos Sin Gluten')).toBeTrue();
  });
  it('busca productos sin distinguir mayúsculas y minúsculas', () => {
    const resultado = filtrarProductos(listaProductos, 'Todos', 'tIRAMISÚ');
    expect(resultado.some(p => p.codigo === 'PI002')).toBeTrue();
  });
  it('combina filtro de categoría y buscador', () => {
    const resultado = filtrarProductos(listaProductos, 'Tortas Cuadradas', 'frutas');
    expect(resultado.length).toBe(1);
    expect(resultado[0].codigo).toBe('TC002');
  });
  it('devuelve lista vacía cuando no hay coincidencias', () => {
    expect(filtrarProductos(listaProductos, 'Todos', 'zzzz-no-existe')).toEqual([]);
  });
  it('calcula descuentos correctamente', () => {
    expect(calcularPrecioOferta(45000, 15)).toBe(38250);
    expect(calcularPrecioOferta(5500, 20)).toBe(4400);
  });
  it('rechaza descuentos inválidos', () => {
    expect(() => calcularPrecioOferta(5000, 110)).toThrow();
  });
  it('solo presenta productos con ofertas configuradas', () => {
    const ofertas = obtenerOfertas(listaProductos);
    expect(ofertas.length).toBe(4);
    expect(ofertas.some(p => p.codigo === 'TC001')).toBeTrue();
  });
  it('busca el detalle por código y maneja códigos inexistentes', () => {
    expect(buscarProducto(listaProductos, 'TC001').nombre).toBe('Torta Cuadrada de Chocolate');
    expect(buscarProducto(listaProductos, 'NO-EXISTE')).toBeUndefined();
  });
});
