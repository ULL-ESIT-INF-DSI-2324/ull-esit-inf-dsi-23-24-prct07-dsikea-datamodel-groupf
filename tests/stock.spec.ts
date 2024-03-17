import 'mocha';
import { expect } from 'chai';

import { Stock } from '../src/dsikea/stock.js';
import { Mueble } from '../src/dsikea/mueble.js';
import { Proveedor } from '../src/dsikea/proveedor.js';
import { Cliente } from '../src/dsikea/cliente.js';
import { Transaccion } from '../src/dsikea/transaccion.js';

describe('Tests de la clase Stock', () => {
	// Variables para los tests
	const stock = new Stock();

	const armario = new Mueble(21, 'Armario', 'Armario Test', 'Un armario test.', 'Madera', 'Dimensiones Test', 200, 3);
	const comoda = new Mueble(22, 'Cómoda', 'Cómoda Test', 'Una cómoda test.', 'Madera', 'Dimensiones Test', 150, 2);
	const mesa = new Mueble(23, 'Mesa', 'Mesa Test', 'Una mesa test.', 'Madera', 'Dimensiones Test', 150, 2);
	const silla = new Mueble(24, 'Silla', 'Silla Test', 'Una silla test.', 'Madera', 'Dimensiones Test', 50, 4);

	const proveedor = new Proveedor(6, 'Proveedor Test', 'Contacto Test', 'Direccion Test');
	const cliente = new Cliente(6, 'Cliente Test', 'Contacto Test', 'Direccion Test');

	it('Se crea un stock correctamente', () => {
		expect(stock).to.be.an.instanceOf(Stock);
	});

	it('Se añade un mueble correctamente al stock', () => {
		stock.addNewMueble(armario);
		stock.addNewMueble(comoda);
		stock.addNewMueble(mesa);
		stock.addNewMueble(silla);

		expect(stock.db.getDBMuebles().get('Muebles').value().includes(armario)).to.be.true;
		expect(stock.db.getDBMuebles().get('Muebles').value().includes(comoda)).to.be.true;
		expect(stock.db.getDBMuebles().get('Muebles').value().includes(mesa)).to.be.true;
		expect(stock.db.getDBMuebles().get('Muebles').value().includes(silla)).to.be.true;
	});

	it('Se añade un mueble existente correctamente del stock', () => {
		const cantidad_previa = armario.cantidad;
		const cantidad = 3;
		stock.addMuebleExistente(armario.id, cantidad);

		expect(stock.db.getDBMuebles().get('Muebles').find({ _id: armario.id }).value()._cantidad).to.be.equal(cantidad_previa + cantidad);

		// Error
		expect(() => stock.addMuebleExistente(0, 3)).to.throw(Error, 'No se ha encontrado el mueble con el id proporcionado');
	});

	it('Se modifica un mueble correctamente del stock', () => {
		const id = 22;
		const tipo = 'Comoda'
		const nombre = 'Armario Test 2';
		const descripcion = 'Un armario test. Versión 2.';
		const material = 'Madera V2';
		const dimensiones = 'Dimensiones Test V2';
		const precio = 250;
		const cantidad = 4;
		stock.modifyMueble(id, 'nombre', nombre);
		stock.modifyMueble(id, 'tipo', tipo);
		stock.modifyMueble(id, 'descripcion', descripcion);
		stock.modifyMueble(id, 'material', material);
		stock.modifyMueble(id, 'dimensiones', dimensiones);
		stock.modifyMueble(id, 'precio', precio);
		stock.modifyMueble(id, 'cantidad', cantidad);

		expect(stock.db.getDBMuebles().get('Muebles').find({ _id: id }).value()._nombre).to.be.equal(nombre);
		expect(stock.db.getDBMuebles().get('Muebles').find({ _id: id }).value()._tipo).to.be.equal(tipo);
		expect(stock.db.getDBMuebles().get('Muebles').find({ _id: id }).value()._descripcion).to.be.equal(descripcion);
		expect(stock.db.getDBMuebles().get('Muebles').find({ _id: id }).value()._material).to.be.equal(material);
		expect(stock.db.getDBMuebles().get('Muebles').find({ _id: id }).value()._dimensiones).to.be.equal(dimensiones);
		expect(stock.db.getDBMuebles().get('Muebles').find({ _id: id }).value()._precio).to.be.equal(precio);
		expect(stock.db.getDBMuebles().get('Muebles').find({ _id: id }).value()._cantidad).to.be.equal(cantidad);

		// Error
		expect(() => stock.modifyMueble(0, 'nombre', nombre)).to.throw(Error, 'No se ha encontrado el mueble con el id proporcionado');
	});

	it('Se elimina un mueble correctamente del stock', () => {
		stock.removeMueble(armario.id, armario.cantidad);
		stock.removeMueble(comoda.id, comoda.cantidad);
		stock.removeMueble(mesa.id, mesa.cantidad);
		stock.removeMueble(silla.id, silla.cantidad);

		expect(stock.db.getDBMuebles().get('Muebles').value().includes(armario)).to.be.false;
		expect(stock.db.getDBMuebles().get('Muebles').value().includes(comoda)).to.be.false;
		expect(stock.db.getDBMuebles().get('Muebles').value().includes(mesa)).to.be.false;
		expect(stock.db.getDBMuebles().get('Muebles').value().includes(silla)).to.be.false;

		// Error
		expect(() => stock.removeMueble(0, 1)).to.throw(Error, 'No se ha encontrado el mueble con el id proporcionado');
		expect(() => stock.removeMueble(1, 999)).to.throw(Error, 'No se puede eliminar más cantidad de la que hay en stock');
	});

	it('Se añade un proveedor correctamente al stock', () => {
		stock.addProveedor(proveedor);
		expect(stock.db.getDBProveedores().get('Proveedores').value().includes(proveedor)).to.be.true;
	});

	it('Se modifica un proveedor correctamente del stock', () => {
		const id = 6;
		const nombre = 'Proveedor Test 2';
		const contacto = 'Contacto Test 2';
		const direccion = 'Direccion Test 2';
		stock.modifyProveedor(id, 'nombre', nombre);
		stock.modifyProveedor(id, 'contacto', contacto);
		stock.modifyProveedor(id, 'direccion', direccion);

		expect(stock.db.getDBProveedores().get('Proveedores').find({ _id: id }).value()._nombre).to.be.equal(nombre);
		expect(stock.db.getDBProveedores().get('Proveedores').find({ _id: id }).value()._contacto).to.be.equal(contacto);
		expect(stock.db.getDBProveedores().get('Proveedores').find({ _id: id }).value()._direccion).to.be.equal(direccion);

		// Error
		expect(() => stock.modifyProveedor(0, 'nombre', nombre)).to.throw(Error, 'No se ha encontrado el proveedor con el id proporcionado');
	});

	it('Se elimina un proveedor correctamente del stock', () => {
		stock.removeProveedor(proveedor.id);
		expect(stock.db.getDBProveedores().get('Proveedores').value().includes(proveedor)).to.be.false;
	});

	it('Se añade un cliente correctamente al stock', () => {
		stock.addCliente(cliente);
		expect(stock.db.getDBClientes().get('Clientes').value().includes(cliente)).to.be.true;
	});

	it('Se modifica un cliente correctamente del stock', () => {
		const id = 6;
		const nombre = 'Cliente Test 2';
		const contacto = 'Contacto Test 2';
		const direccion = 'Direccion Test 2';
		stock.modifyCliente(id, 'nombre', nombre);
		stock.modifyCliente(id, 'contacto', contacto);
		stock.modifyCliente(id, 'direccion', direccion);

		expect(stock.db.getDBClientes().get('Clientes').find({ _id: id }).value()._nombre).to.be.equal(nombre);
		expect(stock.db.getDBClientes().get('Clientes').find({ _id: id }).value()._contacto).to.be.equal(contacto);
		expect(stock.db.getDBClientes().get('Clientes').find({ _id: id }).value()._direccion).to.be.equal(direccion);

		// Error
		expect(() => stock.modifyCliente(0, 'nombre', nombre)).to.throw(Error, 'No se ha encontrado el cliente con el id proporcionado');
	});

	it('Se elimina un cliente correctamente del stock', () => {
		stock.removeCliente(cliente.id);
		expect(stock.db.getDBClientes().get('Clientes').value().includes(cliente)).to.be.false;
	});


	it('Se realiza una compra a un proveedor correctamente', () => {
		const idMueble = 1;
		const idImplicado = 1;
		const cantidad_previa = stock.db.getDBMuebles().get('Muebles').find({ _id: idMueble }).value()._cantidad;
		const cantidad = 5;
		stock.compraMueble(idMueble, idImplicado, cantidad);

		expect(stock.db.getDBMuebles().get('Muebles').find({ _id: idMueble }).value()._cantidad).to.be.equal(cantidad + cantidad_previa);

		// Errores
		expect(() => stock.compraMueble(0, idImplicado, cantidad)).to.throw(Error, 'No se ha encontrado el mueble con el id proporcionado');
		expect(() => stock.compraMueble(idMueble, 0, cantidad)).to.throw(Error, 'No se ha encontrado el proveedor con el id proporcionado');
	});

	it('Se realiza una devolución a un proveedor correctamente', () => {
		const idMueble = 1;
		const idImplicado = 1;
		const cantidad_previa = stock.db.getDBMuebles().get('Muebles').find({ _id: idMueble }).value()._cantidad;
		const cantidad = 5;
		stock.devolucionProveedor(idMueble, idImplicado, cantidad);

		expect(stock.db.getDBMuebles().get('Muebles').find({ _id: idMueble }).value()._cantidad).to.be.equal(cantidad_previa - cantidad);

		// Errores
		expect(() => stock.devolucionProveedor(0, idImplicado, cantidad)).to.throw(Error, 'No se ha encontrado el mueble con el id proporcionado');
		expect(() => stock.devolucionProveedor(idMueble, 0, cantidad)).to.throw(Error, 'No se ha encontrado el proveedor con el id proporcionado');
		expect(() => stock.devolucionProveedor(5, 5, cantidad)).to.throw(Error, 'No se ha encontrado la transacción previa con el id proporcionado, por lo que no se puede realizar la devolución');
	});

	it('Se realiza una venta a un cliente correctamente', () => {
		const idMueble = 2;
		const idImplicado = 2;
		const cantidad_previa = stock.db.getDBMuebles().get('Muebles').find({ _id: idMueble }).value()._cantidad;
		const cantidad = 1;
		stock.ventaMueble(idMueble, idImplicado, cantidad);

		expect(stock.db.getDBMuebles().get('Muebles').find({ _id: idMueble }).value()._cantidad).to.be.equal(cantidad_previa - cantidad);

		// Errores
		expect(() => stock.ventaMueble(0, idImplicado, cantidad)).to.throw(Error, 'No se ha encontrado el mueble con el id proporcionado');
		expect(() => stock.ventaMueble(idMueble, 0, cantidad)).to.throw(Error, 'No se ha encontrado el cliente con el id proporcionado');
		expect(() => stock.ventaMueble(idMueble, idImplicado, 3)).to.throw(Error, 'No se puede eliminar más cantidad de la que hay en stock');	
	});

	it('Se realiza una devolución a un cliente correctamente', () => {
		const idMueble = 2;
		const idImplicado = 2;
		const cantidad_previa = stock.db.getDBMuebles().get('Muebles').find({ _id: idMueble }).value()._cantidad;
		const cantidad = 1;
		stock.devolucionCliente(idMueble, idImplicado, cantidad);

		expect(stock.db.getDBMuebles().get('Muebles').find({ _id: idMueble }).value()._cantidad).to.be.equal(cantidad + cantidad_previa);

		// Errores
		expect(() => stock.devolucionCliente(0, idImplicado, cantidad)).to.throw(Error, 'No se ha encontrado el mueble con el id proporcionado');
		expect(() => stock.devolucionCliente(idMueble, 0, cantidad)).to.throw(Error, 'No se ha encontrado el cliente con el id proporcionado');
		expect(() => stock.devolucionCliente(5, 5, cantidad)).to.throw(Error, 'No se ha encontrado la transacción previa con el id proporcionado, por lo que no se puede realizar la devolución');
	});

	it('Se busca un mueble por nombre correctamente', () => {
		const alfabeticamente = true;
		const ascendente = true;
		// Ordenado Alfabeticamente ascendente y descendente
		const nombre = 'Minimalista Moderna';
		const mueblesEncontrados = stock.buscarMuebleByNombre(nombre, alfabeticamente, ascendente);
		expect(mueblesEncontrados).to.have.lengthOf(2);
		expect(mueblesEncontrados[0]._id).to.be.equal(12);
		expect(mueblesEncontrados[1]._id).to.be.equal(18);

		const mueblesEncontrados2 = stock.buscarMuebleByNombre(nombre, alfabeticamente, !ascendente);
		expect(mueblesEncontrados2).to.have.lengthOf(2);
		expect(mueblesEncontrados2[0]._id).to.be.equal(12);
		expect(mueblesEncontrados2[1]._id).to.be.equal(18);

		// Ordenado Precio ascendente y descendente
		const mueblesEncontrados3 = stock.buscarMuebleByNombre(nombre, !alfabeticamente, ascendente);
		expect(mueblesEncontrados3).to.have.lengthOf(2);
		expect(mueblesEncontrados3[0]._id).to.be.equal(18);
		expect(mueblesEncontrados3[1]._id).to.be.equal(12);

		const mueblesEncontrados4 = stock.buscarMuebleByNombre(nombre, !alfabeticamente, !ascendente);
		expect(mueblesEncontrados4).to.have.lengthOf(2);
		expect(mueblesEncontrados4[0]._id).to.be.equal(12);
		expect(mueblesEncontrados4[1]._id).to.be.equal(18);

		// Error
		expect(() => stock.buscarMuebleByNombre('Mueble Inexistente', alfabeticamente, ascendente)).to.throw(Error, 'No se ha encontrado el mueble con el nombre proporcionado');
	});

	it('Se busca un mueble por tipo correctamente', () => {
		const alfabeticamente = true;
		const ascendente = true;
		const tipo = 'Mesa';
		// Ordenado Alfabeticamente ascendente y descendente
		const mueblesEncontrados = stock.buscarMuebleByTipo(tipo, alfabeticamente, ascendente);
		expect(mueblesEncontrados).to.have.lengthOf(5);
		expect(mueblesEncontrados[0]._id).to.be.equal(11);
		expect(mueblesEncontrados[1]._id).to.be.equal(13);
		expect(mueblesEncontrados[2]._id).to.be.equal(14);
		expect(mueblesEncontrados[3]._id).to.be.equal(12);
		expect(mueblesEncontrados[4]._id).to.be.equal(15);

		const mueblesEncontrados2 = stock.buscarMuebleByTipo(tipo, alfabeticamente, !ascendente);
		expect(mueblesEncontrados2).to.have.lengthOf(5);
		expect(mueblesEncontrados2[0]._id).to.be.equal(15);
		expect(mueblesEncontrados2[1]._id).to.be.equal(12);
		expect(mueblesEncontrados2[2]._id).to.be.equal(14);
		expect(mueblesEncontrados2[3]._id).to.be.equal(13);
		expect(mueblesEncontrados2[4]._id).to.be.equal(11);

		// Ordenado Precio ascendente y descendente
		const mueblesEncontrados3 = stock.buscarMuebleByTipo(tipo, !alfabeticamente, ascendente);
		expect(mueblesEncontrados3).to.have.lengthOf(5);
		expect(mueblesEncontrados3[0]._id).to.be.equal(13);
		expect(mueblesEncontrados3[1]._id).to.be.equal(14);
		expect(mueblesEncontrados3[2]._id).to.be.equal(12);
		expect(mueblesEncontrados3[3]._id).to.be.equal(15);
		expect(mueblesEncontrados3[4]._id).to.be.equal(11);

		const mueblesEncontrados4 = stock.buscarMuebleByTipo(tipo, !alfabeticamente, !ascendente);
		expect(mueblesEncontrados4).to.have.lengthOf(5);
		expect(mueblesEncontrados4[0]._id).to.be.equal(11);
		expect(mueblesEncontrados4[1]._id).to.be.equal(15);
		expect(mueblesEncontrados4[2]._id).to.be.equal(12);
		expect(mueblesEncontrados4[3]._id).to.be.equal(14);
		expect(mueblesEncontrados4[4]._id).to.be.equal(13);

		// Error
		expect(() => stock.buscarMuebleByTipo('Tipo Inexistente', alfabeticamente, ascendente)).to.throw(Error, 'No se ha encontrado el mueble con el tipo proporcionado');
	});

	it('Se busca un mueble por palabras clave en su descripción correctamente', () => {
		const alfabeticamente = true;
		const ascendente = true;
		const palabrasClave = 'perfecta';
		// Ordenado Alfabeticamente ascendente y descendente
		const mueblesEncontrados = stock.buscarMuebleByKeyWordsDescripcion(palabrasClave, alfabeticamente, ascendente);
		expect(mueblesEncontrados).to.have.lengthOf(3);
		expect(mueblesEncontrados[0]._id).to.be.equal(11);
		expect(mueblesEncontrados[1]._id).to.be.equal(18);
		expect(mueblesEncontrados[2]._id).to.be.equal(9);

		const mueblesEncontrados2 = stock.buscarMuebleByKeyWordsDescripcion(palabrasClave, alfabeticamente, !ascendente);
		expect(mueblesEncontrados2).to.have.lengthOf(3);
		expect(mueblesEncontrados2[0]._id).to.be.equal(9);
		expect(mueblesEncontrados2[1]._id).to.be.equal(18);
		expect(mueblesEncontrados2[2]._id).to.be.equal(11);

		// Ordenado Precio ascendente y descendente
		const mueblesEncontrados3 = stock.buscarMuebleByKeyWordsDescripcion(palabrasClave, !alfabeticamente, ascendente);
		expect(mueblesEncontrados3).to.have.lengthOf(3);
		expect(mueblesEncontrados3[0]._id).to.be.equal(18);
		expect(mueblesEncontrados3[1]._id).to.be.equal(9);
		expect(mueblesEncontrados3[2]._id).to.be.equal(11);

		const mueblesEncontrados4 = stock.buscarMuebleByKeyWordsDescripcion(palabrasClave, !alfabeticamente, !ascendente);
		expect(mueblesEncontrados4).to.have.lengthOf(3);
		expect(mueblesEncontrados4[0]._id).to.be.equal(11);
		expect(mueblesEncontrados4[1]._id).to.be.equal(9);
		expect(mueblesEncontrados4[2]._id).to.be.equal(18);
	});

	it('Se busca un proveedor por nombre correctamente', () => {
		const nombre = 'Proveedor 1';
		const proveedorEncontrado = stock.buscarProveedorByNombre(nombre);
		expect(proveedorEncontrado[0]._nombre).to.be.equal(nombre);
		// Error
		expect(() => stock.buscarProveedorByNombre('Proveedor Inexistente')).to.throw(Error, 'No se ha encontrado el proveedor con el nombre proporcionado');
	});

	it('Se busca un proveedor por contacto correctamente', () => {
		const contacto = '177784894';
		const proveedorEncontrado = stock.buscarProveedorByContacto(contacto);
		expect(proveedorEncontrado[0]._contacto).to.be.equal(contacto);
		// Error
		expect(() => stock.buscarProveedorByContacto('Contacto Inexistente')).to.throw(Error, 'No se ha encontrado el proveedor con el contacto proporcionado');
	});

	it('Se busca un proveedor por dirección correctamente', () => {
		const direccion = 'Direccion 1';
		const proveedorEncontrado = stock.buscarProveedorByDireccion(direccion);
		expect(proveedorEncontrado[0]._direccion).to.be.equal(direccion);
		// Error
		expect(() => stock.buscarProveedorByDireccion('Direccion Inexistente')).to.throw(Error, 'No se ha encontrado el proveedor con la dirección proporcionada');
	});

	it('Se busca un cliente por nombre correctamente', () => {
		const nombre = 'Juan Pérez';
		const clienteEncontrado = stock.buscarClienteByNombre(nombre);
		expect(clienteEncontrado[0]._nombre).to.be.equal(nombre);
		// Error
		expect(() => stock.buscarClienteByNombre('Cliente Inexistente')).to.throw(Error, 'No se ha encontrado el cliente con el nombre proporcionado');
	});

	it('Se busca un cliente por contacto correctamente', () => {
		const contacto = '555555555';
		const clienteEncontrado = stock.buscarClienteByContacto(contacto);
		expect(clienteEncontrado[0]._contacto).to.be.equal(contacto);
		// Error
		expect(() => stock.buscarClienteByContacto('Contacto Inexistente')).to.throw(Error, 'No se ha encontrado el cliente con el contacto proporcionado');
	});

	it('Se busca un cliente por dirección correctamente', () => {
		const direccion = 'Calle Falsa 123';
		const clienteEncontrado = stock.buscarClienteByDireccion(direccion);
		expect(clienteEncontrado.length).to.be.equal(2);
		expect(clienteEncontrado[0]._direccion).to.be.equal(direccion);
		expect(clienteEncontrado[1]._direccion).to.be.equal(direccion);
		// Error
		expect(() => stock.buscarClienteByDireccion('Direccion Inexistente')).to.throw(Error, 'No se ha encontrado el cliente con la dirección proporcionada');
	});

	it('Genera un informe de ventas histórico correctamente', () => {
		const informeVentasHistorico = stock.informeVentasHistorico();
		expect(informeVentasHistorico.ventas_realizadas).to.be.equal(3);
		expect(informeVentasHistorico.cantidad_muebles_vendidos).to.be.equal(64);
		expect(informeVentasHistorico.importe_total_ventas).to.be.equal(5650);
	});

	it('Genera un informe de ventas mensual correctamente', () => {
		const mes = 3;
		const anio = 2024;
		const informeVentasMensual = stock.informeVentasMensual(mes, anio);
		expect(informeVentasMensual.ventas_realizadas).to.be.equal(3);
		expect(informeVentasMensual.cantidad_muebles_vendidos).to.be.equal(64);
		expect(informeVentasMensual.importe_total_ventas).to.be.equal(5650);
	});

	it('Genera un informe de compras histórico correctamente', () => {
		const informeComprasHistorico = stock.informeComprasHistorico();
		expect(informeComprasHistorico.compras_realizadas).to.be.equal(2);
		expect(informeComprasHistorico.cantidad_muebles_comprados).to.be.equal(13);
		expect(informeComprasHistorico.importe_total_compras).to.be.equal(5640);
	});

	it('Genera un informe de compras mensual correctamente', () => {
		const mes = 3;
		const anio = 2024;
		const informeComprasMensual = stock.informeComprasMensual(mes, anio);
		expect(informeComprasMensual.compras_realizadas).to.be.equal(2);
		expect(informeComprasMensual.cantidad_muebles_comprados).to.be.equal(13);
		expect(informeComprasMensual.importe_total_compras).to.be.equal(5640);
	});

	it('Genera un informe de stock de muebles correctamente', () => {
		const stockMuebles = stock.informeStockMuebles();
		expect(stockMuebles).to.have.lengthOf(20);

		// Armario con id 1
		expect(stockMuebles[0].id).to.be.equal(1);
		expect(stockMuebles[0].nombre).to.be.equal('Clásico Elegante');
		expect(stockMuebles[0].cantidad).to.be.equal(3);

		// Comoda cond id 6
		expect(stockMuebles[5].id).to.be.equal(6);
		expect(stockMuebles[5].nombre).to.be.equal('Moderna Minimalista');
		expect(stockMuebles[5].cantidad).to.be.equal(4);

		// Mesa con id 11
		expect(stockMuebles[10].id).to.be.equal(11);
		expect(stockMuebles[10].nombre).to.be.equal('Elegancia Clásica');
		expect(stockMuebles[10].cantidad).to.be.equal(4);

		// Silla con id 16
		expect(stockMuebles[15].id).to.be.equal(16);
		expect(stockMuebles[15].nombre).to.be.equal('Ergonómica Comfort');
		expect(stockMuebles[15].cantidad).to.be.equal(42);

	});

	it('Genera un informe de stock de muebles por tipo correctamente', () => {
		const tipo = 'Mesa';
		const stockMueblesPorTipo = stock.informeStockMueblesPorTipo(tipo);
		expect(stockMueblesPorTipo).to.have.lengthOf(5);
		expect(stockMueblesPorTipo[0].id).to.be.equal(11);
		expect(stockMueblesPorTipo[0].nombre).to.be.equal('Elegancia Clásica');
		expect(stockMueblesPorTipo[0].cantidad).to.be.equal(4);

		expect(stockMueblesPorTipo[1].id).to.be.equal(12);
		expect(stockMueblesPorTipo[1].nombre).to.be.equal('Minimalista Moderna');
		expect(stockMueblesPorTipo[1].cantidad).to.be.equal(28);

		expect(stockMueblesPorTipo[2].id).to.be.equal(13);
		expect(stockMueblesPorTipo[2].nombre).to.be.equal('Estilo Industrial');
		expect(stockMueblesPorTipo[2].cantidad).to.be.equal(29);

		expect(stockMueblesPorTipo[3].id).to.be.equal(14);
		expect(stockMueblesPorTipo[3].nombre).to.be.equal('Funcionalidad Moderna');
		expect(stockMueblesPorTipo[3].cantidad).to.be.equal(7);

		expect(stockMueblesPorTipo[4].id).to.be.equal(15);
		expect(stockMueblesPorTipo[4].nombre).to.be.equal('Rústica Al Aire Libre');
		expect(stockMueblesPorTipo[4].cantidad).to.be.equal(75);
	});

	it('Genera un informe del mueble más vendido correctamente', () => {
		const muebleMasVendido = stock.informeMuebleMasVendido();
		expect(muebleMasVendido.id).to.be.equal(20);
		expect(muebleMasVendido.nombre).to.be.equal('Industrial Vintage');
		expect(muebleMasVendido.cantidad_vendida).to.be.equal(60);
	});

	it('Genera un informe del tipo de mueble más vendido correctamente', () => {
		const tipoMuebleMasVendido = stock.informeTipoMuebleMasVendido();
		expect(tipoMuebleMasVendido.tipo).to.be.equal('Silla');
		expect(tipoMuebleMasVendido.cantidad_vendida).to.be.equal(60);
	});

	it('Genera un informe de ventas a un cliente concreto correctamente', () => {
		const idCliente = 2;
		const informeVentasCliente = stock.informeVentasAClienteConcreto(idCliente);
		expect(informeVentasCliente).to.have.lengthOf(2);
	});

	it('Genera un informe de compras a un proveedor concreto correctamente', () => {
		const idProveedor = 3;
		const informeComprasProveedor = stock.informeComprasAProveedorConcreto(idProveedor);
		expect(informeComprasProveedor).to.have.lengthOf(1);
	});

	it('Obtiene un nuevo ID para Muebles correctamente', () => {
		const nuevoID = stock.obtenerNuevoID('Muebles');
		expect(nuevoID).to.be.a('number');
		expect(nuevoID).to.be.equal(21);
	});

	it('Obtiene un nuevo ID para Clientes correctamente', () => {
		const nuevoID = stock.obtenerNuevoID('Clientes');
		expect(nuevoID).to.be.a('number');
		expect(nuevoID).to.be.equal(6);
	});

	it('Obtiene un nuevo ID para Proveedores correctamente', () => {
		const nuevoID = stock.obtenerNuevoID('Proveedores');
		expect(nuevoID).to.be.a('number');
		expect(nuevoID).to.be.equal(6);
	});

	it('Obtiene un nuevo ID para Transacciones correctamente', () => {
		const nuevoID = stock.obtenerNuevoID('Transacciones');
		expect(nuevoID).to.be.a('number');
		expect(nuevoID).to.be.equal(9);
	});
});