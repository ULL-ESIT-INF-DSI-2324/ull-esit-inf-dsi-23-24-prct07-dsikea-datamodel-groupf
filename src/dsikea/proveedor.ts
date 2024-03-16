export class Proveedor {
	_id: number;
	_nombre: string;
	_contacto: string;
	_direccion: string;

	constructor(id: number, nombre: string, contacto: string, direccion: string) {
		this._id = id;
		this._nombre = nombre;
		this._contacto = contacto;
		this._direccion = direccion;
	}

	get id() {
		return this._id;
	}

	get nombre() {
		return this._nombre;
	}

	get contacto() {
		return this._contacto;
	}

	get direccion() {
		return this._direccion;
	}

	set nombre(nombre: string) {
		this._nombre = nombre;
	}

	set contacto(contacto: string) {
		this._contacto = contacto;
	}

	set direccion(direccion: string) {
		this._direccion = direccion;
	}
}