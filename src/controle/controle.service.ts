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
        const estabelecimentoRegistrado = await this.findByVeiculoEstabelecimento(controleVeiculos.veiculo, controleVeiculos.estabelecimento);
        var veiculoEncontrado = await this.veiculosService.findOneBy(controleVeiculos.veiculo);
        if (estabelecimentoRegistrado && TipoRegistroEnum[controleVeiculos.tipo] == TipoRegistroEnum.E) {
            throw new ConflictException(`Veículo ${veiculoEncontrado.placa} não registrou saída `)
        }
        if (!estabelecimentoRegistrado && TipoRegistroEnum[controleVeiculos.tipo] == TipoRegistroEnum.S) {
            throw new ConflictException(`Veículo  ${veiculoEncontrado.placa} não registrou entrada`)
        }
        const dbControleVeiculos = new ControleVeiculosEntity();
        if(controleVeiculos.dtSaida && TipoRegistroEnum[controleVeiculos.tipo] == TipoRegistroEnum.S) {
            dbControleVeiculos.dtSaida = controleVeiculos.dtSaida;
        }
        const estabelecimentoEncontrado = await this.estabelecimentoService.findById(controleVeiculos.estabelecimento);
        if (TipoEnum[veiculoEncontrado.tipo] === TipoEnum.C && estabelecimentoEncontrado.vagasRestantesCarro > 0) {
            estabelecimentoEncontrado.vagasRestantesCarro = !estabelecimentoEncontrado.vagasRestantesCarro ?
                estabelecimentoEncontrado.qtdeVagasCarro - 1 : (estabelecimentoEncontrado.vagasRestantesCarro - 1);
        } else if (TipoEnum[veiculoEncontrado.tipo] === TipoEnum.M && estabelecimentoEncontrado.vagasRestantesMoto > 0) {
            estabelecimentoEncontrado.vagasRestantesMoto = !estabelecimentoEncontrado.vagasRestantesMoto ?
                estabelecimentoEncontrado.qtdeVagasMoto - 1 : (estabelecimentoEncontrado.vagasRestantesMoto - 1);
        } else {
            throw new BadRequestException(`Não há vagas disponíveis para veículos ${TipoEnum[veiculoEncontrado.tipo]}`)
        }
        dbControleVeiculos.estabelecimento = await this.estabelecimentoService.salvarEstabelecimento(estabelecimentoEncontrado);
        if(!dbControleVeiculos) {
            dbControleVeiculos.veiculo = veiculoEncontrado;
        }
        const { id, dtEntrada, dtSaida, veiculo, estabelecimento } = await this.controleVeiculosRepository.save(dbControleVeiculos);

        return { id, dtEntrada, dtSaida, veiculo: veiculo.id, estabelecimento: estabelecimento.id, tipo: controleVeiculos.tipo };
    }

    async vagasEstabelecimento(veiculo: VeiculoEntity, idEstabelecimento: number): Promise<EstabelecimentoEntity | null> {
        const estabelecimento = await this.estabelecimentoService.findById(idEstabelecimento);
        if (TipoEnum[veiculo.tipo] === TipoEnum.C && estabelecimento.vagasRestantesCarro > 0) {
            estabelecimento.vagasRestantesCarro = !estabelecimento.vagasRestantesCarro ?
            estabelecimento.qtdeVagasCarro - 1 : (estabelecimento.vagasRestantesCarro - 1);
        } else if (TipoEnum[veiculo.tipo] === TipoEnum.M && estabelecimento.vagasRestantesMoto > 0) {
            estabelecimento.vagasRestantesMoto = !estabelecimento.vagasRestantesMoto ?
            estabelecimento.qtdeVagasMoto - 1 : (estabelecimento.vagasRestantesMoto - 1);
        } else {
            throw new BadRequestException(`Não há vagas disponíveis para veículos ${TipoEnum[veiculo.tipo]}`)
        }
        return estabelecimento;
    }

    async findByVeiculoEstabelecimento(veiculo: number, estabelecimento: number): Promise<ControleVeiculosDto | null> {

        const controleVeiculosFound = await this.controleVeiculosRepository.findOne({
            relations: ['veiculo', 'estabelecimento'], 
            where: {
                veiculo: { id: veiculo },
                estabelecimento: {id: estabelecimento},
                dtSaida: IsNull()
            },
        });
        if (!controleVeiculosFound) {
            throw new BadRequestException("falha");
        }
        return {
            id: controleVeiculosFound.id,
            veiculo: controleVeiculosFound.veiculo.id,
            estabelecimento: controleVeiculosFound.estabelecimento.id,
            dtEntrada: controleVeiculosFound.dtEntrada,
            dtSaida: controleVeiculosFound.dtSaida,
            tipo: ""
        }
    }

}
