
import React from 'react';
import { Link, useParams } from 'react-router-dom';

const publicaciones = [
  {
    id: '1',
    titulo: 'Caso Curioso #1: La torta más grande del mundo',
    subtitulo: 'La torta más grande del mundo',
    imagen: '/images/record.jpg',
    alt: 'Torta gigante del récord Guinness',
    resumen: 'En 1995, Pastelería Mil Sabores participó en la creación de la torta más grande del mundo, un hito que quedó registrado en el libro Guinness y marcó un antes y un después en nuestra historia.',
    parrafos: [
      'En 1995, Pastelería Mil Sabores vivió uno de los momentos más importantes de su historia: participó activamente en la creación de la torta más grande del mundo, un logro que quedó registrado oficialmente en el libro de récords Guinness.',
      'El proyecto reunió a decenas de maestros pasteleros durante varios días de trabajo continuo, combinando técnicas tradicionales de repostería chilena con procesos de gran escala nunca antes intentados en el país. La torta resultante superó todas las expectativas, convirtiéndose en un símbolo de la creatividad y dedicación que caracteriza a nuestra pastelería.',
      'Este hito no solo puso a Mil Sabores en el mapa internacional de la repostería, sino que sentó las bases de los valores que mantenemos hasta hoy: innovación constante, trabajo en equipo y pasión por ofrecer experiencias dulces inolvidables. Treinta años después, seguimos celebrando ese legado en cada torta que sale de nuestra cocina.'
    ]
  },
  {
    id: '2',
    titulo: 'Caso Curioso #2: Formando nuevos talentos',
    subtitulo: 'Formando nuevos talentos',
    imagen: '/images/gastronomia_4.jpg',
    alt: 'Estudiantes de gastronomía trabajando en pastelería',
    resumen: 'Cada compra en Mil Sabores apoya la formación de estudiantes de gastronomía de Duoc UC, quienes participan activamente en el desarrollo de nuevas recetas y técnicas de repostería.',
    parrafos: [
      'En Pastelería Mil Sabores creemos que el futuro de la repostería chilena se construye formando a las nuevas generaciones. Por eso mantenemos una alianza activa con la carrera de Gastronomía de Duoc UC, donde estudiantes tienen la oportunidad de aplicar sus conocimientos en un entorno real de producción.',
      'Cada semestre, un grupo de estudiantes se integra a nuestro equipo para participar en el desarrollo de nuevas recetas, la optimización de procesos de producción y la creación de propuestas de repostería con identidad propia. Esta colaboración ha dado origen a varios de los productos que hoy forman parte de nuestro catálogo, incluyendo opciones sin azúcar, sin gluten y veganas.',
      'Además, como reconocimiento a este vínculo, ofrecemos beneficios especiales a la comunidad Duoc: estudiantes que se registren con su correo institucional pueden acceder a promociones exclusivas. Así, cada compra en Mil Sabores no solo endulza tu día, sino que también apoya directamente la formación de los futuros chefs pasteleros de Chile.'
    ]
  }
];

export default function Blogs() {
  return (
    <main className="container py-4">
      <h2>Noticias importantes</h2>

      <p>
        Historias y datos curiosos sobre Pastelería Mil Sabores.
      </p>

      <section id="blogs">
        {publicaciones.map(blog => (
          <article className="blog-card" key={blog.id}>
            <img
              src={blog.imagen}
              alt={blog.alt}
            />

            <div className="contenido">
              <h3>{blog.titulo}</h3>
              <p>{blog.resumen}</p>

              <Link to={'/blogs/' + blog.id}>
                Ver caso →
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export function BlogDetalle() {
  const { id } = useParams();

  const blog = publicaciones.find(
    publicacion => publicacion.id === id
  );

  if (!blog) {
    return (
      <main className="container py-4">
        <h2>Publicación no encontrada</h2>
        <Link to="/blogs">Volver a Blogs</Link>
      </main>
    );
  }

  return (
    <main className="container py-4">
      <p>
        <Link to="/blogs">← Volver a Blogs</Link>
      </p>

      <h2>{blog.subtitulo}</h2>

      <img
        src={blog.imagen}
        alt={blog.alt}
        className="img-fluid rounded mb-4"
        style={{ maxWidth: '900px', width: '100%' }}
      />

      {blog.parrafos.map((parrafo, index) => (
        <p key={index}>{parrafo}</p>
      ))}

      <Link to="/blogs" className="btn btn-secondary mt-3">
        Volver a las noticias
      </Link>
    </main>
  );
}
