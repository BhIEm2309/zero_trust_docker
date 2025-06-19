import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity('user')
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  user: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column()
  rol: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lugar_conexion: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  navegador: string;

  @Field({ nullable: true })
  @Column({ nullable: true, type: 'datetime' })
  fecha_hora: Date;
}
