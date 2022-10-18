import * as mocha from 'mocha';
import * as chai from 'chai';
import {
    returnOne
} from './test';

const expect = chai.expect;
describe('test test', () => {
    //Dummy, Stub, Fake, Spy, Mock
    it('should be equal to 1', () => {
        expect(returnOne()).to.equal(1);
    });

});