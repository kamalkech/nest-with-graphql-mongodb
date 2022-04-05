import { Module } from '@nestjs/common';
import { RedisService } from './services/redis.service';
import { RedisController } from './controller/redis.controller';
import { TokenRepository } from './services/token.repository';

@Module({
  providers: [RedisService, TokenRepository],
  exports: [RedisService, TokenRepository],
  controllers: [RedisController],
})
export class RedisModule {}
