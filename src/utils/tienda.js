// Funciones de apoyo para Pastelería Mil Sabores

export function calcularPrecioOferta(precio, descuento) {
  return Math.round(precio * (1 - descuento / 100));
}

export function calcularTotal(carrito) {
  return carrito.reduce(
    (total, producto) =>
      total + producto.precio * producto.cantidad,
    0
  );
}

export function agregarProducto(carrito, producto) {
  const existente = carrito.find(
    (item) =>
      item.id === producto.id &&
      item.precio === producto.precio
  );

  if (existente) {
    return carrito.map((item) =>
      item.id === producto.id &&
      item.precio === producto.precio
        ? { ...item, cantidad: item.cantidad + 1 }
        : item
    );
  }

  return [...carrito, { ...producto, cantidad: 1 }];
}

export function validarContrasena(contrasena) {
  return (
    contrasena.length >= 8 &&
    /[A-Z]/.test(contrasena) &&
    /[a-z]/.test(contrasena) &&
    /[0-9]/.test(contrasena) &&
    /[^A-Za-z0-9]/.test(contrasena)
  );
}

export function correoRegistrado(usuarios, correo) {
  return usuarios.some(
    (usuario) =>
      usuario.correo === correo.trim().toLowerCase()
  );
}