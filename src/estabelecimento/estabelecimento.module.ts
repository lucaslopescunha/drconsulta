import { Module } from '@nestjs/common';
import { EstabelecimentoController } from './estabelecimento.controller';
import { EstabelecimentoService } from './estabelecimento.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstabelecimentoEntity } from 'src/db/entities/estabelecimento.entity';

@Module({
    imports: [TypeOrmModule.forFeature([EstabelecimentoEntity])],
    controllers: [EstabelecimentoController],
    providers: [EstabelecimentoService],
    exports: [EstabelecimentoService]
})
export class EstabelecimentoModule { 

}
