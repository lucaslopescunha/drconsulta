import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { VeiculosService } from './veiculos.service';
import { FindAllParameters, VeiculoRouteParameters, VeiculosDto } from './veiculo.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('veiculos')
export class VeiculosController {


    constructor(private readonly veiculosService: VeiculosService) { }

    @Post()
    create(@Body() veiculo: VeiculosDto) : Promise<VeiculosDto>{
        return this.veiculosService.create(veiculo);
    }

    @Get("/:id")
    findById(@Param('id') id: number) {
        console.log("id passado", id);
        return this.veiculosService.findById(id);
    }

    @Get()
    async findAll(@Query() params: FindAllParameters): Promise<VeiculosDto[]> {
        return await this.veiculosService.findAll(params);
    }

    @Put()
    async update(@Body() veiculo: VeiculosDto) {
        await this.veiculosService.update(veiculo);
    }

    @Delete("/:id")
    remove(@Param() params: VeiculoRouteParameters) {
        return this.veiculosService.remove(params.id);
    }
}
