/*
  Warnings:

  - You are about to drop the column `addressId` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `addressId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Inventory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qty` to the `ProductPrice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_productPriceId_fkey";

-- DropForeignKey
ALTER TABLE "Seller" DROP CONSTRAINT "Seller_addressId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_addressId_fkey";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProductPrice" ADD COLUMN     "qty" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Seller" DROP COLUMN "addressId",
ALTER COLUMN "phoneNumber" SET DATA TYPE DECIMAL(12,0);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "addressId",
ALTER COLUMN "phoneNumber" SET DATA TYPE DECIMAL(12,0);

-- DropTable
DROP TABLE "Inventory";

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
