/*
  Warnings:

  - A unique constraint covering the columns `[pengembalian_id]` on the table `kas_detail` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "kas_detail_pengembalian_id_key" ON "kas_detail"("pengembalian_id");
