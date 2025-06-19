import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RegisterDeviceInput {
  @Field()
  deviceId: string;

  @Field()
  userId: string;

  @Field()
  ip: string;

  @Field()
  mac: string;

  @Field()
  sistema_op: string;
}
