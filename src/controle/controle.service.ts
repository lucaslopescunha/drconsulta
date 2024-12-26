import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ControleVeiculosEntity } from 'src/db/entities/controle-veiculos.entity';
import { FindOptionsWhere, IsNull, Repository } from 'typeorm';
import { ControleVeiculosDto, TipoRegistroEnum } from './controle.dto';
import { EstabelecimentoService } from 'src/estabelecimento/estabelecimento.service';
import { VeiculosService } from 'src/veiculos/veiculos.service';
import { TipoEnum } from 'src/veiculos/veiculo.dto';
import { EstabelecimentoEntity } from 'src/db/entities/estabelecimento.entity';
import { VeiculoEntity } from 'src/db/entities/veiculo.entity';

@Injectable()
export class ControleService {

    constructor(@InjectRepository(ControleVeiculosEntity)
    private readonly controleVeiculosRepository: Repository<ControleVeiculosEntity>,
        private readonly estabelecimentoService: EstabelecimentoService,
        private readonly veiculosService: VeiculosService
    ) {
    }


    async create(controleVeiculos: ControleVeiculosDto): Promise<ControleVeiculosDto | null> {
        const controleRegistrado = await this.findControleByVeiculoEstabelecimento(controleVeiculos.veiculo, controleVeiculos.estabelecimento);
        var veiculoEncontrado = await this.validarRegistros(controleRegistrado, controleVeiculos);
        const dbControleVeiculos = controleRegistrado.id ? controleRegistrado : new ControleVeiculosEntity();

        if(!controleVeiculos.dtSaida && TipoRegistroEnum[controleVeiculos.tipo] == TipoRegistroEnum.S) {
            dbControleVeiculos.dtSaida = new Date();
        }
        const estabelecimentoEncontrado = await this.validarVagas(veiculoEncontrado, controleVeiculos.estabelecimento);
        dbControleVeiculos.estabelecimento = await this.estabelecimentoService.salvarEstabelecimento(estabelecimentoEncontrado);
        if(!dbControleVeiculos.veiculo) {
            dbControleVeiculos.veiculo = veiculoEncontrado;
        }
        const { id, dtEntrada, dtSaida, veiculo, estabelecimento } = await this.controleVeiculosRepository.save(dbControleVeiculos);

        return { id, dtEntrada, dtSaida, veiculo: veiculo.id, estabelecimento: estabelecimento.id, tipo: controleVeiculos.tipo };
    }

    async validarRegistros(controleRegistrado: ControleVeiculosEntity, controleRecebido: ControleVeiculosDto): Promise<VeiculoEntity | null> {
        var veiculoEncontrado = await this.veiculosService.findOneBy(controleRecebido.veiculo);
        // Caso o registro seja de entrada
        if (controleRegistrado && TipoRegistroEnum[controleRecebido.tipo] == TipoRegistroEnum.E) {
            throw new ConflictException(`Veículo ${veiculoEncontrado.placa} não registrou saída `)
        }
        // caso o registro seja de saída
        if (!controleRegistrado && TipoRegistroEnum[controleRecebido.tipo] == TipoRegistroEnum.S) {
            throw new ConflictException(`Veículo  ${veiculoEncontrado.placa} não registrou entrada`)
        }
        return veiculoEncontrado;
    }

    async validarVagas(veiculo: VeiculoEntity, idEstabelecimento: number): Promise<EstabelecimentoEntity | null> {
        const estabelecimento = await this.estabelecimentoService.findById(idEstabelecimento);
        if (TipoEnum[veiculo.tipo] == TipoEnum.C && estabelecimento.vagasRestantesCarro > 0) {
            estabelecimento.vagasRestantesCarro = !estabelecimento.vagasRestantesCarro ?
            estabelecimento.qtdeVagasCarro - 1 : (estabelecimento.vagasRestantesCarro - 1);
        } else if (TipoEnum[veiculo.tipo] == TipoEnum.M && estabelecimento.vagasRestantesMoto > 0) {
            estabelecimento.vagasRestantesMoto = !estabelecimento.vagasRestantesMoto ?
            estabelecimento.qtdeVagasMoto - 1 : (estabelecimento.vagasRestantesMoto - 1);
        } else {
            throw new BadRequestException(`Não há vagas disponíveis para veículos ${TipoEnum[veiculo.tipo]}`)
        }
        return estabelecimento;
    }

    async findControleByVeiculoEstabelecimento(veiculo: number, estabelecimento: number): Promise<ControleVeiculosEntity | null> {

        const controleVeiculosFound = await this.controleVeiculosRepository.findOne({
            relations: ['veiculo', 'estabelecimento'], 
            where: {
                veiculo: { id: veiculo },
                estabelecimento: {id: estabelecimento},
                dtSaida: IsNull()
            },
        });
        return controleVeiculosFound;
    }

}
