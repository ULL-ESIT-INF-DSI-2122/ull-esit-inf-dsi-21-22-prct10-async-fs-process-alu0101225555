import "mocha";
import {expect} from "chai";
import {suma} from '../src/mod10/suma';

describe('Test práctica 10', () => {

    it('Función suma', () => {
        expect(suma(1,2)).to.be.equal(3)
    });

});