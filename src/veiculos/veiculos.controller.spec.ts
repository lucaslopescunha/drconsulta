import { Test, TestingModule } from '@nestjs/testing';
import { VeiculosController } from './veiculos.controller';
import { VeiculosDto } from './veiculo.dto';
import { VeiculosService } from './veiculos.service';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '../auth/auth.guard';
import { CanActivate } from '@nestjs/common';

describe('VeiculosController', () => {
  let controller: VeiculosController;
  const idVeiculo = 1;
  const modelo = "modelo";
  const cor = "A";
  const placa = "hwz-0801";
  const tipo = "C";
  const marca = "marca";

  const mockVeiculosService = {
    create: jest.fn(dto => {
      return {
        id: Date.now(),
        ...dto
      }
    }),
    update: jest.fn().mockImplementation(() => {
    }),

  };
  beforeEach(async () => {
    const mockAuthGuard: CanActivate = { canActivate: jest.fn(() => true) };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VeiculosController],
      providers: [VeiculosService]
    })
      .overrideProvider(VeiculosService)
      .useValue(mockVeiculosService)
      .overrideGuard(AuthGuard).useValue(mockAuthGuard)
      .compile();
    controller = module.get<VeiculosController>(VeiculosController);
  });
  it('Create Veiculo', () => {
    const dto = {
      modelo: modelo,
      cor: cor,
      placa: placa,
      tipo: tipo,
      marca: marca
    };
    expect(controller.create(dto)).toEqual({
      id: expect.any(Number),
      modelo: modelo,
      cor: cor,
      placa: placa,
      tipo: tipo,
      marca: marca
    });
    expect(mockVeiculosService.create).toHaveBeenCalledWith(dto);
  });
  it('Update Veiculo', () => {
    const dto = {
      modelo: modelo,
      cor: cor,
      placa: placa,
      tipo: tipo,
      marca: marca
    };

    controller.update(idVeiculo, dto);
    expect(mockVeiculosService.update).toHaveBeenCalledWith(idVeiculo, dto);

  });

});
