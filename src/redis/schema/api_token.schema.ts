import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Schema } from 'redis-om';

export interface TokenAPi {
  entityId: string;
  token: string;
  status: boolean;
  date_expire: Date;
}

@ObjectType()
export class TokenApiObject {
  @Field(() => String)
  entityId: string;

  @Field(() => String)
  token: string;

  @Field(() => Boolean)
  status: boolean;

  @Field(() => Date)
  date_expire: Date;
}

export class TokenAPi extends Entity {}

export const SchemaTokenAPi = new Schema(
  TokenAPi,
  {
    token: { type: 'string' },
    status: { type: 'boolean' },
    date_expire: { type: 'date' },
  },
  {
    dataStructure: 'HASH',
  },
);
