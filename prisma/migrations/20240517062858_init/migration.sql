/*
  Warnings:

  - Added the required column `deskripsi` to the `peralatan_kantor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "peralatan_kantor" ADD COLUMN     "deskripsi" TEXT NOT NULL;
