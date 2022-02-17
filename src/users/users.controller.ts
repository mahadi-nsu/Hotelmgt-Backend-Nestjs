import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  async get(): Promise<any> {
    return this.usersService.get();
  }

  @Post('/')
  async post(@Body() body: any): Promise<any> {
    return this.usersService.post(body);
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
