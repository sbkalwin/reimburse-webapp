export const PegawaiLiteResource = {
  nama: true,
  nip: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
  status: true,
  peran: true,
  nomorRekening: true,
};

export const PerjalananLiteResource = {
  id: true,
  deskripsi: true,
  nama: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
  tanggalMulai: true,
  tanggalSelesai: true,
};

export const TeamLiteResource = {
  id: true,
  nama: true,
  nipLeader: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
};

export const PeralatanKantorLiteResource = {
  fileUrl: true,
  harga: true,
  nama: true,
  deskripsi: true,
  id: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
};

export const KasDetailLiteResource = {
  id: true,
  deskripsi: true,
  jenis: true,
  kasId: true,
  pengembalianId: true,
  tanggalDibuat: true,
  total: true,
};

export const KasLiteResource = {
  deskripsi: true,
  id: true,
  nama: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
};

export const ReimburseDetailLiteResource = {
  deskripsi: true,
  id: true,
  fileUrl: true,
  jenis: true,
  nama: true,
  pengembalianId: true,
  peralatanKantorId: true,
  subtotal: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
};

export const ReimburseLiteResource = {
  id: true,
  deskripsi: true,
  deskripsiPenolakan: true,
  jenis: true,
  nipPemohon: true,
  nipPic: true,
  KasDetail: {
    select: KasDetailLiteResource,
  },
  pemohon: {
    select: PegawaiLiteResource,
  },
  perjalananId: true,
  Perjalanan: {
    select: PerjalananLiteResource,
  },
  pic: {
    select: PegawaiLiteResource,
  },
  status: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
  tanggalPelunasan: true,
  tanggalPenolakan: true,
  totalPelunasan: true,
};

export const ReimburseDetailResource = {
  deskripsi: true,
  id: true,
  fileUrl: true,
  jenis: true,
  nama: true,
  pengembalianId: true,
  peralatanKantorId: true,
  subtotal: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
  peralatanKantor: {
    select: PeralatanKantorLiteResource,
  },
  pengembalian: {
    select: ReimburseLiteResource,
  },
};

export const ReimburseResource = {
  id: true,
  deskripsi: true,
  deskripsiPenolakan: true,
  jenis: true,
  nipPemohon: true,
  nipPic: true,
  KasDetail: {
    select: KasDetailLiteResource,
  },
  pemohon: {
    select: PegawaiLiteResource,
  },
  perjalananId: true,
  Perjalanan: {
    select: PerjalananLiteResource,
  },
  pic: {
    select: PegawaiLiteResource,
  },
  status: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
  tanggalPelunasan: true,
  tanggalPenolakan: true,
  totalPelunasan: true,
  DetailPengembalian: {
    select: ReimburseDetailLiteResource,
  },
};

export const PegawaiResource = {
  nama: true,
  nip: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
  status: true,
  peran: true,
  nomorRekening: true,
  Pengembalian: {
    select: ReimburseLiteResource,
  },
  PengembalianPic: {
    select: ReimburseLiteResource,
  },
  Team: {
    select: TeamLiteResource,
  },
};

export const TeamResource = {
  id: true,
  nama: true,
  nipLeader: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
  Pegawai: {
    select: PegawaiLiteResource,
  },
};

export const PeralatanKantorResource = {
  DetailPengembalian: {
    select: KasDetailLiteResource,
  },
  fileUrl: true,
  harga: true,
  deskripsi: true,
  id: true,
  nama: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
};

export const PerjalananResource = {
  id: true,
  deskripsi: true,
  nama: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
  tanggalMulai: true,
  tanggalSelesai: true,
  Pengembalian: {
    select: ReimburseLiteResource,
  },
};

export const KasDetailResource = {
  id: true,
  deskripsi: true,
  jenis: true,
  kasId: true,
  pengembalianId: true,
  tanggalDibuat: true,
  total: true,
  kas: {
    select: KasLiteResource,
  },
  pengembalian: {
    select: ReimburseLiteResource,
  },
};

export const KasResource = {
  deskripsi: true,
  id: true,
  nama: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
  KasDetail: {
    select: KasDetailLiteResource,
  },
};
