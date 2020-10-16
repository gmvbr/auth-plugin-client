import {FastifyReply, FastifyRequest} from 'fastify';

abstract class AuthError {
  /**
   * Erro de autentificação
   *
   * @param r Request chamado no preValidator
   * @param s Reply chamado no preValidator
   * @param e Erro passado caso falhe na promessa
   */
  public abstract authentication(
    r: FastifyRequest,
    s: FastifyReply,
    e?: Error
  ): void | FastifyReply;
}

export {AuthError};
