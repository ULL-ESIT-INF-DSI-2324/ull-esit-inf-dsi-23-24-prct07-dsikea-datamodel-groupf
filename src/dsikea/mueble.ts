export abstract class Mueble {
  protected _id: number;
  protected _nombre: string;
  protected _descripcion: string;
  protected _material: string;
  protected _dimensiones: string;
  protected _precio: number;

  constructor(id: number, nombre: string, descripcion: string, material: string, dimensiones: string, precio: number) {
    this._id = id;
    this._nombre = nombre;
    this._descripcion = descripcion;
    this._material = material;
    this._dimensiones = dimensiones;
    this._precio = precio;
  }

  get id() {
    return this._id;
  }

  get nombre() {
    return this._nombre;
  }

  get descripcion() {
    return this._descripcion;
  }

  get material() {
    return this._material;
  }

  get dimensiones() {
    return this._dimensiones;
  }

  get precio() {
    return this._precio;
  }
}