import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateForumRespostas1606305831244 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:'forum_respostas',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment' 
                    },
                    {
                        name: 'corpo',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'perguntaId',
                        type: 'integer',
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
        await queryRunner.dropTable('forum_respostas')
    }

}
