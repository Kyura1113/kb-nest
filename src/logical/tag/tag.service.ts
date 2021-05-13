import { Injectable } from '@nestjs/common';
import * as Sequelize from 'sequelize'
import sequelize from '../../database/sequelize'

@Injectable()
export class TagService {
	async find(name: string, fuzzy?: number): Promise<any | undefined>{
		let sql = `
			SELECT * FROM tag_db 
		`
		if(fuzzy && fuzzy === 1){
			sql += `WHERE name like '%${name}%' LIMIT 0, 10`
		}else{
			sql += `WHERE name = '${name}'`
		}
		try{
			const res = await sequelize.query(sql, {
				type: Sequelize.QueryTypes.SELECT,
				raw: true,
				logging: false
			})
			return { data: res }
		}catch(error){
			return { code: 503, msg: `Service error: ${error}`}
		}
	}
	
	async add(name: string) : Promise<any> {
		const result = await this.find(name)
		if(result.data.length > 0){
			return { data: result.data[0] }
		} 
		let sql = `
				INSERT INTO tag_db 
				(name)
				VALUES
				('${name}')
			`
		try{
			const insert = sequelize.query(sql, {logging: false })
			const newRes = await this.find(name)
			return { code: 200, msg: '添加新标签成功', data: newRes.data[0] }
		}catch(error){
			return { code: 503, msg: `Service error: ${error}`}
		}
	}
}
