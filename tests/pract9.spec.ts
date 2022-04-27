import "mocha";
import {expect} from "chai";
import {Nota} from '../src/ejercicio/Nota';
import {OperacionesNotas} from '../src/ejercicio/OpcionesNota';

describe('Test práctica 9', () => {

    let nota1 = new Nota("Prueba 1", "Probando clase Nota", "Rojo");
    let nota2 = new Nota("Prueba 2", "Probando clase Nota", "Verde");
    let nota3 = new Nota("Prueba 3", "Probando clase Nota", "Azul");
    let nota4 = new Nota("Prueba 4", "Probando clase Nota", "Amarillo");
    let notaDefault = new Nota("Prueba Default", "Probando clase Nota", "Marrón");
    let gestor = new OperacionesNotas();





    describe('Clase: Nota', () => {

        it('getColor()', () => {
            expect(nota1.getColor()).to.be.equal('Rojo')
        });

        it('getTitulo()', () => {
            expect(nota1.getTitulo()).to.be.equal('Prueba 1')
        });

        it('getCuerpo()', () => {
            expect(nota1.getCuerpo()).to.be.equal('Probando clase Nota')
        });

        it('Titulo Rojo', () => {
            expect(nota1.mostrarTitulo()).not.to.be.equal(null)
        });

        it('Titulo Verde', () => {
            expect(nota2.mostrarTitulo()).not.to.be.equal(null)
        });

        it('Titulo Azul', () => {
            expect(nota3.mostrarTitulo()).not.to.be.equal(null)
        });

        it('Titulo Amarillo', () => {
            expect(nota4.mostrarTitulo()).not.to.be.equal(null)
        });

        it('Titulo caso Default', () => {
            expect(notaDefault.mostrarTitulo()).not.to.be.equal(null)
        });

        it('Cuerpo Rojo', () => {
            expect(nota1.mostrarCuerpo()).not.to.be.equal(null)
        });

        it('Cuerpo Verde', () => {
            expect(nota2.mostrarCuerpo()).not.to.be.equal(null)
        });

        it('Cuerpo Azul', () => {
            expect(nota3.mostrarCuerpo()).not.to.be.equal(null)
        });

        it('Cuerpo Amarillo', () => {
            expect(nota4.mostrarCuerpo()).not.to.be.equal(null)
        });

        it('Cuerpo caso Default', () => {
            expect(notaDefault.mostrarCuerpo()).not.to.be.equal(null)
        });

    });

    /*
    describe('Comprobaciones OperacionesNotas: ',() => {

        it('Método agregar nota , agregar()', () => {
            expect(gestor.agregar(nota1, "usuario1"));
        });

        it('Método eliminar nota , eliminar()', () => {
            expect(gestor.eliminar("Prueba", "usuario1"));
        });

        it('Método leer nota , leer()', () => {
            expect(gestor.leer("Prueba2", "usuario1"));
        });

        it('Método editar nota , editar()', () => {
            expect(gestor.editar("usuario1", "Prueba2", "Cuerpo prueba2 modificado", "Azul"));
        });

    });
    */
});