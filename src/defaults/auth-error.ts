/* eslint-disable node/no-unpublished-import */
import {FastifyReply, FastifyRequest} from 'fastify';
import {AuthError} from '../models/auth-error';

class DefaultError extends AuthError {
  public static authentication_error = {
    error: 'Autentificação Falhou',
    error_code: 401,
    error_message: 'Necessário a autentificação para acessar o recurso.',
  };

  /**
   * Erro de autentificação
   *
   * @param request
   * @param reply
   */
  public authentication(request: FastifyRequest, reply: FastifyReply) {
    reply.code(401);
    reply.send(DefaultError.authentication_error);
  }
}

export default DefaultError;
