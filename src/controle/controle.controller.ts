import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { ControleService } from './controle.service';
import { ControleVeiculosDto, FindAllParameters } from './controle.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('controle')
export class ControleController {

    constructor(private readonly controleService: ControleService) { }

    @Post()
    create(@Body() controle: ControleVeiculosDto): Promise<ControleVeiculosDto> {
        console.log("controlacontraolalllll", controle);
        return this.controleService.create(controle);
    }
}
