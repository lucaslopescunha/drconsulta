import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { VeiculosModule } from './veiculos/veiculos.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EstabelecimentoModule } from './estabelecimento/estabelecimento.module';
import { ControleModule } from './controle/controle.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), VeiculosModule, AuthModule, UsersModule, EstabelecimentoModule, ControleModule, DbModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
