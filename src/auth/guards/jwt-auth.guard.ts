import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // try {
      const authHeader = request.headers.authorization;
      console.log("jwt-auth.guard authHeader", authHeader)
      const bearerToken = authHeader.split(" ")[1];
      const result = this.jwtService.verify(bearerToken);
      console.log("jwt-auth.guard result", result)
      return true;
    // } catch (e) {
    //   throw new UnauthorizedException("Token inválido ou expirado");
    // }
  }
}
