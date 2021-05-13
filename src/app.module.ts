import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './logical/auth/auth.module';
import { UserModule } from "./logical/user/user.module";
import { ArticleModule} from "./logical/article/article.module";

import {UserController} from "./logical/user/user.controller";
import {ArticleController} from "./logical/article/article.controller";

import { TagService } from './logical/tag/tag.service';
import { TagController } from './logical/tag/tag.controller';
import { TagModule } from './logical/tag/tag.module';

@Module({
  imports: [AuthModule, UserModule, ArticleModule, TagModule],
  controllers: [AppController, UserController, ArticleController, TagController],
  providers: [AppService, TagService],
})
export class AppModule {}
