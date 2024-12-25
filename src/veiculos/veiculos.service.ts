import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VeiculoEntity } from 'src/db/entities/veiculo.entity';
import { Repository } from 'typeorm';
import { VeiculosDto } from './veiculo.dto';

@Injectable()
export class VeiculosService {
        private readonly users: VeiculosDto[] = []
    
        constructor(
            @InjectRepository(VeiculoEntity)
            private readonly veiculoRepository: Repository<VeiculoEntity>
        ) {
    
        }


    async create(novoVeiculo: VeiculosDto) {
        const veiculoRegistrado = await this.findByPlaca(novoVeiculo.placa);
        if(veiculoRegistrado) {
            throw new ConflictException(`Estabelecimento ${veiculoRegistrado.placa} já registrado.`)            
        }
        const dbVeiculo = new VeiculoEntity();
        dbVeiculo.modelo = novoVeiculo.modelo;
        dbVeiculo.cor = novoVeiculo.cor;
        dbVeiculo.placa  = novoVeiculo.placa;
        dbVeiculo.tipo = novoVeiculo.tipo;
        dbVeiculo.marca = novoVeiculo.marca;
        const {id, modelo, cor , placa, tipo, marca} = await this.veiculoRepository.save(dbVeiculo);
        return {id, modelo, cor , placa, tipo, marca};
    }

    
    async findByPlaca(placa: string): Promise<VeiculosDto | null> {
            const veiculoEncontrado = await this.veiculoRepository.findOneBy( {
                placa: placa
            });
            if(!veiculoEncontrado) {
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


        async findOneBy(id: number): Promise<VeiculoEntity> {
            return this.veiculoRepository.findOneBy({id: id});
        }
}
