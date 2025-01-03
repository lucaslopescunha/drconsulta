import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { VeiculosService } from './veiculos.service';
import { FindAllParameters, VeiculoRouteParameters, VeiculosDto } from './veiculo.dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('veiculos')
export class VeiculosController {


    constructor(private readonly veiculosService: VeiculosService) { }

    @Post()
    create(@Body() veiculo: VeiculosDto) {
        return this.veiculosService.create(veiculo);
    }

    @ApiOkResponse({
        description: 'Alteração bem sucedida'
    })    
    @Put('/:id')
    update(@Param('id') id: number,@Body() veiculo: VeiculosDto) {
        this.veiculosService.update(id, veiculo);
    }

    @ApiOkResponse({
        description: 'Veículo encontrado',
        type: VeiculosDto,
        isArray: false
    })    
    @Get("/:id")
    findById(@Param('id') id: number) {
        console.log("id passado", id);
        return this.veiculosService.findById(id);
    }


    @ApiOkResponse({
        description: 'Veículos encontrados',
        type: VeiculosDto,
        isArray: true
    })    
    @Get()
    async findAll(@Query() params: FindAllParameters): Promise<VeiculosDto[]> {
        return await this.veiculosService.findAll(params);
    }

    @ApiOkResponse({
        description: 'Delete bem sucedido'
    })    
    @Delete("/:id")
    remove(@Param() params: VeiculoRouteParameters) {
        return this.veiculosService.remove(params.id);
    }
}
