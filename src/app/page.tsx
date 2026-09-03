"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

/* ====================================================================
   KERETA ANGKA
   Lembar latihan mengurutkan angka untuk TK A (20 soal, 3 halaman).
   ==================================================================== */

/* ---------- Tipe ---------- */
type Soal = {
  no: number;
  mulai: number;
  kosong: number[];
};

/* ---------- Util ---------- */
const rand = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const JUMLAH_WARNA = 7;

/* ---------- SVG: Lokomotif (dipakai berulang) ---------- */
function LokoSvg() {
  return (
    <svg
      viewBox="0 0 92 114"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        className="asap a1"
        cx="24"
        cy="7"
        r="4.5"
        fill="#EDE7DA"
        stroke="#4A3728"
        strokeWidth="2.6"
      />
      <circle
        className="asap a2"
        cx="36"
        cy="3.5"
        r="3"
        fill="#EDE7DA"
        stroke="#4A3728"
        strokeWidth="2.6"
      />
      <rect
        x="10"
        y="10"
        width="23"
        height="9"
        rx="4.5"
        fill="#43BFAE"
        stroke="#4A3728"
        strokeWidth="3.4"
      />
      <rect
        x="14"
        y="16"
        width="15"
        height="18"
        rx="3"
        fill="#43BFAE"
        stroke="#4A3728"
        strokeWidth="3.4"
      />
      <rect
        x="52"
        y="6"
        width="34"
        height="56"
        rx="7"
        fill="#FFD34D"
        stroke="#4A3728"
        strokeWidth="3.6"
      />
      <rect
        x="60"
        y="16"
        width="18"
        height="15"
        rx="3.5"
        fill="#FFFDF7"
        stroke="#4A3728"
        strokeWidth="3.2"
      />
      <rect
        x="6"
        y="30"
        width="80"
        height="62"
        rx="9"
        fill="#F26D5B"
        stroke="#4A3728"
        strokeWidth="3.6"
      />
      <rect x="6" y="74" width="80" height="7" fill="#FFD34D" />
      <circle cx="25" cy="51" r="2.6" fill="#4A3728" />
      <circle cx="39" cy="51" r="2.6" fill="#4A3728" />
      <path
        d="M23 58 Q32 66 41 58"
        fill="none"
        stroke="#4A3728"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <circle cx="16" cy="57" r="3.2" fill="#F9B8C8" />
      <circle cx="48" cy="57" r="3.2" fill="#F9B8C8" />
      <circle
        cx="22"
        cy="98"
        r="12"
        fill="#4A3728"
        stroke="#FFFDF7"
        strokeWidth="3"
      />
      <circle
        cx="46"
        cy="98"
        r="12"
        fill="#4A3728"
        stroke="#FFFDF7"
        strokeWidth="3"
      />
      <circle
        cx="70"
        cy="98"
        r="12"
        fill="#4A3728"
        stroke="#FFFDF7"
        strokeWidth="3"
      />
      <circle cx="22" cy="98" r="4" fill="#FFFDF7" />
      <circle cx="46" cy="98" r="4" fill="#FFFDF7" />
      <circle cx="70" cy="98" r="4" fill="#FFFDF7" />
    </svg>
  );
}

/** Lokomotif dibungkus div.loko (perlu ::after untuk kopling). */
function Loko() {
  return (
    <div className="loko">
      <LokoSvg />
    </div>
  );
}

/* ---------- SVG: Panah contoh ---------- */
function PanahSvg() {
  return (
    <svg viewBox="0 0 20 26" fill="none">
      <path
        d="M10 3v15M4 13l6 8 6-8"
        stroke="#F26D5B"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------- SVG: Kereta untuk diwarnai (hadiah) ---------- */
function KeretaWarnaSvg() {
  return (
    <svg viewBox="0 0 232 84" fill="none">
      <g stroke="#4A3728" strokeWidth="3" fill="#fff" strokeLinejoin="round">
        <rect x="14" y="16" width="12" height="18" rx="3" />
        <rect x="4" y="30" width="60" height="40" rx="8" />
        <rect x="44" y="14" width="20" height="24" rx="4" />
        <rect x="64" y="46" width="12" height="6" />
        <rect x="74" y="24" width="48" height="46" rx="6" />
        <rect x="122" y="46" width="12" height="6" />
        <rect x="132" y="24" width="48" height="46" rx="6" />
      </g>
      <circle cx="54" cy="24" r="4.5" fill="#fff" stroke="#4A3728" strokeWidth="3" />
      <circle cx="20" cy="52" r="2.2" fill="#4A3728" />
      <circle cx="34" cy="52" r="2.2" fill="#4A3728" />
      <path
        d="M18 59 Q27 66 36 59"
        stroke="#4A3728"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
      <g fill="#fff" stroke="#4A3728" strokeWidth="3">
        <circle cx="18" cy="74" r="8" />
        <circle cx="40" cy="74" r="8" />
        <circle cx="58" cy="74" r="8" />
        <circle cx="86" cy="74" r="8" />
        <circle cx="110" cy="74" r="8" />
        <circle cx="144" cy="74" r="8" />
        <circle cx="168" cy="74" r="8" />
      </g>
      <g fill="#4A3728">
        <circle cx="18" cy="74" r="2.2" />
        <circle cx="40" cy="74" r="2.2" />
        <circle cx="58" cy="74" r="2.2" />
        <circle cx="86" cy="74" r="2.2" />
        <circle cx="110" cy="74" r="2.2" />
        <circle cx="144" cy="74" r="2.2" />
        <circle cx="168" cy="74" r="2.2" />
      </g>
    </svg>
  );
}

/* ---------- SVG: Bintang ---------- */
function BintangSvg() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M12 2.6l2.8 6 6.5.8-4.8 4.5 1.3 6.5L12 17.2l-5.8 3.2 1.3-6.5L2.7 9.4l6.5-.8z"
        fill="none"
        stroke="#4A3728"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------- SVG Ikon untuk tombol ---------- */
function IkonKunci() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function IkonAcak() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-2.64-6.36" />
      <path d="M21 3v6h-6" />
    </svg>
  );
}
function IkonCetak() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 8V3.5h10V8" />
      <rect x="3.5" y="8" width="17" height="8.5" rx="2" />
      <rect x="7" y="13.5" width="10" height="7" />
    </svg>
  );
}

/* ---------- Generator soal ----------
   Angka range 10 - 20.
   Setiap kereta berisi 6 gerbong berurutan (mulai..mulai+5).
   Nilai mulai dipilih antara 10 - 15 agar seluruh angka gerbong (mulai..mulai+5) ada di rentang 10–20.
   Hanya 2 gerbong yang terisi (tersebar), sisanya (4 gerbong) kosong. */
function buatSemuaSoal(): Soal[] {
  const soal: Soal[] = [];
  let lastMulai = -1;

  for (let no = 1; no <= 20; no++) {
    let mulai: number;
    do {
      mulai = rand(10, 15);
    } while (mulai === lastMulai);
    lastMulai = mulai;

    // Pilih 2 indeks terisi (misal 1 dari [0..2] dan 1 dari [3..5]),
    // sisanya 4 indeks menjadi gerbong kosong.
    const terisi1 = rand(0, 2);
    const terisi2 = rand(3, 5);
    const kosong = [0, 1, 2, 3, 4, 5].filter(
      (idx) => idx !== terisi1 && idx !== terisi2
    );

    soal.push({ no, mulai, kosong });
  }
  return soal;
}

/* ---------- Sebuah baris kereta ---------- */
function KeretaBaris({ s, urut }: { s: Soal; urut: number }) {
  const gerbong = Array.from({ length: 6 }, (_, i) => {
    const a = s.mulai + i;
    const w = "w" + ((s.no + i) % JUMLAH_WARNA);
    const kosong = s.kosong.includes(i);
    return (
      <div
        key={i}
        className={`gerbong ${w} ${kosong ? "kosong" : "terisi"}`}
      >
        <span className="win">
          {kosong ? <span className="jwb">{a}</span> : <span className="ang">{a}</span>}
        </span>
        <i className="rd" />
        <i className="rd r" />
      </div>
    );
  });

  return (
    <div className="soal" style={{ animationDelay: `${urut * 55}ms` }}>
      <span className="no">{s.no}</span>
      <div className="kereta">
        <Loko />
        {gerbong}
        <span className="rel" />
      </div>
    </div>
  );
}

/* ---------- Panel contoh ---------- */
function ContohPanel() {
  return (
    <div className="contoh">
      <span className="badge">CONTOH</span>
      <div className="c-grid">
        <div className="gerbong mini w0 terisi">
          <span className="win">
            <span className="ang">10</span>
          </span>
          <i className="rd" />
          <i className="rd r" />
        </div>
        <div className="gerbong mini kosong tanya">
          <span className="win">
            <span className="tqm">?</span>
          </span>
          <i className="rd" />
          <i className="rd r" />
        </div>
        <div className="gerbong mini kosong tanya">
          <span className="win">
            <span className="tqm">?</span>
          </span>
          <i className="rd" />
          <i className="rd r" />
        </div>
        <div className="gerbong mini w1 terisi">
          <span className="win">
            <span className="ang">13</span>
          </span>
          <i className="rd" />
          <i className="rd r" />
        </div>
        <div className="gerbong mini kosong tanya">
          <span className="win">
            <span className="tqm">?</span>
          </span>
          <i className="rd" />
          <i className="rd r" />
        </div>
        <div className="gerbong mini kosong tanya">
          <span className="win">
            <span className="tqm">?</span>
          </span>
          <i className="rd" />
          <i className="rd r" />
        </div>
        <span />
        <span className="panah">
          <PanahSvg />
        </span>
        <span className="panah">
          <PanahSvg />
        </span>
        <span />
        <span className="panah">
          <PanahSvg />
        </span>
        <span className="panah">
          <PanahSvg />
        </span>
        <span />
        <span className="jwb-mini">11</span>
        <span className="jwb-mini">12</span>
        <span />
        <span className="jwb-mini">14</span>
        <span className="jwb-mini">15</span>
      </div>
      <p className="c-ket">Tulis angka yang hilang pada gerbong kosong.</p>
    </div>
  );
}

/* ---------- Header halaman 1 ---------- */
function KopUtama() {
  const judul = "Kereta Angka!";
  // pola warna: c1..c6 berputar per huruf, "!" pakai c6
  const kelas = ["c1", "c2", "c3", "c4", "c5", "c6"];
  return (
    <header className="kop">
      <div className="kop-kiri">
        <h1 className="judul" aria-label="Kereta Angka!">
          {judul.split("").map((ch, i) =>
            ch === " " ? (
              <span key={i} className="sp" />
            ) : (
              <span key={i} className={kelas[i % kelas.length]}>
                {ch}
              </span>
            )
          )}
        </h1>
        <p className="sub">Lengkapi angka yang hilang pada gerbong yang kosong!</p>
        <div className="identitas">
          <span>
            Nama<span className="g gNama" />
          </span>
          <span>
            Kelas<span className="g gKelas" />
          </span>
          <span className="chip">20 soal • Angka 10–20</span>
        </div>
      </div>

      <ContohPanel />
    </header>
  );
}

/* ---------- Kop mini halaman 2 & 3 ---------- */
function KopMini() {
  return (
    <div className="mini-kop">
      <span className="kiri">
        <span className="loko-slot">
          <Loko />
        </span>{" "}
        Kereta Angka • Latihan Mengurutkan Angka
      </span>
      <span>
        Nama: <i className="g2" />
      </span>
    </div>
  );
}

/* ---------- Footer hadiah di halaman 3 ---------- */
function Hadiah() {
  return (
    <footer className="hadiah">
      <div className="kiri">
        <KeretaWarnaSvg />
        <p>Warnai keretaku!</p>
      </div>
      <div className="kanan">
        <div className="bintang">
          <BintangSvg />
          <BintangSvg />
          <BintangSvg />
        </div>
        <p>
          <b>Hebat!</b> Kamu sudah berhasil merangkai angka dengan urutan yang
          benar.
        </p>
        <p className="paraf">
          Paraf Guru / Orang Tua:
          <span className="g" />
        </p>
      </div>
    </footer>
  );
}

/* ---------- Halaman utama ---------- */
export default function Home() {
  /* state */
  const [soal, setSoal] = useState<Soal[]>(() => buatSemuaSoal());
  const [kunci, setKunci] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  /* render awal sekali saja di mount (sudah dilakukan lewat initial state) */

  /* toast helper */
  const tampilToast = useCallback((pesan: string) => {
    setToast(pesan);
    window.setTimeout(() => setToast(null), 1900);
  }, []);

  /* handler tombol */
  const onKunci = () => {
    setKunci((k) => {
      const aktif = !k;
      tampilToast(
        aktif ? "Kunci jawaban ditampilkan" : "Kunci jawaban disembunyikan"
      );
      return aktif;
    });
  };

  const onAcak = () => {
    setSoal(buatSemuaSoal());
    tampilToast("Soal baru berhasil dibuat!");
  };

  const onCetak = () => {
    if (typeof window !== "undefined") window.print();
  };

  /* pastikan scroll-to-top saat pertama kali render (di browser) */
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }
  }, []);

  /* bagi soal ke 3 halaman: 6 + 8 + 6 */
  const { h1, h2, h3 } = useMemo(() => {
    let k = 0;
    return {
      h1: soal.slice(0, 6).map((s) => ({ s, urut: k++ })),
      h2: soal.slice(6, 14).map((s) => ({ s, urut: k++ })),
      h3: soal.slice(14, 20).map((s) => ({ s, urut: k++ })),
    };
  }, [soal]);

  return (
    <div className={`kereta-page${kunci ? " kunci" : ""}`}>
      {/* Bilah alat */}
      <aside className="toolbar">
        <div className="brand">
          <span className="loko-slot">
            <Loko />
          </span>
          <div>
            <b>Kereta Angka</b>
            <small>Lembar latihan mengurutkan angka • TK A • 20 soal</small>
          </div>
        </div>
        <div className="aksi">
          <span className={`toast${toast ? " show" : ""}`}>{toast ?? ""}</span>
          <button
            type="button"
            id="btnKunci"
            className={`ka-btn${kunci ? " on" : ""}`}
            onClick={onKunci}
            aria-pressed={kunci}
          >
            <IkonKunci />
            Kunci Jawaban
          </button>
          <button
            type="button"
            id="btnAcak"
            className="ka-btn"
            onClick={onAcak}
          >
            <IkonAcak />
            Acak Soal
          </button>
          <button
            type="button"
            id="btnCetak"
            className="ka-btn"
            onClick={onCetak}
          >
            <IkonCetak />
            Cetak / Simpan PDF
          </button>
        </div>
      </aside>

      {/* Kertas A4 */}
      <main className="meja">
        {/* Halaman 1 */}
        <section className="sheet">
          <KopUtama />
          <div className="rel-garis" />
          <div className="isi">
            {h1.map(({ s, urut }) => (
              <KeretaBaris key={s.no} s={s} urut={urut} />
            ))}
          </div>
          <div className="hlm">Halaman 1 dari 3</div>
          <div className="wm">
            <b>LEMBAR KUNCI GURU</b>
          </div>
        </section>

        {/* Halaman 2 */}
        <section className="sheet">
          <KopMini />
          <div className="isi">
            {h2.map(({ s, urut }) => (
              <KeretaBaris key={s.no} s={s} urut={urut} />
            ))}
          </div>
          <div className="hlm">Halaman 2 dari 3</div>
          <div className="wm">
            <b>LEMBAR KUNCI GURU</b>
          </div>
        </section>

        {/* Halaman 3 */}
        <section className="sheet">
          <KopMini />
          <div className="isi">
            {h3.map(({ s, urut }) => (
              <KeretaBaris key={s.no} s={s} urut={urut} />
            ))}
          </div>
          <Hadiah />
          <div className="hlm">Halaman 3 dari 3</div>
          <div className="wm">
            <b>LEMBAR KUNCI GURU</b>
          </div>
        </section>
      </main>
    </div>
  );
}
