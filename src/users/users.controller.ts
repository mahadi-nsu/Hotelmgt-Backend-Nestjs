import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  async get(): Promise<any> {
    return this.usersService.get();
  }

  @Post('/')
  async post(@Body() body: CreateUserDto): Promise<any> {
    const user = await this.usersService.post(body);

    return {
      message: 'User Created Successfully',
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
