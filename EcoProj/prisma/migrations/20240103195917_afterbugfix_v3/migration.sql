/*
  Warnings:

  - The primary key for the `ProductAttribute` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ProductAttribute` table. All the data in the column will be lost.
  - You are about to drop the column `brandId` on the `ProductPrice` table. All the data in the column will be lost.
  - You are about to drop the column `colorId` on the `ProductPrice` table. All the data in the column will be lost.
  - You are about to drop the `Brand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Color` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductPrice" DROP CONSTRAINT "ProductPrice_brandId_fkey";

-- DropForeignKey
ALTER TABLE "ProductPrice" DROP CONSTRAINT "ProductPrice_colorId_fkey";

-- AlterTable
ALTER TABLE "Basket" ADD COLUMN     "finalOrderId" TEXT;

-- AlterTable
ALTER TABLE "ProductAttribute" DROP CONSTRAINT "ProductAttribute_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "ProductAttribute_pkey" PRIMARY KEY ("productId", "attributeId");

-- AlterTable
ALTER TABLE "ProductPrice" DROP COLUMN "brandId",
DROP COLUMN "colorId";

-- DropTable
DROP TABLE "Brand";

-- DropTable
DROP TABLE "Color";

-- AddForeignKey
ALTER TABLE "Basket" ADD CONSTRAINT "Basket_finalOrderId_fkey" FOREIGN KEY ("finalOrderId") REFERENCES "FinalOrders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
