import {FastifyReply, FastifyRequest} from 'fastify';

abstract class AuthModel {
  /**
   * Faça a autentificação do usuário
   *
   * Se o usuário for inválido, retorne false
   * Se o usuário for válido retorne true
   *
   * Em caso de erro na promise o sistema retorna como inválido
   *
   * @param request
   * @param reply
   */
  abstract async verify(r: FastifyRequest, s: FastifyReply): Promise<boolean>;
}

export {AuthModel};
