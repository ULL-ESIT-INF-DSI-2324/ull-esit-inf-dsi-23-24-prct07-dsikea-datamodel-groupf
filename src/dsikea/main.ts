import inquirer from 'inquirer';
import { Stock } from './stock.js';
import { Database } from './database.js';
import { Mueble } from './mueble.js';

// Instanciar la clase Stock para gestionar la información del sistema
// const mueble_1 :Silla = new Silla(5, "Silla1", "Una bonita silla",'Madera', "5x5x5", 30, "Marrón");
// const mueble_2 :Comoda = new Comoda(6, "Silla1", "Una bonita comoda",'Madera', "5x5x5", 30, 5);
// const muebles = new ColeccionMuebles([mueble_1, mueble_2]);

const stock = new Stock();

// Función principal para interactuar con la aplicación
async function main() {
    console.log('Bienvenido al sistema de gestión de muebles, proveedores y clientes.');

    // Mostrar el menú principal
    const { option } = await inquirer.prompt({
        type: 'list',
        name: 'option',
        message: 'Selecciona una opción:',
        choices: [
            'Gestionar muebles',
            'Gestionar proveedores',
            'Gestionar clientes',
            'Salir'
        ]
    });

    switch (option) {
        case 'Realizar transacción':
            //await realizarTransaccion();
            break;
        case 'Gestionar muebles':
            await gestionarMuebles();
            break;
        case 'Gestionar proveedores':
            //await gestionarProveedores();
            break;
        case 'Gestionar clientes':
            //await gestionarClientes();
            break;
        case 'Salir':
            console.log('Gracias por usar el sistema. ¡Hasta luego!');
            return;
    }
}

// Función para gestionar los muebles
async function gestionarMuebles() {
    console.log('\nGestión de muebles:');

    // Mostrar opciones para gestionar los muebles
    const { option } = await inquirer.prompt({
        type: 'list',
        name: 'option',
        message: 'Selecciona una opción:',
        choices: [
            'Añadir mueble',
            'Borrar mueble',
            'Modificar mueble',
            'Buscar mueble',
            'Volver'
        ]
    });

    switch (option) {
        case 'Añadir mueble':
            await anadirMueble();
            break;
        case 'Borrar mueble':
            // Implementar lógica para borrar un mueble
            break;
        case 'Modificar mueble':
            // Implementar lógica para modificar un mueble
            break;
        case 'Buscar mueble':
            //await buscarMueble();
            break;
        case 'Volver':
            // Volver al menú principal
            await main();
            break;
    }
}

async function anadirMueble() {
    console.log('\nAñadir mueble:');

    // Mostrar opciones para añadir un mueble
    const { option } = await inquirer.prompt({
        type: 'list',
        name: 'option',
        message: 'Selecciona una opción:',
        choices: [
            'Añadir mueble existente',
            'Añadir mueble nuevo',
            'Volver'
        ]
    });

    switch (option) {
        case 'Añadir mueble existente':
            await anadirMuebleExistente();
            break;
        case 'Añadir mueble nuevo':
            await anadirMuebleNuevo();
            break;
        case 'Volver':
            // Volver al menú de gestión de muebles
            await gestionarMuebles();
            break;
    }
}

async function anadirMuebleExistente() {
    console.log('\nAñadir mueble existente por ID:');
    const { idMueble } = await inquirer.prompt({
        type: 'number',
        name: 'idMueble',
        message: 'Ingrese el ID del mueble:'
    });
    const { cantidad } = await inquirer.prompt({
        type: 'number',
        name: 'cantidad',
        message: 'Ingrese la cantidad de muebles a añadir:'
    });
    stock.addMuebleExistente(idMueble, cantidad);
    console.log('Mueble añadido al stock.');
}

async function anadirMuebleNuevo() {
    console.log('\nAñadir mueble:');

    const datosMueble = await inquirer.prompt([
        {
            type: 'input',
            name: 'tipo',
            message: 'Ingrese el Tipo de mueble:'
        },
        {
            type: 'input',
            name: 'nombre',
            message: 'Ingrese el nombre de mueble:'
        },
        {
            type: 'input',
            name: 'descripcion',
            message: 'Ingrese la descripción:'
        },
        {
            type: 'input',
            name: 'material',
            message: 'Ingrese el material:'
        },
        {
            type: 'input',
            name: 'dimensiones',
            message: 'Ingrese las dimensiones:'
        },
        {
            type: 'number',
            name: 'precio',
            message: 'Ingrese el precio'
        },
        {
            type: 'number',
            name: 'cantidad',
            message: 'Ingrese la cantidad que quiere añadir de este mueble:'
        }
    ]);

    const mueble = new Mueble(
        1,
        datosMueble.tipo,
        datosMueble.nombre,
        datosMueble.descripcion,
        datosMueble.material,
        datosMueble.dimensiones,
        datosMueble.precio,
        datosMueble.cantidad
    );

    stock.addNewMueble(mueble);

    console.log(`${mueble.nombre} agregada al stock.`);
}

/*
async function buscarMueble() {
    console.log('\nBuscar mueble:');

    // Mostrar opciones para buscar un mueble
    const { option } = await inquirer.prompt({
        type: 'list',
        name: 'option',
        message: 'Selecciona una opción:',
        choices: [
            'Buscar por nombre',
            'Buscar por tipo',
            'Buscar por descripción',
            'Volver'
        ]
    });

    switch (option) {
        case 'Buscar por nombre':
            console.table(stock.muebles.searchByNombre('Silla1'));
            await ordenar();
            break;
        case 'Buscar por tipo':
            console.table(stock.muebles.searchByTipo('Silla'));
            break;
        case 'Buscar por descripción':
            // Implementar lógica para buscar un mueble por descripción
            break;
        case 'Volver':
            // Volver al menú de gestión de muebles
            await gestionarMuebles();
            break;
    }
}


async function ordenar() {
    console.log('\nOrdenar muebles:');

    // Mostrar opciones para ordenar los muebles
    const { option } = await inquirer.prompt({
        type: 'list',
        name: 'option',
        message: 'Selecciona una opción:',
        choices: [
            'Ordenar por precio ascendente',
            'Ordenar por precio descendente',
            'Ordenar alfabéticamente ascendente',
            'Ordenar alfabéticamente descendente',
            'Volver'
        ]
    });

    switch (option) {
        case 'Ordenar por precio ascendete':
            console.table(stock.muebles.orderByPrecio(false));
            break;
        case 'Ordenar por precio descendente':
            console.table(stock.muebles.orderByPrecio());    
            break;
        case 'Ordenar alfabéticamente ascendente':
            // Implementar lógica para ordenar los muebles alfabéticamente
            console.table(stock.muebles.orderByAlfabeticamente(false));
            break;
        case 'Ordenar alfabéticamente descendente':
            // Implementar lógica para ordenar los muebles alfabéticamente
            console.table(stock.muebles.orderByAlfabeticamente());
            break;
        case 'Volver':
            // Volver al menú de búsqueda de muebles
            await buscarMueble();
            break;
    }
}

// Función para gestionar los proveedores
async function gestionarProveedores() {
    console.log('\nGestión de proveedores:');

    // Mostrar opciones para gestionar los proveedores
    const { option } = await inquirer.prompt({
        type: 'list',
        name: 'option',
        message: 'Selecciona una opción:',
        choices: [
            'Añadir proveedor',
            'Borrar proveedor',
            'Modificar proveedor',
            'Buscar proveedor',
            'Volver'
        ]
    });

    switch (option) {
        case 'Añadir proveedor':
            // Implementar lógica para añadir un proveedor
            break;
        case 'Borrar proveedor':
            // Implementar lógica para borrar un proveedor
            break;
        case 'Modificar proveedor':
            // Implementar lógica para modificar un proveedor
            break;
        case 'Buscar proveedor':
            // Implementar lógica para buscar un proveedor
            break;
        case 'Volver':
            // Volver al menú principal
            await main();
            break;
    }
}

// Función para gestionar los clientes
async function gestionarClientes() {
    console.log('\nGestión de clientes:');

    // Mostrar opciones para gestionar los clientes
    const { option } = await inquirer.prompt({
        type: 'list',
        name: 'option',
        message: 'Selecciona una opción:',
        choices: [
            'Añadir cliente',
            'Borrar cliente',
            'Modificar cliente',
            'Buscar cliente',
            'Volver'
        ]
    });

    switch (option) {
        case 'Añadir cliente':
            // Implementar lógica para añadir un cliente
            break;
        case 'Borrar cliente':
            // Implementar lógica para borrar un cliente
            break;
        case 'Modificar cliente':
            // Implementar lógica para modificar un cliente
            break;
        case 'Buscar cliente':
            // Implementar lógica para buscar un cliente
            break;
        case 'Volver':
            // Volver al menú principal
            await main();
            break;
    }
}*/

// Iniciar la aplicación
main();