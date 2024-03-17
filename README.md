# Informe Práctica 7 - DSIkea
---

- Grupo: F
- Alumnos: José Ángel Marrero Domínguez y Sebastián André Porto Specht
- Correos: *alu0101494500* y *alu0101494265*
- Asignatura: **Desarrollo de Sistemas Informáticos** (DSI)

---

# Índice

- [Introducción](#introducción)
- [Objetivos](#objetivos)
- [Tests y Ejercicios](#tests-y-ejercicios)
- [Conclusión](#conclusión)
- [Bibliografía](#bibliografía)

---

## Introducción

Esta práctica implica la creación de un diseño orientado a objetos para un sistema de información destinado a gestionar una **tienda de muebles**. Esta práctica, siendo la primera grupal de la asignatura, requiere un enfoque meticuloso en las decisiones de diseño para garantizar la eficacia y la coherencia del sistema desarrollado.

---

## Objetivos

- Desarrollar un diseño orientado a objetos del modelo de datos para un sistema de información de una tienda de muebles.
- Utilizar GitHub Classroom para alojar todo el código desarrollado, siguiendo una estructura de proyecto similar a la enseñada en clase.
- Documentar la solución diseñada en un informe, enfatizando las decisiones de diseño implementadas.
- Aprender y utilizar los módulos `Inquirer.js` y `Lowdb`, siguiendo el ejemplo detallado del Capítulo 1 del libro *Essential TypeScript: From Beginner to Pro*.
- Implementar la documentación mediante el uso de `TypeDoc` y adoptar una metodología de desarrollo dirigido por pruebas/comportamiento, enfocándose en las metodologías **TDD** o **BDD**.
- Desarrollar pruebas unitarias que confirmen el correcto funcionamiento del código y que verifiquen la robustez del software ante entradas no válidas o inesperadas.
- Aplicar los principios `SOLID` de diseño orientado a objetos durante el desarrollo.
- Utilizar herramientas de cubrimiento del código (**Coveralls**), integración continua (**GitHub Actions**) y calidad del código (**Sonar Cloud**) para asegurar la calidad y fiabilidad del software desarrollado.

---

## Tests y Ejercicios

### Tests

#### mueble.spec.ts
- **Se crea un armario correctamente:** Este test comprueba si se crea correctamente un objeto de tipo `Mueble` para cada uno de los armarios.
- **Se crea una cómoda correctamente:** Similar al anterior, verifica la creación correcta de los objetos de tipo `Mueble` para cada cómoda.
- **Se crea una mesa correctamente:** Comprueba si se crean correctamente los objetos de tipo `Mueble` para cada mesa.
- **Se crea una silla correctamente:** Verifica la creación correcta de los objetos de tipo `Mueble` para cada silla.
- **Se inicializa un armario correctamente:** Comprueba si se inicializan correctamente los atributos de cada objeto `Mueble` correspondiente a un armario.
- **Se inicializa una cómoda correctamente:** Similar al anterior, pero para las cómodas.
- **Se inicializa una mesa correctamente:** Similar al anterior, pero para las mesas.
- **Se inicializa una silla correctamente:** Similar al anterior, pero para las sillas.
- **Se actualiza un armario correctamente:** Verifica si se actualizan correctamente los atributos de un armario específico.
- **Se actualiza una cómoda correctamente:** Similar al anterior, pero para la actualización de cómodas.
- **Se actualiza una mesa correctamente:** Similar al anterior, pero para la actualización de mesas.
- **Se actualiza una silla correctamente:** Similar al anterior, pero para la actualización de sillas.

#### proveedor.spec.ts
- **Se crea un proveedor correctamente:** Verifica si se crea correctamente un objeto de tipo `Proveedor`.
- **Se inicializa un proveedor correctamente:** Comprueba si se inicializan correctamente los atributos de un objeto `Proveedor`.
- **Se actualiza un proveedor correctamente:** Verifica si se actualizan correctamente los atributos de un proveedor específico.

#### cliente.spec.ts
- **Se crea un cliente correctamente:** Comprueba si se crea correctamente un objeto de tipo `Cliente`.
- **Se inicializa un cliente correctamente:** Verifica si se inicializan correctamente los atributos de un objeto `Cliente`.
- **Se actualiza un cliente correctamente:** Verifica si se actualizan correctamente los atributos de un cliente específico.

### Clases Usadas

- **Mueble**: Esta clase representa un mueble en la tienda de muebles DSIkea. Almacena información como el `ID` único, `tipo` de mueble, `nombre`, `descripción`, `material`, `dimensiones`, `precio` y `cantidad` disponible en inventario. La clase incluye métodos para **acceder** y **modificar** estos atributos, lo que garantiza la integridad de los datos y facilita su gestión.

- **Proveedor**: Esta clase representa un proveedor de muebles para la tienda DSIkea. Almacena información como el `ID` único, `nombre`, `contacto` y `dirección` del proveedor. La clase incluye métodos para **acceder** y **modificar** estos atributos, lo que permite gestionar eficazmente la información de los proveedores.

- **Cliente**: Esta clase representa un cliente de la tienda de muebles DSIkea. Almacena información como el `ID` único, `nombre`, `contacto` y `dirección` del cliente. Al igual que las clases anteriores, incluye métodos para **acceder** y **modificar** estos atributos, lo que facilita la gestión de los datos de los clientes en el sistema.

- **Transaccion**: define la estructura de objetos que representan transacciones. 
	- `date`: Representa la fecha de la transacción, almacenada como un objeto Date.
	- `id_mueble`: Es un número que identifica el mueble asociado con la transacción.
	- `id_implicado`: Es un número que identifica al implicado en la transacción, ya sea un cliente o un proveedor.
	- `type`: Es un tipo de transacción, que puede ser uno de los siguientes:  **Compra**,  **Venta**,  **Devolución de Cliente** o  **Devolución a Proveedor**.
	- `num_productos`: Representa el número de productos involucrados en la transacción.
	- `amount`: Es el monto asociado con la transacción, almacenado como un número.

- **Database**: esta clase se encarga de manejar cuatro colecciones de datos relacionadas con muebles, clientes, proveedores y transacciones. 
Actúa como un **singleton**, lo que significa que solo puede haber una instancia de esta clase en toda la aplicación. Utiliza la biblioteca `lowdb`, que es una base de datos JSON de código abierto, y el adaptador `FileSync` para interactuar con archivos JSON en el sistema de archivos.
	
	El código de la clase `Database` consta de las siguientes secciones principales:
	1. **Importaciones de Módulos**: Importa las bibliotecas necesarias, incluyendo `lowdb` y `FileSync` de `lowdb`, así como las clases y tipos definidos en otros archivos.

	2. **Definición de Tipos**: Define los tipos para las colecciones de datos en la base de datos, incluyendo las colecciones de muebles, clientes, proveedores y transacciones.

	3. **Clase Database**: La clase principal que gestiona la base de datos. Contiene métodos para acceder a las diferentes colecciones de datos, agregar nuevos elementos, eliminar elementos y obtener una instancia única de la clase.

	4. **Constructor**: Inicializa las bases de datos utilizando el adaptador `FileSync`, estableciendo valores por defecto si las bases de datos están vacías. Los ficheros que se inicializan en cada atributo `db` son los .json respectivos de cada database que hemos guardado, en este caso `dbClientes.json`, `dbMuebles.json`, `dbProveedores.json` y `dbTransacciones.json`.

	5. **Métodos Públicos**: Métodos para obtener las bases de datos individuales y la instancia única de la clase.

	6. **Métodos de Manipulación de Datos**: Métodos para agregar nuevos elementos a las colecciones, eliminar elementos y realizar otras operaciones de manipulación de datos.

	Para utilizar la clase `Database`, se debe seguir el siguiente flujo de trabajo:

	1. Obtener una instancia de la clase utilizando el método estático `getInstance()`, debido a que la clase es un **Singleton**.
	2. Utilizar los métodos proporcionados para realizar operaciones en la base de datos, como agregar nuevos elementos, eliminar elementos o consultar datos.

---


## Conclusión

---

## Bibliografía

- [Enunciado de la práctica](https://ull-esit-inf-dsi-2324.github.io/prct07-DSIkea-dataModel/)
- [Principios Solid](https://samueleresca.net/solid-principles-using-typescript/)
- [Instanbul](https://istanbul.js.org/)
- [Coveralls](https://coveralls.io/)
- [TypeDoc](https://typedoc.org/)
- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)
- [Inquirer](https://www.npmjs.com/package/inquirer)
- [Lowdb](https://www.npmjs.com/package/lowdb)
- [Capítulo 1 del libro *Essential TypeScript: From Beginner to Pro*](https://learning.oreilly.com/library/view/essential-typescript-4/9781484270110/html/481342_2_En_1_Chapter.xhtml)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [SonarCloud](https://sonarcloud.io)
- [Guía de Markdown](https://markdown.es/sintaxis-markdown/#links)
- [Repositorio en Github de la práctica](https://github.com/ULL-ESIT-INF-DSI-2324/ull-esit-inf-dsi-23-24-prct07-dsikea-datamodel-groupf)