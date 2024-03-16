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
	