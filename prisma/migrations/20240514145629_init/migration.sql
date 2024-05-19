/*
  Warnings:

  - You are about to drop the `DetailPengembalian` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Kas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `KasDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pegawai` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pengembalian` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PeralatanKantor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Perjalanan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DetailPengembalian" DROP CONSTRAINT "DetailPengembalian_pengembalianId_fkey";

-- DropForeignKey
ALTER TABLE "DetailPengembalian" DROP CONSTRAINT "DetailPengembalian_peralatanKantorId_fkey";

-- DropForeignKey
ALTER TABLE "KasDetail" DROP CONSTRAINT "KasDetail_kasId_fkey";

-- DropForeignKey
ALTER TABLE "KasDetail" DROP CONSTRAINT "KasDetail_pengembalianId_fkey";

-- DropForeignKey
ALTER TABLE "Pegawai" DROP CONSTRAINT "Pegawai_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Pengembalian" DROP CONSTRAINT "Pengembalian_nipPemohon_fkey";

-- DropForeignKey
ALTER TABLE "Pengembalian" DROP CONSTRAINT "Pengembalian_nipPic_fkey";

-- DropForeignKey
ALTER TABLE "Pengembalian" DROP CONSTRAINT "Pengembalian_perjalananId_fkey";

-- DropTable
DROP TABLE "DetailPengembalian";

-- DropTable
DROP TABLE "Kas";

-- DropTable
DROP TABLE "KasDetail";

-- DropTable
DROP TABLE "Pegawai";

-- DropTable
DROP TABLE "Pengembalian";

-- DropTable
DROP TABLE "PeralatanKantor";

-- DropTable
DROP TABLE "Perjalanan";

-- DropTable
DROP TABLE "Team";

-- CreateTable
CREATE TABLE "team" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "tanggalDibuat" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggalDiubah" TIMESTAMPTZ NOT NULL,
    "nipLeader" TEXT,

    CONSTRAINT "team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pegawai" (
    "nip" TEXT NOT NULL,
    "status" "EmployeeStatusEnum" NOT NULL,
    "peran" "EmployeeRoleEnum" NOT NULL,
    "kataSandi" TEXT NOT NULL,
    "nomorRekening" TEXT NOT NULL,
    "tanggalDibuat" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggalDiubah" TIMESTAMPTZ NOT NULL,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "pegawai_pkey" PRIMARY KEY ("nip")
);

-- CreateTable
CREATE TABLE "perjalanan" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "tanggalMulai" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggalSelesai" TIMESTAMPTZ NOT NULL,
    "tanggalDibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggalDiubah" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "perjalanan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "peralatan_kantor" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "harga" DOUBLE PRECISION NOT NULL,
    "tanggalDibuat" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggalDiubah" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "peralatan_kantor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kas" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "tanggalDibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggalDiubah" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kas_detail" (
    "id" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "kasId" TEXT NOT NULL,
    "jenis" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "tanggalDibuat" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggalDiubah" TIMESTAMPTZ NOT NULL,
    "pengembalianId" TEXT,

    CONSTRAINT "kas_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pengembalian" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "jenis" "ReimburseTypeEnum" NOT NULL,
    "status" "ReimburseStatusEnum" NOT NULL,
    "tanggalPelunasan" TIMESTAMP(3),
    "totalPelunasan" DOUBLE PRECISION,
    "tanggalPenolakan" TIMESTAMP(3),
    "deskripsiPenolakan" TEXT,
    "nipPemohon" TEXT NOT NULL,
    "nipPic" TEXT NOT NULL,
    "perjalananId" TEXT,
    "tanggalDibuat" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggalDiubah" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "pengembalian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detail_pengembalian" (
    "id" TEXT NOT NULL,
    "pengembalianId" TEXT NOT NULL,
    "peralatanKantorId" TEXT,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "jenis" "AccountDetailTypeEnum" NOT NULL,
    "tanggalDibuat" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggalDiubah" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "detail_pengembalian_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "team_nipLeader_key" ON "team"("nipLeader");

-- CreateIndex
CREATE INDEX "pegawai_teamId_idx" ON "pegawai"("teamId");

-- CreateIndex
CREATE INDEX "kas_detail_kasId_idx" ON "kas_detail"("kasId");

-- CreateIndex
CREATE INDEX "kas_detail_pengembalianId_idx" ON "kas_detail"("pengembalianId");

-- CreateIndex
CREATE INDEX "pengembalian_nipPemohon_idx" ON "pengembalian"("nipPemohon");

-- CreateIndex
CREATE INDEX "pengembalian_nipPic_idx" ON "pengembalian"("nipPic");

-- CreateIndex
CREATE INDEX "pengembalian_perjalananId_idx" ON "pengembalian"("perjalananId");

-- CreateIndex
CREATE INDEX "detail_pengembalian_peralatanKantorId_idx" ON "detail_pengembalian"("peralatanKantorId");

-- CreateIndex
CREATE INDEX "detail_pengembalian_pengembalianId_idx" ON "detail_pengembalian"("pengembalianId");
