import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CreateUserDto } from './dto';

@Controller('users')
export class UsersController {
  @Get(':id')
  findOne(@Param() params): string {
    return `This action returns a ${params.id} user`;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): string {
    console.log(createUserDto);

    return 'This action adds a new user';
  }

  @Get()
  findAll(): object {
    return {
      success: true,
      message: 'list all users',
      data: [],
    };
  }
}
