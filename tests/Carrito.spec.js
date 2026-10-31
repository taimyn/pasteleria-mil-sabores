import React from "react";

import {
  render,
  screen,
  fireEvent,
  cleanup
} from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import Carrito from "../src/pages/Carrito";

describe("Componente Carrito de compras", () => {

  const producto = {
    id: 1,
    nombre: "Torta de Chocolate",
    categoria: "Tortas",
    precio: 15000,
    cantidad: 2,
    imagen: "/images/torta.jpg"
  };

  let agregarAlCarrito;
  let disminuirCantidad;
  let eliminarDelCarrito;

  beforeEach(() => {
    agregarAlCarrito = jasmine.createSpy("agregarAlCarrito");
    disminuirCantidad = jasmine.createSpy("disminuirCantidad");
    eliminarDelCarrito = jasmine.createSpy("eliminarDelCarrito");
  });

  afterEach(() => {
    cleanup();
  });

  const mostrarCarrito = (productos) => {
    render(
      <MemoryRouter>
        <Carrito
          carrito={productos}
          agregarAlCarrito={agregarAlCarrito}
          disminuirCantidad={disminuirCantidad}
          eliminarDelCarrito={eliminarDelCarrito}
        />
      </MemoryRouter>
    );
  };

  it("debe mostrar el título del carrito", () => {
    mostrarCarrito([]);

    expect(
      screen.getByText("Mi carrito de compras")
    ).toBeTruthy();
  });

  it("debe mostrar un mensaje cuando el carrito está vacío", () => {
    mostrarCarrito([]);

    expect(
      screen.getByText("Tu carrito está vacío")
    ).toBeTruthy();
  });

  it("debe mostrar el producto agregado", () => {
    mostrarCarrito([producto]);

    expect(
      screen.getByText("Torta de Chocolate")
    ).toBeTruthy();
  });

  it("debe mostrar el total correcto", () => {
    mostrarCarrito([producto]);

    expect(
      screen.getByText("Total: $30.000")
    ).toBeTruthy();
  });

  it("debe aumentar la cantidad al presionar +", () => {
    mostrarCarrito([producto]);

    fireEvent.click(
      screen.getByRole("button", { name: "+" })
    );

    expect(agregarAlCarrito).toHaveBeenCalledWith(producto);
  });

  it("debe disminuir la cantidad al presionar -", () => {
    mostrarCarrito([producto]);

    fireEvent.click(
      screen.getByRole("button", { name: "-" })
    );

    expect(disminuirCantidad).toHaveBeenCalledWith(
      producto.id,
      producto.precio
    );
  });

  it("debe eliminar el producto al presionar Eliminar", () => {
    mostrarCarrito([producto]);

    fireEvent.click(
      screen.getByRole("button", { name: "Eliminar" })
    );

    expect(eliminarDelCarrito).toHaveBeenCalledWith(
      producto.id,
      producto.precio
    );
  });

  it("debe mostrar el botón para finalizar la compra", () => {
    mostrarCarrito([producto]);

    const enlace = screen.getByRole("link", {
      name: "Finalizar compra"
    });

    expect(enlace).toBeTruthy();
    expect(enlace.getAttribute("href")).toBe("/checkout");
  });

});