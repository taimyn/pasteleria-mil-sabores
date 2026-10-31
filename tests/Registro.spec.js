import React from "react";
import {
  render,
  screen,
  fireEvent,
  cleanup
} from "@testing-library/react";

import { MemoryRouter, Routes, Route } from "react-router-dom";
import Registro from "../src/pages/Registro";

describe("Componente Registro", () => {
  const usuarios = [
    {
      nombre: "María González",
      correo: "maria@correo.cl",
      contrasena: "Pasteleria2026!"
    }
  ];

  let registrarUsuario;

  beforeEach(() => {
    registrarUsuario = jasmine.createSpy("registrarUsuario");
  });

  afterEach(() => {
    cleanup();
  });

  const mostrarRegistro = () => {
    render(
      <MemoryRouter initialEntries={["/registro"]}>
        <Routes>
          <Route
            path="/registro"
            element={
              <Registro
                usuarios={usuarios}
                registrarUsuario={registrarUsuario}
              />
            }
          />
          <Route
            path="/login"
            element={<h1>Página de inicio de sesión</h1>}
          />
        </Routes>
      </MemoryRouter>
    );
  };

  const completarRegistro = ({
    nombre = "Pedro González",
    correo = "pedro@correo.cl",
    contrasena = "Pasteleria2026!",
    confirmarContrasena = contrasena,
    aceptaTerminos = true
  } = {}) => {
    fireEvent.change(screen.getByLabelText("Nombre completo"), {
      target: { value: nombre }
    });

    fireEvent.change(screen.getByLabelText("Correo electrónico"), {
      target: { value: correo }
    });

    fireEvent.change(screen.getByLabelText("Contraseña", { exact: true }), {
      target: { value: contrasena }
    });

    fireEvent.change(screen.getByLabelText("Confirmar contraseña"), {
      target: { value: confirmarContrasena }
    });

    if (aceptaTerminos) {
      fireEvent.click(
        screen.getByRole("checkbox")
      );
    }

    fireEvent.click(
      screen.getByRole("button", { name: "Crear cuenta" })
    );
  };

  it("debe mostrar el formulario de registro", () => {
    mostrarRegistro();

    expect(screen.getByText("Registro de usuario")).toBeTruthy();
    expect(screen.getByLabelText("Nombre completo")).toBeTruthy();
    expect(screen.getByLabelText("Correo electrónico")).toBeTruthy();
  });

  it("debe mostrar los requisitos de contraseña", () => {
    mostrarRegistro();

    expect(screen.getByText(/Mínimo 8 caracteres/)).toBeTruthy();
    expect(screen.getByText(/Una letra mayúscula/)).toBeTruthy();
    expect(screen.getByText(/Una letra minúscula/)).toBeTruthy();
    expect(screen.getByText(/Un número/)).toBeTruthy();
  });

  it("debe mostrar un error si el correo ya está registrado", () => {
    mostrarRegistro();

    completarRegistro({
      correo: "maria@correo.cl"
    });

    expect(
      screen.getByRole("alert").textContent
    ).toContain("Este correo ya tiene una cuenta registrada");
  });

  it("debe rechazar una contraseña que no cumple los requisitos", () => {
    mostrarRegistro();

    completarRegistro({
      contrasena: "hola123",
      confirmarContrasena: "hola123"
    });

    expect(
      screen.getByRole("alert").textContent
    ).toContain("La contraseña debe tener");
  });

  it("debe mostrar un error cuando las contraseñas no coinciden", () => {
    mostrarRegistro();

    completarRegistro({
      contrasena: "Pasteleria2026!",
      confirmarContrasena: "OtraClave2026!"
    });

    expect(
      screen.getByRole("alert").textContent
    ).toContain("Las contraseñas no coinciden");
  });

  it("debe registrar correctamente un usuario válido", () => {
    mostrarRegistro();

    completarRegistro();

    expect(registrarUsuario).toHaveBeenCalledWith({
      nombre: "Pedro González",
      correo: "pedro@correo.cl",
      contrasena: "Pasteleria2026!"
    });
  });

  it("debe redirigir al inicio de sesión después del registro", () => {
    mostrarRegistro();

    completarRegistro();

    expect(
      screen.getByText("Página de inicio de sesión")
    ).toBeTruthy();
  });

  it("debe permitir mostrar y ocultar la contraseña", () => {
    mostrarRegistro();

    const campo = screen.getByLabelText("Contraseña", {
      exact: true
    });

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