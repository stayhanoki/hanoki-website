import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import { fetchBookingsFromSheet, hasSheetConfigured, type SheetBooking } from "@/utils/googleSheetBookings";

function escapeCSV(val: string | number): string {
  const s = String(val ?? "");
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function exportBookingsCSV(bookings: SheetBooking[]) {
  const todayStr = new Date().toISOString().slice(0, 10);

  const headers = [
    "Mã đặt phòng",
    "Ngày tạo",
    "Họ tên khách",
    "Email",
    "Điện thoại",
    "Phòng",
    "Địa điểm",
    "Nhận phòng",
    "Trả phòng",
    "Số đêm",
    "Số khách",
    "Đơn giá/đêm",
    "Tổng tiền",
    "Yêu cầu đặc biệt",
    "Trạng thái",
  ];

  const rows = bookings.map((b) => {
    const statusMap: Record<string, string> = {
      pending: "Chờ thanh toán",
      confirmed: b.check_out && b.check_out < todayStr ? "Đã trả phòng" : b.check_in && b.check_in <= todayStr ? "Đang ở" : "Sắp tới",
      cancelled: "Đã hủy",
    };

    return [
      escapeCSV(b.booking_code),
      escapeCSV(b.created_at ? b.created_at.slice(0, 10) : ""),
      escapeCSV(b.guest_name),
      escapeCSV(b.guest_email),
      escapeCSV(b.guest_phone),
      escapeCSV(b.room_name || b.room_id),
      escapeCSV(b.room_location),
      escapeCSV(b.check_in),
      escapeCSV(b.check_out),
      escapeCSV(b.nights),
      escapeCSV(b.guests_count),
      escapeCSV(b.price_per_night),
      escapeCSV(b.total_price),
      escapeCSV(b.special_request || ""),
      escapeCSV(statusMap[b.status] || b.status),
    ].join(",");
  });

  const bom = "\uFEFF";
  const csv = bom + [headers.join(","), ...rows].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `booking-report-${todayStr}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(price);
}

function formatDateShort(dateStr: string): string {
  if (!dateStr) return "—";
  return new Date(dateStr + "T00:00:00").toLocaleDateString("vi-VN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function computeStats(bookings: SheetBooking[]) {
  const todayStr = new Date().toISOString().slice(0, 10);

  let revenue = 0;
  let upcoming = 0;
  let today = 0;

  for (const b of bookings) {
    if (b.status === "cancelled") continue;
    revenue += b.total_price;
    if (b.check_in && b.check_in >= todayStr) upcoming++;
    if (b.check_in === todayStr) today++;
  }

  return {
    total: bookings.length,
    revenue,
    upcoming,
    today,
  };
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<SheetBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [expandedCode, setExpandedCode] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBookingsFromSheet();
      setBookings(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể tải dữ liệu. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const stats = useMemo(() => computeStats(bookings), [bookings]);

  const filtered = useMemo(() => {
    if (!search.trim()) return bookings;
    const q = search.trim().toLowerCase();
    return bookings.filter(
      (b) =>
        b.booking_code.toLowerCase().includes(q) ||
        b.guest_name.toLowerCase().includes(q) ||
        (b.room_name || "").toLowerCase().includes(q) ||
        (b.room_location || "").toLowerCase().includes(q)
    );
  }, [bookings, search]);

  const toggleExpand = useCallback((code: string) => {
    setExpandedCode((prev) => (prev === code ? null : code));
  }, []);

  const booking = expandedCode ? bookings.find((b) => b.booking_code === expandedCode) : null;

  return (
    <div className="min-h-screen bg-background-50">
      <Navbar />

      <div className="pt-24 md:pt-28 pb-12 md:pb-16 px-6 md:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 md:mb-10">
            <div>
              <p className="text-sm text-foreground-400 font-medium tracking-wide uppercase mb-2">
                Admin
              </p>
              <h1 className="font-heading text-3xl sm:text-4xl text-foreground-900 leading-tight">
                Quản lý đặt phòng
              </h1>
              <p className="mt-2 text-foreground-500 text-sm">
                Xem tất cả đặt phòng từ Google Sheet. Chỉnh sửa trực tiếp trên Google Sheet.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => exportBookingsCSV(bookings)}
                disabled={bookings.length === 0}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <i className="ri-download-line"></i>
                Xuất CSV
              </button>
              <button
                type="button"
                onClick={fetchBookings}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-background-100 border border-background-200 text-foreground-700 text-sm font-medium hover:bg-background-200 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-refresh-line"></i>
                Làm mới
              </button>
            </div>
          </div>

          {!hasSheetConfigured() && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-start gap-3">
                <i className="ri-information-line text-amber-600 text-lg mt-0.5"></i>
                <div>
                  <p className="text-sm font-medium text-amber-800">Google Sheet chưa được kết nối</p>
                  <p className="text-xs text-amber-700 mt-1">
                    Vui lòng thêm VITE_PUBLIC_GOOGLE_SHEET_URL vào file .env và khởi động lại.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-background-50 border border-background-200/70 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 flex items-center justify-center bg-accent-100">
                  <i className="ri-file-list-3-line text-accent-600 text-lg"></i>
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-heading font-bold text-foreground-900">
                {loading ? "--" : stats.total}
              </p>
              <p className="text-xs text-foreground-500 mt-1">Tổng đặt phòng</p>
            </div>
            <div className="bg-background-50 border border-background-200/70 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 flex items-center justify-center bg-accent-100">
                  <i className="ri-money-dollar-circle-line text-accent-600 text-lg"></i>
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-heading font-bold text-foreground-900">
                {loading ? "--" : formatPrice(stats.revenue)}
              </p>
              <p className="text-xs text-foreground-500 mt-1">Tổng doanh thu</p>
            </div>
            <div className="bg-background-50 border border-background-200/70 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 flex items-center justify-center bg-accent-100">
                  <i className="ri-calendar-todo-line text-accent-600 text-lg"></i>
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-heading font-bold text-foreground-900">
                {loading ? "--" : stats.upcoming}
              </p>
              <p className="text-xs text-foreground-500 mt-1">Sắp tới</p>
            </div>
            <div className="bg-background-50 border border-background-200/70 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 flex items-center justify-center bg-accent-100">
                  <i className="ri-calendar-check-line text-accent-600 text-lg"></i>
                </div>
              </div>
              <p className="text-2xl md:text-3xl font-heading font-bold text-foreground-900">
                {loading ? "--" : stats.today}
              </p>
              <p className="text-xs text-foreground-500 mt-1">Nhận phòng hôm nay</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-foreground-400 text-sm"></i>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo mã, tên khách, tên phòng hoặc địa điểm..."
              className="w-full bg-background-50 border border-background-200 pl-11 pr-4 py-3 text-sm text-foreground-800 outline-none focus:border-foreground-400 transition-colors placeholder:text-foreground-400"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center bg-background-200 hover:bg-background-300 transition-colors cursor-pointer"
                aria-label="Xoá tìm kiếm"
              >
                <i className="ri-close-line text-xs text-foreground-500"></i>
              </button>
            )}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20 bg-background-50 border border-background-200/70">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-5">
                <i className="ri-loader-4-line text-2xl text-foreground-400 animate-spin"></i>
              </div>
              <p className="text-sm text-foreground-500">Đang tải dữ liệu...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-16 bg-background-50 border border-background-200/70">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 mb-5">
                <i className="ri-error-warning-line text-2xl text-red-500"></i>
              </div>
              <p className="text-sm text-red-600 mb-4">{error}</p>
              <button
                type="button"
                onClick={fetchBookings}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-refresh-line"></i>
                Thử lại
              </button>
            </div>
          )}

          {/* Booking Table */}
          {!loading && !error && (
            <>
              {filtered.length === 0 ? (
                <div className="text-center py-20 bg-background-50 border border-background-200/70">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-background-200 mb-5">
                    <i className="ri-inbox-line text-2xl text-foreground-400"></i>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground-800 mb-2">
                    {search.trim() ? "Không tìm thấy đặt phòng" : "Chưa có đặt phòng nào"}
                  </h3>
                  <p className="text-sm text-foreground-500 max-w-sm mx-auto">
                    {search.trim()
                      ? "Không có booking nào khớp với từ khoá tìm kiếm."
                      : hasSheetConfigured()
                        ? "Google Sheet đang trống hoặc dữ liệu chưa được nhập."
                        : "Vui lòng kết nối Google Sheet để hiển thị dữ liệu."}
                  </p>
                </div>
              ) : (
                <div className="bg-background-50 border border-background-200/70 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-background-200/70">
                          <th className="text-left px-5 py-4 text-xs font-semibold text-foreground-400 uppercase tracking-wider whitespace-nowrap">
                            Mã đặt phòng
                          </th>
                          <th className="text-left px-5 py-4 text-xs font-semibold text-foreground-400 uppercase tracking-wider whitespace-nowrap">
                            Khách hàng
                          </th>
                          <th className="text-left px-5 py-4 text-xs font-semibold text-foreground-400 uppercase tracking-wider whitespace-nowrap">
                            Phòng
                          </th>
                          <th className="text-left px-5 py-4 text-xs font-semibold text-foreground-400 uppercase tracking-wider whitespace-nowrap">
                            Nhận phòng
                          </th>
                          <th className="text-left px-5 py-4 text-xs font-semibold text-foreground-400 uppercase tracking-wider whitespace-nowrap">
                            Trả phòng
                          </th>
                          <th className="text-right px-5 py-4 text-xs font-semibold text-foreground-400 uppercase tracking-wider whitespace-nowrap">
                            Tổng tiền
                          </th>
                          <th className="text-center px-5 py-4 text-xs font-semibold text-foreground-400 uppercase tracking-wider whitespace-nowrap">
                            Khách
                          </th>
                          <th className="text-center px-5 py-4 text-xs font-semibold text-foreground-400 uppercase tracking-wider whitespace-nowrap">
                            Trạng thái
                          </th>
                          <th className="w-10 px-5 py-4"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map((b) => {
                          const todayStr = new Date().toISOString().slice(0, 10);
                          const rawStatus = b.status || "confirmed";
                          let statusText: string;
                          let statusColor: string;

                          if (rawStatus === "cancelled") {
                            statusText = "Đã hủy";
                            statusColor = "bg-red-50 text-red-600";
                          } else if (rawStatus === "pending") {
                            statusText = "Chờ thanh toán";
                            statusColor = "bg-amber-50 text-amber-700";
                          } else if (b.check_out && b.check_out < todayStr) {
                            statusText = "Đã trả phòng";
                            statusColor = "bg-background-200 text-foreground-500";
                          } else if (b.check_in && b.check_in <= todayStr) {
                            statusText = "Đang ở";
                            statusColor = "bg-accent-100 text-accent-800";
                          } else {
                            statusText = "Sắp tới";
                            statusColor = "bg-background-100 text-foreground-700";
                          }

                          const isExpanded = expandedCode === b.booking_code;

                          return (
                            <tr key={b.booking_code} className="border-b border-background-100 hover:bg-background-50 transition-colors">
                              <td className="px-5 py-4">
                                <span className="font-mono text-xs font-semibold text-foreground-800 tracking-wider whitespace-nowrap">
                                  {b.booking_code}
                                </span>
                                <p className="text-[11px] text-foreground-400 mt-0.5">
                                  {b.created_at ? formatDateShort(b.created_at) : "—"}
                                </p>
                              </td>
                              <td className="px-5 py-4">
                                <p className="text-sm font-medium text-foreground-800 whitespace-nowrap">
                                  {b.guest_name}
                                </p>
                                <p className="text-xs text-foreground-500 truncate max-w-[160px]">
                                  {b.guest_email}
                                </p>
                              </td>
                              <td className="px-5 py-4">
                                <p className="text-sm text-foreground-800 whitespace-nowrap">
                                  {b.room_name || b.room_id}
                                </p>
                                <p className="text-xs text-foreground-500">
                                  {b.room_location || ""}
                                </p>
                              </td>
                              <td className="px-5 py-4">
                                <p className="text-sm text-foreground-800 whitespace-nowrap">
                                  {formatDateShort(b.check_in)}
                                </p>
                                <p className="text-xs text-foreground-500">
                                  {b.nights} đêm
                                </p>
                              </td>
                              <td className="px-5 py-4">
                                <p className="text-sm text-foreground-800 whitespace-nowrap">
                                  {formatDateShort(b.check_out)}
                                </p>
                              </td>
                              <td className="px-5 py-4 text-right">
                                <p className="text-sm font-semibold text-foreground-800 whitespace-nowrap">
                                  {formatPrice(b.total_price)}
                                </p>
                              </td>
                              <td className="px-5 py-4 text-center">
                                <span className="text-sm text-foreground-700">{b.guests_count}</span>
                              </td>
                              <td className="px-5 py-4 text-center">
                                <span className={`inline-block px-2.5 py-1 text-[11px] font-medium ${statusColor}`}>
                                  {statusText}
                                </span>
                              </td>
                              <td className="px-5 py-4 text-center">
                                <button
                                  type="button"
                                  onClick={() => toggleExpand(b.booking_code)}
                                  className="w-8 h-8 flex items-center justify-center hover:bg-background-100 transition-colors cursor-pointer"
                                  aria-label={isExpanded ? "Thu gọn" : "Xem chi tiết"}
                                >
                                  <i
                                    className={`ri-arrow-down-s-line text-foreground-500 transition-transform duration-200 ${
                                      isExpanded ? "rotate-180" : ""
                                    }`}
                                  ></i>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Expanded Detail Panel */}
                  {booking && (
                    <div className="border-t border-background-200/70 p-5 md:p-7 animate-[fadeIn_0.25s_ease-out]">
                      <div className="flex items-center justify-between mb-5">
                        <h3 className="font-heading text-base font-semibold text-foreground-800">
                          Chi tiết đặt phòng — {booking.booking_code}
                        </h3>
                        <button
                          type="button"
                          onClick={() => setExpandedCode(null)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-background-100 transition-colors cursor-pointer"
                          aria-label="Đóng"
                        >
                          <i className="ri-close-line text-foreground-500"></i>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Left: contact info */}
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground-400 mb-3">
                            Thông tin liên hệ
                          </h4>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-foreground-500">Họ tên</p>
                              <p className="text-sm text-foreground-800 font-medium">{booking.guest_name}</p>
                            </div>
                            <div>
                              <p className="text-xs text-foreground-500">Email</p>
                              <p className="text-sm text-foreground-800 break-all">{booking.guest_email}</p>
                            </div>
                            <div>
                              <p className="text-xs text-foreground-500">Điện thoại</p>
                              <p className="text-sm text-foreground-800">{booking.guest_phone}</p>
                            </div>
                            {booking.special_request && (
                              <div>
                                <p className="text-xs text-foreground-500">Yêu cầu đặc biệt</p>
                                <p className="text-sm text-foreground-800">{booking.special_request}</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Middle: stay info */}
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground-400 mb-3">
                            Thông tin lưu trú
                          </h4>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-foreground-500">Phòng</p>
                              <p className="text-sm text-foreground-800 font-medium">{booking.room_name || booking.room_id}</p>
                              <p className="text-xs text-foreground-500">{booking.room_location || ""}</p>
                            </div>
                            <div className="flex gap-6">
                              <div>
                                <p className="text-xs text-foreground-500">Nhận phòng</p>
                                <p className="text-sm text-foreground-800 font-medium">{formatDateShort(booking.check_in)}</p>
                              </div>
                              <div>
                                <p className="text-xs text-foreground-500">Trả phòng</p>
                                <p className="text-sm text-foreground-800 font-medium">{formatDateShort(booking.check_out)}</p>
                              </div>
                            </div>
                            <div className="flex gap-6">
                              <div>
                                <p className="text-xs text-foreground-500">Số đêm</p>
                                <p className="text-sm text-foreground-800 font-medium">{booking.nights}</p>
                              </div>
                              <div>
                                <p className="text-xs text-foreground-500">Số khách</p>
                                <p className="text-sm text-foreground-800 font-medium">{booking.guests_count}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right: payment */}
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground-400 mb-3">
                            Thanh toán
                          </h4>
                          <div className="space-y-2 mb-5">
                            <div className="flex justify-between text-sm">
                              <span className="text-foreground-500">{formatPrice(booking.price_per_night)} x {booking.nights} đêm</span>
                              <span className="text-foreground-700">{formatPrice(booking.total_price)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-foreground-500">Phí + Thuế</span>
                              <span className="text-foreground-400">Đã bao gồm</span>
                            </div>
                            <div className="border-t border-background-200/50 pt-2 mt-2 flex justify-between">
                              <span className="text-sm font-semibold text-foreground-800">Tổng</span>
                              <span className="text-sm font-bold text-foreground-900">{formatPrice(booking.total_price)}</span>
                            </div>
                          </div>

                          <p className="text-xs text-foreground-400">
                            Quản lý trạng thái booking trực tiếp trên Google Sheet.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* Back to site */}
          <div className="mt-8 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-foreground-500 hover:text-foreground-700 transition-colors"
            >
              <i className="ri-arrow-left-line"></i>
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(-4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}