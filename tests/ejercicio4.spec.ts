import "mocha";
import {expect} from "chai";
import {LComands} from '../src/ejercicio4/LComands';

describe('Test ejercicio 4', () => {

    const LC = new LComands;

    it('Función check(): directorio', () => {
        expect(LC.check('./src')).to.deep.equal("directorio");
        expect(LC.check('./src/ejercicio4/main.ts')).to.deep.equal("fichero");
    });

    it('Función check(): fichero', () => {
        expect(LC.check('./src/ejercicio4/main.ts')).to.deep.equal("fichero");
    });

    it('Función mkdir(): correcta', () => {
        expect(LC.mkdir('./src/ejercicio4/mkprueba')).to.deep.equal(true);
    });

    it('Función ls(): correcta', () => {
        expect(LC.ls('./src/ejercicio4/lsprueba')).to.deep.equal("No existe la ruta.");
    });

    it('Función ls(): No se puede hacer sobre fichero', () => {
        expect(LC.ls('./src/ejercicio4/main.ts')).to.deep.equal("Imposible hacer ls sobre fichero.");
    });

    it('Función cat(): correcta', () => {
        expect(LC.cat('./src/ejercicio4/lsprueba.ts')).to.deep.equal("No existe la ruta.");
    });

    it('Función cat(): No se puede hacer sobre directorio', () => {
        expect(LC.cat('./src/ejercicio4')).to.deep.equal("Imposible hacer cat sobre directorio.");
    });

    it('Función copy(): correcta', () => {
        expect(LC.copy('./src/ejercicio4/main.ts', './src/ejercicio4/main.ts.copia')).to.deep.equal(undefined);
    });

    it('Función copy(): incorrecta', () => {
        expect(LC.copy('./src/ejercicio4/main.tx', './src/ejercicio4/main.tx.copia')).to.deep.equal(false);
    });

    it('Función move(): correcta', () => {
        expect(LC.move('./src/ejercicio4/hola.txt', './src/hola.txt.movido')).to.deep.equal(undefined);
    });

    it('Función move(): incorrecta', () => {
        expect(LC.move('./src/ejercicio4/hola2.txt', './src/hola.txt.inc')).to.deep.equal(false);
    });

    it('Función remove(): incorrecta', () => {
        expect(LC.remove('./src/ejercicio4/h.txt')).to.deep.equal(false);
    });

    it('Función remove(): correcta', () => {
        expect(LC.remove('./src/ejercicio4/main.ts.copia')).to.deep.equal(true);
    });

});