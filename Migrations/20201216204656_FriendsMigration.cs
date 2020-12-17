using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectC.Migrations
{
    public partial class FriendsMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FriendLists",
                columns: table => new
                {
                    FriendFromId = table.Column<int>(type: "integer", nullable: false),
                    FriendToId = table.Column<int>(type: "integer", nullable: false),
                    Id = table.Column<int>(type: "integer", nullable: false),
                    IsConfirmed = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FriendLists", x => new { x.FriendFromId, x.FriendToId });
                    table.ForeignKey(
                        name: "FK_FriendLists_Users_FriendFromId",
                        column: x => x.FriendFromId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_FriendLists_Users_FriendToId",
                        column: x => x.FriendToId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FriendLists_FriendToId",
                table: "FriendLists",
                column: "FriendToId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FriendLists");
        }
    }
}
