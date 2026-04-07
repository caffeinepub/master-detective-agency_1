import { MessageCircle, Phone } from "lucide-react";

interface FloatingButtonsProps {
  whatsapp?: string;
  phone?: string;
}

export function FloatingButtons({
  whatsapp = "+1234567890",
  phone = "+1234567890",
}: FloatingButtonsProps) {
  const whatsappUrl = `https://wa.me/${whatsapp.replace(/\D/g, "")}`;
  const phoneUrl = `tel:${phone}`;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3"
      role="complementary"
      aria-label="Quick contact buttons"
    >
      {/* Call button */}
      <a
        href={phoneUrl}
        data-ocid="floating.button"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-red-glow-sm hover:bg-[oklch(0.5_0.19_21)] transition-all duration-200 hover:scale-110"
        aria-label="Call us"
        title="Call Now"
      >
        <Phone className="h-5 w-5" />
      </a>

      {/* WhatsApp button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="floating.button"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-[oklch(0.55_0.15_145)] text-white shadow-lg hover:bg-[oklch(0.6_0.16_145)] transition-all duration-200 hover:scale-110"
        aria-label="WhatsApp us"
        title="WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
    </div>
  );
}
