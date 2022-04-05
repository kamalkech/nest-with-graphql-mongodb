import { Client } from 'redis-om';

const client = new Client().open(process.env.REDIS_URI);

export default client;
