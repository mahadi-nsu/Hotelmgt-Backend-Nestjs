import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getAllUsers(): Promise<any> {
    const result = await this.userModel.find();
    return result;
  }

  async post(data: CreateUserDto): Promise<User> {
    const { name, designation, description, image } = data;
    const newUser = new this.userModel({
      name,
      designation,
      description,
      image,
    });
    const result = await newUser.save();
    return result;
  }

  async patch(id: string, body: any): Promise<any> {
    return { message: `This is PATCH for ID -> ${id}!`, body };
  }

  async delete(id: string): Promise<any> {
    return { message: `This is DELETE for ID -> ${id}!` };
  }
}
