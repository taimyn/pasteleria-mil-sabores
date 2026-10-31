import {
  calcularPrecioOferta,
  calcularTotal,
  agregarProducto,
  validarContrasena,
  correoRegistrado
} from "../src/utils/tienda.js";

describe("Pruebas del carrito - Pastelería Mil Sabores", function () {

  it("Debe agregar un producto al carrito", function () {
    const producto = {
      id: 1,
      nombre: "Torta de Chocolate",
      precio: 15000
    };

    const carrito = agregarProducto([], producto);

    expect(carrito.length).toBe(1);
    expect(carrito[0].cantidad).toBe(1);
  });

  it("Debe aumentar la cantidad si se agrega el mismo producto", function () {
    const producto = {
      id: 1,
      nombre: "Torta de Chocolate",
      precio: 15000
    };

    let carrito = agregarProducto([], producto);
    carrito = agregarProducto(carrito, producto);

    expect(carrito.length).toBe(1);
    expect(carrito[0].cantidad).toBe(2);
  });

  it("Debe calcular correctamente el total del carrito", function () {
    const carrito = [
      { id: 1, precio: 10000, cantidad: 2 },
      { id: 2, precio: 5000, cantidad: 3 }
    ];

    expect(calcularTotal(carrito)).toBe(35000);
  });

  it("Debe calcular cero si el carrito está vacío", function () {
    expect(calcularTotal([])).toBe(0);
  });

  it("Debe separar el mismo producto si tiene distinto precio", function () {
    const normal = {
      id: 1,
      nombre: "Torta de Chocolate",
      precio: 15000
    };

    const oferta = {
      id: 1,
      nombre: "Torta de Chocolate",
      precio: 12000
    };

    let carrito = agregarProducto([], normal);
    carrito = agregarProducto(carrito, oferta);

    expect(carrito.length).toBe(2);
    expect(calcularTotal(carrito)).toBe(27000);
  });

});

describe("Pruebas de ofertas - Pastelería Mil Sabores", function () {

  it("Debe aplicar correctamente un descuento del 20%", function () {
    const precioFinal = calcularPrecioOferta(10000, 20);

    expect(precioFinal).toBe(8000);
  });

  it("Debe mantener el precio si el descuento es 0%", function () {
    const precioFinal = calcularPrecioOferta(10000, 0);

    expect(precioFinal).toBe(10000);
  });

});

describe("Pruebas de registro - Pastelería Mil Sabores", function () {

  it("Debe aceptar una contraseña que cumple los requisitos", function () {
    expect(validarContrasena("Pasteleria2026!")).toBeTrue();
  });

  it("Debe rechazar una contraseña demasiado corta", function () {
    expect(validarContrasena("Hola1!")).toBeFalse();
  });

  it("Debe rechazar una contraseña sin mayúscula", function () {
    expect(validarContrasena("pasteleria2026!")).toBeFalse();
  });

  it("Debe rechazar una contraseña sin número", function () {
    expect(validarContrasena("Pasteleria!")).toBeFalse();
  });

  it("Debe rechazar una contraseña sin carácter especial", function () {
    expect(validarContrasena("Pasteleria2026")).toBeFalse();
  });

  it("Debe detectar un correo que ya está registrado", function () {
    const usuarios = [
      { correo: "cliente@correo.cl" }
    ];

    expect(
      correoRegistrado(usuarios, "cliente@correo.cl")
    ).toBeTrue();
  });

  it("Debe permitir un correo que no está registrado", function () {
    const usuarios = [
      { correo: "cliente@correo.cl" }
    ];

    expect(
      correoRegistrado(usuarios, "nuevo@correo.cl")
    ).toBeFalse();
  });

});