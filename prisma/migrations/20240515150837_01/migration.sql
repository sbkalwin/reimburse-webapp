/*
  Warnings:

  - Added the required column `nama` to the `pegawai` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "team_nip_leader_key";

-- AlterTable
ALTER TABLE "pegawai" ADD COLUMN     "nama" TEXT NOT NULL;
