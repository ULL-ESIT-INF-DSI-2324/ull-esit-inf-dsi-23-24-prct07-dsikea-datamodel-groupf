/**import 'mocha';
import { expect } from 'chai';

import { Armario } from '../src/dsikea/armario.js';

describe('Tests de la clase Armario', () => {
	let armario1: Armario;
	let armario2: Armario;

	beforeEach(() => {
		armario1 = new Armario(1, 'Clásico Elegante', 'Un armario de estilo clásico con detalles de molduras y acabado en nogal',
		'Madera', '180 cm de ancho x 220 cm de alto x 60 cm de profundidad', 1000, 3);
		armario2 = new Armario(2, 'Moderno y Funcional', 'Un armario moderno con líneas limpias y acabado mate, diseñado para optimizar el espacio',
		'Madera', '50 cm de ancho x 200 cm de alto x 50 cm de profundidad.', 400, 2);
	});

	it('Se crea un armario correctamente', () => {
		expect(armario1).to.be.an.instanceof(Armario);
		expect(armario2).to.be.an.instanceof(Armario);
	});

	it('Se inicializa un armario correctamente', () => {
		expect(armario1.id).to.equal(1);
		expect(armario1.nombre).to.equal('Clásico Elegante');
		expect(armario1.descripcion).to.equal('Un armario de estilo clásico con detalles de molduras y acabado en nogal');
		expect(armario1.material).to.equal('Madera');
		expect(armario1.dimensiones).to.equal('180 cm de ancho x 220 cm de alto x 60 cm de profundidad');
		expect(armario1.precio).to.equal(1000);
		expect(armario1.puertas).to.equal(3);

		expect(armario2.id).to.equal(2);
		expect(armario2.nombre).to.equal('Moderno y Funcional');
		expect(armario2.descripcion).to.equal('Un armario moderno con líneas limpias y acabado mate, diseñado para optimizar el espacio');
		expect(armario2.material).to.equal('Madera');
		expect(armario2.dimensiones).to.equal('50 cm de ancho x 200 cm de alto x 50 cm de profundidad.');
		expect(armario2.precio).to.equal(400);
		expect(armario2.puertas).to.equal(2);
	});

	it('Se actualiza un armario correctamente', () => {
		armario1.nombre = 'Rústico';
		armario1.descripcion = 'Un armario de estilo rústico con acabado en pino';
		armario1.material = 'Madera';
		armario1.dimensiones = '200 cm de ancho x 220 cm de alto x 60 cm de profundidad';
		armario1.precio = 1200;
		expect(armario1.nombre).to.equal('Rústico');
		expect(armario1.descripcion).to.equal('Un armario de estilo rústico con acabado en pino');
		expect(armario1.material).to.equal('Madera');
		expect(armario1.dimensiones).to.equal('200 cm de ancho x 220 cm de alto x 60 cm de profundidad');
		expect(armario1.precio).to.equal(1200);

		armario2.nombre = 'Clásico';
		armario2.descripcion = 'Un armario de estilo clásico con detalles de molduras y acabado en nogal';
		armario2.material = 'Madera';
		armario2.dimensiones = '180 cm de ancho x 220 cm de alto x 60 cm de profundidad';
		armario2.precio = 1000;
		expect(armario2.nombre).to.equal('Clásico');
		expect(armario2.descripcion).to.equal('Un armario de estilo clásico con detalles de molduras y acabado en nogal');
		expect(armario2.material).to.equal('Madera');
		expect(armario2.dimensiones).to.equal('180 cm de ancho x 220 cm de alto x 60 cm de profundidad');
		expect(armario2.precio).to.equal(1000);
	});
});*/