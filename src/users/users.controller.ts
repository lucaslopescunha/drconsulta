import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() user: UserDto) {
        console.log("novo", user)
        this.usersService.create(user);
    }
}
