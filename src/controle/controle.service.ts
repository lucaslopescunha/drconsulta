import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ControleVeiculosEntity } from 'src/db/entities/controle-veiculos.entity';
import { Repository } from 'typeorm';
import { ControleVeiculosDto } from './controle.dto';
import { EstabelecimentoService } from 'src/estabelecimento/estabelecimento.service';
import { VeiculosService } from 'src/veiculos/veiculos.service';
import { TipoEnum } from 'src/veiculos/veiculo.dto';

@Injectable()
export class ControleService {

    constructor(@InjectRepository(ControleVeiculosEntity)
    private readonly controleVeiculosRepository: Repository<ControleVeiculosEntity>,
        private readonly estabelecimentoService: EstabelecimentoService,
        private readonly veiculosService: VeiculosService
    ) {
    }


    async create(controleVeiculos: ControleVeiculosDto): Promise<ControleVeiculosDto | null> {
        const estabelecimentoRegistrado = await this.findByVeiculoEstabelcimento(controleVeiculos.veiculo, controleVeiculos.estabelecimento);
        if (estabelecimentoRegistrado) {
            throw new ConflictException(`Estabelecimento ${estabelecimentoRegistrado.estabelecimento} já registrado.`)
        }
        const dbControleVeiculos = new ControleVeiculosEntity();
        dbControleVeiculos.dtSaida = controleVeiculos.dtSaida;
        var veiculoEncontrado = await this.veiculosService.findOneBy(controleVeiculos.veiculo);
        var estabelecimentoEncontrado = await this.estabelecimentoService.findById(controleVeiculos.estabelecimento);
        if (TipoEnum[veiculoEncontrado.tipo] === TipoEnum.C && estabelecimentoEncontrado.vagasRestantesCarro > 0) {
            estabelecimentoEncontrado.vagasRestantesCarro = !estabelecimentoEncontrado.vagasRestantesCarro ?
                estabelecimentoEncontrado.qtdeVagasCarro - 1 : (estabelecimentoEncontrado.vagasRestantesCarro - 1);
        } else if (TipoEnum[veiculoEncontrado.tipo] === TipoEnum.M && estabelecimentoEncontrado.vagasRestantesMoto > 0) {
            estabelecimentoEncontrado.vagasRestantesMoto = !estabelecimentoEncontrado.vagasRestantesMoto ?
                estabelecimentoEncontrado.qtdeVagasMoto - 1 : (estabelecimentoEncontrado.vagasRestantesMoto - 1);
        } else {
            throw new BadRequestException(`Não há vagas disponíveis para veículos ${veiculoEncontrado.tipo}`)
        }
        dbControleVeiculos.estabelecimento = await this.estabelecimentoService.salvarEstabelecimento(estabelecimentoEncontrado);
        dbControleVeiculos.veiculo = await this.veiculosService.findOneBy(controleVeiculos.veiculo);
        const { id, dtEntrada, dtSaida, veiculo, estabelecimento} = await this.controleVeiculosRepository.save(dbControleVeiculos);

        return { id, dtEntrada, dtSaida, veiculo: veiculo.id, estabelecimento: estabelecimento.id};
    }


    async findByVeiculoEstabelcimento(veiculo: number, estabelecimento: number): Promise<ControleVeiculosDto | null> {
        const controleVeiculosFound = await this.controleVeiculosRepository.findOneBy({
            veiculo: { id: veiculo },
            estabelecimento: { id: estabelecimento }
        });
        if (!controleVeiculosFound) {
            return null;
        }
        return {
            id: controleVeiculosFound.id,
            veiculo: controleVeiculosFound.veiculo.id,
            estabelecimento: controleVeiculosFound.estabelecimento.id,
            dtEntrada: controleVeiculosFound.dtEntrada,
            dtSaida: controleVeiculosFound.dtSaida
        }
    }

}
