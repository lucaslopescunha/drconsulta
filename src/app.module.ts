import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { VeiculosModule } from './veiculos/veiculos.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { EstabelecimentoService } from './estabelecimento/estabelecimento.service';
import { EstabelecimentoController } from './estabelecimento/estabelecimento.controller';
import { EstabelecimentoModule } from './estabelecimento/estabelecimento.module';
import { ControleService } from './controle/controle.service';
import { ControleController } from './controle/controle.controller';
import { ControleModule } from './controle/controle.module';
import { UsersModule } from './users/users.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), VeiculosModule, AuthModule, UsersModule, EstabelecimentoModule, ControleModule, DbModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
