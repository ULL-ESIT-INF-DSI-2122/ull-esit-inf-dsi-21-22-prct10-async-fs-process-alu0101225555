import yargs from 'yargs';
import {LComands} from "./LComands";

const comands = new LComands;

/**
 * Comando 'check': comprueba si es fichero o directorio
 */
yargs.command( {
    command: 'check',
    describe: 'Verifica si es un fichero o un directorio',
    builder: {
        route: {
            describe: 'Ruta a verificar',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if(typeof argv.route === "string") {
            const result: string | undefined = comands.check(argv.route);
            if (typeof result === "undefined") {
                console.log(`ERROR en la ruta`);
            }else {
                console.log(`La ruta corresponde con un ${result}`);
            }
        }
    }
});

/**
 * Comando 'mkdir': crea un nuevo directorio
 */
 yargs.command( {
    command: 'mkdir',
    describe: 'Crea un directorio nuevo',
    builder: {
        route: {
            describe: 'Ruta en la que crea',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if(typeof argv.route === "string") {
            const result = comands.mkdir(argv.route);
            if (result) {
                console.log(`Directorio creado`);
            }else {
                console.log(`ERROR. Creación directorio fallido`);
            }
        }
    }
});

/**
 * Comando 'ls': muestra los ficheros dentro de un directorio
 */
 yargs.command( {
    command: 'ls',
    describe: 'Muestra el contenido de un directorio',
    builder: {
        route: {
            describe: 'Ruta de la que desea mostrar el contenido',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if(typeof argv.route === "string") {
            console.log(comands.ls(argv.route));
        }
    }
});

/**
 * Comando 'cat': muestra el contenido de un fichero
 */
 yargs.command( {
    command: 'cat',
    describe: 'Muestra el contenido de un fichero',
    builder: {
        route: {
            describe: 'Ruta de la que desea mostrar el contenido',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if(typeof argv.route === "string") {
            console.log(comands.cat(argv.route));
        }
    }
});

/**
 * Comando 'remove': elimina un fichero o directorio
 */
 yargs.command( {
    command: 'remove',
    describe: 'Elimina un fichero o directorio',
    builder: {
        route: {
            describe: 'Ruta de la que desea eliminar',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if(typeof argv.route === "string") {
            console.log(comands.remove(argv.route));
        }
    }
});

/**
 * Comando 'move': mueve el contenido de un origen a un destino
 */
 yargs.command( {
    command: 'move',
    describe: 'Mueve un fichero o directorio',
    builder: {
        routeO: {
            describe: 'Ruta origen',
            demandOption: true,
            type: 'string',
        },
        routeD: {
            describe: 'Ruta destino',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if(typeof argv.routeO === "string" && typeof argv.routeD === "string") {
            comands.move(argv.routeO, argv.routeD)
            console.log(`Contenido movido correctamente`);
        }else {
            console.log(`ÈRROR en move`);
        }
    }
});

/**
 * Comando 'copy': copia el contenido en otro lugar
 */
 yargs.command( {
    command: 'copy',
    describe: 'Copia un fichero o directorio',
    builder: {
        routeO: {
            describe: 'Ruta origen',
            demandOption: true,
            type: 'string',
        },
        routeD: {
            describe: 'Ruta destino',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv) {
        if(typeof argv.routeO === "string" && typeof argv.routeD === "string") {
            comands.copy(argv.routeO, argv.routeD)
            console.log(`Contenido copiado correctamente`);
        }else {
            console.log(`ÈRROR en copy`);
        }
    }
});

yargs.parse();