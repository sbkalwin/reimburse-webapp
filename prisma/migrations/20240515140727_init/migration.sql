/*
  Warnings:

  - Changed the type of `jenis` on the `kas_detail` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "kas_detail" DROP COLUMN "jenis",
ADD COLUMN     "jenis" "AccountDetailTypeEnum" NOT NULL;
