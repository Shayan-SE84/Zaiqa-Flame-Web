import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import { buildWhatsAppUrl, RESTAURANT_CONFIG } from '../config/restaurantConfig';
import { storageService } from '../services/storageService';

interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const INITIAL_FORM: ContactFormState = {
  name: '',
  email: '',
  phone: '',
  subject: 'Order Inquiry',
  message: '',
};

export function ContactPage() {
  const [form, setForm] = useState<ContactFormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof ContactFormState, string>> = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      nextErrors.name = 'Please enter your full name.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (form.phone.trim() && form.phone.replace(/\D/g, '').length < 10) {
      nextErrors.phone = 'Please enter a valid phone number or leave blank.';
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      nextErrors.message = 'Please enter a message (at least 10 characters).';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    storageService.saveInquiry({
      id: `inq-${Date.now()}`,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      subject: form.subject,
      message: form.message.trim(),
      createdAt: new Date().toISOString(),
    });

    setSubmitted(true);
    setForm(INITIAL_FORM);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
      <div className="max-w-2xl mb-10">
        <p className="text-xs font-bold text-[#D9232D] mb-2">Get in Touch</p>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#121C2A]">
          Contact {RESTAURANT_CONFIG.name}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600">
          Questions about catering, custom spice levels, or live delivery status? Reach us instantly on WhatsApp, phone, or email.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left: Direct Contact Details */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-[#0B0F17] text-white rounded-2xl p-6 sm:p-7 space-y-5">
            <h2 className="font-display text-xl font-bold">Direct Restaurant Desk</h2>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#FEA619] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="block text-xs text-neutral-400">Phone & WhatsApp</span>
                  <a
                    href={`tel:${RESTAURANT_CONFIG.contact.whatsappNumber}`}
                    className="font-bold text-base text-white hover:text-[#FEA619] tabular-nums"
                  >
                    {RESTAURANT_CONFIG.contact.whatsappNumber}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#FEA619] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="block text-xs text-neutral-400">Email Address</span>
                  <a
                    href={`mailto:${RESTAURANT_CONFIG.contact.email}`}
                    className="font-semibold text-white hover:text-[#FEA619] break-all"
                  >
                    {RESTAURANT_CONFIG.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#FEA619] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="block text-xs text-neutral-400">Restaurant Location</span>
                  <p className="text-neutral-200">{RESTAURANT_CONFIG.contact.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#FEA619] shrink-0 mt-0.5" aria-hidden="true" />
                <div className="w-full">
                  <span className="block text-xs text-neutral-400 mb-1">Opening Hours</span>
                  <div className="space-y-1">
                    {RESTAURANT_CONFIG.hours.map((h) => (
                      <div key={h.days} className="flex justify-between gap-2 text-xs">
                        <span className="text-neutral-300">{h.days}</span>
                        <span className="tabular-nums font-semibold text-white">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <a
              href={buildWhatsAppUrl('Hello Zaiqa Flame! I would like to connect with your team.')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#D9232D] hover:bg-[#B3001A] text-white font-semibold text-sm px-5 py-3.5 rounded-xl shadow-[0_8px_20px_-4px_rgba(217,35,45,0.45)] transition-colors min-h-[46px]"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>Chat on WhatsApp ({RESTAURANT_CONFIG.contact.whatsappNumber})</span>
            </a>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-neutral-200/80">
            <h3 className="font-display text-base font-bold text-[#121C2A] mb-3">
              Follow Us
            </h3>
            <div className="flex flex-wrap gap-3 text-sm font-semibold">
              <a
                href={RESTAURANT_CONFIG.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg border border-neutral-200 hover:border-[#D9232D] hover:text-[#D9232D] transition-colors"
              >
                Instagram
              </a>
              <a
                href={RESTAURANT_CONFIG.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg border border-neutral-200 hover:border-[#D9232D] hover:text-[#D9232D] transition-colors"
              >
                Facebook
              </a>
              <a
                href={RESTAURANT_CONFIG.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg border border-neutral-200 hover:border-[#D9232D] hover:text-[#D9232D] transition-colors"
              >
                X / Twitter
              </a>
            </div>
          </div>
        </div>

        {/* Right: Validated Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/80 shadow-[0_4px_16px_-2px_rgba(17,24,39,0.05)]">
          <h2 className="font-display text-2xl font-bold text-[#121C2A] mb-1">
            Send Us a Message
          </h2>
          <p className="text-sm text-neutral-500 mb-6">
            Fill out the form below and our team will reply via email or phone shortly.
          </p>

          {submitted && (
            <div
              role="status"
              className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
              <div className="text-sm">
                <p className="font-bold">Message Received</p>
                <p className="mt-0.5 text-emerald-800">
                  Thank you for reaching out to {RESTAURANT_CONFIG.name}. For immediate ordering assistance, you can also message us on WhatsApp at {RESTAURANT_CONFIG.contact.whatsappNumber}.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold text-[#121C2A] mb-1">
                  Your Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, name: e.target.value }));
                    if (errors.name) setErrors((er) => ({ ...er, name: undefined }));
                    if (submitted) setSubmitted(false);
                  }}
                  placeholder="Full name"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F9FAFB] border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9232D]/25 focus:border-[#D9232D]"
                />
                {errors.name && <p className="mt-1 text-xs font-medium text-[#BA1A1A]">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-semibold text-[#121C2A] mb-1">
                  Email Address *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, email: e.target.value }));
                    if (errors.email) setErrors((er) => ({ ...er, email: undefined }));
                    if (submitted) setSubmitted(false);
                  }}
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F9FAFB] border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9232D]/25 focus:border-[#D9232D]"
                />
                {errors.email && <p className="mt-1 text-xs font-medium text-[#BA1A1A]">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-phone" className="block text-xs font-semibold text-[#121C2A] mb-1">
                  Phone Number (Optional)
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, phone: e.target.value }));
                    if (errors.phone) setErrors((er) => ({ ...er, phone: undefined }));
                  }}
                  placeholder="03XX-XXXXXXX"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F9FAFB] border border-neutral-200 rounded-lg tabular-nums focus:outline-none focus:ring-2 focus:ring-[#D9232D]/25 focus:border-[#D9232D]"
                />
                {errors.phone && <p className="mt-1 text-xs font-medium text-[#BA1A1A]">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-xs font-semibold text-[#121C2A] mb-1">
                  Topic
                </label>
                <select
                  id="contact-subject"
                  value={form.subject}
                  onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F9FAFB] border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9232D]/25 focus:border-[#D9232D]"
                >
                  <option value="Order Inquiry">Order Inquiry</option>
                  <option value="Event Catering">Event & Office Catering</option>
                  <option value="Table Reservation">Table Reservation</option>
                  <option value="Feedback">Feedback & Suggestions</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-semibold text-[#121C2A] mb-1">
                Message *
              </label>
              <textarea
                id="contact-message"
                rows={4}
                value={form.message}
                onChange={(e) => {
                  setForm((f) => ({ ...f, message: e.target.value }));
                  if (errors.message) setErrors((er) => ({ ...er, message: undefined }));
                  if (submitted) setSubmitted(false);
                }}
                placeholder="Tell us how we can help..."
                className="w-full px-3.5 py-2.5 text-sm bg-[#F9FAFB] border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9232D]/25 focus:border-[#D9232D]"
              />
              {errors.message && <p className="mt-1 text-xs font-medium text-[#BA1A1A]">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-[#D9232D] hover:bg-[#B3001A] text-white font-semibold text-sm px-6 py-3.5 rounded-xl shadow-[0_8px_20px_-4px_rgba(217,35,45,0.4)] transition-colors min-h-[46px]"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
