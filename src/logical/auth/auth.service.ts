import { Injectable } from '@nestjs/common';
import { UserService } from "../user/user.service";
import { JwtService } from '@nestjs/jwt'
import { encryptPassword } from "../../utils/cryptogram";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService,
        private readonly jwtService: JwtService
    ){}

    //JWT - 2:校验用户信息
    async validateUser(username: string, password: string){
        console.log('JWT - 2 :校验用户信息')
        const user = await this.usersService.findOne(username)
        if(!user){
            return {code: 3, msg: '用户不存在'}
        }
        const hashedPw = user.password
        const salt = user.salt
        const hashPw = encryptPassword(password, salt)
        return {
            code: hashedPw === hashPw ? 1 : 2,
            user: hashedPw === hashPw ? user : null,
        }
    }

    //JWT - 3:处理jwt签证
    async certificate(user: any){
        console.log('JWT - 3 :处理jwt签证')
        const payload = {
            username: user.username,
            sub: user.userId,
            role: user.role
        }
        try{
            const token = this.jwtService.sign(payload)
            return {
                code: 200,
                data: {
                    token
                },
                msg: '登录成功'
            }
        }catch (e) {
            return {
                code: 600,
                msg: '账号或者密码错误'
            }
        }

    }
}

