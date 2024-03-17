/**
 * Interfaz que representa la información de una transacción.
 * @param date Fecha de la transacción.
 * @param id_mueble Identificador del mueble involucrado en la transacción.
 * @param id_implicado Identificador del implicado en la transacción.
 * @param type Tipo de transacción.
 * @param num_productos Número de productos en la transacción.
 * @param amount Importe de la transacción.
 */
export interface Transaccion {
	date: Date;
	id_mueble: number;
	id_implicado : number;
	type: 'Compra' | 'Venta' | 'Devolución de Cliente' | 'Devolución a Proveedor';
	num_productos :number;
	amount: number;
}