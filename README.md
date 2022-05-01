### Práctica 10

Noelia Ibáñez Silvestre

alu0101225555

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-alu0101225555/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-alu0101225555?branch=main)

[![Tests](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-alu0101225555/actions/workflows/node.js.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct10-async-fs-process-alu0101225555/actions/workflows/node.js.yml)

## Ejercicio 1

**Desarrollo:**

*Paso 0:* Se inician todas las colas vacías.

|   Stack   |   API     |   Queue   |   Output  |
|:---------------------------------------------:|

*Paso 1:* La función `main` anónima entra en la pila.

|   Stack   |   API     |   Queue   |   Output  |
|:---------------------------------------------:|
|   `main()`|           |           |           |

*Paso 2:* Las librerías y los argumentos son cargados. Además, se introduce `access` en la API. 

|   Stack   |   API     |   Queue   |   Output  |
|:---------------------------------------------:|
|   `main()`| `access()`|           |           |

*Paso 3:* Cuando la función `main` termina, `access` sale de la API y el `callback` entra en la cola de las tareas (`Queue`).

|   Stack   |   API     |   Queue       |   Output  |
|:-------------------------------------------------:|
|           |           |`callback()`   |           |

*Paso 4:* `callback` entra en la pila para ejecutar la función y retornar el valor.

|   Stack                                           |   API     |   Queue       |   Output  |
|:-----------------------------------------------------------------------------------------:|
|`callback()`                                       |           |               |           |
|console.log(`Starting to watch file ${filename}`); |           |               |           |

*Paso 5:* `Output` retorna el valor calculado en la función que estaba en la pila.

|   Stack       |   API     |   Queue       |   Output                                          |
|:---------------------------------------------------------------------------------------------:|
|`callback()`   |           |               |                                                   |
|               |           |               |console.log(`Starting to watch file ${filename}`); |

*Paso 6:* Entra `watch` en la pila para ejecutarse.

|   Stack                                           |   API     |   Queue       |   Output  |
|:-----------------------------------------------------------------------------------------:|
|`callback()`                                       |           |               |           |
|`watch()`                                          |           |               |           |

*Paso 7:* Una vez se ejecuta `watch`, llama a `watcher.on` y la añade a la API.

|   Stack                                           |   API         |   Queue  |   Output   |
|:-----------------------------------------------------------------------------------------:|
|`callback()`                                       |`watcher.on()` |          |            |

*Paso 8:* Se añade y ejecuta la siguiente función en la pila.

|   Stack                                               |   API     |   Queue       |   Output  |
|:---------------------------------------------------------------------------------------------:|
|`callback()`                                           |           |               |           |
|console.log(`File ${filename} is no longer watched`);  |           |               |           |

*Paso 9:* Se retorna el valor en `output`.

|   Stack       |   API     |   Queue       |   Output                                              |
|:-------------------------------------------------------------------------------------------------:|
|`callback()`   |           |               |                                                       |
|               |           |               |console.log(`File ${filename} is no longer watched`);  |

*Paso 10:* `watcher.on` se convierte en `callback` y pasa a la cola para ejecutarse.

|   Stack   |   API     |   Queue       |   Output  |
|:-------------------------------------------------:|
|           |           |`callback()`   |           |

*Paso 11:* Se añade el `callback` en la pila, ya que está vacía, y se ejecuta.

|   Stack       |   API     |   Queue       |   Output  |
|:-----------------------------------------------------:|
|`callback()`   |           |               |           |

*Paso 12:* Se añade la siguiente función a la pila y se ejecuta.

|   Stack                                                   |   API     |   Queue       |   Output  |
|:-------------------------------------------------------------------------------------------------:|
|`callback()`                                               |           |               |           |
|console.log(`File ${filename} has been modified somehow`); |           |               |           |

*Paso 13:* La función que se ejecutó, retorna el valor en el `output`.

|   Stack       |   API     |   Queue       |   Output                                                  |
|:-----------------------------------------------------------------------------------------------------:|
|`callback()`   |           |               |                                                           |
|               |           |               |console.log(`File ${filename} has been modified somehow`); |

- ¿Qué hace la función `access`?: Prueba los permisos de un usuario para el archivo o directorio especificado en la ruta que le pasamos.

- ¿Para qué sirve el objeto `constants`?: "Devuelve un objeto que contiene constantes de uso común para el sistema de archivos operaciones". Es decir, nos garantiza poder acceder de manera predefinida al item (ejemplo: indicándole el archivo que queremos, el modo en el que queremos acceder....)

## Ejercicio 4

**Desarrollo:**

Para llevar a cabo este ejercicio, hemos creado 2 ficheros que explicaremos a continuación.

- *main.ts:*

Es el programa principal, se encarga de analizar el comando que introducimos por la línea de comando y llamar a la función correspondiente:

```
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
```

- *LComands.ts:*

Contiene las funciones necesarias que son llamadas desde el `main.ts`. Cada función corresponde a un posible comando:

1. check(): Dada una ruta concreta, mostrar si es un directorio o un fichero. Se le pasa la ruta para analizar y devuelve como cadena si se trata de un directorio ó fichero, y en caso de error, devuelve `undefined`.

```
public check(ruta: string): string | undefined {
        if(this.fs.existsSync(ruta)) {
            if(this.fs.lstatSync(ruta).isDirectory()) {
                return "directorio";
            }else {
                return "fichero";
            }
        } else {
            return undefined;
        }
    }
```

2. mkdir(): Crear un nuevo directorio a partir de una nueva ruta que recibe como parámetro. Devuelve `false` en caso de error y `true` si todo se ejecutó correctamente.

```
public mkdir(ruta: string) {
        if(this.fs.existsSync(ruta)) {
            return false;
        }else {
            this.fs.mkdirSync(ruta);
            return true;
        }
    }
```

3. ls(): Listar los ficheros dentro de un directorio. Primero se asegura que la ruta proporcionada corresponde a un directorio y después guarda el contenido para mostrarlo. En caso contrario, mostrará error.

```
public ls(ruta: string) {
        let result = "";
        switch (this.check(ruta)) {
            case "directorio": {
                const ls = spawn('ls', [ruta]);
                ls.stdout.on('data', (piece) => result = result + piece);
                ls.stdout.on('close', () => {
                    return result;
                });
                break;
            }
            case "fichero": {
                result = "Imposible hacer ls sobre fichero.";
                break;
            }
            case undefined: {
                result = "No existe la ruta.";
                break;
            }
            default: {
                result = "ERROR imprevisto.";
                break;
            }
        }
        return result;
    }
```

4. cat(): Mostrar el contenido de un fichero. Primero se asegura que la ruta proporcionada corresponde a un fichero y después guarda el contenido para mostrarlo. En caso contrario, mostrará error.

```
public cat(ruta: string) {
        let result = "";
        switch (this.check(ruta)) {
            case "fichero": {
                const cat = spawn('cat', [ruta]);
                cat.stdout.on('data', (piece) => result = result + piece);
                cat.stdout.on('close', () => {
                return result;
                });
                break;
            }
            case "directorio": {
                result = "Imposible hacer cat sobre directorio.";
                break;
            }
            case undefined: {
                result = "No existe la ruta.";
                break;
            }
            default: {
                result = "ERROR imprevisto.";
                break;
            }
        }
        return result;
    }
```

5. remove(): Borrar ficheros y directorios. Invoca previamente a la función `check()` y en en función de lo que devuelva ejecutará el comando para eliminar fichero, directorio o retornará `false` en caso de error.

```
public remove(ruta: string) {
        switch (this.check(ruta)) {
            case "directorio":
                this.fs.rmdirSync(ruta);
                console.log(`Direcorio eliminado correctamente`);
                return true;
            case "fichero":
                this.fs.rmSync(ruta);
                console.log(`Fichero eliminado correctamente`);
                return true;
            default: {
                return false;
            }
        }
    }
```

6. move(): Mueve un fichero/directorio de una ruta a otra. Crea un proceso hijo que ejecuta `mv` con los parámetros correspondientes y devuelve `true` si todo salió correcto o `false` en caso contrario.

```
public move(rutaO: string, rutaD: string) {
        if(this.fs.existsSync(rutaO)) {
            const mov = spawn('mv', [rutaO, rutaD]);
            mov.on('close', () => {
                return true;
            });
        }else {
            return false;
        }
    }
```

7. copy(): Copia un fichero/directorio. Implementación similar a `move` pero, en este caso, invocamos como proceso hijo al comando `cp` con sus respectivos parámetros.

```
public copy(rutaOr: string, rutaDe: string) {
        if(this.fs.existsSync(rutaOr)) {
            const cop = spawn('cp', [rutaOr, rutaDe]);
            cop.on('close', () => {
                return true;
            });
        }else {
            return false;
        }
    }
```

**Nota**: si ejecutas los test del ejercicio 4, debes restaurar al estado previo para poder volver a ejecutarlos.
