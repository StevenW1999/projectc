using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectC.Migrations
{
    public partial class UpdatePLants : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
         migrationBuilder.AlterColumn<string>(
         name: "GrowthHeigth",
         table: "Plants",
         type: "text",
         nullable: true,
         oldClrType: typeof(int),
         oldType: "integer");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
            name: "GrowthHeigth",
            table: "Plants",
            type: "integer",
            nullable: false,
            defaultValue: false,
            oldClrType: typeof(string),
            oldType: "text",
            oldNullable: true);
        }
    }
}

