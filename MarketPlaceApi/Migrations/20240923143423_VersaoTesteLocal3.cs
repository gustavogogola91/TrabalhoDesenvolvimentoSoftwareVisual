using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MarketPlaceApi.Migrations
{
    /// <inheritdoc />
    public partial class VersaoTesteLocal3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItemCarrinho_Carrinhos_CarrinhoId",
                table: "ItemCarrinho");

            migrationBuilder.AlterColumn<int>(
                name: "CarrinhoId",
                table: "ItemCarrinho",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ItemCarrinho_Carrinhos_CarrinhoId",
                table: "ItemCarrinho",
                column: "CarrinhoId",
                principalTable: "Carrinhos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItemCarrinho_Carrinhos_CarrinhoId",
                table: "ItemCarrinho");

            migrationBuilder.AlterColumn<int>(
                name: "CarrinhoId",
                table: "ItemCarrinho",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_ItemCarrinho_Carrinhos_CarrinhoId",
                table: "ItemCarrinho",
                column: "CarrinhoId",
                principalTable: "Carrinhos",
                principalColumn: "Id");
        }
    }
}
