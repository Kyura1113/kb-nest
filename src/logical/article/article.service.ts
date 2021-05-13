import {Injectable} from '@nestjs/common';
import * as Sequelize from 'sequelize'
import sequelize from '../../database/sequelize'

interface Params {
    pageSize: number
    pageNumber: number
}

@Injectable()
export class ArticleService {
    async findByPage(params: Params): Promise<any | undefined>{
        const startNum = params.pageSize * (params.pageNumber - 1)
        const endNum = params.pageSize * params.pageNumber - 1

        let sql = `
            SELECT 
                AES_DECRYPT(t.article_content, 'qwe') AS article_content
            FROM 
                (
                SELECT
                    ( @id := @id + 1 ) AS id,
                    article_db.* 
                FROM
                article_db, (
                SELECT 
                    @id := 0
                ) AS id_temp
                ) t
            WHERE
                t.id BETWEEN '${startNum}' AND '${endNum}'
        `;

        let sql2 = `
            SELECT 
                COUNT(*) AS COUNT
            FROM 
                article_db
        `;

        try{
            const resPaging = await sequelize.query(sql,{
                type: Sequelize.QueryTypes.SELECT,
                raw: true,
                logging: true
            });
            const resTotal = await sequelize.query(sql2,{
                type: Sequelize.QueryTypes.SELECT,
                raw: true,
                logging: true
            });
            return {dataList: resPaging, total: resTotal[0]["COUNT"] }
        } catch (error) {
            console.error(error)
            return void 0
        }
    }

    async createArticle(requestBody: any): Promise<any>{
        const { title, desc, content, cover, creator, tags } = requestBody
        const sql = `
            INSERT INTO article_db
                (
                 article_title, 
                 article_desc, 
                 article_content, 
                 article_cover, 
                 article_creator, 
                 article_tags, 
                 article_clicks, 
                 article_status
                 )
            VALUES
                ('${title}','${desc}',AES_ENCRYPT('${content}', 'qwe'),'${cover}','${creator}','${tags}',0, 1)
        `;
        try{
            await sequelize.query(sql, {logging: false})
            return { code: 200, msg: '发布成功' }
        }catch (error) {
            return { code: 503, msg: `Service error: ${error}`}
        }
    }

    async findById(requestBody: any): Promise<any>{
        const { id } = requestBody
        const sql = `
            SELECT
                article_content AS CONTENT
            FROM
                article_db
            WHERE
                article_id = '${id}'
        `;
        try{
            const res = await sequelize.query(sql,{
                type: Sequelize.QueryTypes.SELECT,
                raw: true,
                logging: false
            });
            const content = res[0]['CONTENT']
			return { data: content.toString('utf-8') }
        }catch (error) {
            return { code: 503, msg: `Service error: ${error}`}
        }

    }
}
