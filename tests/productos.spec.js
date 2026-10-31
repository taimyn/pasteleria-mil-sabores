import React from "react";
import {
  render,
  screen,
  fireEvent,
  cleanup
} from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import Productos from "../src/pages/Productos";
import { productos } from "../src/data/productos";

describe("Página de productos", () => {

  afterEach(() => {
    cleanup();
  });

  it("debe mostrar el título de la página", () => {
    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Nuestros productos")
    ).toBeTruthy();
  });

  it("debe mostrar todos los productos inicialmente", () => {
    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    expect(
      screen.getByText(`Mostrando ${productos.length} productos`)
    ).toBeTruthy();
  });

  it("debe filtrar los productos por categoría Tortas", () => {
    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Tortas" })
    );

    const cantidadTortas = productos.filter(
      (producto) => producto.categoria === "Tortas"
    ).length;

    expect(
      screen.getByText(`Mostrando ${cantidadTortas} productos`)
    ).toBeTruthy();
  });

  it("debe volver a mostrar todos los productos al seleccionar Todos", () => {
    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Tortas" })
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Todos" })
    );

    expect(
      screen.getByText(`Mostrando ${productos.length} productos`)
    ).toBeTruthy();
  });

  it("debe mostrar las categorías disponibles", () => {
    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    );

    expect(screen.getByRole("button", { name: "Todos" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Tortas" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Postres" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Galletas" })).toBeTruthy();
  });

}); 