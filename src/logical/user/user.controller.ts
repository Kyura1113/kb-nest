import {Controller, Post, Body, UseGuards, UsePipes} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";

import {UserService} from "./user.service";
import {AuthService} from "../auth/auth.service";
import {ValidationPipe} from "../../pipe/validation.pipe";
import {RegisterInfoDTO} from "./user.dto";

@Controller('user')
export class UserController {
    constructor(private readonly usersService: UserService, private readonly authService: AuthService) {
    }

    //@Body() 来获取请求体（request.body）的参数
    @Post('find-one')
    findOne(@Body() body: any) {
        return this.usersService.findOne(body.username)
    }

    //JWT - 1:登录请求
    @Post('login')
    async login(@Body() p: any) {
        console.log('JWT - 1:登录请求')
        const authResult = await this.authService.validateUser(p.username, p.password)
        switch (authResult.code) {
            case 1:
                return this.authService.certificate(authResult.user)
            case 2:
                return {code: 600, msg: '账号或者密码不正确'}
            default:
                return {code: 600, msg: '账号不存在'}
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    @Post('register')
    async register(@Body() body: RegisterInfoDTO) {
        return await this.usersService.register(body)
    }
}
