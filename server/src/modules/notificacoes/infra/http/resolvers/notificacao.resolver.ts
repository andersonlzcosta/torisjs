import { Resolver, Query, Mutation, Field, ObjectType, Arg } from "type-graphql";
import { container } from "tsyringe";

import Notificacao from '../../typeorm/entities/Notificacao';
import CreateNotificacaoService from '../../../services/CreateNotificacaoService';
import UpdateNotificacaoService from '../../../services/UpdateNotificacaoService';

import NotificacoesRepository from "../../typeorm/repositories/NotificacoesRepository";
import { getCustomRepository } from "typeorm";

import { CriarNotificacaoInput } from "./CreateNotificacaoInput";
import { AtualizarNotificacaoInput } from "./UpdateNotificacaoInput";

@ObjectType()
class NotificacaoResponse {  
    @Field(() => Notificacao, { nullable: true })
    notificacao?: Notificacao;

    // @Field(() => AppError, { nullable: true })
    // error?: AppError;
}

@Resolver()
export class NotificacaoResolver {

    @Mutation(() => NotificacaoResponse)
    async criarNotificacao(
        @Arg("options") options: CriarNotificacaoInput
      ): Promise<NotificacaoResponse> {

        const createNotificacao = container.resolve(CreateNotificacaoService);
        const notificacao = await createNotificacao.execute(options);
        return { notificacao };
 
    }

    @Mutation(() => NotificacaoResponse)
    async updateNotificacao(
        @Arg("options") options: AtualizarNotificacaoInput
    ): Promise<NotificacaoResponse> {

        const updateNotificacao = container.resolve(UpdateNotificacaoService);
        const notificacao = await updateNotificacao.execute(options);
        return { notificacao };

    }
 
    @Query(() => NotificacaoResponse)
    async verNotificacao(
        @Arg("id") id: string
    ): Promise<NotificacaoResponse> {

        const notificacoesRepository = getCustomRepository(NotificacoesRepository);
        const notificacao = await notificacoesRepository.findById(id);
        return { notificacao };
        
    }
 
    @Query(() => [Notificacao])
    async verNotificacoes(): Promise<Notificacao[]> {

        const notificacoesRepository = getCustomRepository(NotificacoesRepository);
        const notificacoes = await notificacoesRepository.findAll();
        return notificacoes;
        
    }
}