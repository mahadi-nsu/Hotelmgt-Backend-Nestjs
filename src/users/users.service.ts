import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './user.model';
import { DeleteResult } from 'mongodb';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getAllUsers(): Promise<any> {
    const result = await this.userModel.find();
    return result;
  }

  async getSingle(id: string): Promise<User | null> {
    const result = await this.userModel.findById(id);
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

  async patch(id: string, data: UpdateUserDto): Promise<any> {
    console.log(data);
    const usertobeUpdated = await this.userModel.findById(id);

    if (!usertobeUpdated) {
      throw new NotFoundException('User Not Found');
    }

    usertobeUpdated.set(data);
    const result = await usertobeUpdated.save();

    return result;
  }

  async delete(id: string): Promise<DeleteResult> {
    const usertobeDeleted = await this.userModel.findById(id);
    if (!usertobeDeleted) {
      throw new NotFoundException('User not found to be deleted');
    }

    const result = await this.userModel.deleteOne({ _id: id });
    return result;
  }
}
