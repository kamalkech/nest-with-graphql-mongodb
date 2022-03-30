import { Module } from '@nestjs/common';
import { CatService, UserService } from './services';
import { DatabaseModule } from '@src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [CatService, UserService],
  exports: [CatService, UserService],
})
export class AdminModule {}
