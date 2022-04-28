import {argv} from 'process';
import { string } from 'yargs';
import {readFile} from 'fs';
import { spawn } from 'child_process';
import { suma } from './suma';

//MAL planteado

//para pasar seria argv[2]? 
argv.forEach((fichero) => {
    console.log(`${fichero}`);
})


/**
 * Lee el archivo
 */
/*readFile('numberList.txt', (err, data) => {
    if (err) {
        console.log('There must be a problem with the file you are trying to read');
    } else {
        console.log(data.toString());
    }
});
*/

/**
 * Maneja un fichero
 */
export class Lectura {
    private fs_ = require('fs');
    public fileName_: string = argv[2]

    /**
     * Constructor
     * @param argv[2]  nombre del archivo a leer que pasamos por linea de comandos
     */
    /*
    constructor(fileName: any) {
        this.fileName_ = fileName;
    }*/

    /**
     * Imprime la información del archivo y llama a la función suma en caso de que exista, en caso constrario muestra mensaje error
     */
    public getInfo() {
        if (this.fs_.existsSync(this.fileName_)) {
            const wc = spawn('wc', [this.fileName_]);
            let wcOutput = '';
            wc.stdout.on('data', (piece) => wcOutput += piece);

            wc.on('close', () => {
                const wcArray = wcOutput.split(/\s+/);
                console.log(`File has ${wcArray[1]}`);
                console.log(`File has ${wcArray[2]}`);

                suma(wcArray[1], wcArray[2]);
            });
        } else {
            console.log(`ERROR el fichero NO EXISTE`);
        }
    }

}