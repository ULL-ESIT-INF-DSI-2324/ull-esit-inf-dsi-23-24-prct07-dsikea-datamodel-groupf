// import { Mueble } from "./mueble.js";
// import { Proveedor } from "./proveedor.js";
// import { Cliente } from "./cliente.js";

import { ColeccionMuebles } from "./coleccion_muebles.js";
import { ColeccionProveedores } from "./coleccion_proveedores.js";
import { ColeccionClientes } from "./coleccion_clientes.js";
import { Transaccion } from "./transaccion.js";

import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync.js";

type DBStock = {
  Muebles: ColeccionMuebles;
  Proveedores: ColeccionProveedores;
  Clientes: ColeccionClientes;
  Transacciones: Transaccion[];
}

export class Stock {
	private _db: lowdb.LowdbSync<DBStock>;
	private _stock: DBStock;
	
  private static StockInstance: Stock;

	constructor() {
		this._db = lowdb(new FileSync("stock.json"));
	}

  public static getInstance(): Stock {
    if (!Stock.StockInstance) {
      Stock.StockInstance = new Stock();
    }
    return Stock.StockInstance;
  }

  get db() {
    return Stock.StockInstance._db;
  }
	
}