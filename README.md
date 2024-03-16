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
```typescript
import 'mocha';
import { expect } from 'chai';

import { Mueble } from '../src/dsikea/mueble.js';

describe('Tests de la clase Mueble', () => {
	let armario1: Mueble;
	let armario2: Mueble;
	let armario3: Mueble;
	let armario4: Mueble;
	let armario5: Mueble;

	let comoda1: Mueble;
	let comoda2: Mueble;
	let comoda3: Mueble;
	let comoda4: Mueble;
	let comoda5: Mueble;

	let mesa1: Mueble;
	let mesa2: Mueble;
	let mesa3: Mueble;
	let mesa4: Mueble;
	let mesa5: Mueble;

	let silla1: Mueble;
	let silla2: Mueble;
	let silla3: Mueble;
	let silla4: Mueble;
	let silla5: Mueble;

	beforeEach(() => {
		// Armarios
		armario1 = new Mueble(1, 'Armario', 'Clásico Elegante', 'Un armario de estilo clásico con detalles de molduras y acabado en nogal',
		'Madera', '180 cm de ancho x 220 cm de alto x 60 cm de profundidad', 1000, 1);
		armario2 = new Mueble(2, 'Armario', 'Moderno y Funcional', 'Un armario moderno con líneas limpias y acabado mate, diseñado para optimizar el espacio',
		'Madera', '50 cm de ancho x 200 cm de alto x 50 cm de profundidad.', 400, 2);
		armario3 = new Mueble(3, 'Armario', 'Estilo Industrial', 'Un armario robusto con estructura de metal negro y paneles de madera reciclada.',
		'Metal', '160 cm de ancho x 210 cm de alto x 55 cm de profundidad', 800, 4);
		armario4 = new Mueble(4, 'Armario', 'Minimalista y Funcional', 'Un armario minimalista con diseño modular y acabado en blanco mate.',
		'Madera', '200 cm de ancho x 230 cm de alto x 60 cm de profundidad', 600, 3);
		armario5 = new Mueble(5, 'Armario', 'Rústico y Acogedor', 'Un armario rústico con detalles de madera envejecida y tiradores de hierro forjado.',
		'Madera', '180 cm de ancho x 220 cm de alto x 65 cm de profundidad.', 900, 5);

		// Comodas
		comoda1 = new Mueble(6, 'Comoda', 'Moderna Minimalista', 'Una cómoda elegante y minimalista con líneas limpias y acabado brillante.', 
		'Madera', '120 cm de ancho x 80 cm de alto x 45 cm de profundidad', 300, 4);
		comoda2 = new Mueble(7, 'Comoda', 'Vintage Chic', 'Una cómoda vintage con encanto, detalles tallados a mano y patas torneadas.', 
		'Madera', '100 cm de ancho x 90 cm de alto x 50 cm de profundidad', 250, 6);
		comoda3 = new Mueble(8, 'Comoda', 'Industrial Loft', 'Una cómoda robusta y urbana inspirada en el estilo industrial, con detalles de metal negro y acabado envejecido.',
		'Metal', '140 cm de ancho x 100 cm de alto x 60 cm de profundidad', 500, 5);
		comoda4 = new Mueble(9, 'Comoda', 'Rústica Rural', 'Una cómoda rústica con un acabado desgastado, perfecta para un ambiente campestre.', 
		'Madera', '130 cm de ancho x 85 cm de alto x 55 cm de profundidad', 200, 7);
		comoda5 = new Mueble(10, 'Comoda', 'Contemporánea de Lujo', 'Una cómoda lujosa con un diseño contemporáneo, líneas geométricas y acabado lacado.', 
		'Acero', '160 cm de ancho x 110 cm de alto x 50 cm de profundidad', 1000, 8);

		// Mesas
		mesa1 = new Mueble(11, 'Mesa', 'Elegancia Clásica', 'Una mesa de comedor con un diseño clásico y elegante, perfecta para reuniones formales.',
		'Madera', '180 cm de largo x 90 cm de ancho x 75 cm de alto', 800, 5);
		mesa2 = new Mueble(12, 'Mesa', 'Minimalista Moderna', 'Una mesa de centro de estilo minimalista con líneas limpias y un acabado en negro mate.',
		'Vidrio', '120 cm de largo x 60 cm de ancho x 45 cm de alto', 300, 8);
		mesa3 = new Mueble(13, 'Mesa', 'Estilo Industrial', 'Una mesa auxiliar inspirada en el estilo industrial, con patas de metal y un tablero de madera envejecida.',
		'Metal', '60 cm de diámetro x 55 cm de alto', 150, 2);
		mesa4 = new Mueble(14, 'Mesa', 'Funcionalidad Moderna', 'Una mesa de estudio con un diseño moderno y funcional, equipada con estantes de almacenamiento integrados.',
		'Madera', '120 cm de largo x 60 cm de ancho x 75 cm de alto', 200, 1);
		mesa5 = new Mueble(15, 'Mesa', 'Rústica Al Aire Libre', 'Una mesa de jardín resistente a la intemperie, con un diseño rústico y acabado envejecido.',
		'Madera', '150 cm de largo x 90 cm de ancho x 75 cm de alto', 500, 4);

		// Sillas
		silla1 = new Mueble(16, 'Silla', 'Ergonómica Comfort', 'Una silla diseñada para proporcionar comodidad durante largas horas de trabajo o estudio, con soporte lumbar ajustable y acolchado ergonómico.',
		'Malla', '60 cm de ancho x 90 cm de alto x 50 cm de profundidad', 150, 2);
		silla2 = new Mueble(17, 'Silla', 'Vintage Retro', 'Una silla de estilo retro inspirada en los diseños de mediados del siglo XX, con tapizado de cuero sintético y patas de madera de haya.',
		'Cuero sintético', '55 cm de ancho x 80 cm de alto x 50 cm de profundidad', 100, 8);
		silla3 = new Mueble(18, 'Silla', 'Minimalista Moderna', 'Una silla con líneas limpias y diseño minimalista, perfecta para espacios contemporáneos, con estructura de metal y asiento de plástico moldeado.',
		'Metal', '45 cm de ancho x 85 cm de alto x 50 cm de profundidad', 50, 12);
		silla4 = new Mueble(19, 'Silla','Campestre Acogedora', 'Una silla con encanto rural, ideal para ambientes acogedores, con respaldo de mimbre tejido a mano y estructura de madera de roble.',
		'Mimbre', '50 cm de ancho x 95 cm de alto x 45 cm de profundidad', 80, 4);
		silla5 = new Mueble(20, 'Silla', 'Industrial Vintage', 'Una silla robusta con un toque industrial, con estructura de metal envejecido y asiento de madera maciza reciclada.',
		'Metal', '40 cm de ancho x 85 cm de alto x 40 cm de profundidad', 80, 4);
	});
	
	it('Se crea un armario correctamente', () => {
		expect(armario1).to.be.an.instanceof(Mueble);
		expect(armario2).to.be.an.instanceof(Mueble);
		expect(armario3).to.be.an.instanceof(Mueble);
		expect(armario4).to.be.an.instanceof(Mueble);
		expect(armario5).to.be.an.instanceof(Mueble);
	});
	
	it('Se crea una cómoda correctamente', () => {
		expect(comoda1).to.be.an.instanceof(Mueble);
		expect(comoda2).to.be.an.instanceof(Mueble);
		expect(comoda3).to.be.an.instanceof(Mueble);
		expect(comoda4).to.be.an.instanceof(Mueble);
		expect(comoda5).to.be.an.instanceof(Mueble);
	});
	
	it('Se crea una mesa correctamente', () => {
		expect(mesa1).to.be.an.instanceof(Mueble);
		expect(mesa2).to.be.an.instanceof(Mueble);
		expect(mesa3).to.be.an.instanceof(Mueble);
		expect(mesa4).to.be.an.instanceof(Mueble);
		expect(mesa5).to.be.an.instanceof(Mueble);
	});
	
	it('Se crea una silla correctamente', () => {
		expect(silla1).to.be.an.instanceof(Mueble);
		expect(silla2).to.be.an.instanceof(Mueble);
		expect(silla3).to.be.an.instanceof(Mueble);
		expect(silla4).to.be.an.instanceof(Mueble);
		expect(silla5).to.be.an.instanceof(Mueble);
	});
	
	it('Se inicializa un armario correctamente', () => {
		expect(armario1.id).to.equal(1);
		expect(armario1.tipo).to.equal('Armario');
		expect(armario1.nombre).to.equal('Clásico Elegante');
		expect(armario1.descripcion).to.equal('Un armario de estilo clásico con detalles de molduras y acabado en nogal');
		expect(armario1.material).to.equal('Madera');
		expect(armario1.dimensiones).to.equal('180 cm de ancho x 220 cm de alto x 60 cm de profundidad');
		expect(armario1.precio).to.equal(1000);
		expect(armario1.cantidad).to.equal(1);

		expect(armario2.id).to.equal(2);
		expect(armario2.tipo).to.equal('Armario');
		expect(armario2.nombre).to.equal('Moderno y Funcional');
		expect(armario2.descripcion).to.equal('Un armario moderno con líneas limpias y acabado mate, diseñado para optimizar el espacio');
		expect(armario2.material).to.equal('Madera');
		expect(armario2.dimensiones).to.equal('50 cm de ancho x 200 cm de alto x 50 cm de profundidad.');
		expect(armario2.precio).to.equal(400);
		expect(armario2.cantidad).to.equal(2);

		expect(armario3.id).to.equal(3);
		expect(armario3.tipo).to.equal('Armario');
		expect(armario3.nombre).to.equal('Estilo Industrial');
		expect(armario3.descripcion).to.equal('Un armario robusto con estructura de metal negro y paneles de madera reciclada.');
		expect(armario3.material).to.equal('Metal');
		expect(armario3.dimensiones).to.equal('160 cm de ancho x 210 cm de alto x 55 cm de profundidad');
		expect(armario3.precio).to.equal(800);
		expect(armario3.cantidad).to.equal(4);

		expect(armario4.id).to.equal(4);
		expect(armario4.tipo).to.equal('Armario');
		expect(armario4.nombre).to.equal('Minimalista y Funcional');
		expect(armario4.descripcion).to.equal('Un armario minimalista con diseño modular y acabado en blanco mate.');
		expect(armario4.material).to.equal('Madera');
		expect(armario4.dimensiones).to.equal('200 cm de ancho x 230 cm de alto x 60 cm de profundidad');
		expect(armario4.precio).to.equal(600);
		expect(armario4.cantidad).to.equal(3);

		expect(armario5.id).to.equal(5);
		expect(armario5.tipo).to.equal('Armario');
		expect(armario5.nombre).to.equal('Rústico y Acogedor');
		expect(armario5.descripcion).to.equal('Un armario rústico con detalles de madera envejecida y tiradores de hierro forjado.');
		expect(armario5.material).to.equal('Madera');
		expect(armario5.dimensiones).to.equal('180 cm de ancho x 220 cm de alto x 65 cm de profundidad.');
		expect(armario5.precio).to.equal(900);
		expect(armario5.cantidad).to.equal(5);
	});
	
	it('Se inicializa una comoda correctamente', () => {
		expect(comoda1.id).to.equal(6);
		expect(comoda1.tipo).to.equal('Comoda');
		expect(comoda1.nombre).to.equal('Moderna Minimalista');
		expect(comoda1.descripcion).to.equal('Una cómoda elegante y minimalista con líneas limpias y acabado brillante.');
		expect(comoda1.material).to.equal('Madera');
		expect(comoda1.dimensiones).to.equal('120 cm de ancho x 80 cm de alto x 45 cm de profundidad');
		expect(comoda1.precio).to.equal(300);
		expect(comoda1.cantidad).to.equal(4);

		expect(comoda2.id).to.equal(7);
		expect(comoda2.tipo).to.equal('Comoda');
		expect(comoda2.nombre).to.equal('Vintage Chic');
		expect(comoda2.descripcion).to.equal('Una cómoda vintage con encanto, detalles tallados a mano y patas torneadas.');
		expect(comoda2.material).to.equal('Madera');
		expect(comoda2.dimensiones).to.equal('100 cm de ancho x 90 cm de alto x 50 cm de profundidad');
		expect(comoda2.precio).to.equal(250);
		expect(comoda2.cantidad).to.equal(6);

		expect(comoda3.id).to.equal(8);
		expect(comoda3.tipo).to.equal('Comoda');
		expect(comoda3.nombre).to.equal('Industrial Loft');
		expect(comoda3.descripcion).to.equal('Una cómoda robusta y urbana inspirada en el estilo industrial, con detalles de metal negro y acabado envejecido.');
		expect(comoda3.material).to.equal('Metal');
		expect(comoda3.dimensiones).to.equal('140 cm de ancho x 100 cm de alto x 60 cm de profundidad');
		expect(comoda3.precio).to.equal(500);
		expect(comoda3.cantidad).to.equal(5);

		expect(comoda4.id).to.equal(9);
		expect(comoda4.tipo).to.equal('Comoda');
		expect(comoda4.nombre).to.equal('Rústica Rural');
		expect(comoda4.descripcion).to.equal('Una cómoda rústica con un acabado desgastado, perfecta para un ambiente campestre.');
		expect(comoda4.material).to.equal('Madera');
		expect(comoda4.dimensiones).to.equal('130 cm de ancho x 85 cm de alto x 55 cm de profundidad');
		expect(comoda4.precio).to.equal(200);
		expect(comoda4.cantidad).to.equal(7);

		expect(comoda5.id).to.equal(10);
		expect(comoda5.tipo).to.equal('Comoda');
		expect(comoda5.nombre).to.equal('Contemporánea de Lujo');
		expect(comoda5.descripcion).to.equal('Una cómoda lujosa con un diseño contemporáneo, líneas geométricas y acabado lacado.');
		expect(comoda5.material).to.equal('Acero');
		expect(comoda5.dimensiones).to.equal('160 cm de ancho x 110 cm de alto x 50 cm de profundidad');
		expect(comoda5.precio).to.equal(1000);
		expect(comoda5.cantidad).to.equal(8);
	});
	
	it('Se inicializa una mesa correctamente', () => {
		expect(mesa1.id).to.be.equal(11);
		expect(mesa1.tipo).to.be.equal('Mesa');
		expect(mesa1.nombre).to.be.equal('Elegancia Clásica');
		expect(mesa1.descripcion).to.be.equal('Una mesa de comedor con un diseño clásico y elegante, perfecta para reuniones formales.');
		expect(mesa1.material).to.be.equal('Madera');
		expect(mesa1.dimensiones).to.be.equal('180 cm de largo x 90 cm de ancho x 75 cm de alto');
		expect(mesa1.precio).to.be.equal(800);
		expect(mesa1.cantidad).to.be.equal(5);

		expect(mesa2.id).to.be.equal(12);
		expect(mesa2.tipo).to.be.equal('Mesa');
		expect(mesa2.nombre).to.be.equal('Minimalista Moderna');
		expect(mesa2.descripcion).to.be.equal('Una mesa de centro de estilo minimalista con líneas limpias y un acabado en negro mate.');
		expect(mesa2.material).to.be.equal('Vidrio');
		expect(mesa2.dimensiones).to.be.equal('120 cm de largo x 60 cm de ancho x 45 cm de alto');
		expect(mesa2.precio).to.be.equal(300);
		expect(mesa2.cantidad).to.be.equal(8);

		expect(mesa3.id).to.be.equal(13);
		expect(mesa3.tipo).to.be.equal('Mesa');
		expect(mesa3.nombre).to.be.equal('Estilo Industrial');
		expect(mesa3.descripcion).to.be.equal('Una mesa auxiliar inspirada en el estilo industrial, con patas de metal y un tablero de madera envejecida.');
		expect(mesa3.material).to.be.equal('Metal');
		expect(mesa3.dimensiones).to.be.equal('60 cm de diámetro x 55 cm de alto');
		expect(mesa3.precio).to.be.equal(150);
		expect(mesa3.cantidad).to.be.equal(2);

		expect(mesa4.id).to.be.equal(14);
		expect(mesa4.tipo).to.be.equal('Mesa');
		expect(mesa4.nombre).to.be.equal('Funcionalidad Moderna');
		expect(mesa4.descripcion).to.be.equal('Una mesa de estudio con un diseño moderno y funcional, equipada con estantes de almacenamiento integrados.');
		expect(mesa4.material).to.be.equal('Madera');
		expect(mesa4.dimensiones).to.be.equal('120 cm de largo x 60 cm de ancho x 75 cm de alto');
		expect(mesa4.precio).to.be.equal(200);
		expect(mesa4.cantidad).to.be.equal(1);

		expect(mesa5.id).to.be.equal(15);
		expect(mesa5.tipo).to.be.equal('Mesa');
		expect(mesa5.nombre).to.be.equal('Rústica Al Aire Libre');
		expect(mesa5.descripcion).to.be.equal('Una mesa de jardín resistente a la intemperie, con un diseño rústico y acabado envejecido.');
		expect(mesa5.material).to.be.equal('Madera');
		expect(mesa5.dimensiones).to.be.equal('150 cm de largo x 90 cm de ancho x 75 cm de alto');
		expect(mesa5.precio).to.be.equal(500);
		expect(mesa5.cantidad).to.be.equal(4);
	});
	
	it('Se inicializa una silla correctamente', () => {
		expect(silla1.id).to.be.equal(16);
		expect(silla1.tipo).to.be.equal('Silla');
		expect(silla1.nombre).to.be.equal('Ergonómica Comfort');
		expect(silla1.descripcion).to.be.equal('Una silla diseñada para proporcionar comodidad durante largas horas de trabajo o estudio, con soporte lumbar ajustable y acolchado ergonómico.');
		expect(silla1.material).to.be.equal('Malla');
		expect(silla1.dimensiones).to.be.equal('60 cm de ancho x 90 cm de alto x 50 cm de profundidad');
		expect(silla1.precio).to.be.equal(150);
		expect(silla1.cantidad).to.be.equal(2);

		expect(silla2.id).to.be.equal(17);
		expect(silla2.tipo).to.be.equal('Silla');
		expect(silla2.nombre).to.be.equal('Vintage Retro');
		expect(silla2.descripcion).to.be.equal('Una silla de estilo retro inspirada en los diseños de mediados del siglo XX, con tapizado de cuero sintético y patas de madera de haya.');
		expect(silla2.material).to.be.equal('Cuero sintético');
		expect(silla2.dimensiones).to.be.equal('55 cm de ancho x 80 cm de alto x 50 cm de profundidad');
		expect(silla2.precio).to.be.equal(100);
		expect(silla2.cantidad).to.be.equal(8);

		expect(silla3.id).to.be.equal(18);
		expect(silla3.tipo).to.be.equal('Silla');
		expect(silla3.nombre).to.be.equal('Minimalista Moderna');
		expect(silla3.descripcion).to.be.equal('Una silla con líneas limpias y diseño minimalista, perfecta para espacios contemporáneos, con estructura de metal y asiento de plástico moldeado.');
		expect(silla3.material).to.be.equal('Metal');
		expect(silla3.dimensiones).to.be.equal('45 cm de ancho x 85 cm de alto x 50 cm de profundidad');
		expect(silla3.precio).to.be.equal(50);
		expect(silla3.cantidad).to.be.equal(12);

		expect(silla4.id).to.be.equal(19);
		expect(silla4.tipo).to.be.equal('Silla');
		expect(silla4.nombre).to.be.equal('Campestre Acogedora');
		expect(silla4.descripcion).to.be.equal('Una silla con encanto rural, ideal para ambientes acogedores, con respaldo de mimbre tejido a mano y estructura de madera de roble.');
		expect(silla4.material).to.be.equal('Mimbre');
		expect(silla4.dimensiones).to.be.equal('50 cm de ancho x 95 cm de alto x 45 cm de profundidad');
		expect(silla4.precio).to.be.equal(80);
		expect(silla4.cantidad).to.be.equal(4);

		expect(silla5.id).to.be.equal(20);
		expect(silla5.tipo).to.be.equal('Silla');
		expect(silla5.nombre).to.be.equal('Industrial Vintage');
		expect(silla5.descripcion).to.be.equal('Una silla robusta con un toque industrial, con estructura de metal envejecido y asiento de madera maciza reciclada.');
		expect(silla5.material).to.be.equal('Metal');
		expect(silla5.dimensiones).to.be.equal('40 cm de ancho x 85 cm de alto x 40 cm de profundidad');
		expect(silla5.precio).to.be.equal(80);
		expect(silla5.cantidad).to.be.equal(4);
	});

	it('Se actualiza un armario correctamente', () => {
		armario1.nombre = 'Clásico Elegante 2';
		armario1.descripcion = 'Un armario de estilo clásico con detalles de molduras y acabado en nogal. Versión 2.';
		armario1.material = 'Madera de pino';
		armario1.dimensiones = '180 cm de ancho x 220 cm de alto x 60 cm de profundidad';
		armario1.precio = 1200;
		armario1.cantidad = 2;

		expect(armario1.nombre).to.equal('Clásico Elegante 2');
		expect(armario1.descripcion).to.equal('Un armario de estilo clásico con detalles de molduras y acabado en nogal. Versión 2.');
		expect(armario1.material).to.equal('Madera de pino');
		expect(armario1.dimensiones).to.equal('180 cm de ancho x 220 cm de alto x 60 cm de profundidad');
		expect(armario1.precio).to.equal(1200);
		expect(armario1.cantidad).to.equal(2);
	});
	
	it('Se actualiza una cómoda correctamente', () => {
		comoda1.nombre = 'Moderna Minimalista 2';
		comoda1.descripcion = 'Una cómoda elegante y minimalista con líneas limpias y acabado brillante. Versión 2.';
		comoda1.material = 'Madera de roble';
		comoda1.dimensiones = '120 cm de ancho x 80 cm de alto x 45 cm de profundidad';
		comoda1.precio = 350;
		comoda1.cantidad = 5;

		expect(comoda1.nombre).to.equal('Moderna Minimalista 2');
		expect(comoda1.descripcion).to.equal('Una cómoda elegante y minimalista con líneas limpias y acabado brillante. Versión 2.');
		expect(comoda1.material).to.equal('Madera de roble');
		expect(comoda1.dimensiones).to.equal('120 cm de ancho x 80 cm de alto x 45 cm de profundidad');
		expect(comoda1.precio).to.equal(350);
		expect(comoda1.cantidad).to.equal(5);
	});
	
	it('Se actualiza una mesa correctamente', () => {
		mesa1.nombre = 'Elegancia Clásica 2';
		mesa1.descripcion = 'Una mesa de comedor con un diseño clásico y elegante, perfecta para reuniones formales. Versión 2.';
		mesa1.material = 'Madera de pino';
		mesa1.dimensiones = '180 cm de largo x 90 cm de ancho x 75 cm de alto';
		mesa1.precio = 850;
		mesa1.cantidad = 7;

		expect(mesa1.nombre).to.equal('Elegancia Clásica 2');
		expect(mesa1.descripcion).to.equal('Una mesa de comedor con un diseño clásico y elegante, perfecta para reuniones formales. Versión 2.');
		expect(mesa1.material).to.equal('Madera de pino');
		expect(mesa1.dimensiones).to.equal('180 cm de largo x 90 cm de ancho x 75 cm de alto');
		expect(mesa1.precio).to.equal(850);
		expect(mesa1.cantidad).to.equal(7);
	});
	
	it('Se actualiza una silla correctamente', () => {
		silla1.nombre = 'Ergonómica Comfort 2';
		silla1.descripcion = 'Una silla diseñada para proporcionar comodidad durante largas horas de trabajo o estudio, con soporte lumbar ajustable y acolchado ergonómico. Versión 2.';
		silla1.material = 'Malla de alta calidad';
		silla1.dimensiones = '60 cm de ancho x 90 cm de alto x 50 cm de profundidad';
		silla1.precio = 200;
		silla1.cantidad = 3;

		expect(silla1.nombre).to.equal('Ergonómica Comfort 2');
		expect(silla1.descripcion).to.equal('Una silla diseñada para proporcionar comodidad durante largas horas de trabajo o estudio, con soporte lumbar ajustable y acolchado ergonómico. Versión 2.');
		expect(silla1.material).to.equal('Malla de alta calidad');
		expect(silla1.dimensiones).to.equal('60 cm de ancho x 90 cm de alto x 50 cm de profundidad');
		expect(silla1.precio).to.equal(200);
		expect(silla1.cantidad).to.equal(3);
	});
});
```

#### proveedor.spec.ts
- **Se crea un proveedor correctamente:** Verifica si se crea correctamente un objeto de tipo `Proveedor`.
- **Se inicializa un proveedor correctamente:** Comprueba si se inicializan correctamente los atributos de un objeto `Proveedor`.
- **Se actualiza un proveedor correctamente:** Verifica si se actualizan correctamente los atributos de un proveedor específico.
```typescript
import 'mocha';
import { expect } from 'chai';

import { Proveedor } from '../src/dsikea/proveedor.js';

describe('Tests de la clase Proveedor', () => {
	let proveedor1: Proveedor;
	let proveedor2: Proveedor;

	beforeEach(() => {
		// Id: number, nombre: string, contacto: string, direccion: string
		proveedor1 = new Proveedor(1, 'Proveedor 1', '177784894', 'Direccion 1');
		proveedor2 = new Proveedor(2, 'Proveedor 2', 'prov2@gmail.com', 'Direccion 2');
	});

	it('Se crea un proveedor correctamente', () => {
		expect(proveedor1).to.be.an.instanceOf(Proveedor);
		expect(proveedor2).to.be.an.instanceOf(Proveedor);
	});

	it('Se inicializa un proveedor correctamente', () => {
		expect(proveedor1.id).to.equal(1);
		expect(proveedor1.nombre).to.equal('Proveedor 1');
		expect(proveedor1.contacto).to.equal('177784894');
		expect(proveedor1.direccion).to.equal('Direccion 1');

		expect(proveedor2.id).to.equal(2);
		expect(proveedor2.nombre).to.equal('Proveedor 2');
		expect(proveedor2.contacto).to.equal('prov2@gmail.com');
		expect(proveedor2.direccion).to.equal('Direccion 2');
	});

	it('Se actualiza un proveedor correctamente', () => {
		proveedor1.nombre = 'Proveedor 1 actualizado';
		proveedor1.contacto = '4984847771';
		proveedor1.direccion = 'Direccion 1 actualizada';
		expect(proveedor1.nombre).to.equal('Proveedor 1 actualizado');
		expect(proveedor1.contacto).to.equal('4984847771');
		expect(proveedor1.direccion).to.equal('Direccion 1 actualizada');

		proveedor2.nombre = 'Proveedor 2 actualizado';
		proveedor2.contacto = 'prov2.actualizada@gmail.com';
		proveedor2.direccion = 'Direccion 2 actualizada';
		expect(proveedor2.nombre).to.equal('Proveedor 2 actualizado');
		expect(proveedor2.contacto).to.equal('prov2.actualizada@gmail.com');
		expect(proveedor2.direccion).to.equal('Direccion 2 actualizada');
	});
});
```

#### cliente.spec.ts
- **Se crea un cliente correctamente:** Comprueba si se crea correctamente un objeto de tipo `Cliente`.
- **Se inicializa un cliente correctamente:** Verifica si se inicializan correctamente los atributos de un objeto `Cliente`.
- **Se actualiza un cliente correctamente:** Verifica si se actualizan correctamente los atributos de un cliente específico.
```typescript
import 'mocha';
import { expect } from 'chai';

import { Cliente } from '../src/dsikea/cliente.js';

describe('Tests de la clase Cliente', () => {
	let cliente1: Cliente;
	let cliente2: Cliente;

	beforeEach(() => {
		cliente1 = new Cliente(12345678, 'Juan Pérez', 'juanp@gmail.com', 'Calle Falsa 123');
		cliente2 = new Cliente(87654321, 'María López', '987654321', 'Calle Falsa 321');
	});

	it('Se crea un cliente correctamente', () => {
		expect(cliente1).to.be.an.instanceOf(Cliente);
		expect(cliente2).to.be.an.instanceOf(Cliente);
	});

	it('Se inicializa el cliente correctamente', () => {
		expect(cliente1.id).to.equal(12345678);
		expect(cliente1.nombre).to.equal('Juan Pérez');
		expect(cliente1.contacto).to.equal('juanp@gmail.com');
		expect(cliente1.direccion).to.equal('Calle Falsa 123');

		expect(cliente2.id).to.equal(87654321);
		expect(cliente2.nombre).to.equal('María López');
		expect(cliente2.contacto).to.equal('987654321');
		expect(cliente2.direccion).to.equal('Calle Falsa 321');
	});

	it('Se actualiza un cliente correctamente', () => {
		cliente1.nombre = 'María López';
		expect(cliente1.nombre).to.equal('María López');
		cliente1.contacto = '987654321';
		expect(cliente1.contacto).to.equal('987654321');
		cliente1.direccion = 'Calle Falsa 321';
		expect(cliente1.direccion).to.equal('Calle Falsa 321');

		cliente2.nombre = 'Juan Pérez';
		expect(cliente2.nombre).to.equal('Juan Pérez');
		cliente2.contacto = 'juanp@gmail.com';
		expect(cliente2.contacto).to.equal('juanp@gmail.com');
		cliente2.direccion = 'Calle Falsa 123';
		expect(cliente2.direccion).to.equal('Calle Falsa 123');
	});
});
	
```

### Clases Usadas

- **Mueble**: Esta clase representa un mueble en la tienda de muebles DSIkea. Almacena información como el ID único, tipo de mueble, nombre, descripción, material, dimensiones, precio y cantidad disponible en inventario. La clase incluye métodos para acceder y modificar estos atributos, lo que garantiza la integridad de los datos y facilita su gestión.

```typescript
export class Mueble {
  _id: number;
  _tipo: string;
  _nombre: string;
  _descripcion: string;
  _material: string;
  _dimensiones: string;
  _precio: number;
  _cantidad: number;

  constructor(id: number, tipo: string, nombre: string, descripcion: string, material: string, dimensiones: string, precio: number, cantidad: number) {
    this._id = id;
    this._tipo = tipo;
    this._nombre = nombre;
    this._descripcion = descripcion;
    this._material = material;
    this._dimensiones = dimensiones;
    this._precio = precio;
    this._cantidad = cantidad;
  }

  get id() {
    return this._id;
  }

  get tipo() {
    return this._tipo;
  }

  get nombre() {
    return this._nombre;
  }

  get descripcion() {
    return this._descripcion;
  }

  get material() {
    return this._material;
  }

  get dimensiones() {
    return this._dimensiones;
  }

  get precio() {
    return this._precio;
  }

  get cantidad() {
    return this._cantidad;
  }

  set nombre(nombre: string) {
    this._nombre = nombre;
  }

  set tipo(tipo: string) {
    this._tipo = tipo;
  }

  set descripcion(descripcion: string) {
    this._descripcion = descripcion;
  }

  set material(material: string) {
    this._material = material;
  }

  set dimensiones(dimensiones: string) {
    this._dimensiones = dimensiones;
  }

  set precio(precio: number) {
    this._precio = precio;
  }

  set cantidad(cantidad: number) {
    this._cantidad = cantidad;
  }
}
```

- **Proveedor**: Esta clase representa un proveedor de muebles para la tienda DSIkea. Almacena información como el ID único, nombre, contacto y dirección del proveedor. La clase incluye métodos para acceder y modificar estos atributos, lo que permite gestionar eficazmente la información de los proveedores.

```typescript
export class Proveedor {
	_id: number;
	_nombre: string;
	_contacto: string;
	_direccion: string;

	constructor(id: number, nombre: string, contacto: string, direccion: string) {
		this._id = id;
		this._nombre = nombre;
		this._contacto = contacto;
		this._direccion = direccion;
	}

	get id() {
		return this._id;
	}

	get nombre() {
		return this._nombre;
	}

	get contacto() {
		return this._contacto;
	}

	get direccion() {
		return this._direccion;
	}

	set nombre(nombre: string) {
		this._nombre = nombre;
	}

	set contacto(contacto: string) {
		this._contacto = contacto;
	}

	set direccion(direccion: string) {
		this._direccion = direccion;
	}
}
```

- **Cliente**: Esta clase representa un cliente de la tienda de muebles DSIkea. Almacena información como el ID único, nombre, contacto y dirección del cliente. Al igual que las clases anteriores, incluye métodos para acceder y modificar estos atributos, lo que facilita la gestión de los datos de los clientes en el sistema.

```typescript
export class Cliente {
	_id: number;
	_nombre: string;
	_contacto: string;
	_direccion: string;

	constructor(id: number, nombre: string, contacto: string, direccion: string) {
		this._id = id;
		this._nombre = nombre;
		this._contacto = contacto;
		this._direccion = direccion;
	}

	get id() {
		return this._id;
	}

	get nombre() {
		return this._nombre;
	}

	get contacto() {
		return this._contacto;
	}

	get direccion() {
		return this._direccion;
	}

	set nombre(nombre: string) {
		this._nombre = nombre;
	}

	set contacto(contacto: string) {
		this._contacto = contacto;
	}

	set direccion(direccion: string) {
		this._direccion = direccion;
	}
}
```

- **Transaccion**: define la estructura de objetos que representan transacciones. 
	- `date`: Representa la fecha de la transacción, almacenada como un objeto Date.
	- `id_mueble`: Es un número que identifica el mueble asociado con la transacción.
	- `id_implicado`: Es un número que identifica al implicado en la transacción, ya sea un cliente o un proveedor.
	- `type`: Es un tipo de transacción, que puede ser uno de los siguientes: 'Compra', 'Venta', 'Devolución de Cliente' o 'Devolución a Proveedor'.
	- `num_productos`: Representa el número de productos involucrados en la transacción.
	- `amount`: Es el monto asociado con la transacción, almacenado como un número.

```typescript
export interface Transaccion {
	date: Date;
	id_mueble: number;
	id_implicado : number;
	type: 'Compra' | 'Venta' | 'Devolución de Cliente' | 'Devolución a Proveedor';
	num_productos :number;
	amount: number;
}
```
---

- **Database**: esta clase se encarga de manejar cuatro colecciones de datos relacionadas con muebles, clientes, proveedores y transacciones. 
Actúa como un singleton, lo que significa que solo puede haber una instancia de esta clase en toda la aplicación. Utiliza la biblioteca `lowdb`, que es una base de datos JSON de código abierto, y el adaptador `FileSync` para interactuar con archivos JSON en el sistema de archivos.
	
	El código de la clase `Database` consta de las siguientes secciones principales:
	1. **Importaciones de Módulos**: Importa las bibliotecas necesarias, incluyendo `lowdb` y `FileSync` de `lowdb`, así como las clases y tipos definidos en otros archivos.

	2. **Definición de Tipos**: Define los tipos para las colecciones de datos en la base de datos, incluyendo las colecciones de muebles, clientes, proveedores y transacciones.

	3. **Clase Database**: La clase principal que gestiona la base de datos. Contiene métodos para acceder a las diferentes colecciones de datos, agregar nuevos elementos, eliminar elementos y obtener una instancia única de la clase.

	4. **Constructor**: Inicializa las bases de datos utilizando el adaptador `FileSync`, estableciendo valores por defecto si las bases de datos están vacías.

	5. **Métodos Públicos**: Métodos para obtener las bases de datos individuales y la instancia única de la clase.

	6. **Métodos de Manipulación de Datos**: Métodos para agregar nuevos elementos a las colecciones, eliminar elementos y realizar otras operaciones de manipulación de datos.

	Para utilizar la clase `Database`, se debe seguir el siguiente flujo de trabajo:

	1. Obtener una instancia de la clase utilizando el método estático `getInstance()`.
	2. Utilizar los métodos proporcionados para realizar operaciones en la base de datos, como agregar nuevos elementos, eliminar elementos o consultar datos.

```typescript
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync.js';

import { Transaccion } from './transaccion.js';
import { Cliente } from './cliente.js';
import { Proveedor } from './proveedor.js';
import { Mueble } from './mueble.js';

type DBColeccionMuebles = {
  Muebles: Mueble[];
};

type DBColeccionClientes = {
  Clientes: Cliente[];
};

type DBColeccionProveedores = {
  Proveedores: Proveedor[];
};

type DBTransaccion = {
  Transacciones: Transaccion[];
};

/**
 * Represents a singleton class for managing the database.
 */
export class Database {
  private static instance: Database;
  private dbMueble: low.LowdbSync<DBColeccionMuebles>;
  private dbClientes: low.LowdbSync<DBColeccionClientes>;
  private dbProveedores: low.LowdbSync<DBColeccionProveedores>;
  private dbTransaccion: low.LowdbSync<DBTransaccion>;

  constructor() {
    this.dbMueble = low(new FileSync<DBColeccionMuebles>('databases/dbMuebles.json'));
    this.dbMueble.defaults({ Muebles: [] }).write();

    this.dbClientes = low(new FileSync<DBColeccionClientes>('databases/dbClientes.json'));
    this.dbClientes.defaults({ Clientes: [] }).write();

    this.dbProveedores = low(new FileSync<DBColeccionProveedores>('databases/dbProveedores.json'));
    this.dbProveedores.defaults({ Proveedores: [] }).write();

    this.dbTransaccion = low(new FileSync<DBTransaccion>('databases/dbTransacciones.json'));
    this.dbTransaccion.defaults({ Transacciones: [] }).write();
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  getDBMuebles(): low.LowdbSync<DBColeccionMuebles> {
    return this.dbMueble;
  }

  getDBClientes(): low.LowdbSync<DBColeccionClientes> {
    return this.dbClientes;
  }

  getDBProveedores(): low.LowdbSync<DBColeccionProveedores> {
    return this.dbProveedores;
  }

  getDBTransaccion(): low.LowdbSync<DBTransaccion> {
    return this.dbTransaccion;
  }

  addNewMueble(mueble: Mueble) {
    this.dbMueble.get('Muebles').push(mueble).write();
  }

  addNewCliente(cliente: Cliente) {
    this.dbClientes.get('Clientes').push(cliente).write();
  }

  addNewProveedor(proveedor: Proveedor) {
    this.dbProveedores.get('Proveedores').push(proveedor).write();
  }

  addNewTransaccion(transaccion: Transaccion) {
    this.dbTransaccion.get('Transacciones').push(transaccion).write();
  }

  removeMueble(id: number) {
    this.dbMueble.get('Muebles').remove({ id: id }).write();
  }

  removeCliente(id: number) {
    this.dbClientes.get('Clientes').remove({ id: id }).write();
  }

  removeProveedor(id: number) {
    this.dbProveedores.get('Proveedores').remove({ id: id }).write();
  }
}
```


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