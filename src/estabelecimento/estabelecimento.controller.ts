import { Body, Controller, Post } from '@nestjs/common';
import { EstabelecimentoService } from './estabelecimento.service';
import { EstabelecimentoDto } from './estabelecimento.dto';
import { EstabelecimentoEntity } from 'src/db/entities/estabelecimento.entity';

@Controller('estabelecimento')
export class EstabelecimentoController {

    
        constructor(private readonly estabelecimentoService: EstabelecimentoService) {}
    
        @Post()
        create(@Body() estabelecimento: EstabelecimentoDto) {
            console.log(estabelecimento)
            this.estabelecimentoService.create(estabelecimento);
        }
    
}
