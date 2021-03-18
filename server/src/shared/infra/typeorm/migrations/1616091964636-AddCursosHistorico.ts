import {MigrationInterface, QueryRunner, Table, TableColumn} from "typeorm";

export class AddCursosHistorico1616091964636 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name:'curso_historicos',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment' 
                    },
                    {
                        name: 'userId',
                        type: 'integer',
                        isNullable: true
                    },
                    {
                        name: 'perguntaId',
                        type: 'integer',
                        isNullable: true
                    },
                    {
                        name: 'perguntaReposta',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'aulaId',
                        type: 'integer',
                        isNullable: true
                    },
                    {
                        name: 'aulaAssistida',
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

        await queryRunner.addColumn("forum_categorias", new TableColumn({
            name: "perguntas",
            type: "integer",
            isNullable: true
        }));

        await queryRunner.addColumn("modulo_perguntas", new TableColumn({
            name: "historicos",
            type: "integer",
            isNullable: true
        }));

        await queryRunner.addColumn("modulo_aulas", new TableColumn({
            name: "historicos",
            type: "integer",
            isNullable: true
        }));
                
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('curso_historicos')
        await queryRunner.dropColumn("forum_categorias", "perguntas");
        await queryRunner.dropColumn("forum_perguntas", "categoriaId");
        await queryRunner.dropColumn("modulo_perguntas", "historicos");
        await queryRunner.dropColumn("modulo_aulas", "historicos");
    }

}
