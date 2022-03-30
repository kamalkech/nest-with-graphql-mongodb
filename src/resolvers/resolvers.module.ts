import { Module } from '@nestjs/common';
import { AdminModule } from '@src/admin/admin.module';
import { CatResolver } from './admin/cat/cat.resolver';
import { UserResolver } from './user/user.resolver';

@Module({
  imports: [AdminModule],
  providers: [CatResolver, UserResolver],
})
export class ResolversModule {}
