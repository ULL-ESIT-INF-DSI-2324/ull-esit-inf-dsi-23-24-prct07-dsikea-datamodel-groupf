import 'mocha';
import { expect } from 'chai';

import { Comoda } from '../src/dsikea/comoda.js';

describe('Tests de la clase Comoda', () => {
	let comoda1: Comoda;
	let comoda2: Comoda;

	beforeEach(() => {
		comoda1 = new Comoda(1, 'Moderna Minimalista', 'Una cómoda elegante y minimalista con líneas limpias y acabado brillante.', 
		'Madera', '120 cm de ancho x 80 cm de alto x 45 cm de profundidad', 300, 4);
		comoda2 = new Comoda(2, 'Vintage Chic', 'Una cómoda vintage con encanto, detalles tallados a mano y patas torneadas.', 
		'Madera', '100 cm de ancho x 90 cm de alto x 50 cm de profundidad', 250, 6);
	});

	it('Se crea una cómoda correctamente', () => {
		expect(comoda1).to.be.an.instanceof(Comoda);
		expect(comoda2).to.be.an.instanceof(Comoda);
	});

	it('Se inicializa una cómoda correctamente', () => {
		expect(comoda1.id).to.equal(1);
		expect(comoda1.nombre).to.equal('Moderna Minimalista');
		expect(comoda1.descripcion).to.equal('Una cómoda elegante y minimalista con líneas limpias y acabado brillante.');
		expect(comoda1.material).to.equal('Madera');
		expect(comoda1.dimensiones).to.equal('120 cm de ancho x 80 cm de alto x 45 cm de profundidad');
		expect(comoda1.precio).to.equal(300);
		expect(comoda1.cajones).to.equal(4);

		expect(comoda2.id).to.equal(2);
		expect(comoda2.nombre).to.equal('Vintage Chic');
		expect(comoda2.descripcion).to.equal('Una cómoda vintage con encanto, detalles tallados a mano y patas torneadas.');
		expect(comoda2.material).to.equal('Madera');
		expect(comoda2.dimensiones).to.equal('100 cm de ancho x 90 cm de alto x 50 cm de profundidad');
		expect(comoda2.precio).to.equal(250);
		expect(comoda2.cajones).to.equal(6);
	});

	it('Se actualiza una cómoda correctamente', () => {
		comoda1.nombre = 'Moderna Minimalista 2';
		comoda1.descripcion = 'Una cómoda elegante y minimalista con líneas limpias y acabado brillante. Versión 2.';
		comoda1.material = 'Madera de pino';
		comoda1.dimensiones = '120 cm de ancho x 80 cm de alto x 45 cm de profundidad. Versión 2.';
		comoda1.precio = 350;
		expect(comoda1.nombre).to.equal('Moderna Minimalista 2');
		expect(comoda1.descripcion).to.equal('Una cómoda elegante y minimalista con líneas limpias y acabado brillante. Versión 2.');
		expect(comoda1.material).to.equal('Madera de pino');
		expect(comoda1.dimensiones).to.equal('120 cm de ancho x 80 cm de alto x 45 cm de profundidad. Versión 2.');
		expect(comoda1.precio).to.equal(350);

		comoda2.nombre = 'Vintage Chic 2';
		comoda2.descripcion = 'Una cómoda vintage con encanto, detalles tallados a mano y patas torneadas. Versión 2.';
		comoda2.material = 'Madera de roble';
		comoda2.dimensiones = '100 cm de ancho x 90 cm de alto x 50 cm de profundidad. Versión 2.';
		comoda2.precio = 300;
		expect(comoda2.nombre).to.equal('Vintage Chic 2');
		expect(comoda2.descripcion).to.equal('Una cómoda vintage con encanto, detalles tallados a mano y patas torneadas. Versión 2.');
		expect(comoda2.material).to.equal('Madera de roble');
		expect(comoda2.dimensiones).to.equal('100 cm de ancho x 90 cm de alto x 50 cm de profundidad. Versión 2.');
		expect(comoda2.precio).to.equal(300);
	});
});