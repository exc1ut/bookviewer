import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://hope:sxekojje321@cluster0.5cn3a.mongodb.net/bookviewer?retryWrites=true&w=majority',
    ),
    UserModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    AuthModule,
    CategoryModule,
    BookModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
