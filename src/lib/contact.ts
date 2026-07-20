/**
 * Contact endpoints shared by every CTA on the site.
 *
 * WhatsApp is message-only — it's a US number, so pages must never frame
 * it as a phone line to call.
 */
export const EMAIL = 'seekshaurya@gmail.com';

export const EMAIL_HREF =
  'mailto:seekshaurya@gmail.com?subject=Website%20for%20my%20business';

export const WHATSAPP_DISPLAY = '+1 (630) 915-0320';

export const WHATSAPP_HREF =
  'https://wa.me/16309150320?text=' +
  encodeURIComponent("Hi Shaurya, I'd like a website for my business.");
