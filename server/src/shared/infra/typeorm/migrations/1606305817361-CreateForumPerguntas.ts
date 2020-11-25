import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateForumPerguntas1606305817361 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:'forum_perguntas',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'titulo',
                        type: 'varchar',
                    },
                    {
                        name: 'corpo',
                        type: 'varchar',
                    },
                    {
                        name: 'status',
                        type: 'boolean',
                    },
                    {
                        name: 'userId',
                        type: 'varchar',
                    },
                    {
                        name: 'categoriaId',
                        type: 'varchar',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
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
