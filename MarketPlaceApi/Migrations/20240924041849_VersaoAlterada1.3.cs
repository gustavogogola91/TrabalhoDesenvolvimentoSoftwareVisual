using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MarketPlaceApi.Migrations
{
    /// <inheritdoc />
    public partial class VersaoAlterada13 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItemVenda_Vendas_VendaId",
                table: "ItemVenda");

            migrationBuilder.DropForeignKey(
                name: "FK_Produtos_Vendas_VendaId",
                table: "Produtos");

            migrationBuilder.DropIndex(
                name: "IX_Produtos_VendaId",
                table: "Produtos");

            migrationBuilder.DropColumn(
                name: "VendaId",
                table: "Produtos");

            migrationBuilder.AddForeignKey(
                name: "FK_ItemVenda_Vendas_VendaId",
                table: "ItemVenda",
                column: "VendaId",
                principalTable: "Vendas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItemVenda_Vendas_VendaId",
                table: "ItemVenda");

            migrationBuilder.AddColumn<int>(
                name: "VendaId",
                table: "Produtos",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Produtos_VendaId",
                table: "Produtos",
                column: "VendaId");

            migrationBuilder.AddForeignKey(
                name: "FK_ItemVenda_Vendas_VendaId",
                table: "ItemVenda",
                column: "VendaId",
                principalTable: "Vendas",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Produtos_Vendas_VendaId",
                table: "Produtos",
                column: "VendaId",
                principalTable: "Vendas",
                principalColumn: "Id");
        }
    }
}
