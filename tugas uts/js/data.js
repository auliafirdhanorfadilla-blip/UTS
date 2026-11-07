// Data dummy - sesuai soal UTS, tidak dari server/database

const dataKatalogBuku = [
  { id: "BK01", judul: "Laut Bercerita", penulis: "Leila S. Chudori", harga: 99000, hargaAsli: 135000, stok: 12, kategori: "Novel", rating: 4.9, terjual: "1.2k", bestSeller: true, img: "https://picsum.photos/200/280?random=1" },
  { id: "BK02", judul: "Bumi Manusia", penulis: "Pramoedya A. Toer", harga: 115000, hargaAsli: 150000, stok: 8, kategori: "Novel", rating: 4.8, terjual: "980", bestSeller: true, img: "https://picsum.photos/200/280?random=2" },
  { id: "BK03", judul: "Filosofi Teras", penulis: "Henry Manampiring", harga: 89000, hargaAsli: 110000, stok: 20, kategori: "Self-Development", rating: 4.9, terjual: "860", bestSeller: false, img: "https://picsum.photos/200/280?random=3" },
  { id: "BK04", judul: "Atomic Habits", penulis: "James Clear", harga: 129000, hargaAsli: 160000, stok: 5, kategori: "Self-Development", rating: 4.8, terjual: "740", bestSeller: true, img: "https://picsum.photos/200/280?random=4" },
  { id: "BK05", judul: "Dilan 1990", penulis: "Pidi Baiq", harga: 75000, hargaAsli: 99000, stok: 15, kategori: "Novel", rating: 4.7, terjual: "740", bestSeller: false, img: "https://picsum.photos/200/280?random=5" },
  { id: "BK06", judul: "Sapiens", penulis: "Yuval Noah Harari", harga: 139000, hargaAsli: 175000, stok: 7, kategori: "Sejarah", rating: 4.9, terjual: "620", bestSeller: false, img: "https://picsum.photos/200/280?random=6" }
];

const dataTracking = {
  "DO001": { nama: "Ayu Lestari", status: "Dikirim", ekspedisi: "JNE Reguler", tanggal: "07 Nov 2026", paket: "Reguler", total: 99000, progress: 75 },
  "DO002": { nama: "Budi Santoso", status: "Sampai", ekspedisi: "SiCepat Express", tanggal: "06 Nov 2026", paket: "Express", total: 115000, progress: 100 }
};

const dataTestimoni = [
  { nama: "Nadia A.", kota: "Jakarta", isi: "Pengiriman cepat dan packagingnya rapi banget! Bukunya masih baru dan wangi. Bakal reorder lagi.", bintang: "⭐⭐⭐⭐⭐" },
  { nama: "Rizky P.", kota: "Bandung", isi: "Rekomendasi bukunya tepat banget sesuai yang aku suka. UI websitenya enak dan mudah belanja.", bintang: "⭐⭐⭐⭐⭐" },
  { nama: "Dewi S.", kota: "Surabaya", isi: "Suka banget sama promo diskon 30%-nya. Gratis ongkir juga jadi hemat! Terima kasih Pustaka Senja.", bintang: "⭐⭐⭐⭐⭐" }
];