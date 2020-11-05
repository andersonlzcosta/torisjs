import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAbrigos1604565680460 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:'abrigos',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'nome',
                        type: 'varchar',
                    },
                    {
                        name: 'endereco',
                        type: 'varchar',
                    },
                    {
                        name: 'classificacao',
                        type: 'varchar',
                    },
                    {
                        name: 'capacidade',
                        type: 'varchar',
                    },
                    {
                        name: 'faixaEtaria',
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
        await queryRunner.dropTable('abrigos')
    }

}
