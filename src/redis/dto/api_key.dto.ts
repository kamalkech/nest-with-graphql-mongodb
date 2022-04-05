import { IsBoolean } from 'class-validator';

export class CreateApiKeyInput {
  token: string;
  @IsBoolean()
  status: boolean;
  date_expire: Date;
}
