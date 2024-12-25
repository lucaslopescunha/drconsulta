import { Body, Controller, Post } from '@nestjs/common';
import { ControleService } from './controle.service';
import { ControleVeiculosDto } from './controle.dto';

@Controller('controle')
export class ControleController {

    constructor(private readonly controleService: ControleService) { }

    @Post()
    create(@Body() controle: ControleVeiculosDto) {
        console.log(controle)
        this.controleService.create(controle);
    }

}
