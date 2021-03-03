import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateForumPerguntas1606305817361 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:'forum_perguntas',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment' 
                    },
                    {
                        name: 'titulo',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'corpo',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'foiResolvido',
                        type: 'boolean',
                        default: false,
                        isNullable: true
                    },
                    {
                        name: 'userId',
                        type: 'integer',
                        isNullable: true
                    },
                    {
                        name: 'categoriaId',
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
        await queryRunner.dropTable('forum_perguntas')
    }

}
