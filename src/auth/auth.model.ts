import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class AuthModel {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  email: string;
  @Column()
  passwordHash: string;
}
