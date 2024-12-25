import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/db/entities/user.entity';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([UsuarioEntity])]
})
export class UsersModule {}
