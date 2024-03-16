/**import 'mocha';
import { expect } from 'chai';

import { Mesa } from '../src/dsikea/mesa.js';

describe('Tests de la clase Mesa', () => {
	let mesa1: Mesa;
	let mesa2: Mesa;

	beforeEach(() => {
		mesa1 = new Mesa(1, 'Elegancia Clásica', 'Una mesa de comedor con un diseño clásico y elegante, perfecta para reuniones formales.',
		'Madera', '180 cm de largo x 90 cm de ancho x 75 cm de alto', 800, 'Rectangular');
		mesa2 = new Mesa(2, 'Minimalista Moderna', 'Una mesa de centro de estilo minimalista con líneas limpias y un acabado en negro mate.',
		'Vidrio', '120 cm de largo x 60 cm de ancho x 45 cm de alto', 300, 'Circular');
	});

	it('Se crea una mesa correctamente', () => {
		expect(mesa1).to.be.an.instanceOf(Mesa);
		expect(mesa2).to.be.an.instanceOf(Mesa);
	});

	it('Se inicializa una mesa correctamente', () => {
		expect(mesa1.id).to.equal(1);
		expect(mesa1.nombre).to.equal('Elegancia Clásica');
		expect(mesa1.descripcion).to.equal('Una mesa de comedor con un diseño clásico y elegante, perfecta para reuniones formales.');
		expect(mesa1.material).to.equal('Madera');
		expect(mesa1.dimensiones).to.equal('180 cm de largo x 90 cm de ancho x 75 cm de alto');
		expect(mesa1.precio).to.equal(800);
		expect(mesa1.forma).to.equal('Rectangular');

		expect(mesa2.id).to.equal(2);
		expect(mesa2.nombre).to.equal('Minimalista Moderna');
		expect(mesa2.descripcion).to.equal('Una mesa de centro de estilo minimalista con líneas limpias y un acabado en negro mate.');
		expect(mesa2.material).to.equal('Vidrio');
		expect(mesa2.dimensiones).to.equal('120 cm de largo x 60 cm de ancho x 45 cm de alto');
		expect(mesa2.precio).to.equal(300);
		expect(mesa2.forma).to.equal('Circular');
	});

	it('Se actualiza una mesa correctamente', () => {
		mesa1.nombre = 'Elegancia Clásica 2';
		mesa1.descripcion = 'Una mesa de comedor con un diseño clásico y elegante, perfecta para reuniones formales. Versión 2.';
		mesa1.material = 'Madera de pino';
		mesa1.dimensiones = '180 cm de largo x 90 cm de ancho x 75 cm de alto Versión 2.';
		mesa1.precio = 850;
		expect(mesa1.nombre).to.equal('Elegancia Clásica 2');
		expect(mesa1.descripcion).to.equal('Una mesa de comedor con un diseño clásico y elegante, perfecta para reuniones formales. Versión 2.');
		expect(mesa1.material).to.equal('Madera de pino');
		expect(mesa1.dimensiones).to.equal('180 cm de largo x 90 cm de ancho x 75 cm de alto. Versión 2.');
		expect(mesa1.precio).to.equal(850);

		mesa2.nombre = 'Minimalista Moderna 2';
		mesa2.descripcion = 'Una mesa de centro de estilo minimalista con líneas limpias y un acabado en negro mate. Versión 2.';
		mesa2.material = 'Plástico';
		mesa2.dimensiones = '120 cm de largo x 60 cm de ancho x 45 cm de alto Versión 2.';
		mesa2.precio = 350;
		expect(mesa2.nombre).to.equal('Minimalista Moderna 2');
		expect(mesa2.descripcion).to.equal('Una mesa de centro de estilo minimalista con líneas limpias y un acabado en negro mate. Versión 2.');
		expect(mesa2.material).to.equal('Plástico');
		expect(mesa2.dimensiones).to.equal('120 cm de largo x 60 cm de ancho x 45 cm de alto Versión 2.');
		expect(mesa2.precio).to.equal(350);
	});
});*/