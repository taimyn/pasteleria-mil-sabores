
import React from 'react';

export default function Nosotros() {
  return (
    <main className="container py-4">

      <section id="historia">
        <h2>Nuestra Historia</h2>
        <p>
          Pastelería 1000 Sabores celebra su 50° aniversario
          como una reconocida pastelería chilena, destacando
          su participación en el récord Guinness de 1995
          por la creación de la torta más grande del mundo.
          Actualmente, busca modernizar su sistema de ventas
          online para mejorar la experiencia de sus clientes,
          manteniendo su tradición y ofreciendo productos
          de repostería de alta calidad.
        </p>
      </section>

      <section id="mision-vision">
        <h2>Misión</h2>
        <p>
          Ofrecer una experiencia dulce y memorable a nuestros
          clientes, proporcionando tortas y productos de
          repostería de alta calidad para todas las ocasiones,
          mientras celebramos nuestras raíces históricas y
          fomentamos la creatividad en la repostería.
        </p>

        <h2>Visión</h2>
        <p>
          Convertirnos en la tienda online líder de productos
          de repostería en Chile, conocida por nuestra
          innovación, calidad y el impacto positivo en la
          comunidad, especialmente en la formación de nuevos
          talentos en gastronomía.
        </p>
      </section>

      <section id="equipo">
        <h2>Nuestro Equipo</h2>

        <article className="integrante">
          <h3>Taimyn Martinez</h3>
          <p>Desarrollo Frontend</p>
        </article>

        <article className="integrante">
          <h3>Benjamin Quintanilla</h3>
          <p>Diseño y validaciones JavaScript</p>
        </article>

        <article className="integrante">
          <h3>Javiera Perez</h3>
          <p>Documentación y GitHub</p>
        </article>
      </section>

    </main>
  );
}
