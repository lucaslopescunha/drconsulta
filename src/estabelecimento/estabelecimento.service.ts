import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstabelecimentoEntity } from 'src/db/entities/estabelecimento.entity';
import { Equal, FindOptionsWhere, IsNull, Like, Repository } from 'typeorm';
import { EstabelecimentoDto, FindAllParameters } from './estabelecimento.dto';
import { ControleVeiculosEntity } from 'src/db/entities/controle-veiculos.entity';

@Injectable()
export class EstabelecimentoService {

    constructor(@InjectRepository(EstabelecimentoEntity)
    private readonly estabelecimentoRepository: Repository<EstabelecimentoEntity>
    ) {
    }


    async create(novoEstabelecimento: EstabelecimentoDto): Promise<EstabelecimentoDto> {
        const estabelecimentoRegistrado = await this.findByCnpjNome(novoEstabelecimento.cnpj, novoEstabelecimento.nome);
        if (estabelecimentoRegistrado) {
            throw new ConflictException(`Estabelecimento ${novoEstabelecimento.nome} já registrado.`)
        }
        const dbEstabelecimento = this.mapDtoToEntity(novoEstabelecimento, null);
        const { id, cnpj, nome, endereco, telefone, qtdeVagasCarro, qtdeVagasMoto } = await this.salvarEstabelecimento(dbEstabelecimento);
        return { id, cnpj, nome, endereco, telefone, qtdeVagasCarro, qtdeVagasMoto };
    }

    async update(estabelecimento: EstabelecimentoDto): Promise<EstabelecimentoDto> {
        const estabelecimentoRegistrado = await this.findById(estabelecimento.id);
        if (!estabelecimentoRegistrado) {
            throw new ConflictException(`Estabelecimento ${estabelecimento.nome} não existe.`)
        }
        const dbEstabelecimento = this.mapDtoToEntity(estabelecimento, estabelecimentoRegistrado.controles);
        const { id, cnpj, nome, endereco, telefone, qtdeVagasCarro, qtdeVagasMoto } = await this.salvarEstabelecimento(dbEstabelecimento);
        return { id, cnpj, nome, endereco, telefone, qtdeVagasCarro, qtdeVagasMoto };
    }

    async remove(id: number) {
        const estabelecimento = await this.estabelecimentoRepository.delete(id);
        if (!estabelecimento.affected) {
            throw new HttpException(`Veículo com id ${id} não encontrado`, HttpStatus.BAD_REQUEST);
        }

    }

    async salvarEstabelecimento(estabelecimento: EstabelecimentoEntity) {
        return await this.estabelecimentoRepository.save(estabelecimento);
    }

    async findAll(params: FindAllParameters): Promise<EstabelecimentoDto[]> {
        const searchPrams: FindOptionsWhere<EstabelecimentoEntity> = {}

        if (params.cnpj) {
            searchPrams.cnpj = Equal(`${params.cnpj}`);
        }

        if (params.nome) {
            searchPrams.nome = Like(`%${params.nome}%`);
        }

        const tasksFound = await this.estabelecimentoRepository.find({
            where: searchPrams
        });


        return tasksFound.map(taskEntity => this.mapEntityToDto(taskEntity));
    }

    async findByCnpjNome(cnpj: string, nome: string): Promise<EstabelecimentoDto | null> {
        const estabelecimentoFound = await this.estabelecimentoRepository.findOneBy({
            cnpj: cnpj,
            nome: nome
        });
        if (!estabelecimentoFound) {
            return null;
        }
        return this.mapEntityToDto(estabelecimentoFound)
    }

    async findById(id: number): Promise<EstabelecimentoEntity | undefined> {
        return this.estabelecimentoRepository.findOneBy({ id: id });
    }

    private mapEntityToDto(estabelecimento: EstabelecimentoEntity): EstabelecimentoDto {
        return {
            id: estabelecimento.id,
            cnpj: estabelecimento.cnpj,
            nome: estabelecimento.nome,
            endereco: estabelecimento.endereco,
            telefone: estabelecimento.telefone,
            qtdeVagasCarro: estabelecimento.qtdeVagasCarro,
            qtdeVagasMoto: estabelecimento.qtdeVagasMoto
        }
    }

    private mapDtoToEntity(estabelecimentoDto: EstabelecimentoDto, controles: ControleVeiculosEntity[]): EstabelecimentoEntity {
        return {
            cnpj: estabelecimentoDto.cnpj,
            nome: estabelecimentoDto.nome,
            endereco: estabelecimentoDto.endereco,
            telefone: estabelecimentoDto.telefone,
            qtdeVagasCarro: estabelecimentoDto.qtdeVagasCarro,
            qtdeVagasMoto: estabelecimentoDto.qtdeVagasMoto,
            vagasRestantesCarro: estabelecimentoDto.qtdeVagasCarro,
            vagasRestantesMoto: estabelecimentoDto.qtdeVagasMoto,
            id: estabelecimentoDto.id,
            controles: controles
        }
    }

}
