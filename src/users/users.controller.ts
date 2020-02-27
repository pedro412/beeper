import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CreateUserDto, UserDto } from './dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  findOne(@Param() params): string {
    return `This action returns a ${params.id} user`;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    console.log(createUserDto);
    const createdUser = await this.usersService.create(createUserDto);

    return createdUser;
  }

  @Get()
  async findAll(): Promise<object> {
    const users = await this.usersService.findAll();
    return {
      success: true,
      message: 'list all users',
      data: users,
    };
  }
}
