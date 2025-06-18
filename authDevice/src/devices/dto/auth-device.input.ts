import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class AuthDeviceInput {
  @Field()
  @IsString()
  deviceId: string;
}
