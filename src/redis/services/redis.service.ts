import { Injectable } from '@nestjs/common';
// import { tokenAPiRepository } from './client';
import { Client } from 'redis-om';

@Injectable()
export class RedisService {
  // private client: Client = new Client();
  // private tokenAPiRepository;
  // async onModuleInit(): Promise<void> {
  //   console.log('111', 111);
  //   await this.client.open('redis://localhost:6379');
  //   this.tokenAPiRepository = this.client.fetchRepository(tokenSchema);
  //   this.tokenAPiRepository.createIndex();
  //   console.log('this.tokenAPiRepository', this.tokenAPiRepository);
  // }
  // async onModuleDestroy(): Promise<void> {
  //   console.log('222', 222);
  //   await this.client.close();
  // }
  // async test() {
  //   await this.client.set('foo', 'bar');
  //   let value = await this.client.execute(['GET', 'foo']);
  //   return value;
  // }
  // async findAll(): Promise<any[]> {
  //   // let client = new Client();
  //   // await client.open('redis://localhost:6379');
  //   // let tokenAPiRepository = this.client.fetchRepository(tokenSchema);
  //   // return await tokenAPiRepository.search().returnAll({ pageSize: 100 });
  //   // await this.client.close();
  //   const token_api = await this.tokenAPiRepository.search().return.all();
  //   return token_api;
  // }
  // async findAndPager(offset: number, limit: number) {
  //   return await this.tokenAPiRepository.search().return.page(offset, limit);
  // }
  // async add() {
  //   let token_api = await this.tokenAPiRepository.createAndSave({
  //     token: 'token-test',
  //     status: true,
  //     date_expire: new Date('2022-12-27'),
  //   });
  //   console.log('token_api', token_api);
  // }
}
