export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("id-ID").format(num);
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatTime(timeStr: string): string {
  return timeStr;
}

export function formatWeight(value: number, unit: string): string {
  if (unit === "kg" && value < 1) {
    return `${Math.round(value * 1000)} gram`;
  }
  if (unit === "liter" && value < 1) {
    return `${Math.round(value * 1000)} ml`;
  }
  return `${value} ${unit}`;
}

export function getConfidenceLabel(score: number): string {
  if (score >= 85) return "Siap diapprove";
  if (score >= 70) return "Cek dulu";
  return "Perlu konfirmasi manual";
}

export function getConfidenceColor(score: number): string {
  if (score >= 85) return "#16A34A";
  if (score >= 70) return "#D97706";
  return "#DC2626";
}
