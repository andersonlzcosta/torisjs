import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePergunta1606155176524 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:'modulo_perguntas',
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
                        name: 'enunciado',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'alternativa1',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'alternativa2',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'alternativa3',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'alternativa4',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'resposta',
                        type: 'int',
                        isNullable: true
                    },
                    {
                        name: 'justificativa',
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
        await queryRunner.dropTable('modulo_perguntas')
    }

}
