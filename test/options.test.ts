import {expect} from 'chai';
import {describe, it} from 'mocha';
import {AuthError, AuthModel, checkOptions, ListError} from '../src';
import ModelTest from './_model';

describe('test options', () => {
  it('expect throw, options.auth, undefined', async () => {
    expect(() => {
      checkOptions({
        auth: undefined,
      });
    }).to.throw(ListError.authNull);
  });
  it('expect throw, options.auth, invalid type', async () => {
    expect(() => {
      checkOptions({
        auth: {} as AuthModel,
      });
    }).to.throw(ListError.authType);
  });
  it('expect throw, options.error, invalid type', async () => {
    expect(() => {
      checkOptions({
        auth: new ModelTest(),
        error: {} as AuthError,
      });
    }).to.throw(ListError.errorNull);
  });
  it('expect options', async () => {
    const assert = expect(() => {
      checkOptions({
        auth: new ModelTest(),
      });
    });
    assert.not.throw(ListError.errorNull);
    assert.not.throw(ListError.authNull);
    assert.not.throw(ListError.authType);
  });
});
