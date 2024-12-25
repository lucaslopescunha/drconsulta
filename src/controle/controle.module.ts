import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ControleVeiculosDto } from './controle.dto';
import { ControleVeiculosEntity } from 'src/db/entities/controle-veiculos.entity';
import { ControleController } from './controle.controller';
import { ControleService } from './controle.service';
import { EstabelecimentoService } from 'src/estabelecimento/estabelecimento.service';
import { VeiculosService } from 'src/veiculos/veiculos.service';
import { EstabelecimentoEntity } from 'src/db/entities/estabelecimento.entity';
import { VeiculoEntity } from 'src/db/entities/veiculo.entity';


@Module({
    imports: [TypeOrmModule.forFeature([ControleVeiculosEntity, EstabelecimentoEntity, VeiculoEntity])],
    controllers: [ControleController],
    providers: [ControleService, EstabelecimentoService, VeiculosService],
    exports: [ControleService]
})
export class ControleModule {}
