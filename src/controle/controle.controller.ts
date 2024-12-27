import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ControleService } from './controle.service';
import { ControleVeiculosDto, FindAllParameters } from './controle.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('controle')
export class ControleController {

    constructor(private readonly controleService: ControleService) { }

    @Post()
    create(@Body() controle: ControleVeiculosDto): Promise<ControleVeiculosDto> {
        return this.controleService.create(controle);
    }

    @Get()
    async findAll(@Query() params: FindAllParameters): Promise<ControleVeiculosDto[]> {
        console.log(params);
        return await this.controleService.findAll(params);
    }
}
