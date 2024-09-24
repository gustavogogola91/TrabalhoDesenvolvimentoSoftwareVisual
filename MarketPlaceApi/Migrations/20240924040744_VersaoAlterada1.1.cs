using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MarketPlaceApi.Migrations
{
    /// <inheritdoc />
    public partial class VersaoAlterada11 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_ItemVenda_ProdutoId",
                table: "ItemVenda",
                column: "ProdutoId");

            migrationBuilder.AddForeignKey(
                name: "FK_ItemVenda_Produtos_ProdutoId",
                table: "ItemVenda",
                column: "ProdutoId",
                principalTable: "Produtos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItemVenda_Produtos_ProdutoId",
                table: "ItemVenda");

            migrationBuilder.DropIndex(
                name: "IX_ItemVenda_ProdutoId",
                table: "ItemVenda");
        }
    }
}
