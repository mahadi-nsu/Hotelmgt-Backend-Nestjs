import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';

import { SingleImageUploadInterceptor } from '../interceptors/SingleImageUploadInterceptors';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/all')
  async getAllUser(): Promise<any> {
    const alluser = await this.usersService.getAllUsers();
    return {
      message: 'All user fetched Successfully',
      data: alluser,
    };
  }

  @UseInterceptors(SingleImageUploadInterceptor(3 * 1024 * 1024))
  @Post('/')
  async createUser(
    @Body() body: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    const user = await this.usersService.post({
      ...body,
      image: file.filename,
    });

    return {
      message: 'User Created Successfully',
      data: user,
    };
  }

  @Get('/singleuser/:id')
  async getSingleUser(@Param('id') id: string): Promise<any> {
    const user = await this.usersService.getSingle(id);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    return {
      message: 'User details',
      data: user,
    };
  }

  @Patch('/userupdate/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ): Promise<any> {
    console.log(data);
    const updatedUser = await this.usersService.patch(id, data);

    return {
      message: 'User Updated Successfully',
      data: updatedUser,
    };
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') id: string): Promise<any> {
    const result = await this.usersService.delete(id);

    return {
      message: 'User Deleted Successfully',
      data: result,
    };
  }
}
