import FastifyPlugin from 'fastify-plugin';
import DefaultError from './defaults/auth-error';

import {FastifyInstance} from 'fastify';

import {AuthError} from './models/auth-error';
import {AuthModel} from './models/auth-model';

export * from './models/auth-model';
export * from './models/auth-error';

import './types';

export enum ListError {
  authNull = 'Requer option.auth',
  authType = 'Requer options.auth instância de AuthModel',
  errorNull = 'Requer options.error instância de AuthError',
}

export interface PluginOptions {
  error?: AuthError | undefined;
  auth: AuthModel | undefined;
}

export interface Configuration {
  authentication?: boolean;
}

export function checkOptions(options: PluginOptions): PluginOptions {
  if (options.auth === undefined) {
    throw new Error(ListError.authNull);
  }
  if (!(options.auth instanceof AuthModel)) {
    throw new Error(ListError.authType);
  }
  if (options.error === undefined) {
    options.error = new DefaultError();
  }
  if (!(options.error instanceof AuthError)) {
    throw new Error(ListError.errorNull);
  }
  return options;
}

function preValidation(fastify: FastifyInstance) {
  fastify.addHook<{}, Configuration>(
    'preValidation',
    async (request, reply) => {
      if (reply.context.config.authentication === true) {
        try {
          const response = await fastify.auth.model.verify(request, reply);
          if (response !== true) {
            return fastify.auth.error.authentication(request, reply);
          }
        } catch (err) {
          fastify.log.error(err.message);
          return fastify.auth.error.authentication(request, reply);
        }
      }
    }
  );
}

export default FastifyPlugin(
  async (fastify: FastifyInstance, options: PluginOptions): Promise<void> => {
    const {auth, error} = checkOptions(options);
    fastify.decorate('auth', {
      model: auth,
      error: error,
    });
    preValidation(fastify);
  }
);
