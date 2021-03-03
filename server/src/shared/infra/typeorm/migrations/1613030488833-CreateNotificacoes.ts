import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateNotificacoes1613030488833 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:'notificacoes',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment' 
                    },
                    {
                        name: 'conteudo',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'arquivada',
                        type: 'boolean',
                        default: false,
                        isNullable: true
                    },
                    {
                        name: 'tipo',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'userId',
                        type: 'integer',
                        isNullable: true
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('notificacoes')
    }

}
