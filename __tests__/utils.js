import { native } from '../src/utils';
describe('native', () => {
  test('name must be string', () => {
    expect(() => native(document, 1)).toThrow('You must pass in a string as name, but not number.');
  });
});
