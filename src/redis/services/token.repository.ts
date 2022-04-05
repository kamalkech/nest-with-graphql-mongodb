import { Injectable, OnModuleInit } from '@nestjs/common';
import RedisClient from '@src/redis/redis-client';
import { CreateApiKeyInput } from '../dto/api_key.dto';
import { SchemaTokenAPi, TokenAPi } from '../schema/api_token.schema';

@Injectable()
export class TokenRepository implements OnModuleInit {
  private client;
  private repository;

  async onModuleInit() {
    this.client = await RedisClient;
    this.repository = this.client.fetchRepository(SchemaTokenAPi);
    this.repository.createIndex();
  }

  async findAll(): Promise<TokenAPi[]> {
    try {
      return await this.repository.search().return.all();
    } catch (error) {
      console.error(`Expecting find all api tokens!`);
      throw error;
    }
  }

  async findById(id: string): Promise<TokenAPi> {
    try {
      const result: TokenAPi = await this.repository.fetch(id);
      if (!Object.keys(result.entityData).length) {
        throw new Error('Api Key not found!');
      }
      return result;
    } catch (error) {
      console.log(`Expecting find api token by ID: ${id}`);
      throw error;
    }
  }

  async create(input: CreateApiKeyInput): Promise<any> {
    try {
      const token_api_existe = await this.repository
        .search()
        .where('token')
        .equals(input.token)
        .return.all();

      if (token_api_existe.length) {
        throw new Error(`Cannot duplicate token: ${input.token}`);
      }

      const token_api = await this.repository.createAndSave({
        token: input.token,
        status: input.status,
        date_expire: new Date(input.date_expire),
      });

      return token_api;
    } catch (error) {
      console.error(`Expecting create api token`);
      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.repository.remove(id);
      return true;
    } catch (error) {
      console.error(`Expecting delete api token by id: ${id}`);
      throw error;
    }
  }
}
