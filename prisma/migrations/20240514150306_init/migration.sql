/*
  Warnings:

  - You are about to drop the column `fileUrl` on the `detail_pengembalian` table. All the data in the column will be lost.
  - You are about to drop the column `pengembalianId` on the `detail_pengembalian` table. All the data in the column will be lost.
  - You are about to drop the column `peralatanKantorId` on the `detail_pengembalian` table. All the data in the column will be lost.
  - You are about to drop the column `tanggalDibuat` on the `detail_pengembalian` table. All the data in the column will be lost.
  - You are about to drop the column `tanggalDiubah` on the `detail_pengembalian` table. All the data in the column will be lost.
  - You are about to drop the column `tanggalDibuat` on the `kas` table. All the data in the column will be lost.
  - You are about to drop the column `tanggalDiubah` on the `kas` table. All the data in the column will be lost.
  - You are about to drop the column `kasId` on the `kas_detail` table. All the data in the column will be lost.
  - You are about to drop the column `pengembalianId` on the `kas_detail` table. All the data in the column will be lost.
  - You are about to drop the column `tanggalDibuat` on the `kas_detail` table. All the data in the column will be lost.
  - You are about to drop the column `tanggalDiubah` on the `kas_detail` table. All the data in the column will be lost.
  - You are about to drop the column `kataSandi` on the `pegawai` table. All the data in the column will be lost.
  - You are about to drop the column `nomorRekening` on the `pegawai` table. All the data in the column will be lost.
  - You are about to drop the column `tanggalDibuat` on the `pegawai` table. All the data in the column will be lost.
  - You are about to drop the column `tanggalDiubah` on the `pegawai` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `pegawai` table. All the data in the column will be lost.
  - You are about to drop the column `deskripsiPenolakan` on the `pengembalian` table. All the data in the column will be lost.
  - You are about to drop the column `nipPemohon` on the `pengembalian` table. All the data in the column will be lost.
  - You are about to drop the column `nipPic` on the `pengembalian` table. All the data in the column will be lost.
  - You are about to drop the column `perjalananId` on the `pengembalian` table. All the data in the column will be lost.
  - You are about to drop the column `tanggalDibuat` on the `pengembalian` table. All the data in the column will be lost.
  - You are about to drop the column `tanggalDiubah` on the `pengembalian` table. All the data in the column will be lost.
  - You are about to drop the column `tanggalPelunasan` on the `pengembalian` table. All the data in the column will be lost.
  - You are about to drop the column `tanggalPenolakan` on the `pengembalian` table. All the data in the column will be lost.
  - You are about to drop the column `totalPelunasan` on the `pengembalian` table. All the data in the column will be lost.
  - You are about to drop the column `fileUrl` on the `peralatan_kantor` table. All the data in the column will be lost.
  - You are about to drop the column `tanggalDibuat` on the `peralatan_kantor` table. All the data in the column will be lost.
  - You are about to drop the column `tanggalDiubah` on the `peralatan_kantor` table. All the data in the column will be lost.
  - You are about to drop the column `tanggalDibuat` on the `perjalanan` table. All the data in the column will be lost.
  - You are about to drop the column `tanggalDiubah` on the `perjalanan` table. All the data in the column will be lost.
  - You are about to drop the column `tanggalMulai` on the `perjalanan` table. All the data in the column will be lost.
  - You are about to drop the column `tanggalSelesai` on the `perjalanan` table. All the data in the column will be lost.
  - You are about to drop the column `nipLeader` on the `team` table. All the data in the column will be lost.
  - You are about to drop the column `tanggalDibuat` on the `team` table. All the data in the column will be lost.
  - You are about to drop the column `tanggalDiubah` on the `team` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nip_leader]` on the table `team` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `file_url` to the `detail_pengembalian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pengembalian_id` to the `detail_pengembalian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal_diubah` to the `detail_pengembalian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal_diubah` to the `kas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kas_id` to the `kas_detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal_diubah` to the `kas_detail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kata_sandi` to the `pegawai` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomor_rekening` to the `pegawai` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal_diubah` to the `pegawai` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team_id` to the `pegawai` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nip_pemohon` to the `pengembalian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nip_pic` to the `pengembalian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal_diubah` to the `pengembalian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file_url` to the `peralatan_kantor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal_diubah` to the `peralatan_kantor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal_diubah` to the `perjalanan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal_selesai` to the `perjalanan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal_diubah` to the `team` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "detail_pengembalian_pengembalianId_idx";

-- DropIndex
DROP INDEX "detail_pengembalian_peralatanKantorId_idx";

-- DropIndex
DROP INDEX "kas_detail_kasId_idx";

-- DropIndex
DROP INDEX "kas_detail_pengembalianId_idx";

-- DropIndex
DROP INDEX "pegawai_teamId_idx";

-- DropIndex
DROP INDEX "pengembalian_nipPemohon_idx";

-- DropIndex
DROP INDEX "pengembalian_nipPic_idx";

-- DropIndex
DROP INDEX "pengembalian_perjalananId_idx";

-- DropIndex
DROP INDEX "team_nipLeader_key";

-- AlterTable
ALTER TABLE "detail_pengembalian" DROP COLUMN "fileUrl",
DROP COLUMN "pengembalianId",
DROP COLUMN "peralatanKantorId",
DROP COLUMN "tanggalDibuat",
DROP COLUMN "tanggalDiubah",
ADD COLUMN     "file_url" TEXT NOT NULL,
ADD COLUMN     "pengembalian_id" TEXT NOT NULL,
ADD COLUMN     "pengembalian_kantor_id" TEXT,
ADD COLUMN     "tanggal_dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tanggal_diubah" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "kas" DROP COLUMN "tanggalDibuat",
DROP COLUMN "tanggalDiubah",
ADD COLUMN     "tanggal_dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tanggal_diubah" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "kas_detail" DROP COLUMN "kasId",
DROP COLUMN "pengembalianId",
DROP COLUMN "tanggalDibuat",
DROP COLUMN "tanggalDiubah",
ADD COLUMN     "kas_id" TEXT NOT NULL,
ADD COLUMN     "pengembalian_id" TEXT,
ADD COLUMN     "tanggal_dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tanggal_diubah" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "pegawai" DROP COLUMN "kataSandi",
DROP COLUMN "nomorRekening",
DROP COLUMN "tanggalDibuat",
DROP COLUMN "tanggalDiubah",
DROP COLUMN "teamId",
ADD COLUMN     "kata_sandi" TEXT NOT NULL,
ADD COLUMN     "nomor_rekening" TEXT NOT NULL,
ADD COLUMN     "tanggal_dibuat" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tanggal_diubah" TIMESTAMPTZ NOT NULL,
ADD COLUMN     "team_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pengembalian" DROP COLUMN "deskripsiPenolakan",
DROP COLUMN "nipPemohon",
DROP COLUMN "nipPic",
DROP COLUMN "perjalananId",
DROP COLUMN "tanggalDibuat",
DROP COLUMN "tanggalDiubah",
DROP COLUMN "tanggalPelunasan",
DROP COLUMN "tanggalPenolakan",
DROP COLUMN "totalPelunasan",
ADD COLUMN     "deskripsi_penolakan" TEXT,
ADD COLUMN     "nip_pemohon" TEXT NOT NULL,
ADD COLUMN     "nip_pic" TEXT NOT NULL,
ADD COLUMN     "perjalanan_id" TEXT,
ADD COLUMN     "tanggal_dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tanggal_diubah" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tanggal_pelunasan" TIMESTAMP(3),
ADD COLUMN     "tanggal_penolakan" TIMESTAMP(3),
ADD COLUMN     "total_pelunasan" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "peralatan_kantor" DROP COLUMN "fileUrl",
DROP COLUMN "tanggalDibuat",
DROP COLUMN "tanggalDiubah",
ADD COLUMN     "file_url" TEXT NOT NULL,
ADD COLUMN     "tanggal_dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tanggal_diubah" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "perjalanan" DROP COLUMN "tanggalDibuat",
DROP COLUMN "tanggalDiubah",
DROP COLUMN "tanggalMulai",
DROP COLUMN "tanggalSelesai",
ADD COLUMN     "tanggal_dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tanggal_diubah" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tanggal_mulai" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tanggal_selesai" TIMESTAMPTZ NOT NULL;

-- AlterTable
ALTER TABLE "team" DROP COLUMN "nipLeader",
DROP COLUMN "tanggalDibuat",
DROP COLUMN "tanggalDiubah",
ADD COLUMN     "nip_leader" TEXT,
ADD COLUMN     "tanggal_dibuat" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tanggal_diubah" TIMESTAMPTZ NOT NULL;

-- CreateIndex
CREATE INDEX "detail_pengembalian_pengembalian_kantor_id_idx" ON "detail_pengembalian"("pengembalian_kantor_id");

-- CreateIndex
CREATE INDEX "detail_pengembalian_pengembalian_id_idx" ON "detail_pengembalian"("pengembalian_id");

-- CreateIndex
CREATE INDEX "kas_detail_kas_id_idx" ON "kas_detail"("kas_id");

-- CreateIndex
CREATE INDEX "kas_detail_pengembalian_id_idx" ON "kas_detail"("pengembalian_id");

-- CreateIndex
CREATE INDEX "pegawai_team_id_idx" ON "pegawai"("team_id");

-- CreateIndex
CREATE INDEX "pengembalian_nip_pemohon_idx" ON "pengembalian"("nip_pemohon");

-- CreateIndex
CREATE INDEX "pengembalian_nip_pic_idx" ON "pengembalian"("nip_pic");

-- CreateIndex
CREATE INDEX "pengembalian_perjalanan_id_idx" ON "pengembalian"("perjalanan_id");

-- CreateIndex
CREATE UNIQUE INDEX "team_nip_leader_key" ON "team"("nip_leader");
