import {MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpdateAbrigosAToClientsSpecs1614384545517 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropColumn("users", "idade");

        await queryRunner.addColumn("users", new TableColumn({
            name: "nascimento",
            type: "date",
            isNullable: true
        }));

        await queryRunner.addColumn("users", new TableColumn({
            name: "emailAlternativo",
            type: "varchar",
            isNullable: true
        }));

        await queryRunner.addColumn("users", new TableColumn({
            name: "cargo",
            type: "varchar",
            isNullable: true
        }));

        await queryRunner.addColumn("users", new TableColumn({
            name: "telefone1",
            type: "varchar",
            isNullable: true
        }));

        await queryRunner.addColumn("users", new TableColumn({
            name: "telefone2",
            type: "varchar",
            isNullable: true
        }));

        await queryRunner.addColumn("users", new TableColumn({
            name: "abrigoId",
            type: "integer",
            isNullable: true
        }));


        await queryRunner.addColumn("users", new TableColumn({
            name: "notificacoes",
            type: "integer",
            isNullable: true
        }));


        await queryRunner.addColumn("abrigos", new TableColumn({
            name: "telefone1",
            type: "varchar",
            isNullable: true
        }));

        await queryRunner.addColumn("abrigos", new TableColumn({
            name: "telefone2",
            type: "varchar",
            isNullable: true
        }));

        await queryRunner.addColumn("abrigos", new TableColumn({
            name: "email1",
            type: "varchar",
            isNullable: true
        }));

        await queryRunner.addColumn("abrigos", new TableColumn({
            name: "email2",
            type: "varchar",
            isNullable: true
        }));

        await queryRunner.addColumn("abrigos", new TableColumn({
            name: "bairro",
            type: "varchar",
            isNullable: true
        }));

        await queryRunner.addColumn("abrigos", new TableColumn({
            name: "cidade",
            type: "varchar",
            isNullable: true
        }));

        await queryRunner.addColumn("abrigos", new TableColumn({
            name: "estado",
            type: "varchar",
            isNullable: true
        }));
        
        await queryRunner.addColumn("abrigos", new TableColumn({
            name: "lgbt",
            type: "boolean",
            default: false,
            isNullable: true
        }));
        
        await queryRunner.addColumn("abrigos", new TableColumn({
            name: "genero",
            type: "varchar",
            isNullable: true
        }));
        
        await queryRunner.addColumn("abrigos", new TableColumn({
            name: "pcd",
            type: "boolean",
            default: false,
            isNullable: true
        }));
        
        await queryRunner.addColumn("abrigos", new TableColumn({
            name: "observacao",
            type: "varchar",
            isNullable: true
        }));
        
        await queryRunner.addColumn("abrigos", new TableColumn({
            name: "profissionais",
            type: "integer",
            isNullable: true
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn("users", new TableColumn({
            name: "idade",
            type: "varchar",
            isNullable: true
        }));
        await queryRunner.dropColumn("users", "nascimento");
        await queryRunner.dropColumn("users", "emailAlternativo");
        await queryRunner.dropColumn("users", "cargo");
        await queryRunner.dropColumn("users", "telefone1");
        await queryRunner.dropColumn("users", "telefone2");
        await queryRunner.dropColumn("users", "abrigoId");
        await queryRunner.dropColumn("users", "notificacoes");

        await queryRunner.dropColumn("abrigos", "telefone1");
        await queryRunner.dropColumn("abrigos", "telefone2");
        await queryRunner.dropColumn("abrigos", "email");
        await queryRunner.dropColumn("abrigos", "email2");
        await queryRunner.dropColumn("abrigos", "bairro");
        await queryRunner.dropColumn("abrigos", "cidade");
        await queryRunner.dropColumn("abrigos", "estado");
        await queryRunner.dropColumn("abrigos", "capacidade");
        await queryRunner.dropColumn("abrigos", "lgbt");
        await queryRunner.dropColumn("abrigos", "genero");
        await queryRunner.dropColumn("abrigos", "pcd");
        await queryRunner.dropColumn("abrigos", "observacao");
        await queryRunner.dropColumn("abrigos", "profissionais");
    }

}
