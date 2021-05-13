import { Controller, Post, Body } from '@nestjs/common';
import { ArticleService } from "./article.service";

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService){}
    
    @Post('find-by-page')
    findByPage(@Body() body: any){
        return this.articleService.findByPage(body)
    }

    @Post('create-article')
    createArticle(@Body() body: any){
        return this.articleService.createArticle(body)
    }
}
