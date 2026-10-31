import { productos } from "../src/data/productos";

describe("Datos del catálogo de productos", () => {

  it("debe existir la Torta de Chocolate", () => {
    const producto = productos.find(
      (item) => item.nombre === "Torta de Chocolate"
    );

    expect(producto).toBeDefined();
  });

  it("debe existir al menos un producto de la categoría Tortas", () => {
    const tortas = productos.filter(
      (producto) => producto.categoria === "Tortas"
    );

    expect(tortas.length).toBeGreaterThan(0);
  });

  it("todos los productos deben tener precios mayores a cero", () => {
    const preciosValidos = productos.every(
      (producto) => producto.precio > 0
    );

    expect(preciosValidos).toBeTrue();
  }); 

});