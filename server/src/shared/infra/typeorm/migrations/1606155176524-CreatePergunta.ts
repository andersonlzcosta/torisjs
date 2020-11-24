import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePergunta1606155176524 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:'perguntas',
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
                        name: 'enunciado',
                        type: 'varchar',
                    },
                    {
                        name: 'alternativa1',
                        type: 'varchar',
                    },
                    {
                        name: 'alternativa2',
                        type: 'varchar',
                    },
                    {
                        name: 'alternativa3',
                        type: 'varchar',
                    },
                    {
                        name: 'alternativa4',
                        type: 'varchar',
                    },
                    {
                        name: 'resposta',
                        type: 'int',
                    },
                    {
                        name: 'justificativa',
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
        await queryRunner.dropTable('perguntas')
    }

}
