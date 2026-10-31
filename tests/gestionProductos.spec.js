import {
  crearProducto,
  actualizarProducto,
  eliminarProducto
} from "../src/utils/gestionProductos";

describe("CRUD de productos - Pastelería Mil Sabores", () => {

  const productosEjemplo = [
    {
      id: 1,
      nombre: "Torta de Chocolate",
      precio: 15000,
      categoria: "Tortas",
      imagen: "/images/imagestortachocolate.jpg"
    },
    {
      id: 2,
      nombre: "Torta de Frutas",
      precio: 18000,
      categoria: "Tortas",
      imagen: "/images/torta_frutas.jpg"
    }
  ];

  // PRUEBA 1: CREAR PRODUCTO
  it("debe agregar un producto nuevo al catálogo", () => {
    const nuevoProducto = {
      nombre: "Torta de Manjar",
      precio: 12000,
      categoria: "Tortas",
      imagen: "/images/torta_frutas.jpg"
    };

    const resultado = crearProducto(
      productosEjemplo,
      nuevoProducto
    );

    expect(resultado.length).toBe(3);
    expect(resultado[2].nombre).toBe("Torta de Manjar");
    expect(resultado[2].id).toBe(3);
  });

  // PRUEBA 2: ACTUALIZAR PRODUCTO
  it("debe actualizar el precio de un producto", () => {
    const resultado = actualizarProducto(
      productosEjemplo,
      1,
      {
        nombre: "Torta de Chocolate",
        precio: 20000,
        categoria: "Tortas",
        imagen: "/images/imagestortachocolate.jpg"
      }
    );

    expect(resultado[0].precio).toBe(20000);
    expect(resultado[0].nombre).toBe("Torta de Chocolate");
    expect(resultado[1].precio).toBe(18000);
  });

  // PRUEBA 3: ELIMINAR PRODUCTO
  it("debe eliminar un producto del catálogo", () => {
    const resultado = eliminarProducto(
      productosEjemplo,
      1
    );

    expect(resultado.length).toBe(1);
    expect(resultado[0].id).toBe(2);
    expect(
      resultado.some((producto) => producto.id === 1)
    ).toBe(false);
  });

}); 