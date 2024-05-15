/*
  Warnings:

  - Changed the type of `jenis` on the `detail_pengembalian` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "detail_pengembalian" DROP COLUMN "jenis",
ADD COLUMN     "jenis" "ReimburseTypeEnum" NOT NULL;
