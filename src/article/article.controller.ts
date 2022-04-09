import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { AuthGuard } from '../users/guards/auth.guard';
import { User } from '../users/decorators/user.decorator';
import { UsersEntity } from '../users/users.entity';
import { CreateArticleDto } from './dto/createArticle.dto';
import { ArticleResponseInterface } from './types/articleResponse.interface';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('article')
  @UseGuards(AuthGuard)
  async create(
    @User() currentUser: UsersEntity,
    @Body('article')
    createArticleDto: CreateArticleDto,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.createArticle(
      currentUser,
      createArticleDto,
    );
    return this.articleService.buildArticleResponse(article);
  }
}
