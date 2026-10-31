# 🍰 Pastelería Mil Sabores

## Descripción del proyecto

Pastelería Mil Sabores es una aplicación web desarrollada con React que permite a los usuarios explorar un catálogo de productos de pastelería, consultar ofertas, agregar productos a un carrito de compras y realizar una simulación del proceso de compra.

El proyecto fue desarrollado como parte de una evaluación académica, aplicando tecnologías modernas de desarrollo frontend, componentes reutilizables, navegación entre páginas, formularios con validaciones y pruebas automatizadas.

## Objetivo

Desarrollar una aplicación web de pastelería que permita ofrecer una experiencia de navegación sencilla, atractiva y adaptable a diferentes dispositivos.

## Tecnologías utilizadas

- React: desarrollo de componentes e interfaces.
- JavaScript: lógica y funcionalidades.
- Vite: entorno de desarrollo y compilación.
- HTML y CSS: estructura y diseño.
- Bootstrap: estilos y diseño responsive.
- React Router: navegación entre páginas.
- Jasmine: pruebas automatizadas.
- Karma: ejecución de pruebas.
- React Testing Library: pruebas de componentes React.
- LocalStorage: almacenamiento del carrito de compras.

## Funcionalidades implementadas

### 1. Página de inicio

Presenta la pastelería y permite acceder a las diferentes secciones del sitio.

### 2. Catálogo de productos

Permite visualizar productos de pastelería con sus respectivas imágenes, nombres, categorías y precios.

Incluye filtros por categoría para facilitar la búsqueda.

### 3. Ofertas y descuentos

Presenta productos con descuentos y permite agregarlos al carrito con su precio de oferta.

### 4. Detalle de productos

Permite consultar información de un producto seleccionado y agregarlo al carrito de compras.

### 5. Carrito de compras

Permite:

- Agregar productos.
- Aumentar cantidades.
- Disminuir cantidades.
- Eliminar productos.
- Calcular automáticamente el total.
- Conservar los productos al actualizar la página mediante LocalStorage.

### 6. Registro de usuarios

Incluye un formulario con validaciones de:

- Nombre.
- Correo electrónico.
- Contraseña segura.
- Confirmación de contraseña.
- Aceptación de términos.

El registro es una demostración frontend. Las cuentas se mantienen temporalmente en memoria durante la sesión de la aplicación.

### 7. Inicio de sesión

Permite iniciar sesión utilizando las credenciales registradas durante la demostración.

Incluye mensajes de error cuando el correo no existe o la contraseña es incorrecta.

**Importante:** esta funcionalidad no utiliza un servidor de autenticación ni una base de datos.

### 8. Simulación de compra

Permite completar un formulario de compra y visualizar una pantalla de confirmación.

No se realizan pagos reales.

### 9. Diseño responsive

La interfaz se adapta a computadores, tablets y celulares mediante Bootstrap y CSS.

## Instalación del proyecto

### Requisitos

Tener instalado:

- Node.js
- npm
- Visual Studio Code (recomendado)

### Pasos para ejecutar

1. Descargar o descomprimir el proyecto.
2. Abrir la carpeta `frontend-react` en Visual Studio Code.
3. Abrir una terminal.
4. Instalar las dependencias:

```bash
npm install
```

5. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

6. Abrir en el navegador la dirección local que indique Vite.

**Nota para Windows PowerShell:** si `npm` está bloqueado por la política de ejecución, utilizar `npm.cmd`.

## Pruebas automatizadas

Se implementaron pruebas con Jasmine, Karma y React Testing Library.

Las pruebas verifican funcionalidades relacionadas con:

- Catálogo de productos.
- Tarjetas de productos.
- Filtros por categoría.
- Carrito de compras.
- Cálculo de totales.
- Descuentos.
- Validación de contraseñas.
- Registro de usuarios.
- Inicio de sesión.

### Ejecutar las pruebas

```bash
npm run test
```

**Resultado obtenido durante el desarrollo: 55 pruebas exitosas.**

## Compilación de producción

Para generar la versión de producción:

```bash
npm run build
```

Los archivos generados se almacenan en la carpeta `dist`.

La compilación fue ejecutada correctamente durante el desarrollo.

## Estructura principal del proyecto

```text
frontend-react/
│
├── public/
│   └── images/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ProductoCard.jsx
│   │
│   ├── pages/
│   │   ├── Inicio.jsx
│   │   ├── Productos.jsx
│   │   ├── Ofertas.jsx
│   │   ├── DetalleProducto.jsx
│   │   ├── Carrito.jsx
│   │   ├── Checkout.jsx
│   │   ├── Confirmacion.jsx
│   │   ├── Login.jsx
│   │   └── Registro.jsx
│   │
│   ├── data/
│   │   └── productos.js
│   │
│   ├── styles/
│   │   └── pasteleria.css
│   │
│   ├── utils/
│   │   └── tienda.js
│   │
│   └── App.jsx
│
├── tests/
├── karma.conf.cjs
├── package.json
└── README.md
```

## Consideraciones

Este proyecto corresponde a una demostración académica.

- No utiliza una base de datos.
- El registro y el inicio de sesión son simulados.
- Las cuentas registradas no se conservan al recargar la aplicación.
- El carrito sí utiliza LocalStorage para conservar los productos.
- El proceso de compra no realiza transacciones reales.

## Conclusión

El desarrollo de Pastelería Mil Sabores permitió aplicar conocimientos de React, JavaScript, Bootstrap y herramientas de pruebas automatizadas.

Se implementaron componentes reutilizables, navegación entre páginas, formularios con validaciones y funcionalidades interactivas, obteniendo una aplicación web adaptable a diferentes dispositivos.