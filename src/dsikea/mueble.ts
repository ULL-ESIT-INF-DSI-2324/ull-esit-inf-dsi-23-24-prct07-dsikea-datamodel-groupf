/**
 * Clase que representa un mueble.
 * @param _id Identificador del mueble.
 * @param _tipo Tipo de mueble (Silla, armario, cómoda...).
 * @param _nombre Nombre del mueble.
 * @param _descripcion Descripción del mueble.
 * @param _material Material del mueble.
 * @param _dimensiones Dimensiones del mueble.
 * @param _precio Precio del mueble.
 * @param _cantidad Cantidad disponible del mueble.
 */
export class Mueble {
  _id: number;
  _tipo: string;
  _nombre: string;
  _descripcion: string;
  _material: string;
  _dimensiones: string;
  _precio: number;
  _cantidad: number;

  constructor(id: number, tipo: string, nombre: string, descripcion: string, material: string, dimensiones: string, precio: number, cantidad: number) {
    this._id = id;
    this._tipo = tipo;
    this._nombre = nombre;
    this._descripcion = descripcion;
    this._material = material;
    this._dimensiones = dimensiones;
    this._precio = precio;
    this._cantidad = cantidad;
  }

  get id() {
    return this._id;
  }

  get tipo() {
    return this._tipo;
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

  get cantidad() {
    return this._cantidad;
  }

  set nombre(nombre: string) {
    this._nombre = nombre;
  }

  set tipo(tipo: string) {
    this._tipo = tipo;
  }

  set descripcion(descripcion: string) {
    this._descripcion = descripcion;
  }

  set material(material: string) {
    this._material = material;
  }

  set dimensiones(dimensiones: string) {
    this._dimensiones = dimensiones;
  }

  set precio(precio: number) {
    this._precio = precio;
  }

  set cantidad(cantidad: number) {
    this._cantidad = cantidad;
  }
}