import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  Check,
  Copy,
  ExternalLink,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import {
  buildWhatsAppUrl,
  formatPKR,
  RESTAURANT_CONFIG,
} from '../config/restaurantConfig';
import { useRestaurant } from '../context/RestaurantContext';
import { CustomerInfo, OrderRecord } from '../types/restaurant';

type DrawerStep = 'cart' | 'checkout' | 'confirmed';

export function CartDrawer() {
  const {
    cartOpen,
    setCartOpen,
    cart,
    totalItems,
    subtotal,
    deliveryFee,
    total,
    updateQuantity,
    removeFromCart,
    clearCart,
    customerInfo,
    placeWhatsAppOrder,
    formatWhatsAppOrderMessage,
    navigate,
    showToast,
  } = useRestaurant();

  const [step, setStep] = useState<DrawerStep>('cart');
  const [form, setForm] = useState<CustomerInfo>(customerInfo);
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerInfo, string>>>({});
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);
  const [copied, setCopied] = useState(false);
  const waAnchorRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    setForm(customerInfo);
  }, [customerInfo]);

  useEffect(() => {
    if (!cartOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCartOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [cartOpen, setCartOpen]);

  if (!cartOpen) return null;

  const remainingForFreeDelivery = Math.max(
    0,
    RESTAURANT_CONFIG.ordering.freeDeliveryThreshold - subtotal
  );

  const validateCheckout = (): boolean => {
    const nextErrors: Partial<Record<keyof CustomerInfo, string>> = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      nextErrors.name = 'Please enter your full name.';
    }
    const cleanPhone = form.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      nextErrors.phone = 'Enter a valid phone number (e.g., 03001234567).';
    }
    if (!form.address.trim() || form.address.trim().length < 8) {
      nextErrors.address = 'Please enter your complete delivery address.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCheckout()) return;

    const orderRecord = placeWhatsAppOrder(form);
    setConfirmedOrder(orderRecord);
    setStep('confirmed');
    clearCart();

    // Trigger external WhatsApp link cleanly via hidden anchor on user submit gesture
    window.setTimeout(() => {
      waAnchorRef.current?.click();
    }, 50);
  };

  const handleCopyMessage = async () => {
    if (!confirmedOrder) return;
    try {
      await navigator.clipboard.writeText(confirmedOrder.whatsappMessage);
      setCopied(true);
      showToast('Order message copied');
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      showToast('Unable to copy automatically');
    }
  };

  const closeAndResetStep = () => {
    setCartOpen(false);
    if (step === 'confirmed') {
      setStep('cart');
    }
  };

  const previewMessage = formatWhatsAppOrderMessage(form);
  const confirmedWaUrl = confirmedOrder ? buildWhatsAppUrl(confirmedOrder.whatsappMessage) : '#';

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#0B0F17]/65 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart and WhatsApp Checkout"
      onClick={closeAndResetStep}
    >
      <aside
        className="w-full max-w-md bg-white h-full flex flex-col shadow-[0_20px_40px_-8px_rgba(11,15,23,0.3)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Charcoal Drawer Header */}
        <div className="bg-[#0B0F17] text-white px-5 py-4 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            {step === 'checkout' && (
              <button
                type="button"
                onClick={() => setStep('cart')}
                aria-label="Back to cart"
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <ShoppingBag className="w-5 h-5 text-[#FEA619]" aria-hidden="true" />
            <h2 className="font-display text-lg font-bold">
              {step === 'cart' && `Your Order (${totalItems})`}
              {step === 'checkout' && 'Delivery Details'}
              {step === 'confirmed' && 'Order Ready for WhatsApp'}
            </h2>
          </div>

          <button
            type="button"
            onClick={closeAndResetStep}
            aria-label="Close cart drawer"
            className="p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: CART ITEMS */}
        {step === 'cart' && (
          <>
            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-neutral-400" aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl font-bold text-[#121C2A]">
                  Your cart is empty
                </h3>
                <p className="mt-2 text-sm text-neutral-500 max-w-xs">
                  Add crispy burgers, steaming biryani, gol gappay, or chilled drinks to begin your order.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setCartOpen(false);
                    navigate('menu');
                  }}
                  className="mt-6 bg-[#D9232D] hover:bg-[#B3001A] text-white font-semibold text-sm px-6 py-3 rounded-lg shadow-[0_8px_20px_-4px_rgba(217,35,45,0.4)] transition-colors"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              <>
                {/* Free delivery threshold notice */}
                <div className="px-5 py-2.5 bg-[#FFFBEB] border-b border-amber-200/70 text-xs font-medium text-[#684000]">
                  {remainingForFreeDelivery > 0 ? (
                    <span>
                      Add <strong className="tabular-nums">{formatPKR(remainingForFreeDelivery)}</strong> more for free delivery.
                    </span>
                  ) : (
                    <span>Your order qualifies for free delivery.</span>
                  )}
                </div>

                {/* Items List */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-500">
                      {cart.length} {cart.length === 1 ? 'dish' : 'dishes'} selected
                    </span>
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-xs font-semibold text-[#D9232D] hover:underline"
                    >
                      Clear Cart
                    </button>
                  </div>

                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3.5 pb-4 border-b border-neutral-100 last:border-b-0"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 bg-neutral-100"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="text-sm font-bold text-[#121C2A] truncate">
                              {item.name}
                            </h3>
                            <p className="text-xs text-neutral-500">
                              {item.category} · <span className="tabular-nums">{formatPKR(item.price)}</span>
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Remove ${item.name}`}
                            className="p-1 text-neutral-400 hover:text-[#D9232D] transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="mt-2.5 flex items-center justify-between">
                          <div className="inline-flex items-center border border-neutral-200 rounded-lg bg-neutral-50">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              aria-label={`Decrease quantity of ${item.name}`}
                              className="w-7 h-7 flex items-center justify-center text-[#121C2A] hover:bg-neutral-200/70 rounded-l-lg"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="tabular-nums w-8 text-center text-xs font-bold text-[#121C2A]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label={`Increase quantity of ${item.name}`}
                              className="w-7 h-7 flex items-center justify-center text-[#121C2A] hover:bg-neutral-200/70 rounded-r-lg"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <span className="tabular-nums text-sm font-extrabold text-[#121C2A]">
                            {formatPKR(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals & Proceed CTA */}
                <div className="p-5 bg-[#FAFAFA] border-t border-neutral-200 space-y-3 shrink-0">
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-neutral-600">
                      <span>Subtotal</span>
                      <span className="tabular-nums font-semibold text-[#121C2A]">
                        {formatPKR(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-neutral-600">
                      <span>Delivery Fee</span>
                      <span className="tabular-nums font-semibold text-[#121C2A]">
                        {deliveryFee === 0 ? 'FREE' : formatPKR(deliveryFee)}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-neutral-200 flex justify-between items-baseline">
                      <span className="font-display font-bold text-base text-[#121C2A]">Total</span>
                      <span className="tabular-nums font-extrabold text-xl text-[#D9232D]">
                        {formatPKR(total)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep('checkout')}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#D9232D] hover:bg-[#B3001A] text-white font-semibold text-sm px-5 py-3.5 rounded-xl shadow-[0_8px_24px_-4px_rgba(217,35,45,0.45)] transition-colors min-h-[48px]"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>Order via WhatsApp</span>
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {/* STEP 2: CUSTOMER CHECKOUT FORM */}
        {step === 'checkout' && (
          <form onSubmit={handlePlaceOrder} className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              <p className="text-xs text-neutral-600 leading-relaxed">
                Enter your delivery details below. Your itemized order will open directly in WhatsApp ({RESTAURANT_CONFIG.contact.whatsappNumber}).
              </p>

              <div>
                <label htmlFor="checkout-name" className="block text-xs font-semibold text-[#121C2A] mb-1">
                  Customer Name *
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, name: e.target.value }));
                    if (errors.name) setErrors((er) => ({ ...er, name: undefined }));
                  }}
                  placeholder="e.g., Shayan Khan"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F9FAFB] border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9232D]/25 focus:border-[#D9232D]"
                />
                {errors.name && <p className="mt-1 text-xs font-medium text-[#BA1A1A]">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="checkout-phone" className="block text-xs font-semibold text-[#121C2A] mb-1">
                  Phone Number *
                </label>
                <input
                  id="checkout-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, phone: e.target.value }));
                    if (errors.phone) setErrors((er) => ({ ...er, phone: undefined }));
                  }}
                  placeholder="e.g., 03282305784"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F9FAFB] border border-neutral-200 rounded-lg tabular-nums focus:outline-none focus:ring-2 focus:ring-[#D9232D]/25 focus:border-[#D9232D]"
                />
                {errors.phone && <p className="mt-1 text-xs font-medium text-[#BA1A1A]">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="checkout-address" className="block text-xs font-semibold text-[#121C2A] mb-1">
                  Delivery Address *
                </label>
                <textarea
                  id="checkout-address"
                  rows={2}
                  value={form.address}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, address: e.target.value }));
                    if (errors.address) setErrors((er) => ({ ...er, address: undefined }));
                  }}
                  placeholder="House / Flat #, Street, Sector / Block, City"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F9FAFB] border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9232D]/25 focus:border-[#D9232D]"
                />
                {errors.address && (
                  <p className="mt-1 text-xs font-medium text-[#BA1A1A]">{errors.address}</p>
                )}
              </div>

              <div>
                <label htmlFor="checkout-notes" className="block text-xs font-semibold text-[#121C2A] mb-1">
                  Additional Instructions (Optional)
                </label>
                <textarea
                  id="checkout-notes"
                  rows={2}
                  value={form.instructions}
                  onChange={(e) => setForm((f) => ({ ...f, instructions: e.target.value }))}
                  placeholder="Spice level, extra raita, ring bell on arrival..."
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F9FAFB] border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9232D]/25 focus:border-[#D9232D]"
                />
              </div>

              {/* Live Order Summary Preview */}
              <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#121C2A]">
                  <span>Order Summary ({totalItems} items)</span>
                  <span className="tabular-nums text-[#D9232D]">{formatPKR(total)}</span>
                </div>
                <pre className="text-[11px] text-neutral-600 whitespace-pre-wrap font-sans leading-relaxed max-h-36 overflow-y-auto">
                  {previewMessage}
                </pre>
              </div>
            </div>

            <div className="p-5 bg-[#FAFAFA] border-t border-neutral-200 shrink-0">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#D9232D] hover:bg-[#B3001A] text-white font-semibold text-sm px-5 py-3.5 rounded-xl shadow-[0_8px_24px_-4px_rgba(217,35,45,0.45)] transition-colors min-h-[48px]"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Confirm & Open WhatsApp</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: ORDER CONFIRMED / WHATSAPP LAUNCH */}
        {step === 'confirmed' && confirmedOrder && (
          <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-between gap-6">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#FEF08A] text-[#684000] flex items-center justify-center mb-4">
                <Check className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#121C2A]">
                Order #{confirmedOrder.id} Prepared
              </h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                Your order details have been formatted for WhatsApp. Click below to open WhatsApp and send your order directly to{' '}
                <strong className="text-[#121C2A] tabular-nums">
                  {RESTAURANT_CONFIG.contact.whatsappNumber}
                </strong>
                .
              </p>

              <div className="mt-5 p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                <div className="flex items-center justify-between text-xs font-bold text-[#121C2A] mb-2">
                  <span>Formatted Order Receipt</span>
                  <span className="tabular-nums text-[#D9232D]">
                    {formatPKR(confirmedOrder.total)}
                  </span>
                </div>
                <pre className="text-xs text-neutral-700 whitespace-pre-wrap font-sans leading-relaxed max-h-56 overflow-y-auto">
                  {confirmedOrder.whatsappMessage}
                </pre>
              </div>
            </div>

            <div className="space-y-2.5">
              <a
                ref={waAnchorRef}
                href={confirmedWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#D9232D] hover:bg-[#B3001A] text-white font-semibold text-sm px-5 py-3.5 rounded-xl shadow-[0_8px_24px_-4px_rgba(217,35,45,0.45)] transition-colors min-h-[48px]"
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
                <span>Send Order on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleCopyMessage}
                className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-neutral-50 text-[#121C2A] border border-neutral-300 font-semibold text-sm px-5 py-3 rounded-xl transition-colors min-h-[44px]"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied Order Text' : 'Copy Order Message'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep('cart');
                  setCartOpen(false);
                }}
                className="w-full text-center text-xs font-semibold text-neutral-500 hover:text-[#121C2A] py-2"
              >
                Continue Browsing Menu
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
