import { Exclude } from "class-transformer";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleEnum } from "../enums/roles.enum";
import * as bcrypt from 'bcrypt';
import { Product } from "src/api/products/entities/product.entity";

@Entity({name: 'authentications'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  name?: string;

  @Exclude()
  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'enum', enum: RoleEnum })
  role: RoleEnum;

  @OneToMany(() => Product, product => product.user)
  products: Product[];

  @BeforeInsert()
  async hashPassword() {
    if(this.password) {
      const hashPassword = await bcrypt.hash(this.password, 10);
      this.password = hashPassword;
    }
  }
}