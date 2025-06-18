import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class VerifyResponse {
  @Field()
  deviceId: string;

  @Field()
  userId: string;
}
