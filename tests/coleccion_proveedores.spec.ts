/**import 'mocha';
import { expect } from 'chai';

import { Proveedor } from '../src/dsikea/proveedor.js';
import { ColeccionProveedores } from '../src/dsikea/coleccion_proveedores.js';

describe('Tests de la clase ColeccionProveedores', () => {
	let proveedores: ColeccionProveedores;
	let proveedores_vacio: ColeccionProveedores;
	let proveedor1: Proveedor;
	let proveedor2: Proveedor;
	let proveedor3: Proveedor;
	let proveedor4: Proveedor;
	let proveedor5: Proveedor;

	beforeEach(() => {
		proveedores_vacio = new ColeccionProveedores();
		proveedor1 = new Proveedor(1, 'Proveedor 1', '177784894', 'Direccion 1');
		proveedor2 = new Proveedor(2, 'Proveedor 2', 'prov2@gmail.com', 'Direccion 2');
		proveedor3 = new Proveedor(3, 'Proveedor 3', '777777777', 'Direccion 3');
		proveedor4 = new Proveedor(4, 'Proveedor 4', '123456789', 'Direccion 4');
		proveedor5 = new Proveedor(5, 'Proveedor 5', 'prov5@gmail.com', 'Direccion 5');
		proveedores = new ColeccionProveedores([proveedor1, proveedor2, proveedor3, proveedor4, proveedor5]);
	});

	it('Se crea una colección de proveedores', () => {
		expect(proveedores).to.be.an.instanceof(ColeccionProveedores);
		expect(proveedores_vacio).to.be.an.instanceof(ColeccionProveedores);
	});

	it('Se inicializa la colección de proveedores', () => {
		expect(proveedores_vacio.proveedores).to.be.an('array').that.is.empty;
		expect(proveedores.proveedores).to.be.an('array').that.is.not.empty;

		expect(proveedores.proveedores).to.be.equal([proveedor1, proveedor2, proveedor3, proveedor4, proveedor5]);
		expect(proveedores.proveedores).to.have.lengthOf(5);

		expect(proveedores_vacio.proveedores).to.be.empty;
		expect(proveedores_vacio.proveedores).to.have.lengthOf(0);
	});

	it('Se añade un proveedor a la colección', () => {
		proveedores_vacio.addProveedor(proveedor1);
		proveedores_vacio.addProveedor(proveedor2);
		proveedores_vacio.addProveedor(proveedor3);
		proveedores_vacio.addProveedor(proveedor4);
		proveedores_vacio.addProveedor(proveedor5);
		expect(proveedores_vacio.proveedores).to.be.equal([proveedor1, proveedor2, proveedor3, proveedor4, proveedor5]);
		expect(proveedores_vacio.proveedores).to.have.lengthOf(5);
	});

	it('Se elimina un proveedor de la colección por su id', () => {
		proveedores.removeProveedorById(3);
		expect(proveedores.proveedores).to.not.include(proveedor3);
		expect(proveedores.proveedores).to.have.lengthOf(4);
		expect(() => proveedores.removeProveedorById(10)).to.throw(Error, 'No se ha encontrado el proveedor con el id proporcionado');
	});

	it('Se busca un proveedor por nombre', () => {
			const proveedoresEncontrados = proveedores.searchByName('Proveedor 1');
			expect(proveedoresEncontrados).to.be.an('array').that.is.not.empty;
			expect(proveedoresEncontrados).to.have.lengthOf(1);
			expect(proveedoresEncontrados[0].nombre).to.equal('Proveedor 1');
		});

		it('Se busca un proveedor por contacto', () => {
			const proveedoresEncontrados = proveedores.searchByContacto('prov2@gmail.com');
			expect(proveedoresEncontrados).to.be.an('array').that.is.not.empty;
			expect(proveedoresEncontrados).to.have.lengthOf(1);
			expect(proveedoresEncontrados[0].contacto).to.equal('prov2@gmail.com');

			const proveedoresEncontrados2 = proveedores_vacio.searchByContacto('177784894');
			expect(proveedoresEncontrados2).to.be.an('array').that.is.empty;
			expect(proveedoresEncontrados2).to.have.lengthOf(0);
		});

		it('Se busca un proveedor por dirección', () => {
			const proveedoresEncontrados = proveedores.searchByDireccion('Direccion 3');
			expect(proveedoresEncontrados).to.be.an('array').that.is.not.empty;
			expect(proveedoresEncontrados).to.have.lengthOf(1);
			expect(proveedoresEncontrados).to.equal([proveedor3]);

			const proveedoresEncontrados2 = proveedores_vacio.searchByDireccion('Direccion 6');
			expect(proveedoresEncontrados2).to.be.an('array').that.is.empty;
			expect(proveedoresEncontrados2).to.have.lengthOf(0);
		});
});*/