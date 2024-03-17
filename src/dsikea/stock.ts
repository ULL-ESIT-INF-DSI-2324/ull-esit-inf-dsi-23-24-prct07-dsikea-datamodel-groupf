import { Mueble } from "./mueble.js";
import { Proveedor } from "./proveedor.js";
import { Cliente } from "./cliente.js";
import { Transaccion } from "./transaccion.js";

import { Database } from "./database.js";

type InfoMueble = 'nombre' | 'tipo' | 'descripcion' | 'material' | 'dimensiones' | 'precio' | 'cantidad';

type InfoEntidad = 'nombre' | 'direccion' | 'contacto';

export class Stock {
	private _db: Database = Database.getInstance();

	constructor() {}

  /// <---------------------------------------------- Muebles ---------------------------------------------->


  addNewMueble(mueble: Mueble) {
    this._db.addNewMueble(mueble);
  }
  
  addMuebleExistente(id: number, cantidad: number) {
    const dbMuebles = this._db.getDBMuebles();
    const mueblesArray = dbMuebles.get("Muebles");
    // Find the furniture item by id
    const existe_id = mueblesArray.find({ _id: id }).value();
    if (existe_id) {
        // If the item exists, update its quantity
        mueblesArray.find({ _id: id }).assign({ _cantidad: existe_id._cantidad + cantidad }).write();
        console.log(`Cantidad de mueble con ID ${id} actualizada correctamente.`);
    } else {
        throw new Error('No se ha encontrado el mueble con el id proporcionado');
    }
  }

  
  
  removeMueble(id: number, cantidad: number) {
    const dbMuebles = this._db.getDBMuebles();
    const mueblesArray = dbMuebles.get("Muebles");
    // Find the furniture item by id
    const existe_id = mueblesArray.find({ _id: id }).value();
    if (existe_id) {
      if (existe_id._cantidad === cantidad) {
        mueblesArray.remove({ _id: id }).write();
        console.log(`Mueble con ID ${id} eliminado correctamente.`);
        return;
      } else if (existe_id._cantidad < cantidad){
        throw new Error('No se puede eliminar más cantidad de la que hay en stock');
      }
      mueblesArray.find({ _id: id }).assign({ _cantidad: existe_id._cantidad - cantidad }).write();
      console.log(`Cantidad de mueble con ID ${id} actualizada correctamente.`);
    } else {
      throw new Error('No se ha encontrado el mueble con el id proporcionado');
    }
  }

	modifyMueble(id: number, parametro :InfoMueble, valor :string | number) {
    if (this._db.getDBMuebles().get("Muebles").find({_id: id})) {
      switch (parametro) {
        case 'nombre':
          this._db.getDBMuebles().get("Muebles").find({_id: id}).assign({_nombre: valor}).write();
          break;
        case 'tipo':
          this._db.getDBMuebles().get("Muebles").find({_id: id}).assign({_tipo: valor}).write();
          break;
        case 'descripcion':
          this._db.getDBMuebles().get("Muebles").find({_id: id}).assign({_descripcion: valor}).write();
          break;
        case 'material':
          this._db.getDBMuebles().get("Muebles").find({_id: id}).assign({_material: valor}).write();
          break;
        case 'dimensiones':
          this._db.getDBMuebles().get("Muebles").find({_id: id}).assign({_dimensiones: valor}).write();
          break;
        case 'precio':
          this._db.getDBMuebles().get("Muebles").find({_id: id}).assign({_precio: valor}).write();
          break;
        case 'cantidad':
          this._db.getDBMuebles().get("Muebles").find({_id: id}).assign({_cantidad: valor}).write();
          break;
        default:
          break;
      }
    } else {
      throw new Error('No se ha encontrado el mueble con el id proporcionado');
    }
  }

  buscarMuebleByNombre(nombre: string, alfabeticamente: boolean, ascendente: boolean) {
    const dbMuebles = this._db.getDBMuebles();
    const mueblesArray = dbMuebles.get("Muebles");
    const mueble = mueblesArray.find({ _nombre: nombre }).value();
    if (mueble) {
      const mueblesConNombre = mueblesArray.filter(mueble => mueble._nombre === nombre).value();
      if (alfabeticamente) {
        if (ascendente) {
          return mueblesConNombre.sort((a, b) => a._nombre.localeCompare(b._nombre));
        } else {
          return mueblesConNombre.sort((a, b) => b._nombre.localeCompare(a._nombre));
        }
      } else {
        if (ascendente) {
          return mueblesConNombre.sort((a, b) => a._precio - b._precio);
        } else {
          return mueblesConNombre.sort((a, b) => b._precio - a._precio);
        }
      }
    } else {
      throw new Error('No se ha encontrado el mueble con el nombre proporcionado');
    }
  }

  buscarMuebleByTipo(tipo: string, alfabeticamente: boolean, ascendente: boolean) {
    const dbMuebles = this._db.getDBMuebles();
    const mueblesArray = dbMuebles.get("Muebles");
    const mueble = mueblesArray.find({ _tipo: tipo }).value();
    if (mueble !== undefined) {
      const mueblesConTipo = mueblesArray.filter(mueble => mueble._tipo === tipo).value();
      if (alfabeticamente) {
        if (ascendente) {
          return mueblesConTipo.sort((a, b) => a._nombre.localeCompare(b._nombre));
        } else {
          return mueblesConTipo.sort((a, b) => b._nombre.localeCompare(a._nombre));
        }
      } else {
        if (ascendente) {
          return mueblesConTipo.sort((a, b) => a._precio - b._precio);
        } else {
          return mueblesConTipo.sort((a, b) => b._precio - a._precio);
        }
      }
    } else {
      throw new Error('No se ha encontrado el mueble con el tipo proporcionado');
    }
  }

  buscarMuebleByKeyWordsDescripcion(keyWords: string, alfabeticamente: boolean, ascendente: boolean) {
    const dbMuebles = this._db.getDBMuebles();
    const mueblesArray = dbMuebles.get("Muebles");
    const muebles = mueblesArray.value();
    const mueblesConKeyWords = muebles.filter(mueble => mueble._descripcion.includes(keyWords));
    if (alfabeticamente) {
      if (ascendente) {
        return mueblesConKeyWords.sort((a, b) => a._nombre.localeCompare(b._nombre));
      } else {
        return mueblesConKeyWords.sort((a, b) => b._nombre.localeCompare(a._nombre));
      }
    } else {
      if (ascendente) {
        return mueblesConKeyWords.sort((a, b) => a._precio - b._precio);
      } else {
        return mueblesConKeyWords.sort((a, b) => b._precio - a._precio);
      }
    }
  }

  /// <---------------------------------------------- Proveedores ---------------------------------------------->


  addProveedor(proveedor: Proveedor) {
    this._db.addNewProveedor(proveedor);
  }

  removeProveedor(id: number) {
    this._db.removeProveedor(id);
  }

  modifyProveedor(id: number, parametro :InfoEntidad, valor :string) {
    this._db.getDBProveedores().get("Proveedores").value().forEach(proveedor => {
      if (proveedor.id === id) {
        switch (parametro) {
          case 'nombre':
            this._db.getDBProveedores().get("Proveedores").find({_id: id}).assign({_nombre: valor}).write();
            break;
          case 'direccion':
            this._db.getDBProveedores().get("Proveedores").find({_id: id}).assign({_direccion: valor}).write();
            break;
          case 'contacto':
            this._db.getDBProveedores().get("Proveedores").find({_id: id}).assign({_contacto: valor}).write();
            break;
          default:
            break;
        }
      }
    });
  }

  buscarProveedorByNombre(nombre: string) {
    const dbProveedores = this._db.getDBProveedores();
    const proveedoresArray = dbProveedores.get("Proveedores");
    const proveedor = proveedoresArray.filter(proveedor => proveedor._nombre === nombre).value();
    if (proveedor) {
      return proveedor;
    } else {
      throw new Error('No se ha encontrado el proveedor con el nombre proporcionado');
    }
  }

  buscarProveedorByContacto(contacto: string) {
    const dbProveedores = this._db.getDBProveedores();
    const proveedoresArray = dbProveedores.get("Proveedores");
    const proveedor = proveedoresArray.filter(proveedor => proveedor._contacto === contacto).value();
    if (proveedor) {
      return proveedor;
    } else {
      throw new Error('No se ha encontrado el proveedor con el contacto proporcionado');
    }
  }

  buscarProveedorByDireccion(direccion: string) {
    const dbProveedores = this._db.getDBProveedores();
    const proveedoresArray = dbProveedores.get("Proveedores");
    const proveedor = proveedoresArray.filter(proveedor => proveedor._direccion === direccion).value();
    if (proveedor) {
      return proveedor;
    } else {
      throw new Error('No se ha encontrado el proveedor con la dirección proporcionada');
    }
  }

  /// <---------------------------------------------- Clientes ---------------------------------------------->


  addCliente(cliente: Cliente) {
    this._db.addNewCliente(cliente);
  }

  removeCliente(id: number) {
    this._db.removeCliente(id);
  }

  modifyCliente(id: number, parametro :InfoEntidad, valor :string) {
    this._db.getDBClientes().get("Clientes").value().forEach(cliente => {
      if (cliente.id === id) {
        switch (parametro) {
          case 'nombre':
            this._db.getDBClientes().get("Clientes").find({_id: id}).assign({_nombre: valor}).write();
            break;
          case 'direccion':
            this._db.getDBClientes().get("Clientes").find({_id: id}).assign({_direccion: valor}).write();
            break;
          case 'contacto':
            this._db.getDBClientes().get("Clientes").find({_id: id}).assign({_contacto: valor}).write();
            break;
          default:
            break;
        }
      }
    });
  }

  buscarClienteByNombre(nombre: string) {
    const dbClientes = this._db.getDBClientes();
    const clientesArray = dbClientes.get("Clientes");
    const cliente = clientesArray.filter(cliente => cliente._nombre === nombre).value();
    if (cliente) {
      return cliente;
    } else {
      throw new Error('No se ha encontrado el cliente con el nombre proporcionado');
    }
  }

  buscarClienteByContacto(contacto: string) {
    const dbClientes = this._db.getDBClientes();
    const clientesArray = dbClientes.get("Clientes");
    const cliente = clientesArray.filter(cliente => cliente._contacto === contacto).value();
    if (cliente) {
      return cliente;
    } else {
      throw new Error('No se ha encontrado el cliente con el contacto proporcionado');
    }
  }

  buscarClienteByDireccion(direccion: string) {
    const dbClientes = this._db.getDBClientes();
    const clientesArray = dbClientes.get("Clientes");
    const cliente = clientesArray.filter(cliente => cliente._direccion === direccion).value();
    if (cliente) {
      return cliente;
    } else {
      throw new Error('No se ha encontrado el cliente con la dirección proporcionada');
    }
  }

  /// <---------------------------------------------- Transacciones ---------------------------------------------->

  ventaMueble(idMueble: number, idCliente: number, cantidad: number) {
    const existe_mueble = this._db.getDBMuebles().get("Muebles").find({_id: idMueble}).value()
    if (!existe_mueble) throw new Error('No se ha encontrado el mueble con el id proporcionado');
    const cliente = this._db.getDBClientes().get("Clientes").find({_id: idCliente}).value();
    if (!cliente) throw new Error('No se ha encontrado el cliente con el id proporcionado');
    const importe = this._db.getDBMuebles().get("Muebles").find({_id: idMueble}).value()._precio * cantidad;
    /// Existe el mueble y el cliente
    this.removeMueble(idMueble, cantidad);
    const transaccion: Transaccion = {
      date: new Date(),
      id_mueble: idMueble,
      id_implicado: idCliente,
      type: 'Venta',
      num_productos: cantidad,
      amount: importe
    };
    this._db.addNewTransaccion(transaccion);
  }

  compraMueble(idMueble: number, idProveedor: number, cantidad: number) {
    const existe_mueble = this._db.getDBMuebles().get("Muebles").find({_id: idMueble}).value()
    if (!existe_mueble) throw new Error('No se ha encontrado el mueble con el id proporcionado');
    const proveedor = this._db.getDBProveedores().get("Proveedores").find({_id: idProveedor}).value();
    if (!proveedor) throw new Error('No se ha encontrado el proveedor con el id proporcionado');
    const importe = this._db.getDBMuebles().get("Muebles").find({_id: idMueble}).value()._precio * cantidad;
    /// Existe el mueble y el proveedor
    this.addMuebleExistente(idMueble, cantidad);
    const transaccion: Transaccion = {
      date: new Date(),
      id_mueble: idMueble,
      id_implicado: idProveedor,
      type: 'Compra',
      num_productos: cantidad,
      amount: importe
    };
    this._db.addNewTransaccion(transaccion);
  }

  devolucionCliente(idMueble: number, idCliente: number, cantidad: number) {
    const transaccion_previa = this._db.getDBTransaccion().get("Transacciones").find({id_mueble: idMueble, id_implicado: idCliente, type: 'Venta'}).value();
    if (!transaccion_previa) throw new Error('No se ha encontrado la transacción previa con el id proporcionado, por lo que no se puede realizar la devolución');
    const cliente = this._db.getDBClientes().get("Clientes").find({_id: idCliente}).value();
    if (!cliente) throw new Error('No se ha encontrado el cliente con el id proporcionado');
    const importe = this._db.getDBMuebles().get("Muebles").find({_id: idMueble}).value()._precio * cantidad;
    /// Existe el mueble y el cliente
    this.addMuebleExistente(idMueble, cantidad);
    const transaccion: Transaccion = {
      date: new Date(),
      id_mueble: idMueble,
      id_implicado: idCliente,
      type: 'Devolución de Cliente',
      num_productos: cantidad,
      amount: importe
    };
    this._db.addNewTransaccion(transaccion);
  }

  devolucionProveedor(idMueble: number, idProveedor: number, cantidad: number) {
    const transaccion_previa = this._db.getDBTransaccion().get("Transacciones").find({id_mueble: idMueble, id_implicado: idProveedor, type: 'Compra'}).value();
    if (!transaccion_previa) throw new Error('No se ha encontrado la transacción previa con el id proporcionado, por lo que no se puede realizar la devolución');
    const proveedor = this._db.getDBProveedores().get("Proveedores").find({_id: idProveedor}).value();
    if (!proveedor) throw new Error('No se ha encontrado el proveedor con el id proporcionado');
    const importe = this._db.getDBMuebles().get("Muebles").find({_id: idMueble}).value()._precio * cantidad;
    /// Existe el mueble y el proveedor
    this.removeMueble(idMueble, cantidad);
    const transaccion: Transaccion = {
      date: new Date(),
      id_mueble: idMueble,
      id_implicado: idProveedor,
      type: 'Devolución a Proveedor',
      num_productos: cantidad,
      amount: importe
    };
    this._db.addNewTransaccion(transaccion);
  }

  obtenerNuevoID(param :'Muebles' | 'Clientes' | 'Proveedores' | 'Transacciones') {
    switch (param) {
      case 'Muebles':
        return this._db.getDBMuebles().get("Muebles").value().length + 1;
      case 'Clientes':
        return this._db.getDBClientes().get("Clientes").value().length + 1;
      case 'Proveedores':
        return this._db.getDBProveedores().get("Proveedores").value().length + 1;
      case 'Transacciones':
        return this._db.getDBTransaccion().get("Transacciones").value().length + 1;
      default:
        throw new Error('No se ha encontrado el parámetro proporcionado');
    }
  }

  // <---------------------------------------------- Informes ---------------------------------------------->
  
  informeVentasHistorico() {
    const totalVentas = this._db.getDBTransaccion().get("Transacciones").filter({type: 'Venta'}).size().value();
    const cantidadMueblesVendidos = this._db.getDBTransaccion().get("Transacciones").filter({type: 'Venta'}).map('num_productos').value().reduce((a, b) => a + b, 0);
    const importeTotalVentas = this._db.getDBTransaccion().get("Transacciones").filter({type: 'Venta'}).map('amount').value().reduce((a, b) => a + b, 0);
    return {
      ventas_realizadas: totalVentas, 
      cantidad_muebles_vendidos: cantidadMueblesVendidos,
      importe_total_ventas: importeTotalVentas
    };
  }

  informeVentasMensual(mes :number, anio :number) {
    const ventas = this._db.getDBTransaccion().get("Transacciones").filter({ type: 'Venta' }).value();
    const filteredVentas = ventas.filter(transaccion => {
      const transactionDate = new Date(transaccion.date);
      return transactionDate.getMonth() === mes - 1 && transactionDate.getFullYear() === anio;
    });
    const totalVentas = filteredVentas.length;
    const cantidadMueblesVendidos = filteredVentas.map(venta => venta.num_productos).reduce((a, b) => a + b, 0);
    const importeTotalVentas = filteredVentas.reduce((total, transaccion) => total + transaccion.amount, 0);
    return {
      ventas_realizadas: totalVentas,
      cantidad_muebles_vendidos: cantidadMueblesVendidos,
      importe_total_ventas: importeTotalVentas
    };
  }

  informeComprasHistorico() {
    const totalCompras = this._db.getDBTransaccion().get("Transacciones").filter({type: 'Compra'}).size().value();
    const cantidadMueblesComprados = this._db.getDBTransaccion().get("Transacciones").filter({type: 'Compra'}).map('num_productos').value().reduce((a, b) => a + b, 0);
    const importeTotalCompras = this._db.getDBTransaccion().get("Transacciones").filter({type: 'Compra'}).map('amount').value().reduce((a, b) => a + b, 0);
    return {
      compras_realizadas: totalCompras, 
      cantidad_muebles_comprados: cantidadMueblesComprados,
      importe_total_compras: importeTotalCompras
    };
  }

  informeComprasMensual(mes :number, anio :number) {
    const compras = this._db.getDBTransaccion().get("Transacciones").filter({ type: 'Compra' }).value();
    const filteredCompras = compras.filter(transaccion => {
      const transactionDate = new Date(transaccion.date);
      return transactionDate.getMonth() === mes - 1 && transactionDate.getFullYear() === anio;
    });
    const totalCompras = filteredCompras.length;
    const cantidadMueblesComprados = filteredCompras.map(compra => compra.num_productos).reduce((a, b) => a + b, 0);
    const importeTotalCompras = filteredCompras.reduce((total, transaccion) => total + transaccion.amount, 0);
    return {
      compras_realizadas: totalCompras,
      cantidad_muebles_comprados: cantidadMueblesComprados,
      importe_total_compras: importeTotalCompras
    };
  }

  informeStockMuebles() {
    const muebles = this._db.getDBMuebles().get("Muebles").value();
    const stock = muebles.map(mueble => {
      return {
        id: mueble._id,
        nombre: mueble._nombre,
        cantidad: mueble._cantidad
      };
    });
    return stock;
  }

  informeStockMueblesPorTipo(tipo: string) {
    const muebles = this._db.getDBMuebles().get("Muebles").filter({ _tipo: tipo }).value();
    const stock = muebles.map(mueble => {
      return {
        id: mueble._id,
        nombre: mueble._nombre,
        cantidad: mueble._cantidad
      };
    });
    return stock;
  }

  informeMuebleMasVendido() {
    const ventas = this._db.getDBTransaccion().get("Transacciones").filter({type: 'Venta'}).value();
    const muebles = this._db.getDBMuebles().get("Muebles").value();
    const mueblesVendidos = muebles.map(mueble => {
      const cantidadVendida = ventas.filter(venta => venta.id_mueble === mueble._id).map(venta => venta.num_productos).reduce((a, b) => a + b, 0);
      return {
        id: mueble._id,
        nombre: mueble._nombre,
        cantidad_vendida: cantidadVendida
      };
    });
    const muebleMasVendido = mueblesVendidos.reduce((prev, current) => (prev.cantidad_vendida > current.cantidad_vendida) ? prev : current);
    return muebleMasVendido;
  }

  informeTipoMuebleMasVendido() {
    const ventas = this._db.getDBTransaccion().get("Transacciones").filter({type: 'Venta'}).value();
    const muebles = this._db.getDBMuebles().get("Muebles").value();
    const tipos = muebles.map(mueble => mueble._tipo);
    const tiposUnicos = tipos.filter((v, i, a) => a.indexOf(v) === i);
    const mueblesVendidos = tiposUnicos.map(tipo => {
      const mueble = muebles.find(mueble => mueble._tipo === tipo);
      const cantidadVendida = mueble ? ventas.filter(venta => venta.id_mueble === mueble._id).map(venta => venta.num_productos).reduce((a, b) => a + b, 0)
                                     : 0;
      return {
        tipo: tipo,
        cantidad_vendida: cantidadVendida
      };
    });
    const tipoMuebleMasVendido = mueblesVendidos.reduce((prev, current) => (prev.cantidad_vendida > current.cantidad_vendida) ? prev : current);
    return tipoMuebleMasVendido;
  }

  informeVentasAClienteConcreto(idCliente: number) {
    const compras = this._db.getDBTransaccion().get("Transacciones").filter({id_implicado: idCliente, type: 'Venta'}).value();
    return compras;
  }

  informeComprasAProveedorConcreto(idProveedor: number) {
    const compras = this._db.getDBTransaccion().get("Transacciones").filter({id_implicado: idProveedor, type: 'Compra'}).value();
    return compras;
  }
}
