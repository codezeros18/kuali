import { BarChart2, CheckCircle, ChefHat, MessageCircle } from "lucide-react";

export const FEATURES = [
  {
    number: "01",
    badge: "AI Parser",
    Icon: MessageCircle,
    title: "Chat masuk,\norder rapi.",
    desc: "Pesan WhatsApp dari pelanggan langsung diparse jadi draft order otomatis — tanpa ketik ulang, tanpa salah baca. AI kami membaca konteks natural language seperti manusia.",
    accent: { pill: "bg-orange-50 text-orange-500 border-orange-100", bar: "bg-orange-500", num: "text-orange-100" },
  },
  {
    number: "02",
    badge: "Validasi",
    Icon: CheckCircle,
    title: "Owner tetap\npegang kendali.",
    desc: "Konfirmasi manual sebelum order masuk sistem. Setiap draft bisa diedit, disetujui, atau ditolak. Anti-salah, anti-kabur — keputusan ada di tangan kamu.",
    accent: { pill: "bg-emerald-50 text-emerald-600 border-emerald-100", bar: "bg-emerald-500", num: "text-emerald-100" },
  },
  {
    number: "03",
    badge: "Dapur",
    Icon: ChefHat,
    title: "Dapur siap\nsebelum subuh.",
    desc: "Estimasi bahan otomatis dari order aktual yang sudah dikonfirmasi. Tahu persis apa yang perlu dibeli, berapa jumlahnya, sebelum hari produksi dimulai.",
    accent: { pill: "bg-blue-50 text-blue-600 border-blue-100", bar: "bg-blue-500", num: "text-blue-100" },
  },
  {
    number: "04",
    badge: "Finansial",
    Icon: BarChart2,
    title: "Rekap harian\ntanpa ribet.",
    desc: "Semua order, pembayaran, dan status tersaji dalam satu layar ringkas. Tahu siapa belum bayar, berapa yang sudah masuk, dan tren performa harian dengan sekali lihat.",
    accent: { pill: "bg-violet-50 text-violet-600 border-violet-100", bar: "bg-violet-500", num: "text-violet-100" },
  },
];

export const OVERVIEW_ITEMS = [
  { Icon: MessageCircle, badge: "AI Parser", title: "Chat masuk, order rapi", desc: "Parse WA jadi draft order otomatis.", accent: "bg-orange-50 text-orange-500 border-orange-100" },
  { Icon: CheckCircle, badge: "Validasi", title: "Owner tetap pegang kendali", desc: "Konfirmasi manual, anti-salah, anti-kabur.", accent: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  { Icon: ChefHat, badge: "Dapur", title: "Dapur siap sebelum subuh", desc: "Estimasi bahan dari order aktual terkonfirmasi.", accent: "bg-blue-50 text-blue-600 border-blue-100" },
  { Icon: BarChart2, badge: "Finansial", title: "Rekap harian tanpa ribet", desc: "Semua order dan pembayaran dalam satu layar.", accent: "bg-violet-50 text-violet-600 border-violet-100" },
];

export const stats = [
  { value: 11, suffix: "+", label: "Order dikelola/hari" },
  { value: 95, suffix: "%", label: "Akurasi AI Parser" },
  { value: 12, prefix: "<", suffix: "s", label: "Kecepatan proses" },
];

export const metrics = [
  { val: "Rp 167rb", label: "Volume / hari" },
  { val: "< 1.2s", label: "Kecepatan proses" },
  { val: "100%", label: "Uptime simulasi" },
];

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export const scaleUp = {
  hidden: { opacity: 0, scale: 0.95, y: 18 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};
