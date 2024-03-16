import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync.js';

import { Stock } from './stock.js';

import { Transaccion } from './transaccion.js';
import { Cliente } from './cliente.js';
import { Proveedor } from './proveedor.js';
import { Mueble } from './mueble.js';

type DBColeccionMuebles = {
  Muebles: Mueble[];
};

type DBColeccionClientes = {
  Clientes: Cliente[];
};

type DBColeccionProveedores = {
  Proveedores: Proveedor[];
};

type DBTransaccion = {
  Transacciones: Transaccion[];
};

/**
 * Represents a singleton class for managing the database.
 */
export class Database {
  private static instance: Database;
  private dbMueble: low.LowdbSync<DBColeccionMuebles>;
  private dbClientes: low.LowdbSync<DBColeccionClientes>;
  private dbProveedores: low.LowdbSync<DBColeccionProveedores>;
  private dbTransaccion: low.LowdbSync<DBTransaccion>;

  constructor() {
    this.dbMueble = low(new FileSync<DBColeccionMuebles>('databases/dbMuebles.json'));
    this.dbMueble.defaults({ Muebles: [] }).write();

    this.dbClientes = low(new FileSync<DBColeccionClientes>('databases/dbClientes.json'));
    this.dbClientes.defaults({ Clientes: [] }).write();

    this.dbProveedores = low(new FileSync<DBColeccionProveedores>('databases/dbProveedores.json'));
    this.dbProveedores.defaults({ Proveedores: [] }).write();

    this.dbTransaccion = low(new FileSync<DBTransaccion>('databases/dbTransacciones.json'));
    this.dbTransaccion.defaults({ Transacciones: [] }).write();
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  getDBMuebles(): low.LowdbSync<DBColeccionMuebles> {
    return this.dbMueble;
  }

  getDBClientes(): low.LowdbSync<DBColeccionClientes> {
    return this.dbClientes;
  }

  getDBProveedores(): low.LowdbSync<DBColeccionProveedores> {
    return this.dbProveedores;
  }

  getDBTransaccion(): low.LowdbSync<DBTransaccion> {
    return this.dbTransaccion;
  }

  addNewMueble(mueble: Mueble) {
    this.dbMueble.get('Muebles').push(mueble).write();
  }

  addNewCliente(cliente: Cliente) {
    this.dbClientes.get('Clientes').push(cliente).write();
  }

  addNewProveedor(proveedor: Proveedor) {
    this.dbProveedores.get('Proveedores').push(proveedor).write();
  }

  addNewTransaccion(transaccion: Transaccion) {
    this.dbTransaccion.get('Transacciones').push(transaccion).write();
  }

  removeMueble(id: number) {
    this.dbMueble.get('Muebles').remove({ id: id }).write();
  }

  removeCliente(id: number) {
    this.dbClientes.get('Clientes').remove({ id: id }).write();
  }

  removeProveedor(id: number) {
    this.dbProveedores.get('Proveedores').remove({ id: id }).write();
  }
}