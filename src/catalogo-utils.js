// Funciones reutilizables para el catálogo de la parte individual.
export const descuentos = { TC001: 15, PI002: 20, PI001: 10, TE001: 10 };
export function obtenerCategorias(productos) {
  return ['Todos', ...new Set(productos.map(p => p.categoria))];
}
export function filtrarProductos(productos, categoria = 'Todos', busqueda = '') {
  const texto = busqueda.trim().toLocaleLowerCase('es');
  return productos.filter(p =>
    (categoria === 'Todos' || p.categoria === categoria) &&
    p.nombre.toLocaleLowerCase('es').includes(texto)
  );
}
export function calcularPrecioOferta(precio, porcentaje) {
  if (precio < 0 || porcentaje < 0 || porcentaje > 100) throw new Error('Precio o descuento inválido');
  return Math.round(precio * (100 - porcentaje) / 100);
}
export function obtenerOfertas(productos) {
  return productos.filter(p => descuentos[p.codigo] > 0);
}
export function buscarProducto(productos, codigo) {
  return productos.find(p => p.codigo === codigo);
}
