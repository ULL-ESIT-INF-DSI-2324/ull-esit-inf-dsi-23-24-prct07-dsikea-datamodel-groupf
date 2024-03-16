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