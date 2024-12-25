import { Module } from '@nestjs/common';
import { VeiculosService } from './veiculos.service';
import { VeiculosController } from './veiculos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VeiculoEntity } from 'src/db/entities/veiculo.entity';

@Module({
  providers: [VeiculosService],
  exports: [VeiculosService],
  imports: [TypeOrmModule.forFeature([VeiculoEntity])],  
  controllers: [VeiculosController]
})
export class VeiculosModule {}
