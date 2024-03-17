import { Mueble } from "./mueble.js";
import { Proveedor } from "./proveedor.js";
import { Cliente } from "./cliente.js";
import { Transaccion } from "./transaccion.js";

import { Database } from "./database.js";

type InfoMueble = 'nombre' | 'tipo' | 'descripcion' | 'material' | 'dimensiones' | 'precio' | 'cantidad';

type InfoEntidad = 'nombre' | 'direccion' | 'contacto';

/**
 * Clase que representa el stock de muebles y gestiona las operaciones relacionadas con ellos, 
 * así como con proveedores, clientes y transacciones.
 */
export class Stock {
	private _db: Database = Database.getInstance();

	constructor() {}

  get db() {
    return this._db;
  }

  /// <---------------------------------------------- Muebles ---------------------------------------------->

  /**
   * Añade un nuevo mueble al stock.
   * @param mueble Objeto de tipo Mueble que se va a añadir al stock.
   */
  addNewMueble(mueble: Mueble) {
    this._db.addNewMueble(mueble);
  }
  
  /**
   * Añade la cantidad especificada de un mueble existente en el stock.
   * @param id Identificador único del mueble.
   * @param cantidad Cantidad del mueble que se va a añadir.
   */
  addMuebleExistente(id: number, cantidad: number) :void {
    const dbMuebles = this._db.getDBMuebles();
    const mueblesArray = dbMuebles.get("Muebles");
    const existe_id = mueblesArray.find({ _id: id }).value();
    if (existe_id) {
        mueblesArray.find({ _id: id }).assign({ _cantidad: existe_id._cantidad + cantidad }).write();
        console.log(`Cantidad de mueble con ID ${id} actualizada correctamente.`);
    } else {
        throw new Error('No se ha encontrado el mueble con el id proporcionado');
    }
  }

  /**
   * Elimina la cantidad especificada de un mueble del stock.
   * @param id Identificador único del mueble.
   * @param cantidad Cantidad del mueble que se va a eliminar.
   */
  removeMueble(id: number, cantidad: number) :void {
    const dbMuebles = this._db.getDBMuebles();
    const mueblesArray = dbMuebles.get("Muebles");
    const existe_id = mueblesArray.find({ _id: id }).value();
    if (existe_id) {
      if (existe_id._cantidad === cantidad) {
        this._db.removeMueble(id);
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

  /**
   * Modifica los atributos de un mueble específico en el stock.
   * @param id Identificador único del mueble.
   * @param parametro Parámetro que se va a modificar ('nombre', 'tipo', 'descripcion', 'material', 'dimensiones', 'precio' o 'cantidad').
   * @param valor Nuevo valor del parámetro especificado.
   */
	modifyMueble(id: number, parametro :InfoMueble, valor :string | number) :void {
    const existe_mueble = this._db.getDBMuebles().get("Muebles").find({_id: id}).value()
    if (!existe_mueble) throw new Error('No se ha encontrado el mueble con el id proporcionado');
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
      }
    }
  }

  /**
   * Busca muebles en el stock por su nombre.
   * @param nombre Nombre del mueble a buscar.
   * @param alfabeticamente Indica si se deben ordenar los resultados alfabéticamente.
   * @param ascendente Indica si se deben ordenar los resultados en orden ascendente.
   * @returns Array de muebles encontrados.
   */
  buscarMuebleByNombre(nombre: string, alfabeticamente: boolean, ascendente: boolean) :Mueble[] {
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

  /**
   * Busca muebles en el stock por su tipo.
   * @param tipo Tipo del mueble a buscar.
   * @param alfabeticamente Indica si se deben ordenar los resultados alfabéticamente.
   * @param ascendente Indica si se deben ordenar los resultados en orden ascendente.
   * @returns Array de muebles encontrados.
   */
  buscarMuebleByTipo(tipo: string, alfabeticamente: boolean, ascendente: boolean) :Mueble[] {
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

  /**
   * Busca muebles en el stock por palabras clave en su descripción.
   * @param keyWords Palabras clave a buscar en la descripción de los muebles.
   * @param alfabeticamente Indica si se deben ordenar los resultados alfabéticamente.
   * @param ascendente Indica si se deben ordenar los resultados en orden ascendente.
   * @returns Array de muebles encontrados.
   */
  buscarMuebleByKeyWordsDescripcion(keyWords: string, alfabeticamente: boolean, ascendente: boolean) :Mueble[] {
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

  /**
   * Añade un nuevo proveedor al sistema.
   * @param proveedor Objeto de tipo Proveedor que se va a añadir al sistema.
   */
  addProveedor(proveedor: Proveedor) :void {
    this._db.addNewProveedor(proveedor);
  }

  /**
   * Elimina un proveedor del sistema.
   * @param id Identificador único del proveedor.
   */
  removeProveedor(id: number) :void {
    this._db.removeProveedor(id);
  }

  /**
   * Modifica los atributos de un proveedor específico en el sistema.
   * @param id Identificador único del proveedor.
   * @param parametro Parámetro que se va a modificar ('nombre', 'direccion' o 'contacto').
   * @param valor Nuevo valor del parámetro especificado.
   */
  modifyProveedor(id: number, parametro :InfoEntidad, valor :string) :void {
    const proveedor_existe = this._db.getDBProveedores().get("Proveedores").find({_id: id}).value();
    if (!proveedor_existe) throw new Error('No se ha encontrado el proveedor con el id proporcionado');
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
        }
      }
    });
  }

  /**
   * Busca proveedores en el sistema por su nombre.
   * @param nombre Nombre del proveedor a buscar.
   * @returns Array de proveedores encontrados.
   */
  buscarProveedorByNombre(nombre: string) :Proveedor[] {
    const dbProveedores = this._db.getDBProveedores();
    const proveedoresArray = dbProveedores.get("Proveedores");
    const proveedor = proveedoresArray.filter(proveedor => proveedor._nombre === nombre).value();
    if (proveedor.length > 0) {
      return proveedor;
    } else {
      throw new Error('No se ha encontrado el proveedor con el nombre proporcionado');
    }
  }

  /**
   * Busca proveedores en el sistema por su contacto.
   * @param contacto Contacto del proveedor a buscar.
   * @returns Array de proveedores encontrados.
   */
  buscarProveedorByContacto(contacto: string) :Proveedor[] {
    const dbProveedores = this._db.getDBProveedores();
    const proveedoresArray = dbProveedores.get("Proveedores");
    const proveedor = proveedoresArray.filter(proveedor => proveedor._contacto === contacto).value();
    if (proveedor.length > 0) {
      return proveedor;
    } else {
      throw new Error('No se ha encontrado el proveedor con el contacto proporcionado');
    }
  }

  /**
   * Busca proveedores en el sistema por su dirección.
   * @param direccion Dirección del proveedor a buscar.
   * @returns Array de proveedores encontrados.
   */
  buscarProveedorByDireccion(direccion: string) :Proveedor[] {
    const dbProveedores = this._db.getDBProveedores();
    const proveedoresArray = dbProveedores.get("Proveedores");
    const proveedor = proveedoresArray.filter(proveedor => proveedor._direccion === direccion).value();
    if (proveedor.length > 0) {
      return proveedor;
    } else {
      throw new Error('No se ha encontrado el proveedor con la dirección proporcionada');
    }
  }

  /// <---------------------------------------------- Clientes ---------------------------------------------->

  /**
   * Añade un nuevo cliente al sistema.
   * @param cliente Objeto de tipo Cliente que se va a añadir al sistema.
   */
  addCliente(cliente: Cliente) :void {
    this._db.addNewCliente(cliente);
  }

  /**
   * Elimina un cliente del sistema.
   * @param id Identificador único del cliente.
   */
  removeCliente(id: number) :void {
    this._db.removeCliente(id);
  }

  /**
   * Modifica los atributos de un cliente específico en el sistema.
   * @param id Identificador único del cliente.
   * @param parametro Parámetro que se va a modificar ('nombre', 'direccion' o 'contacto').
   * @param valor Nuevo valor del parámetro especificado.
   */
  modifyCliente(id: number, parametro :InfoEntidad, valor :string) :void {
    const cliente_existe = this._db.getDBClientes().get("Clientes").find({_id: id}).value();
    if (!cliente_existe) throw new Error('No se ha encontrado el cliente con el id proporcionado');
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
        }
      }
    });
  }

  /**
   * Busca clientes en el sistema por su nombre.
   * @param nombre Nombre del cliente a buscar.
   * @returns Array de clientes encontrados.
   */
  buscarClienteByNombre(nombre: string) :Cliente[] {
    const dbClientes = this._db.getDBClientes();
    const clientesArray = dbClientes.get("Clientes");
    const cliente = clientesArray.filter(cliente => cliente._nombre === nombre).value();
    if (cliente.length > 0) {
      return cliente;
    } else {
      throw new Error('No se ha encontrado el cliente con el nombre proporcionado');
    }
  }

  /**
   * Busca clientes en el sistema por su contacto.
   * @param contacto Contacto del cliente a buscar.
   * @returns Array de clientes encontrados.
   */
  buscarClienteByContacto(contacto: string) :Cliente[] {
    const dbClientes = this._db.getDBClientes();
    const clientesArray = dbClientes.get("Clientes");
    const cliente = clientesArray.filter(cliente => cliente._contacto === contacto).value();
    if (cliente.length > 0) {
      return cliente;
    } else {
      throw new Error('No se ha encontrado el cliente con el contacto proporcionado');
    }
  }

  /**
   * Busca clientes en el sistema por su dirección.
   * @param direccion Dirección del cliente a buscar.
   * @returns Array de clientes encontrados.
   */
  buscarClienteByDireccion(direccion: string) :Cliente[] {
    const dbClientes = this._db.getDBClientes();
    const clientesArray = dbClientes.get("Clientes");
    const cliente = clientesArray.filter(cliente => cliente._direccion === direccion).value();
    if (cliente.length > 0) {
      return cliente;
    } else {
      throw new Error('No se ha encontrado el cliente con la dirección proporcionada');
    }
  }

  /// <---------------------------------------------- Transacciones ---------------------------------------------->

  /**
   * Registra la venta de un mueble a un cliente.
   * @param idMueble Identificador único del mueble vendido.
   * @param idCliente Identificador único del cliente que realiza la compra.
   * @param cantidad Cantidad de muebles vendidos.
   */
  ventaMueble(idMueble: number, idCliente: number, cantidad: number) :void {
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

  /**
   * Registra la compra de muebles a un proveedor.
   * @param idMueble Identificador único del mueble comprado.
   * @param idProveedor Identificador único del proveedor que realiza la venta.
   * @param cantidad Cantidad de muebles comprados.
   */
  compraMueble(idMueble: number, idProveedor: number, cantidad: number) :void {
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

  /**
   * Registra la devolución de un mueble por parte de un cliente.
   * @param idMueble Identificador único del mueble devuelto.
   * @param idCliente Identificador único del cliente que realiza la devolución.
   * @param cantidad Cantidad de muebles devueltos.
   */
  devolucionCliente(idMueble: number, idCliente: number, cantidad: number) :void {
    const mueble = this._db.getDBMuebles().get("Muebles").find({_id: idMueble}).value();
    if (!mueble) throw new Error('No se ha encontrado el mueble con el id proporcionado');
    const cliente = this._db.getDBClientes().get("Clientes").find({_id: idCliente}).value();
    if (!cliente) throw new Error('No se ha encontrado el cliente con el id proporcionado');
    const transaccion_previa = this._db.getDBTransaccion().get("Transacciones").find({id_mueble: idMueble, id_implicado: idCliente, type: 'Venta'}).value();
    if (!transaccion_previa) throw new Error('No se ha encontrado la transacción previa con el id proporcionado, por lo que no se puede realizar la devolución');
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

  /**
   * Registra la devolución de un mueble al proveedor.
   * @param idMueble Identificador único del mueble devuelto.
   * @param idProveedor Identificador único del proveedor al que se devuelve el mueble.
   * @param cantidad Cantidad de muebles devueltos.
   */
  devolucionProveedor(idMueble: number, idProveedor: number, cantidad: number) :void {
    const mueble = this._db.getDBMuebles().get("Muebles").find({_id: idMueble}).value();
    if (!mueble) throw new Error('No se ha encontrado el mueble con el id proporcionado');
    const proveedor = this._db.getDBProveedores().get("Proveedores").find({_id: idProveedor}).value();
    if (!proveedor) throw new Error('No se ha encontrado el proveedor con el id proporcionado');
    const transaccion_previa = this._db.getDBTransaccion().get("Transacciones").find({id_mueble: idMueble, id_implicado: idProveedor, type: 'Compra'}).value();
    if (!transaccion_previa) throw new Error('No se ha encontrado la transacción previa con el id proporcionado, por lo que no se puede realizar la devolución');
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

  /**
   * Obtiene un nuevo ID para una entidad específica (Muebles, Clientes, Proveedores o Transacciones).
   * @param param Parámetro que especifica la entidad para la cual se desea obtener un nuevo ID.
   * @returns Nuevo ID para la entidad especificada.
   */
  obtenerNuevoID(param :'Muebles' | 'Clientes' | 'Proveedores' | 'Transacciones') :number {
    switch (param) {
      case 'Muebles':
        return this._db.getDBMuebles().get("Muebles").value().length + 1;
      case 'Clientes':
        return this._db.getDBClientes().get("Clientes").value().length + 1;
      case 'Proveedores':
        return this._db.getDBProveedores().get("Proveedores").value().length + 1;
      case 'Transacciones':
        return this._db.getDBTransaccion().get("Transacciones").value().length + 1;
    }
  }

  // <---------------------------------------------- Informes ---------------------------------------------->
  
  /**
   * Genera un informe histórico de ventas.
   * @returns Objeto con el total de ventas realizadas, la cantidad total de muebles vendidos y el importe total de las ventas.
   */
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

  /**
   * Genera un informe mensual de ventas.
   * @param mes Mes para el cual se desea generar el informe.
   * @param anio Año para el cual se desea generar el informe.
   * @returns Objeto con el total de ventas realizadas en el mes especificado, la cantidad total de muebles vendidos y el importe total de las ventas.
   */
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

  /**
   * Genera un informe histórico de compras.
   * @returns Objeto con el total de compras realizadas, la cantidad total de muebles comprados y el importe total de las compras.
   */
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

  /**
   * Genera un informe mensual de compras.
   * @param mes Mes para el cual se desea generar el informe.
   * @param anio Año para el cual se desea generar el informe.
   * @returns Objeto con el total de compras realizadas en el mes especificado, la cantidad total de muebles comprados y el importe total de las compras.
   */
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

  /**
   * Genera un informe del stock de muebles.
   * @returns Lista de objetos con el ID, nombre y cantidad en stock de cada mueble.
   */
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

  /**
   * Genera un informe del stock de muebles de un tipo específico.
   * @param tipo Tipo de mueble para el cual se desea generar el informe.
   * @returns Lista de objetos con el ID, nombre y cantidad en stock de cada mueble del tipo especificado.
   */
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

  /**
   * Genera un informe del mueble más vendido.
   * @returns Objeto con el ID, nombre y cantidad vendida del mueble más vendido.
   */
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

  /**
   * Genera un informe del tipo de mueble más vendido.
   * @returns Objeto con el tipo de mueble más vendido y la cantidad total vendida.
   */
  informeTipoMuebleMasVendido() {
    const ventas = this._db.getDBTransaccion().get("Transacciones").filter({type: 'Venta'}).value();
    const muebles = this._db.getDBMuebles().get("Muebles").value();
    const tipos = muebles.map(mueble => mueble._tipo);
    const tiposUnicos = tipos.filter((v, i, a) => a.indexOf(v) === i);
    const mueblesVendidos = tiposUnicos.map(tipo => {
      const idMuebles = muebles.filter(mueble => mueble._tipo === tipo).map(mueble => mueble._id);
      const cantidadVendida = ventas.filter(venta => idMuebles.includes(venta.id_mueble)).map(venta => venta.num_productos).reduce((a, b) => a + b, 0);
      return {
        tipo: tipo,
        cantidad_vendida: cantidadVendida
      };
    });
    const tipoMuebleMasVendido = mueblesVendidos.reduce((prev, current) => (prev.cantidad_vendida > current.cantidad_vendida) ? prev : current);
    return tipoMuebleMasVendido;
  }

  /**
   * Genera un informe de las ventas realizadas a un cliente específico.
   * @param idCliente ID del cliente para el cual se desea generar el informe.
   * @returns Lista de objetos con los detalles de las ventas realizadas al cliente especificado.
   */
  informeVentasAClienteConcreto(idCliente: number) :Transaccion[] {
    const compras = this._db.getDBTransaccion().get("Transacciones").filter({id_implicado: idCliente, type: 'Venta'}).value();
    return compras;
  }

  /**
   * Genera un informe de las compras realizadas a un proveedor específico.
   * @param idProveedor ID del proveedor para el cual se desea generar el informe.
   * @returns Lista de objetos con los detalles de las compras realizadas al proveedor especificado.
   */
  informeComprasAProveedorConcreto(idProveedor: number) :Transaccion[] {
    const compras = this._db.getDBTransaccion().get("Transacciones").filter({id_implicado: idProveedor, type: 'Compra'}).value();
    return compras;
  }
}
