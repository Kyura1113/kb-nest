import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize'
import sequelize from '../../database/sequelize'
import { makeSalt, encryptPassword } from '../../utils/cryptogram'

@Injectable()
export class UserService {
    async findOne(username: string): Promise<any | undefined> {
        const sql = `
            SELECT
                user_id userId, account_name username, passwd password, 
                passwd_salt salt, role
            FROM
                admin_user
            WHERE
                account_name = '${username}'
        `;
        try {
            const res= await sequelize.query(sql, {
                type: Sequelize.QueryTypes.SELECT,
                raw: true,
                logging: false
            });
            const user = res
            return user
        }catch (error) {
            console.error(error)
            return void 0
        }
    }
    async register(requestBody: any): Promise<any> {
       const { username, password, repassword } = requestBody
        console.log(requestBody)
        if(password !== repassword){
            return { code: 400, msg: '两次输入密码不同' }
        }
        const user = await this.findOne(username)
        if(user){
            return { code: 400, msg: '用户已存在' }
        }
        const salt = makeSalt()
        const hashPw = encryptPassword(password, salt)
        const sql = `
            INSERT INTO admin_user
                (account_name, passwd, passwd_salt, user_status, role, create_by)
            VALUES
                ('${username}', '${hashPw}', '${salt}', 1, 3, 0)
        `
        try{
            await sequelize.query(sql, { logging: false })
            return { code: 200, msg: '注册成功' }
        }catch (error) {
            return { code: 503, msg: `Service error: ${error}`}
        }
    }
}
