import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddRolesToUsers1615386033212 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn("users", new TableColumn({
            name: "credencial",
            type: "enum",
            enum: [ 'Admin', 'AbrigoAdmin', 'Aluno'],
            default: "'Aluno'",
            isNullable: false
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropColumn("users", "credencial");

    }    

}
