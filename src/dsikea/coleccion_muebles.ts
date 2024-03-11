import { Mueble } from './mueble.js';

export class ColeccionMuebles {
  private _muebles: Mueble[];
  private _ultima_busqueda: Mueble[] = [];

  constructor(muebles? : Mueble[]) {
    if (muebles) {
      this._muebles = muebles;
    } else {
      this._muebles = [];
    }
  }

  get muebles() {
    return this._muebles;
  }

  addMueble(mueble: Mueble) {
    this._muebles.push(mueble);
  }

  removeMueble(mueble: Mueble) {
    const index = this._muebles.indexOf(mueble);
    if (index > -1) {
      this._muebles.splice(index, 1);
    }
  }

  searchByNombre(nombre: string) {
    this._ultima_busqueda = this._muebles.filter(mueble => mueble.nombre === nombre);
    return this._ultima_busqueda;
  }

  searchByTipo(type: string) {
    this._ultima_busqueda = this._muebles.filter(mueble => mueble.constructor.name.toLowerCase() === type.toLowerCase());
    return this._ultima_busqueda;
  }

  searchCoincidences(keyword: string) {
    this._ultima_busqueda = this._muebles.filter(mueble => mueble.descripcion.toLowerCase().includes(keyword.toLowerCase()));
    return this._ultima_busqueda;
  }

  orderByPrecio(descendente :boolean = true) {
    if (descendente) {
      return this._ultima_busqueda.sort((a, b) => b.precio - a.precio);
    } else {
      return this._ultima_busqueda.sort((a, b) => a.precio - b.precio);
    }
  }

  orderByAlfabeticamente(descendente :boolean = true) {
    if (descendente) {
      return this._ultima_busqueda.sort((a, b) => b.nombre.localeCompare(a.nombre));
    } else {
      return this._ultima_busqueda.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }
  }
}