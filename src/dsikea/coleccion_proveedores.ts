import { Proveedor } from './proveedor.js';

export class ColeccionProveedores {
	protected _proveedores: Proveedor[];

	constructor(proveedores? : Proveedor[]) {
		if (proveedores) {
			this._proveedores = proveedores;
		} else {
			this._proveedores = [];
		}
	}

	addProveedor(proveedor: Proveedor): void {
		this._proveedores.push(proveedor);
	}
	get proveedores(): Proveedor[] {
			return this._proveedores;
	}

	searchByName(nombre: string): Proveedor[] {
		return this._proveedores.filter((p) => p.nombre === nombre);
	}

	searchByContacto(contacto: string): Proveedor[] {
		return this._proveedores.filter((p) => p.contacto === contacto);
	}

	searchByDireccion(direccion: string): Proveedor[] {	
		return this._proveedores.filter((p) => p.direccion === direccion);
	}
}