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

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/all')
  async get(): Promise<any> {
    const alluser = await this.usersService.getAllUsers();
    return {
      message: 'All user fetched Successfully',
      data: alluser,
    };
  }

  @UseInterceptors(SingleImageUploadInterceptor(3 * 1024 * 1024))
  @Post('/')
  async post(
    @Body() body: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    console.log('image info', file);
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

  @Patch('/:id')
  async patch(@Param('id') id: string, @Body() body: any): Promise<any> {
    return this.usersService.patch(id, body);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.usersService.delete(id);
  }
}
