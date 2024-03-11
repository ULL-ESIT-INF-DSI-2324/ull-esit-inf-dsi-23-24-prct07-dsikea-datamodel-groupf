import { Cliente } from './cliente.js';

export class ColeccionClientes {
	protected _clientes: Cliente[];

	constructor(clientes? : Cliente[]) {
		if (clientes) {
			this._clientes = clientes;
		} else {
			this._clientes = [];
		}
	}

	addCliente(cliente: Cliente): void {
		this._clientes.push(cliente);
	}

	get clientes(): Cliente[] {
		return this._clientes;
	}

	searchByName(nombre: string): Cliente[] {
		return this._clientes.filter((c) => c.nombre === nombre);
	}

	searchByContacto(contacto: string): Cliente[] {
		return this._clientes.filter((c) => c.contacto === contacto);
	}

	searchByDireccion(direccion: string): Cliente[] {	
		return this._clientes.filter((c) => c.direccion === direccion);
	}
}