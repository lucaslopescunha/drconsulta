import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ControleVeiculosEntity } from 'src/db/entities/controle-veiculos.entity';
import { Between, Equal, FindOptionsWhere, IsNull, Repository } from 'typeorm';
import { ControleVeiculosDto, FindAllParameters, TipoRegistroEnum } from './controle.dto';
import { EstabelecimentoService } from 'src/estabelecimento/estabelecimento.service';
import { VeiculosService } from 'src/veiculos/veiculos.service';
import { TipoEnum } from 'src/veiculos/veiculo.dto';
import { EstabelecimentoEntity } from 'src/db/entities/estabelecimento.entity';
import { VeiculoEntity } from 'src/db/entities/veiculo.entity';
import { format } from 'date-fns';
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
        const dbControleVeiculos = controleRegistrado && controleRegistrado.id ? controleRegistrado : new ControleVeiculosEntity();

        if (!controleVeiculos.dtSaida && TipoRegistroEnum[controleVeiculos.tipo] == TipoRegistroEnum.S) {
            dbControleVeiculos.dtSaida = new Date();
        }
        const estabelecimentoEncontrado = await this.validarVagas(veiculoEncontrado, controleVeiculos.estabelecimento);
        dbControleVeiculos.estabelecimento = await this.estabelecimentoService.salvarEstabelecimento(estabelecimentoEncontrado);
        if (!dbControleVeiculos.veiculo) {
            dbControleVeiculos.veiculo = veiculoEncontrado;
        }
        const { id, dtEntrada, dtSaida, veiculo, estabelecimento } = await this.controleVeiculosRepository.save(dbControleVeiculos);

        return { id, dtEntrada, dtSaida, veiculo: veiculo.id, estabelecimento: estabelecimento.id, tipo: controleVeiculos.tipo };
    }

    async validarRegistros(controleRegistrado: ControleVeiculosEntity, controleRecebido: ControleVeiculosDto): Promise<VeiculoEntity | null> {
        var veiculoEncontrado = await this.veiculosService.findById(controleRecebido.veiculo);
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
                estabelecimento: { id: estabelecimento },
                dtSaida: IsNull()
            },
        });
        return controleVeiculosFound;
    }

    async findAll(params: FindAllParameters): Promise<ControleVeiculosDto[]> {
        const searchPrams: FindOptionsWhere<ControleVeiculosEntity> = {}

        if (params.dtInicio != null && params.dtFim != null && TipoRegistroEnum[params.tipoRelatorio] == TipoRegistroEnum.E) {
            searchPrams.dtEntrada = Between(params.dtInicio, 
            params.dtFim);
        }
        
        if (params.dtInicio != null && params.dtFim != null && TipoRegistroEnum[params.tipoRelatorio] == TipoRegistroEnum.S) {
            console.log("saida", params)
            searchPrams.dtSaida = Between(params.dtInicio, params.dtFim);
        }
        if (params.estabelecimento != null) {
            searchPrams.estabelecimento = Equal(params.estabelecimento);
        }
        console.log("parametros",searchPrams);
        const controleFound = await this.controleVeiculosRepository.find({
            relations: ['veiculo', 'estabelecimento'],

            where: searchPrams
        });
        return controleFound.map(controleEntity => this.mapEntityToDto(controleEntity));
    }


    private mapEntityToDto(controle: ControleVeiculosEntity): ControleVeiculosDto {
        console.log("controla", controle);
        const controleDto = new ControleVeiculosDto();
        controleDto.id = controle.id;
        controleDto.dtEntrada = controle.dtEntrada;
        controleDto.dtSaida = controle.dtSaida;
        controleDto.estabelecimento = controle.estabelecimento?.id;
        controleDto.veiculo = controle.veiculo?.id;
        return controleDto;

    }

}