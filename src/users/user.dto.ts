import { ApiProperty } from "@nestjs/swagger";
import { MaxLength, MinLength } from "class-validator";

export class UserDto {
    id: string;
    @ApiProperty({description: "usuário"})
    @MinLength(3)
    @MaxLength(256)
    username: string;
    @ApiProperty({description: "senha"})
    @MinLength(6)
    @MaxLength(256)
    password: string;
}