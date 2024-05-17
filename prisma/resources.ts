export const PegawaiLiteResource = {
  nama: true,
  nip: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
  status: true,
  peran: true,
  nomorRekening: true,
};

export const PegawaiResource = {
  nama: true,
  nip: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
  status: true,
  peran: true,
  nomorRekening: true,
  Pengembalian: true,
  PengembalianPic: true,
  Team: {
    select: {
      id: true,
      nama: true,
      nipLeader: true,
      tanggalDibuat: true,
      tanggalDiubah: true,
    },
  },
};

export const TeamLiteResource = {
  id: true,
  nama: true,
  nipLeader: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
};

export const TeamResource = {
  id: true,
  nama: true,
  nipLeader: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
  Pegawai: {
    select: {
      nama: true,
      nip: true,
      tanggalDibuat: true,
      tanggalDiubah: true,
      status: true,
      peran: true,
      nomorRekening: true,
    },
  },
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

export const PeralatanKantorResource = {
  DetailPengembalian: true, // TODO: CREATE RESOURCE
  fileUrl: true,
  harga: true,
  deskripsi: true,
  id: true,
  nama: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
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

export const PerjalananResource = {
  id: true,
  deskripsi: true,
  nama: true,
  tanggalDibuat: true,
  tanggalDiubah: true,
  tanggalMulai: true,
  tanggalSelesai: true,
  Pengembalian: true,
};
