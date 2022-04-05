import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateApiKeyInput } from '../dto/api_key.dto';
import { TokenRepository } from '../services/token.repository';

@Controller('redis')
export class RedisController {
  constructor(private readonly tokenRepository: TokenRepository) {}

  @Get('findAll')
  async findAll() {
    return await this.tokenRepository.findAll();
  }

  @Post('create')
  async create(@Body() body: CreateApiKeyInput) {
    return await this.tokenRepository.create(body);
  }

  @Post('delete')
  async delete() {
    return await this.tokenRepository.delete('01FZV9Y85RT2H27GVY0Y5XH5W6');
  }
}
