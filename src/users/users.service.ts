import { ConflictException, Injectable } from '@nestjs/common';
import {v4 as uuid} from 'uuid';
import {hashSync as bcryptHashSync} from 'bcrypt';
import { UserDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    private readonly users: UserDto[] = []

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: Repository<UsuarioEntity>
    ) {

    }

    async create(novoUsuario: UserDto) {
        const usuarioJaRegistrado = await this.findByUserName(novoUsuario.username);
        if(usuarioJaRegistrado) {
            throw new ConflictException(`Usuário ${novoUsuario.username} já registrado.`)            
        }
        const dbUsuario = new UsuarioEntity();
        dbUsuario.username = novoUsuario.username;
        dbUsuario.passwordHash = bcryptHashSync(novoUsuario.password, 10);
        const {id, username} = await this.usuarioRepository.save(dbUsuario);
        return { id, username};
    }

    async findByUserName(username: string): Promise<UserDto | null> {
        const usuarioFound = await this.usuarioRepository.findOne( {
            where: {username}
        })
        if(!usuarioFound) {
            return null;
        }
        return {
            id: usuarioFound.id,
            username: usuarioFound.username,
            password: usuarioFound.passwordHash
        }
    }
}
