import { Module } from '@nestjs/common';
import { JwtModule} from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";
import { jwtConstants } from "./constants";
import { UserModule } from "../user/user.module";

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '12h' }//TOKEN过期时间
        }),
        UserModule
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}
