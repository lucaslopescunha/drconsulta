import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { AuthResponseDto } from './auth.dto';

@Injectable()
export class AuthService {
    private jwtExpirationTimeInSeconds: number;

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
        this.jwtExpirationTimeInSeconds = this.configService.get<number>('JWT_EXPIRATION_TIME');
    }

    async signIn(username: string, password: string): Promise<AuthResponseDto> {
        const foundUsuario = await this.usersService.findByUserName(username);

        if(!foundUsuario || !bcryptCompareSync(password, foundUsuario.password)) {
            throw new UnauthorizedException();
        }

        const payload = { sub: foundUsuario.id, username: foundUsuario.username};
        
        const token = this.jwtService.sign(payload);

        return {token, expiresIn: this.jwtExpirationTimeInSeconds}
    }
}
