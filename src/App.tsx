import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import FloatingContact from "@/components/feature/FloatingContact";
import ScrollToTop from "@/components/base/ScrollToTop";
import BookingChannelPopup from "@/components/feature/BookingChannelPopup";
import { preloadCoverImages } from "@/utils/googleSheetCover";
import { preloadRoomsImages } from "@/utils/googleSheetRooms";
import { preloadGuideImages } from "@/utils/googleSheetStayGuide";

function App() {
  // Clean up old localStorage bookings on first load
  useEffect(() => {
    try {
      localStorage.removeItem('hanoki_bookings');
    } catch {
      // ignore
    }
  }, []);

  // Tải sẵn ảnh cover và ảnh phòng ngay khi mở web để chuyển trang không bị nhấp nháy ảnh dự phòng
  useEffect(() => {
    preloadCoverImages();
    preloadRoomsImages();
    preloadGuideImages();
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter basename={__BASE_PATH__}>
        <ScrollToTop />
        <AppRoutes />
        <FloatingContact />
        <BookingChannelPopup />
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;