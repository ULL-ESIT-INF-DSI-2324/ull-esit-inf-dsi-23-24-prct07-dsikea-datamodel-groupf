import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync.js';

import { Transaccion } from './transaccion.js';
import { Cliente } from './cliente.js';
import { Proveedor } from './proveedor.js';
import { Mueble } from './mueble.js';

/** Definición del tipo para la colección de muebles en la base de datos. */
type DBColeccionMuebles = {
  Muebles: Mueble[];
};

/** Definición del tipo para la colección de clientes en la base de datos. */
type DBColeccionClientes = {
  Clientes: Cliente[];
};

/** Definición del tipo para la colección de proveedores en la base de datos. */
type DBColeccionProveedores = {
  Proveedores: Proveedor[];
};

/** Definición del tipo para la colección de transacciones en la base de datos. */
type DBTransaccion = {
  Transacciones: Transaccion[];
};

/**
 * Representa una clase singleton para gestionar la base de datos.
 * Esta clase proporciona métodos para interactuar con las colecciones de muebles, clientes, proveedores y transacciones
 * almacenadas en archivos JSON utilizando la biblioteca lowdb.
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

  /**
   * Obtiene una instancia única de la clase Database.
   * @returns Instancia única de la clase Database.
   */
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  /**
   * Obtiene la base de datos de muebles.
   * @returns Base de datos de muebles.
   */
  getDBMuebles(): low.LowdbSync<DBColeccionMuebles> {
    return this.dbMueble;
  }

  /**
   * Obtiene la base de datos de clientes.
   * @returns Base de datos de clientes.
   */
  getDBClientes(): low.LowdbSync<DBColeccionClientes> {
    return this.dbClientes;
  }

  /**
   * Obtiene la base de datos de proveedores.
   * @returns Base de datos de proveedores.
   */
  getDBProveedores(): low.LowdbSync<DBColeccionProveedores> {
    return this.dbProveedores;
  }

  /**
   * Obtiene la base de datos de transacciones.
   * @returns Base de datos de transacciones.
   */
  getDBTransaccion(): low.LowdbSync<DBTransaccion> {
    return this.dbTransaccion;
  }

  /**
   * Agrega un nuevo mueble a la base de datos.
   * @param mueble - Mueble a agregar.
   */
  addNewMueble(mueble: Mueble): void {
    this.dbMueble.get('Muebles').push(mueble).write();
  }

  /**
   * Agrega un nuevo cliente a la base de datos.
   * @param cliente - Cliente a agregar.
   */
  addNewCliente(cliente: Cliente): void {
    this.dbClientes.get('Clientes').push(cliente).write();
  }

  /**
   * Agrega un nuevo proveedor a la base de datos.
   * @param proveedor - Proveedor a agregar.
   */
  addNewProveedor(proveedor: Proveedor): void {
    this.dbProveedores.get('Proveedores').push(proveedor).write();
  }

  /**
   * Agrega una nueva transacción a la base de datos.
   * @param transaccion - Transacción a agregar.
   */
  addNewTransaccion(transaccion: Transaccion): void {
    this.dbTransaccion.get('Transacciones').push(transaccion).write();
  }

  /**
   * Elimina un mueble de la base de datos por su ID.
   * @param id - ID del mueble a eliminar.
   */
  removeMueble(id: number): void {
    this.dbMueble.get('Muebles').remove({ id: id }).write();
  }

  /**
   * Elimina un cliente de la base de datos por su ID.
   * @param id - ID del cliente a eliminar.
   */
  removeCliente(id: number): void {
    this.dbClientes.get('Clientes').remove({ id: id }).write();
  }

  /**
   * Elimina un proveedor de la base de datos por su ID.
   * @param id - ID del proveedor a eliminar.
   */
  removeProveedor(id: number): void {
    this.dbProveedores.get('Proveedores').remove({ id: id }).write();
  }
}