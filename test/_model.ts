import {AuthModel} from '../src';

class ModelTest extends AuthModel {
  private _verify = false;
  private _verifyThrow;

  constructor(args?: {verify?: boolean; verifyThrow?: string}) {
    super();
    if (args !== undefined) {
      if (args.verify !== undefined) {
        this._verify = args.verify;
      }
      if (args.verifyThrow !== undefined) {
        this._verifyThrow = args.verifyThrow;
      }
    }
  }

  async verify(): Promise<boolean> {
    if (this._verifyThrow !== undefined) {
      throw new Error(this._verifyThrow);
    }
    return this._verify;
  }
}
export default ModelTest;
