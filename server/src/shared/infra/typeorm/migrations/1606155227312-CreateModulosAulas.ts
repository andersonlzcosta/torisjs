import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAulas1606155159742 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:'modulo_aulas',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'ordem',
                        type: 'int',
                    },
                    {
                        name: 'nome',
                        type: 'varchar',
                    },
                    {
                        name: 'video_url',
                        type: 'varchar',
                    },
                    {
                        name: 'duracao',
                        type: 'varchar',
                    },
                    {
                        name: 'moduloId',
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
        await queryRunner.dropTable('modulo_aulas')
    }

}
