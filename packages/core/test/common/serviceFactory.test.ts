import { ServiceFactory } from '../../src';

describe('test/common/serviceFactory.test.ts', () => {

  class TestServiceFactory extends ServiceFactory<any> {
    protected createClient(config: any): any {
      return {
        aaa: 123
      }
    }

    getName() {
      return 'test';
    }

    async initClients(options) {
      return super.initClients(options);
    }
  }

  it('should test service factory', async () => {
    const instance = new TestServiceFactory();
    expect(instance.getName()).toEqual('test');

    const ins = await instance.createInstance({});
    expect(ins).toEqual({
      aaa: 123
    });
    expect(instance.get('fff')).not.toBeDefined();
  });

  it('should test create instance with name', async () => {
    const instance = new TestServiceFactory();
    const ins = await instance.createInstance({}, 'fff');
    expect(ins).toEqual({
      aaa: 123
    });
    expect(instance.get('fff')).toBeDefined();
    expect(instance.has('fff')).toBeTruthy();
  });

  it('should test multi-clients', async () => {
    const instance = new TestServiceFactory();
    await instance.initClients({
      clients: {
        bbb: {},
        ccc: {}
      }
    });
    expect(instance.get('bbb')).toBeDefined();
    expect(instance.get('ccc')).toBeDefined();
  });

  it('should test default client', async () => {
    const instance = new TestServiceFactory();
    await instance.initClients({
      client: {
      }
    });
    expect(instance.get('default')).toBeDefined();
  });

  it('should test default name', async () => {
    const instance = new TestServiceFactory();
    await instance.initClients({
      defaultClientName: 'abc',
      clients: {}
    })
    expect(instance.getDefaultClientName()).toEqual('abc');
  });
});
