import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
// import { PassportModule } from "@nestjs/passport";
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from "./controller/auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { User, UserSchema } from 'src/user/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: "ManoVeioPeriferico#666",
      signOptions: { expiresIn: "180m" },
      global: true,
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
