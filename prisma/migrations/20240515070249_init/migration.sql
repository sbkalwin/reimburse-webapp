/*
  Warnings:

  - You are about to drop the column `nama` on the `pengembalian` table. All the data in the column will be lost.
  - Added the required column `deskripsi` to the `pengembalian` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pengembalian" DROP COLUMN "nama",
ADD COLUMN     "deskripsi" TEXT NOT NULL;
