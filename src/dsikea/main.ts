import inquirer from 'inquirer';
import { Stock } from './stock.js';
import { Mueble } from './mueble.js';
import { Proveedor } from './proveedor.js';
import { Cliente } from './cliente.js';

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
            'Realizar una transacción',
            'Gestionar muebles',
            'Gestionar proveedores',
            'Gestionar clientes',
            'Salir'
        ]
    });

    switch (option) {
        case 'Realizar una transacción':
            await realizarTransaccion();
            break;
        case 'Gestionar muebles':
            await gestionarMuebles();
            break;
        case 'Gestionar proveedores':
            await gestionarProveedores();
            break;
        case 'Gestionar clientes':
            await gestionarClientes();
            break;
        case 'Salir':
            console.log('Gracias por usar el sistema. ¡Hasta luego!');
            return;
    }
}

/// ------------------------------------- Transacciones --------------------------------------------------------------
async function realizarTransaccion() {
    console.log('\nRealizar transacción:');

    // Mostrar opciones para realizar una transacción
    const { option } = await inquirer.prompt({
        type: 'list',
        name: 'option',
        message: 'Selecciona una opción:',
        choices: [
            'Venta',
            'Compra',
            'Devolución',
            'Volver'
        ]
    });

    switch (option) {
        case 'Venta':
            await realizarVenta();
            break;
        case 'Compra':
            await realizarCompra();
            break;
        case 'Devolución':
            await realizarDevolucion();
            break;
        case 'Volver':
            // Volver al menú principal
            await main();
            break;
    }
}

async function realizarVenta() {
    console.log('\nRealizar venta:');

    const { idCliente } = await inquirer.prompt({
        type: 'number',
        name: 'idCliente',
        message: 'Ingrese el ID del cliente:'
    });

    const { idMueble } = await inquirer.prompt({
        type: 'number',
        name: 'idMueble',
        message: 'Ingrese el ID del mueble:'
    });

    const { cantidad } = await inquirer.prompt({
        type: 'number',
        name: 'cantidad',
        message: 'Ingrese la cantidad de muebles a vender:'
    });

    try {
        stock.ventaMueble(idMueble, idCliente, cantidad);
        console.log('Venta realizada.');
    } catch (error) {
        console.error(error.message);
    }
    await main();
}

async function realizarCompra() {
    console.log('\nRealizar compra:');

    const { idProveedor } = await inquirer.prompt({
        type: 'number',
        name: 'idProveedor',
        message: 'Ingrese el ID del proveedor:'
    });

    const { idMueble } = await inquirer.prompt({
        type: 'number',
        name: 'idMueble',
        message: 'Ingrese el ID del mueble:'
    });

    const { cantidad } = await inquirer.prompt({
        type: 'number',
        name: 'cantidad',
        message: 'Ingrese la cantidad de muebles a comprar:'
    });

    try {
        stock.compraMueble(idMueble, idProveedor, cantidad);
        console.log('Compra realizada.');
    } catch (error) {
        console.error(error.message);
    }
    await main();
}

async function realizarDevolucion() {
    console.log('\nRealizar devolución:');
    
    const { option } = await inquirer.prompt({
        type: 'list',
        name: 'option',
        message: 'Selecciona una opción:',
        choices: [
            'Devolución de cliente',
            'Devolución a Proveedor',
            'Volver'
        ]
    });
    
    switch (option) {
        case 'Devolución de cliente':
            await devolucionCliente();
            break;
        case 'Devolución a Proveedor':
            await devolucionProveedor();
            break;
        case 'Volver':
            // Volver al menú principal
            await realizarTransaccion();
            break;
    }
}

async function devolucionCliente() {
    console.log('\nDevolución de cliente:');

    const { idCliente } = await inquirer.prompt({
        type: 'number',
        name: 'idCliente',
        message: 'Ingrese el ID del cliente:'
    });

    const { idMueble } = await inquirer.prompt({
        type: 'number',
        name: 'idMueble',
        message: 'Ingrese el ID del mueble:'
    });

    const { cantidad } = await inquirer.prompt({
        type: 'number',
        name: 'cantidad',
        message: 'Ingrese la cantidad de muebles a devolver:'
    });

    try {
        stock.devolucionCliente(idMueble, idCliente, cantidad);
        console.log('Devolución realizada.');
    } catch (error) {
        console.error(error.message);
    }
    await main();
}

async function devolucionProveedor() {
    console.log('\nDevolución a proveedor:');

    const { idProveedor } = await inquirer.prompt({
        type: 'number',
        name: 'idProveedor',
        message: 'Ingrese el ID del proveedor:'
    });

    const { idMueble } = await inquirer.prompt({
        type: 'number',
        name: 'idMueble',
        message: 'Ingrese el ID del mueble:'
    });

    const { cantidad } = await inquirer.prompt({
        type: 'number',
        name: 'cantidad',
        message: 'Ingrese la cantidad de muebles a devolver:'
    });

    try {
        stock.devolucionProveedor(idMueble, idProveedor, cantidad);
        console.log('Devolución realizada.');
    } catch (error) {
        console.error(error.message);
    }
    await main();
}

/// ------------------------------------- Muebles --------------------------------------------------------------
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
            await borrarMueble();
            break;
        case 'Modificar mueble':
            await modificarMueble();
            break;
        case 'Buscar mueble':
            await buscarMuebles();
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

    try {
        stock.addMuebleExistente(idMueble, cantidad);
        console.log('Mueble añadido al stock.');
    } catch (error) {
        console.error(error.message);
    }
    await main();
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
        stock.obtenerNuevoID('Muebles'),
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

    await main();
}

async function borrarMueble() {
    console.log('\nBorrar mueble:');

    const { idMueble } = await inquirer.prompt({
        type: 'number',
        name: 'idMueble',
        message: 'Ingrese el ID del mueble que desea borrar:'
    });
    const { cantidad } = await inquirer.prompt({
        type: 'number',
        name: 'cantidad',
        message: 'Ingrese la cantidad de muebles a borrar:'
    });

    try {
        stock.removeMueble(idMueble, cantidad);
        console.log('Mueble borrado.');
    } catch (error) {
        console.error(error.message);
    }
    await main();
}

async function modificarMueble() {
    console.log('\nModificar mueble:');

    const { idMueble } = await inquirer.prompt({
        type: 'number',
        name: 'idMueble',
        message: 'Ingrese el ID del mueble que desea modificar:'
    });

    const { option } = await inquirer.prompt({
        type: 'list',
        name: 'option',
        message: 'Selecciona una opción:',
        choices: [
            'Modificar nombre',
            'Modificar tipo',
            'Modificar descripción',
            'Modificar material',
            'Modificar dimensiones',
            'Modificar precio',
            'Volver'
        ]
    });

    switch (option) {
        case 'Modificar nombre': {
            const { nombre } = await inquirer.prompt({
                type: 'input',
                name: 'nombre',
                message: 'Ingrese el nuevo nombre del mueble:'
            });
            try {
                stock.modifyMueble(idMueble, 'nombre', nombre);
                console.log('Nombre del mueble modificado.');
            } catch (error) {
                console.error(error.message);
            }
            break;
        }
        case 'Modificar tipo': {
            const { tipo } = await inquirer.prompt({
                type: 'input',
                name: 'tipo',
                message: 'Ingrese el nuevo tipo del mueble:'
            });
            try {
                stock.modifyMueble(idMueble, 'tipo', tipo);
                console.log('Tipo del mueble modificado.');
            } catch (error) {
                console.error(error.message);
            }
            break;
        }
        case 'Modificar descripción': {
            const { descripcion } = await inquirer.prompt({
                type: 'input',
                name: 'descripcion',
                message: 'Ingrese la nueva descripción del mueble:'
            });
            try {
                stock.modifyMueble(idMueble, 'descripcion', descripcion);
                console.log('Descripción del mueble modificada.');
            } catch (error) {
                console.error(error.message);
            }
            break;
        }
        case 'Modificar material': {
            const { material } = await inquirer.prompt({
                type: 'input',
                name: 'material',
                message: 'Ingrese el nuevo material del mueble:'
            });
            try {
                stock.modifyMueble(idMueble, 'material', material);
                console.log('Material del mueble modificado.');
            } catch (error) {
                console.error(error.message);
            }
            break;
        }
        case 'Modificar dimensiones': {
            const { dimensiones } = await inquirer.prompt({
                type: 'input',
                name: 'dimensiones',
                message: 'Ingrese las nuevas dimensiones del mueble:'
            });
            try {
                stock.modifyMueble(idMueble, 'dimensiones', dimensiones);
                console.log('Dimensiones del mueble modificadas.');
            } catch (error) {
                console.error(error.message);
            }
            break;
        }
        case 'Modificar precio': {
            const { precio } = await inquirer.prompt({
                type: 'number',
                name: 'precio',
                message: 'Ingrese el nuevo precio del mueble:'
            });
            try {
                stock.modifyMueble(idMueble, 'precio', precio);
                console.log('Precio del mueble modificado.');
            } catch (error) {
                console.error(error.message);
            }
            break;
        }
        case 'Volver':
            // Volver al menú de gestión de muebles
            await gestionarMuebles();
            break;
    }
    await main();
}

async function buscarMuebles() {
    console.log('\nBuscar muebles:');

    // Mostrar opciones para buscar muebles
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
            await buscarMueblePorNombre();
            break;
        case 'Buscar por tipo':
            await buscarMueblePorTipo();
            break;
        case 'Buscar por descripción':
            await buscarMueblePorDescripcion();
            break;
        case 'Volver':
            await main();
            return;
    }
}

async function buscarMueblePorNombre() {
    console.log('\nBuscar mueble por nombre:');
    const { nombre } = await inquirer.prompt({
        type: 'input',
        name: 'nombre',
        message: 'Ingrese el nombre del mueble que desea buscar:'
    });

    const { option } = await inquirer.prompt({
        type: 'list',
        name: 'option',
        message: 'Selecciona una opción:',
        choices: [
            'Ordenar alfabéticamente ascendente',
            'Ordenar alfabéticamente descendente',
            'Ordenar por precio ascendente',
            'Ordenar por precio descendente',
        ]
    });

    try {
        let muebles;
        switch (option) {
            case 'Ordenar alfabéticamente ascendente':
                muebles = stock.buscarMuebleByNombre(nombre, true, true);
                break;
            case 'Ordenar alfabéticamente descendente':
                muebles = stock.buscarMuebleByNombre(nombre, true, false);
                break;
            case 'Ordenar por precio ascendente':
                muebles = stock.buscarMuebleByNombre(nombre, false, true);
                break;
            case 'Ordenar por precio descendente':
                muebles = stock.buscarMuebleByNombre(nombre, false, false);
                break;
        }
        console.log('Resultados de la búsqueda:');
        console.table(muebles);
    } catch (error) {
        console.error(error.message);
    }
    await main();
}

async function buscarMueblePorTipo() {
    console.log('\nBuscar mueble por tipo:');

    const { tipo } = await inquirer.prompt({
        type: 'input',
        name: 'tipo',
        message: 'Ingrese el tipo de mueble que desea buscar:'
    });

    const { option } = await inquirer.prompt({
        type: 'list',
        name: 'option',
        message: 'Selecciona una opción:',
        choices: [
            'Ordenar alfabéticamente ascendente',
            'Ordenar alfabéticamente descendente',
            'Ordenar por precio ascendente',
            'Ordenar por precio descendente',
        ]
    });

    try {
        let muebles;
        switch (option) {
            case 'Ordenar alfabéticamente ascendente':
                muebles = stock.buscarMuebleByTipo(tipo, true, true);
                break;
            case 'Ordenar alfabéticamente descendente':
                muebles = stock.buscarMuebleByTipo(tipo, true, false);
                break;
            case 'Ordenar por precio ascendente':
                muebles = stock.buscarMuebleByTipo(tipo, false, true);
                break;
            case 'Ordenar por precio descendente':
                muebles = stock.buscarMuebleByTipo(tipo, false, false);
                break;
        }
        console.log('Resultados de la búsqueda:');
        console.table(muebles);
    } catch (error) {
        console.error(error.message);
    }
    await main();
}

async function buscarMueblePorDescripcion() {
    console.log('\nBuscar mueble por descripción:');

    const { descripcion } = await inquirer.prompt({
        type: 'input',
        name: 'descripcion',
        message: 'Ingrese la descripción del mueble que desea buscar:'
    });

    const { option } = await inquirer.prompt({
        type: 'list',
        name: 'option',
        message: 'Selecciona una opción:',
        choices: [
            'Ordenar alfabéticamente ascendente',
            'Ordenar alfabéticamente descendente',
            'Ordenar por precio ascendente',
            'Ordenar por precio descendente',
        ]
    });

    try {
        let muebles;
        switch (option) {
            case 'Ordenar alfabéticamente ascendente':
                muebles = stock.buscarMuebleByKeyWordsDescripcion(descripcion, true, true);
                break;
            case 'Ordenar alfabéticamente descendente':
                muebles = stock.buscarMuebleByKeyWordsDescripcion(descripcion, true, false);
                break;
            case 'Ordenar por precio ascendente':
                muebles = stock.buscarMuebleByKeyWordsDescripcion(descripcion, false, true);
                break;
            case 'Ordenar por precio descendente':
                muebles = stock.buscarMuebleByKeyWordsDescripcion(descripcion, false, false);
                break;
        }
        console.log('Resultados de la búsqueda:');
        console.table(muebles);
    } catch (error) {
        console.error(error.message);
    }
    await main();
}

/// ------------------------------------- Proveedores --------------------------------------------------------------
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
            await addProveedor();
            break;
        case 'Borrar proveedor':
            await borrarProveedor();
            break;
        case 'Modificar proveedor':
            await modifyProveedor();
            break;
        case 'Buscar proveedor':
            await buscarProveedor();
            break;
        case 'Volver':
            // Volver al menú principal
            await main();
            break;
    }
}

async function addProveedor() {
    console.log('\nAñadir proveedor:');

    const datosProveedor = await inquirer.prompt([
        {
            type: 'input',
            name: 'nombre',
            message: 'Ingrese el nombre del proveedor:'
        },
        {
            type: 'input',
            name: 'direccion',
            message: 'Ingrese la dirección del proveedor:'
        },
        {
            type: 'input',
            name: 'contacto',
            message: 'Ingrese el contacto del proveedor:'
        }
    ]);

    const proveedor = new Proveedor (
        stock.obtenerNuevoID('Proveedores'),
        datosProveedor.nombre,
        datosProveedor.direccion,
        datosProveedor.contacto
    );

    try {
        stock.addProveedor(proveedor);
        console.log('Proveedor añadido.');
    } catch (error) {
        console.error(error.message);
    }
    await main();
}

async function borrarProveedor() {
    console.log('\nBorrar proveedor:');

    const { idProveedor } = await inquirer.prompt({
        type: 'number',
        name: 'idProveedor',
        message: 'Ingrese el ID del proveedor que desea borrar:'
    });

    try {
        stock.removeProveedor(idProveedor);
        console.log('Proveedor borrado.');
    } catch (error) {
        console.error(error.message);
    }
    await main();
}


async function modifyProveedor() {
    console.log('\nModificar proveedor:');

    const { idProveedor } = await inquirer.prompt({
        type: 'number',
        name: 'idProveedor',
        message: 'Ingrese el ID del proveedor que desea modificar:'
    });

    const { option } = await inquirer.prompt({
        type: 'list',
        name: 'option',
        message: 'Selecciona una opción:',
        choices: [
            'Modificar nombre',
            'Modificar dirección',
            'Modificar contacto',
            'Volver'
        ]
    });

    switch (option) {
        case 'Modificar nombre': {
            const { nombre } = await inquirer.prompt({
                type: 'input',
                name: 'nombre',
                message: 'Ingrese el nuevo nombre del proveedor:'
            });
            try {
                stock.modifyProveedor(idProveedor, 'nombre', nombre);
                console.log('Nombre del proveedor modificado.');
            } catch (error) {
                console.error(error.message);
            }
            break;
        }
        case 'Modificar dirección': {
            const { direccion } = await inquirer.prompt({
                type: 'input',
                name: 'direccion',
                message: 'Ingrese la nueva dirección del proveedor:'
            });
            try {
                stock.modifyProveedor(idProveedor, 'direccion', direccion);
                console.log('Dirección del proveedor modificada.');
            } catch (error) {
                console.error(error.message);
            }
            break;
        }
        case 'Modificar contacto': {
            const { contacto } = await inquirer.prompt({
                type: 'input',
                name: 'contacto',
                message: 'Ingrese el nuevo contacto del proveedor:'
            });
            try {
                stock.modifyProveedor(idProveedor, 'contacto', contacto);
                console.log('Contacto del proveedor modificado.');
            } catch (error) {
                console.error(error.message);
            }
            break;
        } case 'Volver':
            // Volver al menú de gestión de proveedores
            await gestionarProveedores();
            break;
    }
    await main();
}

async function buscarProveedor() {
    console.log('\nBuscar proveedor:');

    const { option } = await inquirer.prompt({
        type: 'list',
        name: 'option',
        message: 'Selecciona una opción:',
        choices: [
            'Buscar por nombre',
            'Buscar por contacto',
            'Buscar por dirección',
            'Volver'
        ]
    });

    switch (option) {
        case 'Buscar por nombre': {
            const { nombre } = await inquirer.prompt({
                type: 'input',
                name: 'nombre',
                message: 'Ingrese el nombre del proveedor que desea buscar:'
            });
            try {
                const proveedores = stock.buscarProveedorByNombre(nombre);
                console.log('Resultados de la búsqueda:');
                console.table(proveedores);
            } catch (error) {
                console.error(error.message);
            }
            break;
        }
        case 'Buscar por dirección': {
            const { direccion } = await inquirer.prompt({
                type: 'input',
                name: 'direccion',
                message: 'Ingrese la dirección del proveedor que desea buscar:'
            });
            try {
                const proveedores = stock.buscarProveedorByDireccion(direccion);
                console.log('Resultados de la búsqueda:');
                console.table(proveedores);
            } catch (error) {
                console.error(error.message);
            }
            break;
        }
        case 'Buscar por contacto': {
            const { contacto } = await inquirer.prompt({
                type: 'input',
                name: 'contacto',
                message: 'Ingrese el contacto del proveedor que desea buscar:'
            });
            try {
                const proveedores = stock.buscarProveedorByContacto(contacto);
                console.log('Resultados de la búsqueda:');
                console.table(proveedores);
            } catch (error) {
                console.error(error.message);
            }
            break;
        }
        case 'Volver':
            await main();
            return;
    }
    await main();
}

/// ------------------------------------- Clientes --------------------------------------------------------------
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
            await anadirCliente();
            break;
        case 'Borrar cliente':
            await borrarCliente();
            break;
        case 'Modificar cliente':
            await modificarCliente();
            break;
        case 'Buscar cliente':
            await buscarCliente();
            break;
        case 'Volver':
            // Volver al menú principal
            await main();
            break;
    }
}

async function anadirCliente() {
    console.log('\nAñadir cliente:');

    const datosCliente = await inquirer.prompt([
        {
            type: 'input',
            name: 'nombre',
            message: 'Ingrese el nombre del cliente:'
        },
        {
            type: 'input',
            name: 'direccion',
            message: 'Ingrese la dirección del cliente:'
        },
        {
            type: 'input',
            name: 'contacto',
            message: 'Ingrese el contacto del cliente:'
        }
    ]);

    const cliente = new Cliente(
        stock.obtenerNuevoID('Clientes'),
        datosCliente.nombre,
        datosCliente.direccion,
        datosCliente.contacto
    );

    try {
        stock.addCliente(cliente);
        console.log('Cliente añadido.');
    } catch (error) {
        console.error(error.message);
    }
    await main();
}

async function borrarCliente() {
    console.log('\nBorrar cliente:');

    const { idCliente } = await inquirer.prompt({
        type: 'number',
        name: 'idCliente',
        message: 'Ingrese el ID del cliente que desea borrar:'
    });

    try {
        stock.removeCliente(idCliente);
        console.log('Cliente borrado.');
    } catch (error) {
        console.error(error.message);
    }
    await main();
}

async function modificarCliente() {
    console.log('\nModificar cliente:');

    const { idCliente } = await inquirer.prompt({
        type: 'number',
        name: 'idCliente',
        message: 'Ingrese el ID del cliente que desea modificar:'
    });

    const { option } = await inquirer.prompt({
        type: 'list',
        name: 'option',
        message: 'Selecciona una opción:',
        choices: [
            'Modificar nombre',
            'Modificar dirección',
            'Modificar contacto',
            'Volver'
        ]
    });

    switch (option) {
        case 'Modificar nombre': {
            const { nombre } = await inquirer.prompt({
                type: 'input',
                name: 'nombre',
                message: 'Ingrese el nuevo nombre del cliente:'
            });
            try {
                stock.modifyCliente(idCliente, 'nombre', nombre);
                console.log('Nombre del cliente modificado.');
            } catch (error) {
                console.error(error.message);
            }
            break;
        }
        case 'Modificar dirección': {
            const { direccion } = await inquirer.prompt({
                type: 'input',
                name: 'direccion',
                message: 'Ingrese la nueva dirección del cliente:'
            });
            try {
                stock.modifyCliente(idCliente, 'direccion', direccion);
                console.log('Dirección del cliente modificada.');
            } catch (error) {
                console.error(error.message);
            }
            break;
        }
        case 'Modificar contacto': {
            const { contacto } = await inquirer.prompt({
                type: 'input',
                name: 'contacto',
                message: 'Ingrese el nuevo contacto del cliente:'
            });
            try {
                stock.modifyCliente(idCliente, 'contacto', contacto);
                console.log('Contacto del cliente modificado.');
            } catch (error) {
                console.error(error.message);
            }
            break;
        } case 'Volver':
            // Volver al menú de gestión de clientes
            await gestionarClientes();
            break;
    }
    await main();
}

async function buscarCliente() {
    console.log('\nBuscar cliente:');

    const { option } = await inquirer.prompt({
        type: 'list',
        name: 'option',
        message: 'Selecciona una opción:',
        choices: [
            'Buscar por nombre',
            'Buscar por contacto',
            'Buscar por dirección',
            'Volver'
        ]
    });

    switch (option) {
        case 'Buscar por nombre': {
            const { nombre } = await inquirer.prompt({
                type: 'input',
                name: 'nombre',
                message: 'Ingrese el nombre del cliente que desea buscar:'
            });
            try {
                const clientes = stock.buscarClienteByNombre(nombre);
                console.log('Resultados de la búsqueda:');
                console.table(clientes);
            } catch (error) {
                console.error(error.message);
            }
            break;
        }
        case 'Buscar por dirección': {
            const { direccion } = await inquirer.prompt({
                type: 'input',
                name: 'direccion',
                message: 'Ingrese la dirección del cliente que desea buscar:'
            });
            try {
                const clientes = stock.buscarClienteByDireccion(direccion);
                console.log('Resultados de la búsqueda:');
                console.table(clientes);
            } catch (error) {
                console.error(error.message);
            }
            break;
        }
        case 'Buscar por contacto': {
            const { contacto } = await inquirer.prompt({
                type: 'input',
                name: 'contacto',
                message: 'Ingrese el contacto del cliente que desea buscar:'
            });
            try {
                const clientes = stock.buscarClienteByContacto(contacto);
                console.log('Resultados de la búsqueda:');
                console.table(clientes);
            } catch (error) {
                console.error(error.message);
            }
            break;
        }
        case 'Volver':
            await main();
            return;
    }
    await main();
}

// Iniciar la aplicación
main();