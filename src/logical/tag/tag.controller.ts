import { Controller, Post, Body } from '@nestjs/common';
import { TagService} from './tag.service'

@Controller('tag')
export class TagController {
	constructor(private readonly tagService: TagService){}
	
	@Post('find-tag')
	findTag(@Body() body: any){
		return this.tagService.find(body.name, body.fuzzy)
	}
	
	@Post('add-tag')
	addTag(@Body() body:any){
		return this.tagService.add(body.name)
	}
}
