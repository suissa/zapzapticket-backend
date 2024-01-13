import { Controller, Post, Body, HttpException, HttpStatus, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async login(@Body() body: { email: string; password: string}, @Res() res ) {
    const { email, password } = body;

    // Valida o usuário
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      return res.json({
        message: "Usuário não encontrado"
      })
      // throw new HttpException("Credenciais inválidas", HttpStatus.UNAUTHORIZED);
    }

    // Gera o JWT para o usuário validado
    const token = await this.authService.login(user);
    res.json({
      message: "Login bem-sucedido",
      // user,
      token
    });
  }
}
