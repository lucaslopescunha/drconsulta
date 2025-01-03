import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { EstabelecimentoService } from './estabelecimento.service';
import { EstabelecimentoDto, EstabelecimentoRouteParameters, FindAllParameters } from './estabelecimento.dto';
import { EstabelecimentoEntity } from 'src/db/entities/estabelecimento.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@ApiBearerAuth()
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

    @Put("/:id") 
    update(@Param('id') id: number, @Body() estabelecimento: EstabelecimentoDto) {
        this.estabelecimentoService.update(id, estabelecimento);
    }

    @Delete("/:id")
    remove(@Param() params: EstabelecimentoRouteParameters) {
        return this.estabelecimentoService.remove(params.id);
    }
}
