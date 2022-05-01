import {spawn} from 'child_process';
import { cp } from 'fs';
/**
 * Clase LComands: implementa los comandos 
 */
export class LComands {
    private fs = require('fs');

    /**
     * Función 'check': comprueba si es un fichero o un directorio
     * @param ruta nombre de la ruta para analizar 
     * @returns nombre de la categoría a la que pertenece (directorio, fichero ó undefined)
     */
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

    /**
     * Función 'mkdir': crea un directorio nuevo
     * @param ruta ruta donde crear el nuevo directorio
     * @returns true ó false
     */
    public mkdir(ruta: string) {
        if(this.fs.existsSync(ruta)) {
            return false;
        }else {
            this.fs.mkdirSync(ruta);
            return true;
        }
    }

    /**
     * Función 'ls': muestra el contenido de un directorio
     * @param ruta ruta de la que desea mostrar el contenido
     * @returns 
     */
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

    /**
     * Función 'cat': muestra el contenido de un fichero
     * @param ruta ruta de la que se desea mostrar el contenido
     * @returns 
     */
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

    /**
     * Función 'remove': elimina un fichero o directorio
     * @param ruta ruta del fichero o directorio a eliminar
     */
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

    /**
     * Función 'move': mueve el fichero o directorio
     * @param rutaO ruta origen
     * @param rutaD ruta destino
     */
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

    /**
     * Función 'copy': copia un fichero o directorio
     * @param rutaOr ruta origen
     * @param rutaDe ruta destino
     */
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

}