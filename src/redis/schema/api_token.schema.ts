import { Entity, Schema } from 'redis-om';

export class TokenAPi extends Entity {}

export const SchemaTokenAPi = new Schema(TokenAPi, {
  token: { type: 'string' },
  status: { type: 'boolean' },
  date_expire: { type: 'date' },
});
