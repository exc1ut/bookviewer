import { UserService } from './user.service';
import { Module, Global } from '@nestjs/common';

@Global()
@Module({
  providers: [UserService],
  exports: [UserService],
})
export class GlobalModule {}
