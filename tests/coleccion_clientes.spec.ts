/**import 'mocha';
import { expect } from 'chai';

import { Cliente } from '../src/dsikea/cliente.js';
import { ColeccionClientes } from '../src/dsikea/coleccion_clientes.js';

describe('Tests de la clase ColeccionClientes', () => {
	let clientes: ColeccionClientes;
	let clientes_vacio: ColeccionClientes;
	let cliente1: Cliente;
	let cliente2: Cliente;
	let cliente3: Cliente;
	let cliente4: Cliente;
	let cliente5: Cliente;

	beforeEach(() => {
		clientes_vacio = new ColeccionClientes();

		cliente1 = new Cliente(12345678, 'Juan Pérez', 'juanp@gmail.com', 'Calle Falsa 123');
		cliente2 = new Cliente(87654321, 'María López', '987654321', 'Calle Falsa 321');
		cliente3 = new Cliente(12348765, 'Pepe García', '123456789', 'Calle Falsa 123');
		cliente4 = new Cliente(87651234, 'Ana Martínez', 'anam@gmail.com', 'Calle Falsa 654');
		cliente5 = new Cliente(12349876, 'Luis Rodríguez', '555555555', 'Calle Falsa 555');
		clientes = new ColeccionClientes([cliente1, cliente2, cliente3, cliente4, cliente5]);
	});
	
	it('Se crea una colección de clientes correctamente', () => {
		expect(clientes).to.be.an.instanceOf(ColeccionClientes);
		expect(clientes_vacio).to.be.an.instanceOf(ColeccionClientes);
	});

	it('Se inicializan las colecciones de clientes correctamente', () => {
		expect(clientes.clientes).to.be.equal([cliente1, cliente2, cliente3, cliente4, cliente5]);
		expect(clientes_vacio.clientes).to.be.empty;
		expect(clientes.clientes).to.have.lengthOf(5);
		expect(clientes_vacio.clientes).to.have.lengthOf(0);
	});

	it('Se añaden clientes a la colección correctamente', () => {
		expect(clientes.clientes).to.have.lengthOf(5);
		clientes_vacio.addCliente(cliente1);
		clientes_vacio.addCliente(cliente2);
		clientes_vacio.addCliente(cliente3);
		expect(clientes_vacio.clientes).to.have.lengthOf(3);
	});

	it('Se elimina un cliente de la colección correctamente', () => {
		expect(clientes.clientes).to.have.lengthOf(5);
		clientes.removeClienteById(cliente1.id);
		expect(clientes.clientes).to.have.lengthOf(4);
		expect(clientes.clientes).to.not.include(cliente1);

		expect(clientes.removeClienteById(cliente1.id)).to.throw(Error, 'No se ha encontrado el cliente con el id proporcionado');
	});

	it('Se buscan clientes por nombre correctamente', () => {
		const clientesEncontrados = clientes.searchByName('Juan Pérez');
		expect(clientesEncontrados).to.have.lengthOf(1);
		expect(clientesEncontrados).to.be.equal([cliente1]);

		const clientesEncontrados2 = clientes.searchByName('Sebastian Porto');
		expect(clientesEncontrados2).to.have.lengthOf(0);
		expect(clientesEncontrados2).to.be.equal([]);
	});

	it('Se buscan clientes por contacto correctamente', () => {
		const clientesEncontrados = clientes.searchByContacto('juanp@gmail.com');
		expect(clientesEncontrados).to.have.lengthOf(1);
		expect(clientesEncontrados).to.be.equal([cliente1]);

		const clientesEncontrados2 = clientes.searchByContacto('000000000');
		expect(clientesEncontrados2).to.have.lengthOf(0);
		expect(clientesEncontrados2).to.be.equal([]);
	});

	it('Se buscan clientes por dirección correctamente', () => {
		const clientesEncontrados = clientes.searchByDireccion('Calle Falsa 123');
		expect(clientesEncontrados).to.have.lengthOf(2);
		expect(clientesEncontrados).to.be.equal([cliente1, cliente3]);

		const clientesEncontrados2 = clientes.searchByDireccion('Calle Falsa 000');
		expect(clientesEncontrados2).to.have.lengthOf(0);
		expect(clientesEncontrados2).to.be.equal([]);
	});
});*/