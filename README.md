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
- [Tests y Código Implementado](#tests-y-código-implementado)
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

## Tests y Código Implementado

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

- **Stock**: esta clase se encarga de gestionar el inventario de muebles, así como la información de proveedores, clientes y transacciones en varias bases de datos. Su atributo principal es `_db`, que representa una instancia de las bases de datos de la clase `Database`.

	**Atributo:**

	- `_db`: Bases de datos que contienen la información de muebles, proveedores, clientes y transacciones.

	**Funciones:**

	1. **Gestión de Muebles:**
   - `addNewMueble(mueble: Mueble)`: Agrega un nuevo mueble a la base de datos.
   - `addMuebleExistente(id: number, cantidad: number)`: Agrega una cantidad específica a un mueble existente.
   - `removeMueble(id: number, cantidad: number)`: Elimina una cantidad específica de un mueble existente.
   - `modifyMueble(id: number, parametro: InfoMueble, valor: string | number)`: Modifica un atributo específico de un mueble existente.
   - `buscarMuebleByNombre(nombre: string, alfabeticamente: boolean, ascendente: boolean)`: Busca un mueble por su nombre, permitiendo ordenar los resultados alfabéticamente o por precio.
   - `buscarMuebleByTipo(tipo: string, alfabeticamente: boolean, ascendente: boolean)`: Busca muebles por su tipo, permitiendo ordenar los resultados alfabéticamente o por precio.
   - `buscarMuebleByKeyWordsDescripcion(keyWords: string, alfabeticamente: boolean, ascendente: boolean)`: Busca muebles por palabras clave en su descripción, permitiendo ordenar los resultados alfabéticamente o por precio.

	2. **Gestión de Proveedores:**
   - `addProveedor(proveedor: Proveedor)`: Agrega un nuevo proveedor a la base de datos.
   - `removeProveedor(id: number)`: Elimina un proveedor de la base de datos.
   - `modifyProveedor(id: number, parametro: InfoEntidad, valor: string)`: Modifica un atributo específico de un proveedor existente.
   - `buscarProveedorByNombre(nombre: string)`: Busca un proveedor por su nombre.
   - `buscarProveedorByContacto(contacto: string)`: Busca un proveedor por su información de contacto.
   - `buscarProveedorByDireccion(direccion: string)`: Busca un proveedor por su dirección.

	3. **Gestión de Clientes:**
   - `addCliente(cliente: Cliente)`: Agrega un nuevo cliente a la base de datos.
   - `removeCliente(id: number)`: Elimina un cliente de la base de datos.
   - `modifyCliente(id: number, parametro: InfoEntidad, valor: string)`: Modifica un atributo específico de un cliente existente.
   - `buscarClienteByNombre(nombre: string)`: Busca un cliente por su nombre.
   - `buscarClienteByContacto(contacto: string)`: Busca un cliente por su información de contacto.
   - `buscarClienteByDireccion(direccion: string)`: Busca un cliente por su dirección.

	4. **Gestión de Transacciones:**
   - `ventaMueble(idMueble: number, idCliente: number, cantidad: number)`: Registra una venta de mueble, actualizando el inventario y generando una transacción.
   - `compraMueble(idMueble: number, idProveedor: number, cantidad: number)`: Registra una compra de mueble, actualizando el inventario y generando una transacción.
   - `devolucionCliente(idMueble: number, idCliente: number, cantidad: number)`: Registra una devolución de un mueble por parte de un cliente, actualizando el inventario y generando una transacción.
   - `devolucionProveedor(idMueble: number, idProveedor: number, cantidad: number)`: Registra una devolución de un mueble a un proveedor, actualizando el inventario y generando una transacción.

	5. **Informes:**
   - `informeVentasHistorico()`: Genera un informe con las ventas totales realizadas.
   - `informeVentasMensual(mes: number, anio: number)`: Genera un informe de las ventas realizadas en un mes y año específicos.
   - `informeComprasHistorico()`: Genera un informe con las compras totales realizadas.
   - `informeComprasMensual(mes: number, anio: number)`: Genera un informe de las compras realizadas en un mes y año específicos.
   - `informeStockMuebles()`: Genera un informe del stock actual de muebles.
   - `informeStockMueblesPorTipo(tipo: string)`: Genera un informe del stock actual de muebles por un tipo específico.
   - `informeMuebleMasVendido()`: Genera un informe del mueble más vendido.
   - `informeTipoMuebleMasVendido()`: Genera un informe del tipo de mueble más vendido.
   - `informeVentasAClienteConcreto(idCliente: number)`: Genera un informe de las ventas realizadas a un cliente específico.
   - `informeComprasAProveedorConcreto(idProveedor: number)`: Genera un informe de las compras realizadas a un proveedor específico.

	6. **Funciones generales:**
	 - `obtenerNuevoID(param: 'Muebles' | 'Clientes' | 'Proveedores' | 'Transacciones')`: Obtiene un nuevo ID para un elemento específico (mueble, cliente, proveedor o transacción).
	
	**Tipos Declarados:**
	 - `InfoMueble`: Tipo que representa los atributos de un mueble ('nombre', 'tipo', 'descripcion', 'material', 'dimensiones', 'precio', 'cantidad').
	 - `InfoEntidad`: Tipo que representa los atributos de una entidad ('nombre', 'direccion', 'contacto').

	Estos tipos se utilizan como parámetros en las funciones de modificación y búsqueda para garantizar la integridad y consistencia de los datos.

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

#### stock.spec.ts
- **Se crea un stock correctamente:** Verifica que se crea una instancia válida de la clase `Stock`.
##### Mueble
- **Se añade un mueble correctamente al stock:** Asegura que los muebles se añaden correctamente al inventario.
- **Se añade un mueble existente correctamente del stock:** Verifica que se aumenta la cantidad de un mueble existente en el inventario.
- **Se modifica un mueble correctamente del stock:** Asegura que se pueden modificar los atributos de un mueble en el inventario.
- **Se elimina un mueble correctamente del stock:** Verifica que se elimina un mueble del inventario.
##### Proveedor
- **Se añade un proveedor correctamente al stock:** Asegura que se añade un proveedor al sistema.
- **Se modifica un proveedor correctamente del stock:** Verifica que se pueden modificar los datos de un proveedor existente.
- **Se elimina un proveedor correctamente del stock:** Asegura que se elimina un proveedor del sistema.
##### Cliente
- **Se añade un cliente correctamente al stock:** Verifica que se añade un cliente al sistema.
- **Se modifica un cliente correctamente del stock:** Asegura que se pueden modificar los datos de un cliente existente.
- **Se elimina un cliente correctamente del stock:** Verifica que se elimina un cliente del sistema.
##### Transacción
- **Se realiza una compra a un proveedor correctamente:** Asegura que se añade la cantidad correspondiente de un mueble al realizar una compra.
- **Se realiza una devolución a un proveedor correctamente:** Verifica que se reduce la cantidad correspondiente de un mueble al realizar una devolución al proveedor.
- **Se realiza una venta a un cliente correctamente:** Asegura que se reduce la cantidad correspondiente de un mueble al realizar una venta.
- **Se realiza una devolución a un cliente correctamente:** Verifica que se añade la cantidad correspondiente de un mueble al realizar una devolución al cliente.
##### Búsqueda
- **Se busca un mueble por nombre correctamente:** Asegura que se encuentran los muebles por su nombre y se ordenan correctamente.
- **Se busca un mueble por tipo correctamente:** Verifica que se encuentran los muebles por su tipo y se ordenan correctamente.
- **Se busca un mueble por palabras clave en su descripción correctamente:** Asegura que se encuentran los muebles por palabras clave en su descripción y se ordenan correctamente.
- **Se busca un proveedor por nombre correctamente:** Verifica que se encuentra un proveedor por su nombre.
- **Se busca un proveedor por contacto correctamente:** Asegura que se encuentra un proveedor por su contacto.
- **Se busca un proveedor por dirección correctamente:** Verifica que se encuentra un proveedor por su dirección.
- **Se busca un cliente por nombre correctamente:** Asegura que se encuentra un cliente por su nombre.
- **Se busca un cliente por contacto correctamente:** Verifica que se encuentra un cliente por su contacto.
- **Se busca un cliente por dirección correctamente:** Asegura que se encuentra un cliente por su dirección.
##### Informe
- **Genera un informe de ventas histórico correctamente:** Verifica que se genera un informe correcto de las ventas históricas.
- **Genera un informe de ventas mensual correctamente:** Asegura que se genera un informe correcto de las ventas mensuales.
- **Genera un informe de compras histórico correctamente:** Verifica que se genera un informe correcto de las compras históricas.
- **Genera un informe de compras mensual correctamente:** Asegura que se genera un informe correcto de las compras mensuales.
- **Genera un informe de stock de muebles correctamente:** Verifica que se genera un informe correcto del stock de muebles.
- **Genera un informe de stock de muebles por tipo correctamente:** Asegura que se genera un informe correcto del stock de muebles por tipo.
- **Genera un informe del mueble más vendido correctamente:** Verifica que se genera un informe correcto del mueble más vendido.
- **Genera un informe del tipo de mueble más vendido correctamente:** Asegura que se genera un informe correcto del tipo de mueble más vendido.
- **Genera un informe de ventas a un cliente concreto correctamente:** Verifica que se genera un informe correcto de las ventas a un cliente específico.
- **Genera un informe de compras a un proveedor concreto correctamente:** Asegura que se genera un informe correcto de las compras a un proveedor específico.
#### Función general
- **Obtiene un ID nuevo para Mueble/Proveedor/Cliente/Transaccion correctamente:** Genera un ID según el último ID añadido a la base de datos correspondiente.

##### Bases de datos
Las bases de datos utilizadas con los requisitos establecidos en el enunciado (20 muebles, 5 proveedores y 5 clientes) usadas para la implementación de los tests de la clase `Stock` son las siguientes:
- `dbClientes.json`:
```json
{
  "Clientes": [
    {
      "_id": 1,
      "_nombre": "Juan Pérez",
      "_contacto": "juanp@gmail.com",
      "_direccion": "Calle Falsa 123"
    },
    {
      "_id": 2,
      "_nombre": "María López",
      "_contacto": "987654321",
      "_direccion": "Calle Falsa 321"
    },
    {
      "_id": 3,
      "_nombre": "Pepe García",
      "_contacto": "123456789",
      "_direccion": "Calle Falsa 123"
    },
    {
      "_id": 4,
      "_nombre": "Ana Martínez",
      "_contacto": "anam@gmail.com",
      "_direccion": "Calle Falsa 654"
    },
    {
      "_id": 5,
      "_nombre": "Luis Rodríguez",
      "_contacto": "555555555",
      "_direccion": "Calle Falsa 555"
    }
  ]
}
```
- `dbMuebles.json`:
```json
{
  "Muebles": [
    {
      "_id": 1,
      "_tipo": "Armario",
      "_nombre": "Clásico Elegante",
      "_descripcion": "Un armario de estilo clásico con detalles de molduras y acabado en nogal",
      "_material": "Madera",
      "_dimensiones": "180 cm de ancho x 220 cm de alto x 60 cm de profundidad",
      "_precio": 1000,
      "_cantidad": 3
    },
    {
      "_id": 2,
      "_tipo": "Armario",
      "_nombre": "Moderno y Funcional",
      "_descripcion": "Un armario moderno con líneas limpias y acabado mate, diseñado para optimizar el espacio",
      "_material": "Madera",
      "_dimensiones": "50 cm de ancho x 200 cm de alto x 50 cm de profundidad",
      "_precio": 400,
      "_cantidad": 2
    },
    {
      "_id": 3,
      "_tipo": "Armario",
      "_nombre": "Estilo Industrial",
      "_descripcion": "Un armario robusto con estructura de metal negro y paneles de madera reciclada.",
      "_material": "Metal",
      "_dimensiones": "160 cm de ancho x 210 cm de alto x 55 cm de profundidad",
      "_precio": 800,
      "_cantidad": 4
    },
    {
      "_id": 4,
      "_tipo": "Armario",
      "_nombre": "Minimalista y Funcional",
      "_descripcion": "Un armario minimalista con diseño modular y acabado en blanco mate.",
      "_material": "Madera",
      "_dimensiones": "200 cm de ancho x 230 cm de alto x 60 cm de profundidad",
      "_precio": 600,
      "_cantidad": 3
    },
    {
      "_id": 5,
      "_tipo": "Armario",
      "_nombre": "Rústico y Acogedor",
      "_descripcion": "Un armario rústico con detalles de madera envejecida y tiradores de hierro forjado.",
      "_material": "Madera",
      "_dimensiones": "180 cm de ancho x 220 cm de alto x 65 cm de profundidad.",
      "_precio": 900,
      "_cantidad": 5
    },
    {
      "_id": 6,
      "_tipo": "Comoda",
      "_nombre": "Moderna Minimalista",
      "_descripcion": "Una cómoda elegante y minimalista con líneas limpias y acabado brillante.",
      "_material": "Madera",
      "_dimensiones": "120 cm de ancho x 80 cm de alto x 45 cm de profundidad",
      "_precio": 300,
      "_cantidad": 4
    },
    {
      "_id": 7,
      "_tipo": "Comoda",
      "_nombre": "Vintage Chic",
      "_descripcion": "Una cómoda vintage con encanto, detalles tallados a mano y patas torneadas.",
      "_material": "Madera",
      "_dimensiones": "100 cm de ancho x 90 cm de alto x 50 cm de profundidad",
      "_precio": 250,
      "_cantidad": 6
    },
    {
      "_id": 8,
      "_tipo": "Comoda",
      "_nombre": "Industrial Loft",
      "_descripcion": "Una cómoda robusta y urbana inspirada en el estilo industrial, con detalles de metal negro y acabado envejecido.",
      "_material": "Metal",
      "_dimensiones": "140 cm de ancho x 100 cm de alto x 60 cm de profundidad",
      "_precio": 500,
      "_cantidad": 5
    },
    {
      "_id": 9,
      "_tipo": "Comoda",
      "_nombre": "Rústica Rural",
      "_descripcion": "Una cómoda rústica con un acabado desgastado, perfecta para un ambiente campestre.",
      "_material": "Madera",
      "_dimensiones": "130 cm de ancho x 85 cm de alto x 55 cm de profundidad",
      "_precio": 200,
      "_cantidad": 7
    },
    {
      "_id": 10,
      "_tipo": "Comoda",
      "_nombre": "Contemporánea de Lujo",
      "_descripcion": "Una cómoda lujosa con un diseño contemporáneo, líneas geométricas y acabado lacado.",
      "_material": "Acero",
      "_dimensiones": "160 cm de ancho x 110 cm de alto x 50 cm de profundidad",
      "_precio": 1000,
      "_cantidad": 8
    },
    {
      "_id": 11,
      "_tipo": "Mesa",
      "_nombre": "Elegancia Clásica",
      "_descripcion": "Una mesa de comedor con un diseño clásico y elegante, perfecta para reuniones formales.",
      "_material": "Madera",
      "_dimensiones": "180 cm de largo x 90 cm de ancho x 75 cm de alto",
      "_precio": 800,
      "_cantidad": 4
    },
    {
      "_id": 12,
      "_tipo": "Mesa",
      "_nombre": "Minimalista Moderna",
      "_descripcion": "Una mesa de centro de estilo minimalista con líneas limpias y un acabado en negro mate.",
      "_material": "Vidrio",
      "_dimensiones": "120 cm de largo x 60 cm de ancho x 45 cm de alto",
      "_precio": 300,
      "_cantidad": 28
    },
    {
      "_id": 13,
      "_tipo": "Mesa",
      "_nombre": "Estilo Industrial",
      "_descripcion": "Una mesa auxiliar inspirada en el estilo industrial, con patas de metal y un tablero de madera envejecida.",
      "_material": "Metal",
      "_dimensiones": "60 cm de diámetro x 55 cm de alto",
      "_precio": 150,
      "_cantidad": 29
    },
    {
      "_id": 14,
      "_tipo": "Mesa",
      "_nombre": "Funcionalidad Moderna",
      "_descripcion": "Una mesa de estudio con un diseño moderno y funcional, equipada con estantes de almacenamiento integrados.",
      "_material": "Madera",
      "_dimensiones": "120 cm de largo x 60 cm de ancho x 75 cm de alto",
      "_precio": 200,
      "_cantidad": 7
    },
    {
      "_id": 15,
      "_tipo": "Mesa",
      "_nombre": "Rústica Al Aire Libre",
      "_descripcion": "Una mesa de jardín resistente a la intemperie, con un diseño rústico y acabado envejecido.",
      "_material": "Madera",
      "_dimensiones": "150 cm de largo x 90 cm de ancho x 75 cm de alto",
      "_precio": 500,
      "_cantidad": 75
    },
    {
      "_id": 16,
      "_tipo": "Silla",
      "_nombre": "Ergonómica Comfort",
      "_descripcion": "Una silla diseñada para proporcionar comodidad durante largas horas de trabajo o estudio, con soporte lumbar ajustable y acolchado ergonómico.",
      "_material": "Malla",
      "_dimensiones": "60 cm de ancho x 90 cm de alto x 50 cm de profundidad",
      "_precio": 150,
      "_cantidad": 42
    },
    {
      "_id": 17,
      "_tipo": "Silla",
      "_nombre": "Vintage Retro",
      "_descripcion": "Una silla de estilo retro inspirada en los diseños de mediados del siglo XX, con tapizado de cuero sintético y patas de madera de haya.",
      "_material": "Cuero sintético",
      "_dimensiones": "55 cm de ancho x 80 cm de alto x 50 cm de profundidad",
      "_precio": 100,
      "_cantidad": 19
    },
    {
      "_id": 18,
      "_tipo": "Silla",
      "_nombre": "Minimalista Moderna",
      "_descripcion": "Una silla con líneas limpias y diseño minimalista, perfecta para espacios contemporáneos, con estructura de metal y asiento de plástico moldeado.",
      "_material": "Metal",
      "_dimensiones": "45 cm de ancho x 85 cm de alto x 50 cm de profundidad",
      "_precio": 50,
      "_cantidad": 20
    },
    {
      "_id": 19,
      "_tipo": "Silla",
      "_nombre": "Campestre Acogedora",
      "_descripcion": "Una silla con encanto rural, ideal para ambientes acogedores, con respaldo de mimbre tejido a mano y estructura de madera de roble.",
      "_material": "Mimbre",
      "_dimensiones": "50 cm de ancho x 95 cm de alto x 45 cm de profundidad",
      "_precio": 80,
      "_cantidad": 8
    },
    {
      "_id": 20,
      "_tipo": "Silla",
      "_nombre": "Industrial Vintage",
      "_descripcion": "Una silla robusta con un toque industrial, con estructura de metal envejecido y asiento de madera maciza reciclada.",
      "_material": "Metal",
      "_dimensiones": "40 cm de ancho x 85 cm de alto x 40 cm de profundidad",
      "_precio": 80,
      "_cantidad": 60
    }
  ]
}
```
- `dbProveedores.json`:
```json
{
  "Proveedores": [
    {
      "_id": 1,
      "_nombre": "Proveedor 1",
      "_contacto": "177784894",
      "_direccion": "Direccion 1"
    },
    {
      "_id": 2,
      "_nombre": "Proveedor 2",
      "_contacto": "prov2@gmail.com",
      "_direccion": "Direccion 2"
    },
    {
      "_id": 3,
      "_nombre": "Proveedor 3",
      "_contacto": "777777777",
      "_direccion": "Direccion 3"
    },
    {
      "_id": 4,
      "_nombre": "Proveedor 4",
      "_contacto": "123456789",
      "_direccion": "Direccion 4"
    },
    {
      "_id": 5,
      "_nombre": "Proveedor 5",
      "_contacto": "prov5@gmail.com",
      "_direccion": "Direccion 5"
    }
  ]
}
```
- `dbTransacciones.json`:
```json
{
  "Transacciones": [
    {
      "date": "2024-03-16T14:20:58.542Z",
      "id_mueble": 13,
      "id_implicado": 1,
      "type": "Venta",
      "num_productos": 3,
      "amount": 450
    },
    {
      "date": "2024-03-16T14:24:33.613Z",
      "id_mueble": 20,
      "id_implicado": 2,
      "type": "Venta",
      "num_productos": 60,
      "amount": 4800
    },
    {
      "date": "2024-03-16T14:25:27.869Z",
      "id_mueble": 19,
      "id_implicado": 3,
      "type": "Compra",
      "num_productos": 8,
      "amount": 640
    },
    {
      "date": "2024-03-16T14:26:10.553Z",
      "id_mueble": 19,
      "id_implicado": 3,
      "type": "Devolución a Proveedor",
      "num_productos": 2,
      "amount": 160
    },
    {
      "date": "2024-03-17T18:17:57.258Z",
      "id_mueble": 1,
      "id_implicado": 1,
      "type": "Compra",
      "num_productos": 5,
      "amount": 5000
    },
    {
      "date": "2024-03-17T18:17:57.260Z",
      "id_mueble": 1,
      "id_implicado": 1,
      "type": "Devolución a Proveedor",
      "num_productos": 5,
      "amount": 5000
    },
    {
      "date": "2024-03-17T18:17:57.263Z",
      "id_mueble": 2,
      "id_implicado": 2,
      "type": "Venta",
      "num_productos": 1,
      "amount": 400
    },
    {
      "date": "2024-03-17T18:17:57.265Z",
      "id_mueble": 2,
      "id_implicado": 2,
      "type": "Devolución de Cliente",
      "num_productos": 1,
      "amount": 400
    }
  ]
}
```

### Programa principal
Hemos creado un programa **main** en el fichero `main.ts` que contiene funciones asíncronas que establecen un menú usando `Inquirer.js` y una instancia de la clase `Stock` global. Dichas funciones llaman al resto de funciones de gestión de un stock dinámico usando la instancia de las bases de datos de la clase `Database`, inicializada como atributo en la clase `Stock`. De esta forma, obtenemos un menú interactivo para que el usuario pueda utilizar todas las funcionalidades implementadas y testeadas anteriores.

---


## Conclusión
Durante la práctica se describe el desarrollo de un sistema de gestión para una tienda de muebles llamada DSIkea, enfocado en el diseño orientado a objetos y el uso de herramientas de programación. Se destacan objetivos como la implementación de pruebas unitarias, la aplicación de principios SOLID y el diseño de clases como `Mueble`, `Proveedor`, `Cliente` y `Transaccion`, junto con la gestión de datos mediante la clase `Database`. Se realizan pruebas exhaustivas para garantizar el correcto funcionamiento del sistema, incluyendo aspectos como la creación, modificación y eliminación de elementos, así como la generación de informes sobre ventas, compras y estado del inventario. Por último, destacamos el aprendizaje del uso de los dos módulos `Inquirer.js` y `Lowdb`.

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