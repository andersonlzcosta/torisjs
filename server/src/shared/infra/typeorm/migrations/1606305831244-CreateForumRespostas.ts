import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateForumRespostas1606305831244 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:'forum_respostas',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'corpo',
                        type: 'varchar',
                    },
                    {
                        name: 'perguntaId',
                        type: 'varchar',
                    },
                    {
                        name: 'userId',
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
        await queryRunner.dropTable('forum_respostas')
    }

}
