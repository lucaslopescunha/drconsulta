import { Test, TestingModule } from '@nestjs/testing';
import { VeiculosService } from './veiculos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { VeiculoEntity } from '../db/entities/veiculo.entity';
import { ConflictException, HttpException, HttpStatus } from '@nestjs/common';

describe('VeiculosService', () => {
  let service: VeiculosService;
  const idVeiculo = 1;
  const modelo = "modelo";
  const cor = "A";
  const placa = "hwz-0801";
  const tipo = "C";
  const marca = "marca";

  const mockVeiculosRepository = {
    findOneBy: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
    update: jest.fn()
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VeiculosService,{
        provide: getRepositoryToken(VeiculoEntity),
        useValue: mockVeiculosRepository
      }],
    }).compile();

    service = module.get<VeiculosService>(VeiculosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('create', async() => {

    const dto = {
      modelo: modelo,
      cor: cor,
      placa: placa,
      tipo: tipo,
      marca: marca
    };
    jest.spyOn(mockVeiculosRepository,"findOne").mockImplementation(() => {return undefined});
    jest.spyOn(mockVeiculosRepository,"save").mockImplementation(veiculo => Promise.resolve({id: idVeiculo, ...veiculo}));
    expect(await service.create(dto)).toEqual({
      id: idVeiculo,
      modelo: modelo,
      cor: cor,
      placa: placa,
      tipo: tipo,
      marca: marca
    })
    expect(mockVeiculosRepository.save).toHaveBeenCalledWith({
      modelo: modelo,
      cor: cor,
      placa: placa,
      tipo: tipo,
      marca: marca

    });
  })

  it('createWithException', async() => {

    const dto = {
      modelo: modelo,
      cor: cor,
      placa: placa,
      tipo: tipo,
      marca: marca
    };
    jest.spyOn(mockVeiculosRepository,"findOneBy").mockImplementation(veiculo => Promise.resolve({id: idVeiculo, ...veiculo}));
    expect(service.create(dto)).rejects.toThrow(new ConflictException(`Veiculo ${placa} já registrado.`));
  })

  it('update', async() => {
    const dto = {
      modelo: modelo,
      cor: cor,
      placa: placa,
      tipo: tipo,
      marca: marca
    };
    jest.spyOn(mockVeiculosRepository,"findOne").mockImplementation(veiculo => Promise.resolve({id: idVeiculo, ...veiculo}));
    jest.spyOn(mockVeiculosRepository,"update").mockImplementation(() => {} );
    await service.update(idVeiculo, dto);
    expect(mockVeiculosRepository.update).toHaveBeenCalledWith(idVeiculo,{
      id: idVeiculo,
      modelo: modelo,
      cor: cor,
      placa: placa,
      tipo: tipo,
      marca: marca
    });
  })

  it('updateException', async() => {
    const dto = {
      modelo: modelo,
      cor: cor,
      placa: placa,
      tipo: tipo,
      marca: marca
    };
    jest.spyOn(mockVeiculosRepository,"findOne").mockImplementation(() => {return undefined});
    expect(service.update(idVeiculo, dto)).rejects.toThrow(new HttpException(`Veiculo com id ${idVeiculo} not found`, HttpStatus.BAD_REQUEST));

  })

  it('deleteException', async() => {
    jest.spyOn(mockVeiculosRepository,"delete").mockImplementation(veiculo => Promise.resolve({affected: false}));
    expect(service.remove(idVeiculo)).rejects.toThrow(new HttpException(`Veículo com id ${idVeiculo} não encontrado`, HttpStatus.BAD_REQUEST));

  })
});
