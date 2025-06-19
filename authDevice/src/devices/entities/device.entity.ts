import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Device {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  deviceId: string;

  @Field()
  @Column()
  userId: string;

  @Field()
  @Column()
  ip: string;

  @Field()
  @Column()
  mac: string;

  @Field()
  @Column()
  sistema_op: string;

  @Field()
  @Column({ default: true })
  isActive: boolean;
}
