export interface Transaccion {
	date: string;
	id_mueble: number;
	id_implicado : number;
	type: 'Compra' | 'Venta' | 'Devolución de Cliente' | 'Devolución a Proveedor';
	amount: number;
}