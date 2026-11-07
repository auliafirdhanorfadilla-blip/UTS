/* ==================================================
   LOGIKA UTAMA - Pustaka Senja
   Greeting, Login, Modal, Katalog, Keranjang,
   Tracking, Testimoni, Rekomendasi
================================================== */

let keranjang = JSON.parse(localStorage.getItem("keranjang") || "[]");
let filterAktif = "Semua";

// ---------- Toast ----------
function showToast(pesan) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = pesan;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

// ---------- Greeting + Jam Live ----------
function tampilkanGreeting() {
  const el = document.getElementById("greeting");
  if (!el) return;
  const now = new Date();
  const jam = now.getHours();
  let sapa = "Selamat Malam";
  if (jam < 11) sapa = "Selamat Pagi";
  else if (jam < 15) sapa = "Selamat Siang";
  else if (jam < 18) sapa = "Selamat Sore";

  el.innerHTML = `${sapa}, Selamat Datang di Pustaka Senja ☕<br>
    <small style="font-weight:400">
      ${now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} •
      ${now.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" })}
    </small>`;
}

// ---------- Dark Mode ----------
function toggleDark() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  showToast(isDark ? "🌙 Mode Malam Aktif" : "☀️ Mode Terang Aktif");
}

// ---------- Login ----------
function login(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  if (email === "admin@buku.id" && pass === "12345") {
    showToast("Login berhasil! 🎉");
    setTimeout(() => window.location.href = "dashboard.html", 800);
  } else {
    alert("email/password yang anda masukkan salah");
  }
}

// ---------- Modal ----------
function openModal(id) { document.getElementById(id).classList.add("show"); }
function closeModal(id) { document.getElementById(id).classList.remove("show"); }

// ---------- Katalog ----------
function renderKatalog() {
  const wrap = document.getElementById("katalog");
  if (!wrap) return;
  const keyword = (document.getElementById("searchBuku")?.value || "").toLowerCase();

  const hasil = dataKatalogBuku.filter((buku) => {
    const cocokKategori = filterAktif === "Semua" || buku.kategori === filterAktif;
    const cocokCari = buku.judul.toLowerCase().includes(keyword) || buku.penulis.toLowerCase().includes(keyword);
    return cocokKategori && cocokCari;
  });

  if (hasil.length === 0) {
    wrap.innerHTML = `<p style="grid-column:1/-1; text-align:center;">📭 Buku tidak ditemukan. Coba kata kunci lain.</p>`;
    return;
  }

  wrap.innerHTML = hasil.map((buku) => `
    <article class="card book ${buku.bestSeller ? 'best-seller' : ''}" onclick="lihatDetail('${buku.id}')">
      <img src="${buku.img}" alt="${buku.judul}">
      <span class="badge">${buku.kategori}</span>
      <h3>${buku.judul}</h3>
      <p>${buku.penulis}</p>
      <p class="rating">⭐ ${buku.rating} • <span class="terjual">${buku.terjual} terjual</span></p>
      <p>
        <strong style="color:var(--brown)">Rp ${buku.harga.toLocaleString("id-ID")}</strong><br>
        <span class="harga-coret">Rp ${buku.hargaAsli.toLocaleString("id-ID")}</span>
        <span style="color:#27AE60; font-size:12px; font-weight:700;"> • Hemat 30%</span>
      </p>
      <p style="font-size:12px;">Stok: ${buku.stok} ${buku.stok < 6 ? '• <span style="color:red">Hampir Habis!</span>' : ''}</p>
      <button class="btn" style="width:100%" onclick="event.stopPropagation(); tambahKeranjang('${buku.id}')">🛒 Tambah Keranjang</button>
    </article>
  `).join("");
}

function setFilter(kategori, tombol) {
  filterAktif = kategori;
  document.querySelectorAll(".filter-btn").forEach((btn) => btn.classList.remove("active"));
  if (tombol) tombol.classList.add("active");
  renderKatalog();
}

function lihatDetail(id) {
  const buku = dataKatalogBuku.find((item) => item.id === id);
  if (!buku) return;
  document.getElementById("detailJudul").textContent = buku.judul;
  document.getElementById("detailIsi").innerHTML = `
    <img src="${buku.img}" style="width:120px; border-radius:12px; display:block; margin:0 auto 10px;">
    <p><b>Penulis:</b> ${buku.penulis}<br>
    <b>Kategori:</b> ${buku.kategori}<br>
    <b>Rating:</b> ⭐ ${buku.rating} (${buku.terjual} terjual)<br>
    <b>Stok:</b> ${buku.stok}<br>
    <b>Harga:</b> Rp ${buku.harga.toLocaleString("id-ID")} <span class="harga-coret">Rp ${buku.hargaAsli.toLocaleString("id-ID")}</span></p>
    <p>“Salah satu best seller di Pustaka Senja. Ceritanya ringan, tapi ngena banget.”</p>
  `;
  const btnPesan = document.getElementById("btnDetailPesan");
  if (btnPesan) {
    btnPesan.onclick = () => { closeModal("modalDetail"); tambahKeranjang(id); };
  }
  openModal("modalDetail");
}

// ---------- Keranjang ----------
function tambahKeranjang(id) {
  const buku = dataKatalogBuku.find((item) => item.id === id);
  keranjang.push(buku);
  localStorage.setItem("keranjang", JSON.stringify(keranjang));
  updateBadge();
  showToast(`✅ ${buku.judul} masuk keranjang!`);
}

function updateBadge() {
  const badge = document.getElementById("cartCount");
  if (badge) badge.textContent = keranjang.length;
}

function tambahBuku() {
  const judul = prompt("Judul Buku:");
  const harga = prompt("Harga:");
  if (!judul || !harga) return alert("Judul & harga wajib diisi!");
  dataKatalogBuku.push({
    id: "BK" + (dataKatalogBuku.length + 1),
    judul: judul,
    penulis: "Penulis Baru",
    harga: parseInt(harga),
    hargaAsli: parseInt(harga) + 30000,
    stok: 10,
    kategori: "Novel",
    rating: 4.8,
    terjual: "0",
    bestSeller: false,
    img: "https://picsum.photos/200/280?random=" + (dataKatalogBuku.length + 10)
  });
  renderKatalog();
  showToast("Buku baru berhasil ditambah! 📚");
}

// ---------- Testimoni & Rekomendasi ----------
function renderTestimoni() {
  const wrap = document.getElementById("testimoni");
  if (!wrap) return;
  wrap.innerHTML = dataTestimoni.map((t) => `
    <div class="testimoni">
      <div>${t.bintang}</div>
      <p>"${t.isi}"</p>
      <b>${t.nama}</b>
      <small>Pembeli — ${t.kota}</small>
    </div>
  `).join("");
}

function renderRekomendasi() {
  const wrap = document.getElementById("rekomendasi");
  if (!wrap) return;
  const rekomendasi = dataKatalogBuku.filter((b) => b.bestSeller).slice(0, 3);
  wrap.innerHTML = rekomendasi.map((buku) => `
    <article class="card book" onclick="lihatDetail('${buku.id}')">
      <img src="${buku.img}" alt="${buku.judul}">
      <h3>${buku.judul}</h3>
      <p>⭐ ${buku.rating} • ${buku.terjual} terjual</p>
      <p><strong>Rp ${buku.harga.toLocaleString("id-ID")}</strong> <span class="harga-coret">Rp ${buku.hargaAsli.toLocaleString("id-ID")}</span></p>
      <button class="btn" style="width:100%" onclick="event.stopPropagation(); tambahKeranjang('${buku.id}')">+ Keranjang</button>
    </article>
  `).join("");
}

// ---------- Tracking ----------
function cariResi() {
  const no = document.getElementById("noDO").value.trim().toUpperCase();
  const hasil = document.getElementById("hasilTracking");
  const data = dataTracking[no];

  if (!data) {
    hasil.innerHTML = `<p style="color:red">Nomor ${no} tidak ditemukan.</p>`;
    return;
  }

  hasil.innerHTML = `
    <div class="card">
      <h3>${data.nama} - ${data.status}</h3>
      <div class="progress"><div id="barProgress"></div></div>
      <p>${data.ekspedisi} • ${data.tanggal} • ${data.paket}</p>
      <p><strong>Total: Rp ${data.total.toLocaleString("id-ID")}</strong></p>
      <p>${data.progress === 100 ? "📦 Paket sudah sampai! Selamat membaca 📖" : "🚚 Paket sedang dalam perjalanan..."}</p>
    </div>
  `;
  setTimeout(() => document.getElementById("barProgress").style.width = data.progress + "%", 100);
}

// ---------- Jalankan Saat Halaman Dibuka ----------
tampilkanGreeting();
renderKatalog();
renderTestimoni();
renderRekomendasi();
updateBadge();
setInterval(tampilkanGreeting, 30000);