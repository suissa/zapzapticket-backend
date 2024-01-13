import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Define se a expiração do token deve ser ignorada
      secretOrKey: "ManoVeioPeriferico#666", // A chave secreta usada para assinar o token
    });
  }

  async validate(payload: any) {
    // A lógica para validar o payload do token
    // Normalmente, você retornaria os dados do usuário com base no payload
    return { userId: payload.sub, email: payload.email };
  }
}
