import assert from 'assert';
import { sayHello } from '../src/js/otherFile';

describe('App', () => {
  describe('#anotherModule', () => {
    it('should return the given name', () => {
      const name = 'John';
      const returnedValue = sayHello(name);
      assert.equal(returnedValue, name);
    });
  });
});
