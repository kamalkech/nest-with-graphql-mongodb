import { Module } from '@nestjs/common';
import { AdminModule } from '@src/admin/admin.module';
import { CatResolver } from './admin/cat/cat.resolver';
import { UserResolver } from './user/user.resolver';
import { ApikeyResolver } from './apikey/apikey.resolver';
import { RedisModule } from '@src/redis/redis.module';

@Module({
  imports: [AdminModule, RedisModule],
  providers: [CatResolver, UserResolver, ApikeyResolver],
})
export class ResolversModule {}
