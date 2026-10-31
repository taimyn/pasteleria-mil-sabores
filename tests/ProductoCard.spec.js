import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import ProductoCard from "../src/components/ProductoCard";

describe("Componente ProductoCard", () => {
  const producto = {
    id: 1,
    nombre: "Torta de Chocolate",
    categoria: "Tortas",
    precio: 15000,
    imagen: "/images/torta.jpg"
  };

  afterEach(() => {
    cleanup();
  });

  it("debe mostrar el nombre del producto", () => {
    render(
      <MemoryRouter>
        <ProductoCard producto={producto} />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Torta de Chocolate")
    ).toBeTruthy();
  });

  it("debe mostrar la categoría del producto", () => {
    render(
      <MemoryRouter>
        <ProductoCard producto={producto} />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Tortas")
    ).toBeTruthy();
  });

  it("debe mostrar el precio correctamente", () => {
    render(
      <MemoryRouter>
        <ProductoCard producto={producto} />
      </MemoryRouter>
    );

    expect(
      screen.getByText("$15.000")
    ).toBeTruthy();
  });

  it("debe mostrar la imagen del producto", () => {
    render(
      <MemoryRouter>
        <ProductoCard producto={producto} />
      </MemoryRouter>
    );

    const imagen = screen.getByAltText("Torta de Chocolate");

    expect(imagen).toBeTruthy();
    expect(imagen.getAttribute("src")).toBe("/images/torta.jpg");
  });

  it("debe agregar el producto al carrito al presionar el botón", () => {
    const agregarAlCarrito = jasmine.createSpy("agregarAlCarrito");

    render(
      <MemoryRouter>
        <ProductoCard
          producto={producto}
          agregarAlCarrito={agregarAlCarrito}
        />
      </MemoryRouter>
    );

    const boton = screen.getByRole("button", {
      name: "Agregar al carrito"
    });

    fireEvent.click(boton);

    expect(agregarAlCarrito).toHaveBeenCalledWith(producto);
  });

  it("debe mostrar un mensaje después de agregar el producto", () => {
    const agregarAlCarrito = jasmine.createSpy("agregarAlCarrito");

    render(
      <MemoryRouter>
        <ProductoCard
          producto={producto}
          agregarAlCarrito={agregarAlCarrito}
        />
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Agregar al carrito"
      })
    );

    expect(
      screen.getByRole("status").textContent
    ).toContain("Producto agregado correctamente");
  });

  it("no debe mostrar el botón de agregar si no recibe la función", () => {
    render(
      <MemoryRouter>
        <ProductoCard producto={producto} />
      </MemoryRouter>
    );

    const boton = screen.queryByRole("button", {
      name: "Agregar al carrito"
    });

    expect(boton).toBeNull();
  });
});