import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { envConfig } from './config/env';
import { PostsModule } from './modules/posts/posts.module';
import AuthModule from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: envConfig.database,
      host: envConfig.dbHost,
      port: envConfig.dbPort,
      username: envConfig.dbUsername,
      password: envConfig.dbPassword,
      entities: [`${__dirname}/modules/**/entities/*.entity.{ts,js}`],
      synchronize: envConfig.dbSynchronize,
    }),
    AuthModule,
    PostsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
