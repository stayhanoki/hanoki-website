import { useTranslation } from "react-i18next";

interface TermsSection {
  title: string;
  content: string;
}

interface TermsPopupProps {
  open: boolean;
  onClose: () => void;
}

export default function TermsPopup({ open, onClose }: TermsPopupProps) {
  const { t } = useTranslation("roomDetail");

  if (!open) return null;

  const sections = t("terms.sections", { returnObjects: true }) as TermsSection[];

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-background-50 w-full max-w-lg max-h-[85vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-5 md:px-6 py-4 border-b border-background-200/70">
          <h3 className="font-heading text-lg md:text-xl text-foreground-900">
            {t("terms.title")}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-foreground-400 hover:text-foreground-700 transition-colors cursor-pointer"
            aria-label={t("terms.close")}
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="overflow-y-auto px-5 md:px-6 py-5 space-y-5">
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="font-heading text-sm md:text-base font-semibold text-foreground-900 mb-1.5">
                {section.title}
              </h4>
              <p className="text-sm text-foreground-600 leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <div className="px-5 md:px-6 py-4 border-t border-background-200/70">
          <button
            type="button"
            onClick={onClose}
            className="w-full px-6 py-3 bg-[#F3EFE7] text-[#3A2A1E] border border-[#E0D6C8] text-sm font-semibold hover:bg-[#E7DDD0] active:bg-[#DDD0C1] transition-colors whitespace-nowrap cursor-pointer"
          >
            {t("terms.close")}
          </button>
        </div>
      </div>
    </div>
  );
}