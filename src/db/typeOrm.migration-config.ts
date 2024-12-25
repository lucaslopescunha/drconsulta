import { ConfigService } from "@nestjs/config";
import {config} from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";
import { EstabelecimentoEntity } from "./entities/estabelecimento.entity";
import { VeiculoEntity } from "./entities/veiculo.entity";
import { UsuarioEntity } from "./entities/user.entity";

config();

const configService = new ConfigService();

const dataSourceOptions: DataSourceOptions = { 
    type: "mysql",
    host: configService.get<string>('DB_HOST'),
    port: +configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    entities: [EstabelecimentoEntity,VeiculoEntity, UsuarioEntity],
    migrations: [__dirname+'/migrations/*.ts'],
    synchronize: false


};

export default new DataSource(dataSourceOptions);