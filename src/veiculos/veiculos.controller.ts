import { Body, Controller, Post } from '@nestjs/common';
import { VeiculosService } from './veiculos.service';
import { VeiculosDto } from './veiculo.dto';

@Controller('veiculos')
export class VeiculosController {


    constructor(private readonly veiculosService: VeiculosService) { }

    @Post()
    create(@Body() veiculo: VeiculosDto) {
        this.veiculosService.create(veiculo);
    }

}
