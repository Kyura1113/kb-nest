//数据传输对象(DTO) (Data Transfer Object)
import { IsNotEmpty } from 'class-validator'

export class RegisterInfoDTO{
    @IsNotEmpty({message: '用户名称不能为空'})
    readonly accountName: string | number;
    @IsNotEmpty({message: '密码不能为空'})
    readonly password: string;
    @IsNotEmpty({message: '重复密码不能为空'})
    readonly repassword: string;
}