-- CreateEnum
CREATE TYPE "AccountDetailTypeEnum" AS ENUM ('outcome', 'income');

-- CreateEnum
CREATE TYPE "ReimburseStatusEnum" AS ENUM ('pending', 'finished', 'rejected');

-- CreateEnum
CREATE TYPE "ReimburseTypeEnum" AS ENUM ('itinerary', 'stationery');

-- CreateEnum
CREATE TYPE "EmployeeStatusEnum" AS ENUM ('active', 'inactive');

-- CreateEnum
CREATE TYPE "EmployeeRoleEnum" AS ENUM ('admin', 'user');

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "tanggalDibuat" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggalDiubah" TIMESTAMPTZ NOT NULL,
    "nipLeader" TEXT,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pegawai" (
    "nip" TEXT NOT NULL,
    "status" "EmployeeStatusEnum" NOT NULL,
    "peran" "EmployeeRoleEnum" NOT NULL,
    "kataSandi" TEXT NOT NULL,
    "nomorRekening" TEXT NOT NULL,
    "tanggalDibuat" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggalDiubah" TIMESTAMPTZ NOT NULL,
    "teamId" TEXT NOT NULL,

    CONSTRAINT "Pegawai_pkey" PRIMARY KEY ("nip")
);

-- CreateTable
CREATE TABLE "Perjalanan" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "tanggalMulai" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggalSelesai" TIMESTAMPTZ NOT NULL,
    "tanggalDibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggalDiubah" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Perjalanan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PeralatanKantor" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "harga" DOUBLE PRECISION NOT NULL,
    "tanggalDibuat" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggalDiubah" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "PeralatanKantor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kas" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "tanggalDibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggalDiubah" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KasDetail" (
    "id" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "kasId" TEXT NOT NULL,
    "jenis" TEXT NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "tanggalDibuat" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggalDiubah" TIMESTAMPTZ NOT NULL,
    "pengembalianId" TEXT,

    CONSTRAINT "KasDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pengembalian" (
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

    CONSTRAINT "Pengembalian_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DetailPengembalian" (
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

    CONSTRAINT "DetailPengembalian_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_nipLeader_key" ON "Team"("nipLeader");

-- AddForeignKey
ALTER TABLE "Pegawai" ADD CONSTRAINT "Pegawai_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KasDetail" ADD CONSTRAINT "KasDetail_kasId_fkey" FOREIGN KEY ("kasId") REFERENCES "Kas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KasDetail" ADD CONSTRAINT "KasDetail_pengembalianId_fkey" FOREIGN KEY ("pengembalianId") REFERENCES "Pengembalian"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pengembalian" ADD CONSTRAINT "Pengembalian_nipPemohon_fkey" FOREIGN KEY ("nipPemohon") REFERENCES "Pegawai"("nip") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pengembalian" ADD CONSTRAINT "Pengembalian_nipPic_fkey" FOREIGN KEY ("nipPic") REFERENCES "Pegawai"("nip") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pengembalian" ADD CONSTRAINT "Pengembalian_perjalananId_fkey" FOREIGN KEY ("perjalananId") REFERENCES "Perjalanan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailPengembalian" ADD CONSTRAINT "DetailPengembalian_pengembalianId_fkey" FOREIGN KEY ("pengembalianId") REFERENCES "Pengembalian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailPengembalian" ADD CONSTRAINT "DetailPengembalian_peralatanKantorId_fkey" FOREIGN KEY ("peralatanKantorId") REFERENCES "PeralatanKantor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

