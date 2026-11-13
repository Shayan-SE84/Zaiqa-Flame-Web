import React, { useState } from 'react';
import { Pencil, Plus, RotateCcw, Trash2, X } from 'lucide-react';
import { formatPKR } from '../config/restaurantConfig';
import { useRestaurant } from '../context/RestaurantContext';
import { FOOD_IMAGES } from '../data/foodImages';
import { FoodCategory, MenuItem, SpiceLevel } from '../types/restaurant';

const CATEGORIES: FoodCategory[] = ['Fast Food', 'Biryani', 'Gol Gappay', 'Chaat', 'Drinks'];
const SPICE_LEVELS: SpiceLevel[] = ['Mild', 'Medium', 'Spicy', 'Tangy', 'Chilled'];

const IMAGE_PRESETS: { label: string; value: string }[] = [
  { label: 'Zinger Burger', value: FOOD_IMAGES.zingerBurger },
  { label: 'Gourmet Beef/Chicken Burger', value: FOOD_IMAGES.gourmetBurger },
  { label: 'Stone-Baked Pizza', value: FOOD_IMAGES.artisanPizza },
  { label: 'Fries & Shawarma', value: FOOD_IMAGES.friesShawarma },
  { label: 'Club Sandwich', value: FOOD_IMAGES.clubSandwich },
  { label: 'Chicken Biryani', value: FOOD_IMAGES.chickenBiryani },
  { label: 'Beef Biryani / Pulao', value: FOOD_IMAGES.beefBiryaniPulao },
  { label: 'Gol Gappay', value: FOOD_IMAGES.golGappay },
  { label: 'Dahi Bhallay & Chaat', value: FOOD_IMAGES.chaatBhallay },
  { label: 'Cold Drinks & Juices', value: FOOD_IMAGES.coldDrinksJuice },
];

interface FormState {
  id?: string;
  name: string;
  category: FoodCategory;
  price: string;
  originalPrice: string;
  description: string;
  image: string;
  prepTime: string;
  spiceLevel: SpiceLevel;
  servingSize: string;
  offerLabel: string;
  isPopular: boolean;
}

const EMPTY_FORM: FormState = {
  name: '',
  category: 'Fast Food',
  price: '',
  originalPrice: '',
  description: '',
  image: FOOD_IMAGES.zingerBurger,
  prepTime: '15 min',
  spiceLevel: 'Medium',
  servingSize: '1 Serving',
  offerLabel: '',
  isPopular: false,
};

export function OwnerMenuModal() {
  const {
    ownerModalOpen,
    setOwnerModalOpen,
    menuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    resetMenuItems,
  } = useRestaurant();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [formError, setFormError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  if (!ownerModalOpen) return null;

  const startEdit = (item: MenuItem) => {
    setEditingId(item.id);
    setFormError('');
    setForm({
      id: item.id,
      name: item.name,
      category: item.category,
      price: String(item.price),
      originalPrice: item.originalPrice ? String(item.originalPrice) : '',
      description: item.description,
      image: item.image,
      prepTime: item.prepTime,
      spiceLevel: item.spiceLevel,
      servingSize: item.servingSize || '',
      offerLabel: item.offerLabel || '',
      isPopular: Boolean(item.isPopular),
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = form.name.trim();
    const numericPrice = Number(form.price);
    const numericOriginal = form.originalPrice ? Number(form.originalPrice) : undefined;

    if (!trimmedName) {
      setFormError('Please enter a food item name.');
      return;
    }
    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      setFormError('Please enter a valid price in PKR.');
      return;
    }
    if (numericOriginal !== undefined && (!Number.isFinite(numericOriginal) || numericOriginal <= numericPrice)) {
      setFormError('Original price must be higher than the selling price.');
      return;
    }

    const payload: Omit<MenuItem, 'id'> = {
      name: trimmedName,
      category: form.category,
      price: Math.round(numericPrice),
      originalPrice: numericOriginal ? Math.round(numericOriginal) : undefined,
      description:
        form.description.trim() ||
        `Freshly prepared ${trimmedName} cooked to order with authentic spices.`,
      image: form.image.trim() || FOOD_IMAGES.zingerBurger,
      imageAlt: `${trimmedName} — ${form.category}`,
      prepTime: form.prepTime.trim() || '15 min',
      spiceLevel: form.spiceLevel,
      servingSize: form.servingSize.trim() || 'Standard Portion',
      offerLabel: form.offerLabel.trim() || undefined,
      isPopular: form.isPopular,
    };

    if (editingId) {
      updateMenuItem({ ...payload, id: editingId });
    } else {
      addMenuItem(payload);
    }
    resetForm();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0F17]/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="owner-modal-title"
      onClick={() => setOwnerModalOpen(false)}
    >
      <div
        className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0B0F17] text-white px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <h2 id="owner-modal-title" className="font-display text-xl font-bold">
              Menu Manager
            </h2>
            <p className="text-xs text-neutral-300 mt-0.5">
              Add, edit, or remove menu items and PKR prices. Changes save automatically.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {confirmReset ? (
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                <span className="text-xs text-[#FEF08A]">Restore defaults?</span>
                <button
                  type="button"
                  onClick={() => {
                    resetMenuItems();
                    resetForm();
                    setConfirmReset(false);
                  }}
                  className="text-xs font-bold bg-[#D9232D] px-2.5 py-1 rounded text-white"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="text-xs text-neutral-300 hover:text-white px-1.5"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-300 hover:text-white px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => setOwnerModalOpen(false)}
              aria-label="Close Menu Manager"
              className="p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-neutral-200">
          {/* Left Form: Add / Edit */}
          <form onSubmit={handleSubmit} className="lg:col-span-5 p-6 space-y-4 bg-[#FAFAFA]">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-bold text-[#121C2A]">
                {editingId ? 'Edit Food Item' : 'Add New Food Item'}
              </h3>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-xs font-semibold text-[#D9232D] hover:underline"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            {formError && (
              <div className="text-xs font-semibold text-[#93000A] bg-[#FFDAD6] px-3 py-2 rounded-lg">
                {formError}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#121C2A] mb-1">
                Item Name *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g., Loaded Cheese Fries"
                className="w-full px-3 py-2.5 text-sm bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9232D]/30 focus:border-[#D9232D]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#121C2A] mb-1">
                  Category *
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, category: e.target.value as FoodCategory }))
                  }
                  className="w-full px-3 py-2.5 text-sm bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9232D]/30 focus:border-[#D9232D]"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#121C2A] mb-1">
                  Flavor / Heat
                </label>
                <select
                  value={form.spiceLevel}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, spiceLevel: e.target.value as SpiceLevel }))
                  }
                  className="w-full px-3 py-2.5 text-sm bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9232D]/30 focus:border-[#D9232D]"
                >
                  {SPICE_LEVELS.map((sp) => (
                    <option key={sp} value={sp}>
                      {sp}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#121C2A] mb-1">
                  Price (PKR) *
                </label>
                <input
                  type="number"
                  min="1"
                  value={form.price}
                  onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                  placeholder="550"
                  className="w-full px-3 py-2.5 text-sm bg-white border border-neutral-200 rounded-lg tabular-nums focus:outline-none focus:ring-2 focus:ring-[#D9232D]/30 focus:border-[#D9232D]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#121C2A] mb-1">
                  Compare Price (Optional)
                </label>
                <input
                  type="number"
                  min="1"
                  value={form.originalPrice}
                  onChange={(e) => setForm((f) => ({ ...f, originalPrice: e.target.value }))}
                  placeholder="650"
                  className="w-full px-3 py-2.5 text-sm bg-white border border-neutral-200 rounded-lg tabular-nums focus:outline-none focus:ring-2 focus:ring-[#D9232D]/30 focus:border-[#D9232D]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#121C2A] mb-1">
                  Offer Label (Optional)
                </label>
                <input
                  type="text"
                  value={form.offerLabel}
                  onChange={(e) => setForm((f) => ({ ...f, offerLabel: e.target.value }))}
                  placeholder="e.g., 15% OFF"
                  className="w-full px-3 py-2.5 text-sm bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9232D]/30 focus:border-[#D9232D]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#121C2A] mb-1">
                  Prep Time
                </label>
                <input
                  type="text"
                  value={form.prepTime}
                  onChange={(e) => setForm((f) => ({ ...f, prepTime: e.target.value }))}
                  placeholder="15 min"
                  className="w-full px-3 py-2.5 text-sm bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9232D]/30 focus:border-[#D9232D]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#121C2A] mb-1">
                Food Photo Preset
              </label>
              <select
                value={IMAGE_PRESETS.some((p) => p.value === form.image) ? form.image : ''}
                onChange={(e) => {
                  if (e.target.value) setForm((f) => ({ ...f, image: e.target.value }));
                }}
                className="w-full px-3 py-2.5 text-sm bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9232D]/30 focus:border-[#D9232D]"
              >
                {IMAGE_PRESETS.map((preset) => (
                  <option key={preset.label} value={preset.value}>
                    {preset.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#121C2A] mb-1">
                Description
              </label>
              <textarea
                rows={2}
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Key ingredients, preparation style, and serving notes..."
                className="w-full px-3 py-2 text-sm bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9232D]/30 focus:border-[#D9232D]"
              />
            </div>

            <label className="flex items-center gap-2 text-sm font-medium text-[#121C2A] cursor-pointer">
              <input
                type="checkbox"
                checked={form.isPopular}
                onChange={(e) => setForm((f) => ({ ...f, isPopular: e.target.checked }))}
                className="w-4 h-4 accent-[#D9232D] rounded"
              />
              <span>Mark as Popular Dish</span>
            </label>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#D9232D] hover:bg-[#B3001A] text-white font-semibold text-sm px-4 py-3 rounded-lg transition-colors min-h-[44px]"
            >
              <Plus className="w-4 h-4" />
              <span>{editingId ? 'Save Changes' : 'Add Item to Menu'}</span>
            </button>
          </form>

          {/* Right List: Current Menu Items */}
          <div className="lg:col-span-7 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-base font-bold text-[#121C2A]">
                Current Menu ({menuItems.length} items)
              </h3>
            </div>

            <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl border border-neutral-200 bg-white hover:border-neutral-300 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover shrink-0 bg-neutral-100"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[#121C2A] truncate">{item.name}</p>
                      <p className="text-xs text-neutral-500 truncate">
                        {item.category} · <span className="tabular-nums font-semibold text-[#121C2A]">{formatPKR(item.price)}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => startEdit(item)}
                      aria-label={`Edit ${item.name}`}
                      className="p-2 rounded-lg text-neutral-600 hover:text-[#121C2A] hover:bg-neutral-100 transition-colors"
                      title="Edit item"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteMenuItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                      className="p-2 rounded-lg text-neutral-500 hover:text-[#D9232D] hover:bg-red-50 transition-colors"
                      title="Delete item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
