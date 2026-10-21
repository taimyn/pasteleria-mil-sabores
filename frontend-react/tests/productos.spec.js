
import { productos } from "../src/data/productos.js";

describe("Pruebas de productos - Pastelería Mil Sabores", function () {

  // Prueba 1: Productos
  it("Debe existir una torta de chocolate", function () {
    const torta = productos.find(
      producto => producto.nombre === "Torta de Chocolate"
    );

    expect(torta).toBeDefined();
  });

  // Prueba 2: Categorías
  it("Debe filtrar solamente las tortas", function () {
    const tortas = productos.filter(
      producto => producto.categoria === "Tortas"
    );

    expect(tortas.length).toBeGreaterThan(0);

    tortas.forEach(function (producto) {
      expect(producto.categoria).toBe("Tortas");
    });
  });

  // Prueba 3: Precios
  it("Todos los productos deben tener un precio mayor a cero", function () {
    productos.forEach(function (producto) {
      expect(producto.precio).toBeGreaterThan(0);
    });
  });

});
