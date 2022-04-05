import { Client } from 'redis-om';

const client = new Client().open('redis://localhost:6379');

export default client;
