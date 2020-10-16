import {describe, it} from 'mocha';
import Plugin, {AuthModel, Configuration} from '../src';
import ModelTest from './_model';
import Fastify, {FastifyInstance} from 'fastify';
import {expect} from 'chai';
import DefaultError from '../src/defaults/auth-error';

async function fastifyTest(options: {
  model: AuthModel;
  before: (fastify: FastifyInstance) => void;
  hook: (fastify: FastifyInstance) => void;
}) {
  const fastify = Fastify();
  fastify.register(Plugin, {
    auth: options.model,
  });
  await options.before(fastify);
  await fastify.listen(0);
  await options.hook(fastify);
  await fastify.close();
}

describe('test authentication', () => {
  it('else config.authentication', async () =>
    fastifyTest({
      model: new ModelTest(),
      async before(fastify) {
        fastify.get<{}, Configuration>('/product', async () => ({read: true}));
      },
      async hook(fastify) {
        expect(
          (
            await fastify.inject({
              method: 'get',
              path: '/product',
            })
          ).json()
        ).to.deep.equals({
          read: true,
        });
      },
    }));

  it('authentication verify, expect true', async () =>
    fastifyTest({
      model: new ModelTest({verify: true}),
      async before(fastify) {
        fastify.get<{}, Configuration>(
          '/product',
          {
            config: {
              authentication: true,
            },
          },
          async () => ({read: true})
        );
      },
      async hook(fastify) {
        expect(
          (
            await fastify.inject({
              method: 'get',
              path: '/product',
            })
          ).json()
        ).to.deep.equals({
          read: true,
        });
      },
    }));

  it('authentication verify, expect false', async () =>
    fastifyTest({
      model: new ModelTest({verify: false}),
      async before(fastify) {
        fastify.get<{}, Configuration>(
          '/product',
          {
            config: {
              authentication: true,
            },
          },
          async () => ({read: true})
        );
      },
      async hook(fastify) {
        expect(
          (
            await fastify.inject({
              method: 'get',
              path: '/product',
            })
          ).json()
        ).to.deep.equals(DefaultError.authentication_error);
      },
    }));

  it('authentication verify, expect error', async () =>
    fastifyTest({
      model: new ModelTest({verifyThrow: 'Error'}),
      async before(fastify) {
        fastify.get<{}, Configuration>(
          '/product',
          {
            config: {
              authentication: true,
            },
          },
          async () => ({read: true})
        );
      },
      async hook(fastify) {
        expect(
          (
            await fastify.inject({
              method: 'get',
              path: '/product',
            })
          ).json()
        ).to.deep.equals(DefaultError.authentication_error);
      },
    }));
});
