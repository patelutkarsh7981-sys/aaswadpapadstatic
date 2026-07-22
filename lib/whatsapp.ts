import { manufacturer } from "@/data/products";

const defaultMessage = "Hello Aaswad Papad, I would like to know more about your products.";

export function getWhatsAppUrl(message = defaultMessage) {
  const phone = `91${manufacturer.phone.replace(/\D/g, "")}`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
