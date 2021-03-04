import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAulas1606155159742 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:'modulo_aulas',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment' 
                    },
                    {
                        name: 'ordem',
                        type: 'int',
                        isNullable: true
                    },
                    {
                        name: 'nome',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'descricao',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'video_url',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'duracao',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'moduloId',
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
        await queryRunner.dropTable('modulo_aulas')
    }

}
