import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
