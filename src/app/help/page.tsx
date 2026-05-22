"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle, ChevronDown, MessageCircle, ClipboardList,
  ChefHat, BarChart2, User, LogOut, Search, X,
  CheckCircle2, AlertCircle, Lightbulb, BookOpen,
} from "lucide-react";
import { Shell } from "@/components/kuali/AppShell";
import { cn } from "@/lib/utils";

// ── Tipe data ─────────────────────────────────────────────────────────────────
interface FaqItem {
  q: string;
  a: string;
}

interface GuideStep {
  step: number;
  title: string;
  desc: string;
  tip?: string;
}

interface GuideSection {
  id: string;
  icon: React.ElementType;
  label: string;
  color: string;
  steps: GuideStep[];
  faq: FaqItem[];
}

// ── Konten panduan (13 Golden Rules diterapkan di UX copy) ───────────────────
const GUIDE_SECTIONS: GuideSection[] = [
  {
    id: "demo",
    icon: MessageCircle,
    label: "Proses Chat Baru",
    color: "bg-orange-500",
    steps: [
      {
        step: 1,
        title: "Klik tombol 'Proses Chat Baru'",
        desc: "Di sidebar kiri (desktop) atau menu atas kanan (ponsel), ketuk tombol oranye 'Proses Chat Baru'. Tombol ini selalu terlihat — tidak perlu mencari.",
        tip: "Tombol ini berwarna oranye terang agar mudah ditemukan.",
      },
      {
        step: 2,
        title: "Tempel teks chat WhatsApp",
        desc: "Salin percakapan WhatsApp dari pelanggan, lalu tempel di kolom yang tersedia. Kuali akan membaca teks tersebut dan mencoba memahami detail pesanannya.",
        tip: "Tidak perlu format khusus — cukup tempel apa adanya dari WhatsApp.",
      },
      {
        step: 3,
        title: "Periksa draft yang dihasilkan AI",
        desc: "AI Kuali akan membuat draft pesanan secara otomatis. Ini hanyalah DRAFT — Anda harus memeriksa dan mengonfirmasi sebelum tersimpan. Semua keputusan ada di tangan Anda.",
        tip: "AI bisa saja salah menangkap detail. Selalu periksa nama, jumlah, dan tanggal pengiriman.",
      },
      {
        step: 4,
        title: "Konfirmasi atau perbaiki pesanan",
        desc: "Jika draft sudah benar, klik 'Konfirmasi Pesanan'. Jika ada yang salah, edit dulu sebelum dikonfirmasi. Pesanan yang dikonfirmasi akan masuk ke daftar Pesanan dan Rencana Produksi.",
      },
    ],
    faq: [
      { q: "Apakah AI langsung menyimpan pesanan?", a: "Tidak. AI hanya membuat draft sebagai bantuan awal. Anda yang menentukan apakah draft itu benar sebelum dikonfirmasi." },
      { q: "Bagaimana jika teks chat tidak terbaca dengan baik?", a: "Anda bisa mengedit draft secara manual. AI membantu, tapi keputusan akhir tetap di tangan Anda." },
      { q: "Apakah bisa memproses beberapa chat sekaligus?", a: "Di versi MVP ini, satu chat diproses satu per satu. Fitur batch processing ada di roadmap pengembangan." },
    ],
  },
  {
    id: "orders",
    icon: ClipboardList,
    label: "Daftar Pesanan",
    color: "bg-blue-500",
    steps: [
      {
        step: 1,
        title: "Buka halaman Pesanan",
        desc: "Ketuk ikon 'Pesanan' di navigasi bawah (ponsel) atau sidebar kiri (desktop). Anda akan melihat semua pesanan hari ini.",
      },
      {
        step: 2,
        title: "Gunakan filter dan pencarian",
        desc: "Gunakan tab filter di atas (Semua, Dikonfirmasi, Draft, Perlu Cek, Belum Bayar) untuk mempersempit tampilan. Ketik nama pelanggan atau nomor order di kolom pencarian untuk menemukan pesanan spesifik.",
        tip: "Filter 'Belum Bayar' membantu Anda menagih pelanggan yang belum melunasi.",
      },
      {
        step: 3,
        title: "Ketuk pesanan untuk melihat detail",
        desc: "Ketuk baris atau kartu pesanan mana pun untuk melihat detail lengkap: menu, jumlah, waktu pengiriman, dan status pembayaran.",
      },
      {
        step: 4,
        title: "Tandai pembayaran lunas",
        desc: "Di halaman detail pesanan, ada tombol untuk mengubah status pembayaran dari 'Belum Bayar' menjadi 'Lunas' setelah pelanggan membayar.",
      },
    ],
    faq: [
      { q: "Apa arti status 'Perlu Cek'?", a: "Pesanan dengan status ini belum terkonfirmasi — biasanya karena AI tidak yakin dengan detail yang dibaca. Perlu Anda periksa dan konfirmasi secara manual." },
      { q: "Kenapa ada pesanan dengan total Rp 0?", a: "Pesanan dengan harga Rp 0 biasanya masih dalam status 'Perlu Cek' karena AI belum berhasil membaca harga dari chat. Isi secara manual di halaman detail." },
      { q: "Berapa banyak pesanan yang bisa ditampilkan?", a: "Halaman ini menampilkan maksimal 20 pesanan per halaman. Gunakan tombol navigasi halaman (prev/next) di bawah untuk melihat pesanan lainnya." },
    ],
  },
  {
    id: "production",
    icon: ChefHat,
    label: "Rencana Produksi",
    color: "bg-green-600",
    steps: [
      {
        step: 1,
        title: "Buka halaman Produksi",
        desc: "Ketuk ikon 'Produksi' di navigasi. Halaman ini menampilkan estimasi kebutuhan bahan baku untuk besok, berdasarkan pesanan yang sudah dikonfirmasi.",
      },
      {
        step: 2,
        title: "Periksa status bahan baku",
        desc: "Setiap bahan ditampilkan dengan status: Cukup (hijau), Hampir Habis (kuning), atau Perlu Beli (merah). Fokus pada yang berwarna merah dan kuning lebih dulu.",
        tip: "Urutkan berdasarkan status menggunakan tab filter di bagian atas.",
      },
      {
        step: 3,
        title: "Gunakan pencarian bahan baku",
        desc: "Ketik nama bahan di kolom pencarian untuk langsung menemukan bahan tertentu tanpa harus menggulir seluruh daftar.",
      },
      {
        step: 4,
        title: "Persiapkan belanja",
        desc: "Gunakan daftar ini sebagai panduan belanja bahan baku. Kolom 'Kebutuhan Dapur' menunjukkan berapa yang perlu disiapkan, dan 'Stok Saat Ini' menunjukkan yang sudah ada.",
        tip: "Ini adalah estimasi — selalu konfirmasi stok fisik sebelum ke pasar.",
      },
    ],
    faq: [
      { q: "Apakah angka stok otomatis berkurang setelah produksi?", a: "Di MVP ini, stok belum diperbarui otomatis. Fitur manajemen inventaris otomatis ada di roadmap pengembangan." },
      { q: "Mengapa beberapa bahan tidak muncul?", a: "Hanya bahan baku dari pesanan yang sudah dikonfirmasi yang dihitung. Pastikan pesanan sudah dikonfirmasi di halaman Pesanan." },
      { q: "Apakah data ini bisa dicetak?", a: "Fitur ekspor dan cetak ada di roadmap. Saat ini Anda bisa screenshot halaman ini sebagai referensi." },
    ],
  },
  {
    id: "summary",
    icon: BarChart2,
    label: "Rekap Harian",
    color: "bg-purple-600",
    steps: [
      {
        step: 1,
        title: "Buka halaman Rekap",
        desc: "Ketuk ikon 'Rekap' di navigasi. Halaman ini merangkum performa hari ini: total pesanan, total pendapatan, dan status piutang.",
      },
      {
        step: 2,
        title: "Baca ringkasan harian",
        desc: "Lihat berapa banyak pesanan dikonfirmasi, total pendapatan yang masuk, dan berapa yang masih belum dibayar pelanggan.",
      },
      {
        step: 3,
        title: "Cek piutang pelanggan",
        desc: "Bagian 'Piutang Belum Lunas' menampilkan daftar pesanan yang belum dibayar lengkap dengan jumlahnya, agar Anda bisa menagih tepat waktu.",
      },
    ],
    faq: [
      { q: "Apakah rekap bisa dilihat per minggu atau bulan?", a: "Di MVP ini hanya tersedia rekap harian. Filter rekap per periode ada di roadmap pengembangan." },
      { q: "Mengapa total pendapatan tidak cocok dengan yang saya hitung?", a: "Pastikan semua pesanan sudah dikonfirmasi dan status pembayaran sudah diperbarui. Hanya pesanan 'Lunas' yang masuk ke total pendapatan." },
    ],
  },
  {
    id: "profile",
    icon: User,
    label: "Profil Usaha",
    color: "bg-gray-600",
    steps: [
      {
        step: 1,
        title: "Buka Profil Usaha",
        desc: "Klik 'Profil Usaha' di bagian Pengaturan sidebar (desktop) atau menu hamburger (ponsel).",
      },
      {
        step: 2,
        title: "Isi data usaha Anda",
        desc: "Masukkan nama usaha, nama pemilik, dan informasi kontak. Data ini digunakan untuk personalisasi tampilan Kuali.",
      },
    ],
    faq: [
      { q: "Apakah data profil saya aman?", a: "Data Anda tersimpan di perangkat/server demo ini. Ini adalah prototype — jangan masukkan data bisnis nyata yang sensitif." },
    ],
  },
];

// ── Komponen FAQ Accordion ────────────────────────────────────────────────────
function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="flex flex-col gap-2">
      {items.map((item, idx) => (
        <div key={idx} className="border border-[#E8E8E6] rounded-xl overflow-hidden">
          <button
            onClick={() => setOpen(open === idx ? null : idx)}
            className="w-full flex items-center justify-between px-4 py-3.5 text-left bg-white hover:bg-[#FAFAF8] transition-colors"
          >
            <span className="text-[13px] font-bold text-[#1A1A1A] pr-4 leading-snug">{item.q}</span>
            <ChevronDown
              size={15}
              className={cn("shrink-0 text-[#888] transition-transform duration-200", open === idx && "rotate-180")}
            />
          </button>
          <AnimatePresence>
            {open === idx && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="px-4 pb-4 pt-1 text-[13px] text-[#6B6B6B] leading-relaxed border-t border-[#F4F4F2] bg-[#FAFAF8]">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// ── Konten utama ──────────────────────────────────────────────────────────────
export default function HelpPage() {
  const [activeSection, setActiveSection] = useState("demo");
  const [searchQuery, setSearchQuery] = useState("");

  const section = GUIDE_SECTIONS.find((s) => s.id === activeSection) ?? GUIDE_SECTIONS[0];

  // Filter FAQ berdasarkan search
  const filteredFaq = section.faq.filter(
    (item) =>
      !searchQuery.trim() ||
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const content = (
    <div className="flex gap-6 h-full">
      {/* Sidebar kategori */}
      <div className="w-52 shrink-0 flex flex-col gap-1">
        <p className="text-[10px] font-black text-[#ADADAD] uppercase tracking-widest px-2 mb-2">Panduan Fitur</p>
        {GUIDE_SECTIONS.map(({ id, label, icon: Icon, color }) => {
          const active = id === activeSection;
          return (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left",
                active ? "bg-orange-500 text-white shadow-sm" : "text-[#555] hover:bg-[#F4F4F2]"
              )}
            >
              <div className={cn("w-6 h-6 rounded-lg flex items-center justify-center shrink-0", active ? "bg-white/20" : color)}>
                <Icon size={13} className="text-white" strokeWidth={2} />
              </div>
              {label}
            </button>
          );
        })}

        <div className="mt-4 p-3 bg-orange-50 border border-orange-100 rounded-xl">
          <div className="flex items-center gap-1.5 mb-1.5">
            <AlertCircle size={12} className="text-orange-500" />
            <span className="text-[10px] font-black text-orange-600 uppercase tracking-wider">Data Simulasi</span>
          </div>
          <p className="text-[11px] text-orange-700 leading-relaxed">
            Semua data yang ditampilkan adalah simulasi demo. Bukan data bisnis nyata.
          </p>
        </div>
      </div>

      {/* Konten panduan */}
      <div className="flex-1 overflow-y-auto min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            {/* Header section */}
            <div className="flex items-center gap-3">
              <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm", section.color)}>
                <section.icon size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-black text-[#1A1A1A] tracking-tight">{section.label}</h2>
                <p className="text-[12px] text-[#888888] font-medium">{section.steps.length} langkah · {section.faq.length} pertanyaan umum</p>
              </div>
            </div>

            {/* Langkah-langkah */}
            <div className="bg-white border border-[#E8E8E6] rounded-2xl overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-[#F4F4F2] flex items-center gap-2">
                <BookOpen size={14} className="text-orange-500" />
                <span className="text-[12px] font-black text-[#1A1A1A] uppercase tracking-wider">Panduan Langkah Demi Langkah</span>
              </div>
              <div className="divide-y divide-[#F4F4F2]">
                {section.steps.map((s) => (
                  <div key={s.step} className="px-6 py-5 flex gap-4">
                    <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-600 text-[12px] font-black flex items-center justify-center shrink-0 mt-0.5">
                      {s.step}
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1">
                      <p className="text-[14px] font-black text-[#1A1A1A]">{s.title}</p>
                      <p className="text-[13px] text-[#6B6B6B] leading-relaxed">{s.desc}</p>
                      {s.tip && (
                        <div className="flex items-start gap-1.5 mt-1 p-2.5 bg-amber-50 border border-amber-100 rounded-xl">
                          <Lightbulb size={12} className="text-amber-500 shrink-0 mt-0.5" />
                          <p className="text-[12px] text-amber-700 font-medium leading-relaxed">{s.tip}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white border border-[#E8E8E6] rounded-2xl overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-[#F4F4F2] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HelpCircle size={14} className="text-orange-500" />
                  <span className="text-[12px] font-black text-[#1A1A1A] uppercase tracking-wider">Pertanyaan Umum</span>
                </div>
                <div className="relative">
                  <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#ADADAD] pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Cari pertanyaan..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-[#F4F4F2] border border-[#E8E8E6] rounded-lg pl-7 pr-7 py-1.5 text-[12px] font-medium text-[#1A1A1A] placeholder:text-[#ADADAD] outline-none focus:border-orange-400 transition-colors w-44"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#ADADAD] hover:text-[#555]">
                      <X size={11} />
                    </button>
                  )}
                </div>
              </div>
              <div className="p-4">
                {filteredFaq.length === 0 ? (
                  <p className="text-[13px] text-[#888] text-center py-6">
                    Tidak ada hasil untuk &ldquo;{searchQuery}&rdquo;
                  </p>
                ) : (
                  <FaqAccordion items={filteredFaq} />
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );

  // Mobile view: single scrollable list
  const mobileContent = (
    <div className="px-4 py-4 flex flex-col gap-5 pb-4">
      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {GUIDE_SECTIONS.map(({ id, label, icon: Icon, color }) => {
          const active = id === activeSection;
          return (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={cn(
                "flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl text-[12px] font-bold border transition-all",
                active ? "bg-orange-500 text-white border-orange-500" : "bg-white text-[#555] border-[#E8E8E6]"
              )}
            >
              <Icon size={13} />
              {label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="flex flex-col gap-4"
        >
          {/* Steps */}
          <div className="bg-white border border-[#E8E8E6] rounded-2xl overflow-hidden">
            <div className="px-4 py-3.5 border-b border-[#F4F4F2] flex items-center gap-2">
              <BookOpen size={13} className="text-orange-500" />
              <span className="text-[11px] font-black text-[#1A1A1A] uppercase tracking-wider">Panduan Penggunaan</span>
            </div>
            <div className="divide-y divide-[#F4F4F2]">
              {section.steps.map((s) => (
                <div key={s.step} className="px-4 py-4 flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">
                    {s.step}
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[13px] font-black text-[#1A1A1A]">{s.title}</p>
                    <p className="text-[12px] text-[#6B6B6B] leading-relaxed">{s.desc}</p>
                    {s.tip && (
                      <div className="flex items-start gap-1.5 mt-1 p-2 bg-amber-50 border border-amber-100 rounded-lg">
                        <Lightbulb size={11} className="text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-[11px] text-amber-700 font-medium leading-relaxed">{s.tip}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white border border-[#E8E8E6] rounded-2xl overflow-hidden">
            <div className="px-4 py-3.5 border-b border-[#F4F4F2] flex items-center gap-2">
              <HelpCircle size={13} className="text-orange-500" />
              <span className="text-[11px] font-black text-[#1A1A1A] uppercase tracking-wider">Pertanyaan Umum</span>
            </div>
            <div className="p-3">
              <FaqAccordion items={section.faq} />
            </div>
          </div>

          {/* Data note */}
          <div className="p-3.5 bg-orange-50 border border-orange-100 rounded-xl flex items-start gap-2.5">
            <AlertCircle size={14} className="text-orange-500 shrink-0 mt-0.5" />
            <p className="text-[12px] text-orange-700 leading-relaxed">
              Semua data yang ditampilkan adalah simulasi demo. Bukan data bisnis nyata.
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );

  return (
    <Shell
      title="Pusat Bantuan"
      subtitle="Panduan penggunaan Kuali"
      desktopContent={
        <div className="h-[calc(100vh-120px)] overflow-hidden">
          {content}
        </div>
      }
    >
      {mobileContent}
    </Shell>
  );
}
