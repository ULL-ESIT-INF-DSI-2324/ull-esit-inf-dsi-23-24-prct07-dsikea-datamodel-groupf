import { Mueble } from "./mueble.js";

import { Database } from "./database.js";

type InfoMueble = 'nombre' | 'descripcion' | 'material' | 'dimensiones' | 'precio';

type InfoEntidad = 'nombre' | 'direccion' | 'contacto';

export class Stock {
	private _db: Database = Database.getInstance();

	constructor() {}

  get db() {
    return this._db;
  }

  addNewMueble(mueble: Mueble) {
    this._db.addNewMueble(mueble);
  }
  
  addMuebleExistente(id: number, cantidad: number) {
    this._db.getDBMuebles().get("Muebles").value().forEach(mueble => {
      if (mueble._id === id) {
        this._db.getDBMuebles().get("Muebles").find({_id: id}).assign({_cantidad: mueble._cantidad + cantidad}).write();
      } else {
        throw new Error('No se ha encontrado el mueble con el id proporcionado');
      }
    });
  }
/*
  removeMueble(id: number, cantidad: number) {
    this.muebles.forEach((value, mueble) => {
      if (mueble.id === id) {
        if (value - cantidad <= 0) {
          this.muebles.delete(mueble);
        }
        this.muebles.set(mueble, value - cantidad);
      }
    });
    this._db.saveDB(this);
  }

	modifyMueble(id: number, parametro :InfoMueble, valor :string | number) {
    this.muebles.forEach((value, mueble) => {
      if (mueble.id === id) {
        switch (parametro) {
          case 'nombre':
            mueble.nombre = valor as string;
            break;
          case 'descripcion':
            mueble.descripcion = valor as string;
            break;
          case 'material':
            mueble.material = valor as string;
            break;
          case 'dimensiones':
            mueble.dimensiones = valor as string;
            break;
          case 'precio':
            mueble.precio = valor as number;
            break;
          default:
            break;
        }
      }
    });
    this._db.saveDB(this);
  }

  addProveedor(proveedor: Proveedor) {
    this.proveedores.push(proveedor);
    this._db.saveDB(this);
  }

  removeProveedor(id: number) {
    this.proveedores.splice(this.proveedores.findIndex(proveedor => proveedor.id === id), 1);
    this._db.saveDB(this);
  }

  modifyProveedor(id: number, parametro :InfoEntidad, valor :string) {
    const indexProveedor = this.proveedores.findIndex(proveedor => proveedor.id === id);
    switch (parametro) {
      case 'nombre':
        this.proveedores[indexProveedor].nombre = valor;
        break;
      case 'direccion':
        this.proveedores[indexProveedor].direccion = valor;
        break;
      case 'contacto':
        this.proveedores[indexProveedor].contacto = valor;
        break;
      default:
        break;
    }
    this._db.saveDB(this);
  }

  addCliente(cliente: Cliente) {
    this.clientes.push(cliente);
    this._db.saveDB(this);
  }

  removeCliente(id: number) {
    this.clientes.splice(this.clientes.findIndex(cliente => cliente.id === id), 1);
    this._db.saveDB(this);
  }

  modifyCliente(id: number, parametro :InfoEntidad, valor :string) {
    const indexCliente = this.clientes.findIndex(cliente => cliente.id === id);
    switch (parametro) {
      case 'nombre':
        this.clientes[indexCliente].nombre = valor;
        break;
      case 'direccion':
        this.clientes[indexCliente].direccion = valor;
        break;
      case 'contacto':
        this.clientes[indexCliente].contacto = valor;
        break;
      default:
        break;
    }
    this._db.saveDB(this);
  }

  ventaMueble(idMueble: number, idCliente: number, cantidad: number) {
    let mueble_existe : boolean = false;
    this.muebles.forEach((value, mueble) => {
      if (mueble.id === idMueble) {
        mueble_existe = true;
      }
    });
    if (!mueble_existe) throw new Error('No se ha encontrado el mueble con el id proporcionado');
    const cliente = this.clientes.find(cliente => cliente.id === idCliente);
    if (!cliente) throw new Error('No se ha encontrado el cliente con el id proporcionado');
    /// Existe el mueble y el cliente
    this.removeMueble(idMueble, cantidad);
    const transaccion: Transaccion = {
      date: new Date(),
      id_mueble: idMueble,
      id_implicado: idCliente,
      type: 'Venta',
      amount: cantidad
    };
    this.transacciones.push(transaccion);
    this._db.saveDB(this);
  }

  compraProveedor(idMueble: number, idProveedor: number, cantidad: number) {
    let mueble_existe : boolean = false;
    this.muebles.forEach((value, mueble) => {
      if (mueble.id === idMueble) {
        mueble_existe = true;
      }
    });
    if (!mueble_existe) throw new Error('No se ha encontrado el mueble con el id proporcionado');
    const proveedor = this.proveedores.find(proveedor => proveedor.id === idProveedor);
    if (!proveedor) throw new Error('No se ha encontrado el proveedor con el id proporcionado');
    /// Existe el mueble y el proveedor
    this.addMuebleExistente(idMueble, cantidad);
    const transaccion: Transaccion = {
      date: new Date(),
      id_mueble: idMueble,
      id_implicado: idProveedor,
      type: 'Compra',
      amount: cantidad
    };
    this.transacciones.push(transaccion);
    this._db.saveDB(this);
  }

  devolucionCliente(idMueble: number, idCliente: number, cantidad: number) {
    const transaccion_previa = this.transacciones.find(transaccion => 
    transaccion.id_mueble === idMueble && transaccion.id_implicado === idCliente && transaccion.type === 'Venta');
    if (!transaccion_previa) throw new Error('No se ha encontrado la transacción previa con el id proporcionado, por lo que no se puede realizar la devolución');
    const cliente = this.clientes.find(cliente => cliente.id === idCliente);
    if (!cliente) throw new Error('No se ha encontrado el cliente con el id proporcionado');
    /// Existe el mueble y el cliente
    this.addMuebleExistente(idMueble, cantidad);
    const transaccion: Transaccion = {
      date: new Date(),
      id_mueble: idMueble,
      id_implicado: idCliente,
      type: 'Devolución de Cliente',
      amount: cantidad
    };
    this.transacciones.push(transaccion);
    this._db.saveDB(this);
  }

  devolucionProveedor(idMueble: number, idProveedor: number, cantidad: number) {
    const transaccion_previa = this.transacciones.find(transaccion =>
    transaccion.id_mueble === idMueble && transaccion.id_implicado === idProveedor && transaccion.type === 'Compra')
    if (!transaccion_previa) throw new Error('No se ha encontrado la transacción previa con el id proporcionado, por lo que no se puede realizar la devolución');
    const proveedor = this.proveedores.find(proveedor => proveedor.id === idProveedor);
    if (!proveedor) throw new Error('No se ha encontrado el proveedor con el id proporcionado');
    /// Existe el mueble y el proveedor
    this.removeMueble(idMueble, cantidad);
    const transaccion: Transaccion = {
      date: new Date(),
      id_mueble: idMueble,
      id_implicado: idProveedor,
      type: 'Devolución a Proveedor',
      amount: cantidad
    };
    this.transacciones.push(transaccion);
    this._db.saveDB(this);
  }

  obtenerNuevoIDMueble() {
    if (this.muebles.size === 0) return 0;
    const lastId = Array.from(this.muebles.keys()).reduce((prev, current) => (prev.id > current.id) ? prev : current).id;
    return lastId + 1;
  }*/
}