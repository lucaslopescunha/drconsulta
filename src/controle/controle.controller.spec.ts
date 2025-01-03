import { Test, TestingModule } from '@nestjs/testing';
import { ControleController } from './controle.controller';
import { ControleService } from './controle.service';
import { TipoEnum } from '../veiculos/veiculo.dto';
import { ControleVeiculosDto } from './controle.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('ControleController', () => {
  let controller: ControleController;
  let controleService: ControleService;

  const dataAtual = new Date();
  const estabelecimento = 1;
  const dtSaida = new Date()
  const veiculo = 1;
  const tipo = TipoEnum.C;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ControleController],
      providers: [{ provide: ControleService,
        useValue: {
          create: jest
          .fn()
          .mockReturnValue({
              id: 1,
              dtEntrada: dataAtual,
              dtSaida: dtSaida,
              estabelecimento: estabelecimento,
              veiculo: veiculo,
              tipo: tipo
            
          })
        }
       },{ provide: JwtService,
        useValue: {}
       },ConfigService]
    }).compile();

    controller = module.get<ControleController>(ControleController);
    controleService = module.get<ControleService>(ControleService);
  });

  it('create', async () => {
    const controleVeiculosRequest = new ControleVeiculosDto();
    controleVeiculosRequest.dtEntrada = dataAtual;
    controleVeiculosRequest.estabelecimento = estabelecimento;
    controleVeiculosRequest.dtSaida = dtSaida;
    controleVeiculosRequest.veiculo = veiculo;
    controleVeiculosRequest.tipo = tipo;

    expect(await controller.create(controleVeiculosRequest)).toStrictEqual<ControleVeiculosDto>({
      id:1,
      dtEntrada: dataAtual,
      dtSaida: dtSaida,
      estabelecimento: estabelecimento,
      veiculo: veiculo,
      tipo: tipo
    });
  });
});
