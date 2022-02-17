import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor() {}

  async get(): Promise<any> {
    return { message: 'This is GET!' };
  }

  async post(body: any): Promise<any> {
    return { message: 'This is POST!', body };
  }

  async patch(id: string, body: any): Promise<any> {
    return { message: `This is PATCH for ID -> ${id}!`, body };
  }

  async delete(id: string): Promise<any> {
    return { message: `This is DELETE for ID -> ${id}!` };
  }
}
