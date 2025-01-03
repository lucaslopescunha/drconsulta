import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControleVeiculosEntity } from '../db/entities/controle-veiculos.entity';
import { EstabelecimentoEntity } from '../db/entities/estabelecimento.entity';
import { VeiculoEntity } from '../db/entities/veiculo.entity';
import { ControleController } from './controle.controller';
import { ControleService } from './controle.service';
import { EstabelecimentoService } from '../estabelecimento/estabelecimento.service';
import { VeiculosService } from '../veiculos/veiculos.service';


@Module({
    imports: [TypeOrmModule.forFeature([ControleVeiculosEntity, EstabelecimentoEntity, VeiculoEntity])],
    controllers: [ControleController],
    providers: [ControleService, EstabelecimentoService, VeiculosService],
    exports: [ControleService]
})
export class ControleModule {}
