import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { EstabelecimentoService } from './estabelecimento.service';
import { EstabelecimentoDto, EstabelecimentoRouteParameters, FindAllParameters } from './estabelecimento.dto';
import { EstabelecimentoEntity } from 'src/db/entities/estabelecimento.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('estabelecimento')
export class EstabelecimentoController {


    constructor(private readonly estabelecimentoService: EstabelecimentoService) { }

    @Post()
    async create(@Body() estabelecimento: EstabelecimentoDto): Promise<EstabelecimentoDto> {
        return this.estabelecimentoService.create(estabelecimento);
    }

    @Get("/:id")
    findById(@Param('id') id: number) {
        return this.estabelecimentoService.findById(id);
    }

    @Get()
    async findAll(@Query() params: FindAllParameters): Promise<EstabelecimentoDto[]> {
        return this.estabelecimentoService.findAll(params);
    }

    @Put() 
    async update(@Body() estabelecimento: EstabelecimentoDto) {
        await this.estabelecimentoService.update(estabelecimento);
    }

    @Delete("/:id")
    remove(@Param() params: EstabelecimentoRouteParameters) {
        return this.estabelecimentoService.remove(params.id);
    }
}
