import React from "react";
import {
  render,
  screen,
  fireEvent,
  cleanup
} from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import Login from "../src/pages/Login";

describe("Componente Login", () => {
  const usuarios = [
    {
      nombre: "María González",
      correo: "maria@correo.cl",
      contrasena: "Pasteleria2026!"
    }
  ];

  let iniciarSesion;

  beforeEach(() => {
    iniciarSesion = jasmine.createSpy("iniciarSesion");
  });

  afterEach(() => {
    cleanup();
  });

  const mostrarLogin = (usuarioActual = null) => {
    render(
      <MemoryRouter>
        <Login
          usuarios={usuarios}
          iniciarSesion={iniciarSesion}
          usuarioActual={usuarioActual}
        />
      </MemoryRouter>
    );
  };

  const completarFormulario = (correo, contrasena) => {
    fireEvent.change(screen.getByLabelText("Correo electrónico"), {
      target: { value: correo }
    });

    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: contrasena }
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Iniciar sesión"
      })
    );
  };

  it("debe mostrar el formulario de inicio de sesión", () => {
    mostrarLogin();

    expect(screen.getByText("Bienvenido")).toBeTruthy();
    expect(screen.getByLabelText("Correo electrónico")).toBeTruthy();
    expect(screen.getByLabelText("Contraseña")).toBeTruthy();
  });

  it("debe mostrar un error si el correo no está registrado", () => {
    mostrarLogin();

    completarFormulario("desconocido@correo.cl", "Pasteleria2026!");

    expect(
      screen.getByRole("alert").textContent
    ).toContain("No existe una cuenta registrada");
  });

  it("debe mostrar un error si la contraseña es incorrecta", () => {
    mostrarLogin();

    completarFormulario("maria@correo.cl", "Incorrecta123!");

    expect(
      screen.getByRole("alert").textContent
    ).toContain("incorrecta");
  });

  it("debe permitir iniciar sesión con datos correctos", () => {
    mostrarLogin();

    completarFormulario("maria@correo.cl", "Pasteleria2026!");

    expect(iniciarSesion).toHaveBeenCalledWith(usuarios[0]);
  });

  it("debe normalizar el correo antes de iniciar sesión", () => {
    mostrarLogin();

    completarFormulario("  MARIA@CORREO.CL  ", "Pasteleria2026!");

    expect(iniciarSesion).toHaveBeenCalledWith(usuarios[0]);
  });

  it("debe mostrar el nombre del usuario cuando ya inició sesión", () => {
    mostrarLogin({
      nombre: "María González",
      correo: "maria@correo.cl"
    });

    expect(
      screen.getByText(/Bienvenido, María González/)
    ).toBeTruthy();
  });

  it("debe permitir mostrar y ocultar la contraseña", () => {
    mostrarLogin();

    const campo = screen.getByLabelText("Contraseña");

    expect(campo.type).toBe("password");

    fireEvent.click(
      screen.getByRole("button", { name: "Mostrar" })
    );

    expect(campo.type).toBe("text");

    fireEvent.click(
      screen.getByRole("button", { name: "Ocultar" })
    );

    expect(campo.type).toBe("password");
  });
});