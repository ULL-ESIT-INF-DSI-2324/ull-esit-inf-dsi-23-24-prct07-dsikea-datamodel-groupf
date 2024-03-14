import 'mocha';
import { expect } from 'chai';

import { Silla } from '../src/dsikea/silla.js';

describe('Tests de la clase Silla', () => {
	let silla1: Silla;
	let silla2: Silla;

	beforeEach(() => {
		silla1 = new Silla(1, 'Ergonómica Comfort', 'Una silla diseñada para proporcionar comodidad durante largas horas de trabajo o estudio, con soporte lumbar ajustable y acolchado ergonómico.',
		'Malla', '60 cm de ancho x 90 cm de alto x 50 cm de profundidad', 150, 'Silla de oficina');
		silla2 = new Silla(2, 'Vintage Retro', 'Una silla de estilo retro inspirada en los diseños de mediados del siglo XX, con tapizado de cuero sintético y patas de madera de haya.',
		'Cuero sintético', '55 cm de ancho x 80 cm de alto x 50 cm de profundidad', 100, 'Silla de comedor');
	});

	it('Se crea una silla correctamente', () => {
		expect(silla1).to.be.an.instanceof(Silla);
		expect(silla2).to.be.an.instanceof(Silla);
	});

	it('Se inicializa una silla correctamente', () => {
		expect(silla1.id).to.equal(1);
		expect(silla1.nombre).to.equal('Ergonómica Comfort');
		expect(silla1.descripcion).to.equal('Una silla diseñada para proporcionar comodidad durante largas horas de trabajo o estudio, con soporte lumbar ajustable y acolchado ergonómico.');
		expect(silla1.material).to.equal('Malla');
		expect(silla1.dimensiones).to.equal('60 cm de ancho x 90 cm de alto x 50 cm de profundidad');
		expect(silla1.precio).to.equal(150);
		expect(silla1.tipo).to.equal('Silla de oficina');

		expect(silla2.id).to.equal(2);
		expect(silla2.nombre).to.equal('Vintage Retro');
		expect(silla2.descripcion).to.equal('Una silla de estilo retro inspirada en los diseños de mediados del siglo XX, con tapizado de cuero sintético y patas de madera de haya.');
		expect(silla2.material).to.equal('Cuero sintético');
		expect(silla2.dimensiones).to.equal('55 cm de ancho x 80 cm de alto x 50 cm de profundidad');
		expect(silla2.precio).to.equal(100);
		expect(silla2.tipo).to.equal('Silla de comedor');
	});
});
