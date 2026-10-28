# Pruebas de tu parte - Pastelería Mil Sabores

Se conservó la aplicación original. Los cambios de esta entrega se limitan a la lógica de **inicio, catálogo, filtros, buscador, ofertas y detalle**. No se han migrado ni reescrito los módulos de los compañeros.

## Ejecutar

En la carpeta que contiene `package.json`:

```powershell
npm.cmd install
npm.cmd run dev
```

En otra terminal, para pruebas unitarias con Jasmine y Karma:

```powershell
npm.cmd test
```

Si Karma indica que no encuentra Chrome, asegúrate de tener Google Chrome instalado. En Windows también puedes configurar la variable `CHROME_BIN` apuntando a `chrome.exe`.

## Casos cubiertos (10)

1. Productos originales cargados.
2. Categorías sin duplicados.
3. Filtro por categoría.
4. Búsqueda sin importar mayúsculas.
5. Filtro y búsqueda combinados.
6. Búsqueda sin coincidencias.
7. Cálculo de descuentos.
8. Validación de descuentos inválidos.
9. Listado de ofertas.
10. Detalle de producto por código.

Estas pruebas verifican **lógica JavaScript del catálogo**; no prueban todavía el DOM ni la interacción visual de componentes React. Para cubrir toda la rúbrica se deben añadir pruebas de componentes y un informe de cobertura con resultados ejecutados.
