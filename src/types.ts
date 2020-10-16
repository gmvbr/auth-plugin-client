import {AuthError} from './models/auth-error';
import {AuthModel} from './models/auth-model';

declare module 'fastify' {
  interface FastifyInstance {
    auth: {
      model: AuthModel;
      error: AuthError;
    };
  }
}
