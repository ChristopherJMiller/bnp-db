import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: Omit<User, 'id'>): Promise<User> {
    const dbUser = new User();
    user.email = user.email;
    user.name = user.name;
    user.passwordHash = user.passwordHash;

    return this.usersRepository.save(dbUser);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOneBy(user: Partial<User>): Promise<User | null> {
    return this.usersRepository.findOneBy(user);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}