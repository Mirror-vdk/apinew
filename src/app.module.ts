import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './ormconfig';
import { UsersModule } from './users/users.module';
import { AuthMiddleware } from './users/middlewares/auth.middleware';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), UsersModule, ArticleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
