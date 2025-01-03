import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, FindOptionsWhere, Like, Repository, UpdateResult } from 'typeorm';
import { FindAllParameters, VeiculosDto } from './veiculo.dto';
import { VeiculoEntity } from '../db/entities/veiculo.entity';

@Injectable()
export class VeiculosService {
    private readonly users: VeiculosDto[] = []

    constructor(
        @InjectRepository(VeiculoEntity)
        private readonly repository: Repository<VeiculoEntity>
    ) {

    }


    async create(novoVeiculo: VeiculosDto): Promise<VeiculosDto> {
        const veiculoRegistrado = await this.findByPlaca(novoVeiculo.placa);
        if (veiculoRegistrado) {
            throw new ConflictException(`Veiculo ${veiculoRegistrado.placa} já registrado.`)
        }
        const dbVeiculo: VeiculoEntity = {
            modelo: novoVeiculo.modelo,
            cor: novoVeiculo.cor,
            placa: novoVeiculo.placa,
            tipo: novoVeiculo.tipo,
            marca: novoVeiculo.marca
        }
        const { id, modelo, cor, placa, tipo, marca } = await this.repository.save(dbVeiculo);
        return { id, modelo, cor, placa, tipo, marca };
    }

    async update(idVeiculo: number, veiculoDto: VeiculosDto) {
        const veiculo = await this.repository.findOne({ where: { id: idVeiculo } });
        if (!veiculo) {
            throw new HttpException(`Veiculo com id ${idVeiculo} not found`, HttpStatus.BAD_REQUEST);
        }
        await this.repository.update(idVeiculo, this.mapDtoToEntity(idVeiculo, veiculoDto));
        
    }

    async findByPlaca(placa: string): Promise<VeiculosDto | null> {
        const veiculoEncontrado = await this.repository.findOneBy({
            placa: placa
        });
        if (!veiculoEncontrado) {
            return null;
        }
        return {
            id: veiculoEncontrado.id,
            modelo: veiculoEncontrado.modelo,
            cor: veiculoEncontrado.cor,
            placa: veiculoEncontrado.placa,
            tipo: veiculoEncontrado.tipo,
            marca: veiculoEncontrado.marca
        }
    }


    async findById(id: number): Promise<VeiculosDto> {
        const veiculo = await this.repository.findOne({ where: { id } });
        if (!veiculo) {
            throw new HttpException(`Veiculo com id ${id} não encontrado`, HttpStatus.NOT_FOUND);
        }
        return this.mapEntityToDto(veiculo);
    }

    async findAll(params: FindAllParameters): Promise<VeiculosDto[]> {
        const searchPrams: FindOptionsWhere<VeiculoEntity> = {}
        if (params.modelo) {
            searchPrams.modelo = Like(`%${params.modelo}%`);
        }
        if (params.placa) {
            searchPrams.placa = Like(`%${params.placa}%`);
        }
        if (params.tipo) {
            searchPrams.tipo = Equal(`${params.tipo}`);
        }
        const veiculosEncontrado = await this.repository.find({
            where: searchPrams
        });
        if(veiculosEncontrado.length === 0) {
            console.log("veiculo não encontrado", veiculosEncontrado);
        }
        return veiculosEncontrado.map(veiculoEntity => this.mapEntityToDto(veiculoEntity))
    }

    async remove(id: number) {
        const veiculo = await this.repository.delete(id);
        if (!veiculo.affected) {
            throw new HttpException(`Veículo com id ${id} não encontrado`, HttpStatus.BAD_REQUEST);
        }
    }

    private mapEntityToDto(veiculoEntity: VeiculoEntity): VeiculosDto {
        console.log(veiculoEntity);
        return {
            id: veiculoEntity.id,
            cor: veiculoEntity.cor,
            marca: veiculoEntity.marca,
            modelo: veiculoEntity.modelo,
            placa: veiculoEntity.placa,
            tipo: veiculoEntity.tipo
        }
    }

    private mapDtoToEntity(idVeiculo: number, veiculoDto: VeiculosDto): VeiculoEntity {
        return  {
            id: idVeiculo,
            cor: veiculoDto.cor,
            marca: veiculoDto.marca,
            modelo: veiculoDto.modelo,
            placa: veiculoDto.placa,
            tipo: veiculoDto.tipo
        };
    }

}
