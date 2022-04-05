import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateApiKeyInput, ParamApiKeyInput } from '../dto/api_key.dto';
import { TokenAPi } from '../schema/api_token.schema';
import { TokenRepository } from '../services/token.repository';

@Controller('redis')
export class RedisController {
  constructor(private readonly tokenRepository: TokenRepository) {}

  @Get()
  async findAll(): Promise<TokenAPi[]> {
    return await this.tokenRepository.findAll();
  }

  @Get(':id')
  async findById(@Param() param: ParamApiKeyInput): Promise<TokenAPi> {
    return await this.tokenRepository.findById(param.id);
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
