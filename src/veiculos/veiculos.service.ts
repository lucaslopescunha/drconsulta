import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VeiculoEntity } from 'src/db/entities/veiculo.entity';
import { Equal, FindOptionsWhere, Like, Repository } from 'typeorm';
import { FindAllParameters, VeiculosDto } from './veiculo.dto';

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
            throw new ConflictException(`Estabelecimento ${veiculoRegistrado.placa} já registrado.`)
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

    async update(veiculoDto: VeiculosDto) {
        const veiculo = await this.repository.findOne({ where: { id: veiculoDto.id } });
        if (!veiculo) {
            throw new HttpException(`Veiculo com id ${veiculoDto.id} not found`, HttpStatus.BAD_REQUEST);
        }
        await this.repository.save(this.mapDtoToEntity(veiculoDto));
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
        const veiculoEncontrado = await this.repository.find({
            where: searchPrams
        });
        return veiculoEncontrado.map(veiculoEntity => this.mapEntityToDto(veiculoEntity))
    }

    async remove(id: number) {
        const veiculo = await this.repository.delete(id);
        if (!veiculo.affected) {
            throw new HttpException(`Veículo com id ${id} não encontrado`, HttpStatus.BAD_REQUEST);
        }
    }

    private mapEntityToDto(veiculoEntity: VeiculoEntity): VeiculosDto {
        return {
            id: veiculoEntity.id,
            cor: veiculoEntity.cor,
            marca: veiculoEntity.marca,
            modelo: veiculoEntity.modelo,
            placa: veiculoEntity.placa,
            tipo: veiculoEntity.tipo
        }
    }

    private mapDtoToEntity(veiculoDto: VeiculosDto): Partial<VeiculoEntity> {
        return {
            id: veiculoDto.id,
            cor: veiculoDto.cor,
            marca: veiculoDto.marca,
            modelo: veiculoDto.modelo,
            placa: veiculoDto.placa,
            tipo: veiculoDto.tipo
        }
    }

}
