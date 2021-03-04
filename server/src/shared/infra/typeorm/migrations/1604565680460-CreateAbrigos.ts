import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAbrigos1604565680460 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:'abrigos',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment' 
                    },
                    {
                        name: 'nome',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'endereco',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'classificacao',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'capacidade',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'faixaEtaria',
                        type: 'varchar',
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
        await queryRunner.dropTable('abrigos')
    }

}
