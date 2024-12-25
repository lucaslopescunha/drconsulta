import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstabelecimentoEntity } from 'src/db/entities/estabelecimento.entity';
import { Repository } from 'typeorm';
import { EstabelecimentoDto } from './estabelecimento.dto';

@Injectable()
export class EstabelecimentoService {
    
    constructor(        @InjectRepository(EstabelecimentoEntity)
            private readonly estabelecimentoRepository: Repository<EstabelecimentoEntity>
    ) {
    }


    async create(novoEstabelecimento: EstabelecimentoDto) {
        const estabelecimentoRegistrado = await this.findByCnpjNome(novoEstabelecimento.cnpj, novoEstabelecimento.nome);
        if(estabelecimentoRegistrado) {
            throw new ConflictException(`Estabelecimento ${novoEstabelecimento.nome} já registrado.`)            
        }
        const dbEstabelecimento = new EstabelecimentoEntity();
        dbEstabelecimento.cnpj = novoEstabelecimento.cnpj;
        dbEstabelecimento.nome = novoEstabelecimento.nome;
        dbEstabelecimento.endereco  = novoEstabelecimento.endereco;
        dbEstabelecimento.telefone = novoEstabelecimento.telefone;
        dbEstabelecimento.qtdeVagasCarro = novoEstabelecimento.qtdeVagasCarro;
        dbEstabelecimento.qtdeVagasMoto = novoEstabelecimento.qtdeVagasMoto;
        dbEstabelecimento.vagasRestantesCarro = novoEstabelecimento.qtdeVagasCarro;
        dbEstabelecimento.vagasRestantesMoto = novoEstabelecimento.qtdeVagasMoto;
        const {id, cnpj, nome, endereco, telefone, qtdeVagasCarro, qtdeVagasMoto} = await this.salvarEstabelecimento(dbEstabelecimento);
        return {id, cnpj, nome, endereco, telefone, qtdeVagasCarro, qtdeVagasMoto};
    }

    async salvarEstabelecimento(estabelecimento: EstabelecimentoEntity) {
        return await this.estabelecimentoRepository.save(estabelecimento);
    }
    
    async findByCnpjNome(cnpj: string, nome: string): Promise<EstabelecimentoDto | null> {
            const estabelecimentoFound = await this.estabelecimentoRepository.findOneBy( {
                cnpj: cnpj,
                nome: nome
            });
            if(!estabelecimentoFound) {
                return null;
            }
            return {
                id: estabelecimentoFound.id,
                cnpj: estabelecimentoFound.cnpj,
                nome: estabelecimentoFound.nome,
                endereco: estabelecimentoFound.endereco,
                telefone: estabelecimentoFound.telefone,
                qtdeVagasCarro: estabelecimentoFound.qtdeVagasCarro,
                qtdeVagasMoto: estabelecimentoFound.qtdeVagasMoto
            }
    }

    async findById(id: number): Promise<EstabelecimentoEntity | undefined> {
        return this.estabelecimentoRepository.findOneBy({ id: id }); 
    }

}
