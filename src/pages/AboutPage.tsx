import React from 'react';
import { Award, Flame, Leaf, ShieldCheck, ArrowRight } from 'lucide-react';
import { FoodImage } from '../components/FoodImage';
import { RESTAURANT_CONFIG } from '../config/restaurantConfig';
import { useRestaurant } from '../context/RestaurantContext';
import { FOOD_IMAGES } from '../data/foodImages';

const QUALITY_PILLARS = [
  {
    icon: Leaf,
    title: 'Daily Fresh Ingredients',
    description:
      'Crisp farm-harvested lettuce, vine tomatoes, fresh mint, coriander, and seasonal Sindhri mangoes arrive at our kitchen every morning.',
  },
  {
    icon: Flame,
    title: 'Authentic Cooking Technique',
    description:
      'From slow charcoal-steamed dum biryani to crispy buttermilk-fried zinger fillets, every station follows exact temperature and timing standards.',
  },
  {
    icon: ShieldCheck,
    title: 'Hygiene & Halal Integrity',
    description:
      '100% Zabiha halal meats, filtered cooking oil changed on strict schedules, and tamper-sealed packaging for safe doorstep delivery.',
  },
  {
    icon: Award,
    title: 'Guest-First Hospitality',
    description:
      'Direct WhatsApp support and rapid 30–45 minute dispatch ensure your food arrives hot, crisp, and tailored to your spice preference.',
  },
];

export function AboutPage() {
  const { navigate } = useRestaurant();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14 space-y-16">
      {/* Intro & Hero Split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        <div className="lg:col-span-6 flex flex-col justify-center">
          <p className="text-xs font-bold text-[#D9232D] mb-2">
            About {RESTAURANT_CONFIG.name}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121C2A] text-balance leading-tight">
            Where Street-Food Heritage Meets Modern Kitchen Precision.
          </h1>
          <p className="mt-5 text-base text-neutral-600 leading-relaxed">
            Founded in Lahore with a clear mission, {RESTAURANT_CONFIG.name} brings together Pakistan’s most beloved culinary traditions—aromatic dum biryani, tangy gol gappay, and creamy dahi bhallay—alongside flame-grilled burgers and stone-baked pizzas under one spotless kitchen roof.
          </p>
          <p className="mt-4 text-base text-neutral-600 leading-relaxed">
            We believe great food needs no shortcuts. Our spice blends are roasted and ground in-house weekly, our yogurt and tamarind chutneys are chilled in temperature-controlled batches, and every order is packed separately so crunchy shells stay crisp until your first bite.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate('menu')}
              className="inline-flex items-center gap-2 bg-[#D9232D] hover:bg-[#B3001A] text-white font-semibold text-sm px-6 py-3 rounded-lg shadow-[0_8px_20px_-4px_rgba(217,35,45,0.4)] transition-colors"
            >
              <span>Explore Our Menu</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => navigate('contact')}
              className="bg-white hover:bg-neutral-50 text-[#121C2A] border border-neutral-300 font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
            >
              Contact Kitchen
            </button>
          </div>
        </div>

        <div className="lg:col-span-6 rounded-2xl overflow-hidden shadow-lg min-h-[320px]">
          <FoodImage
            src={FOOD_IMAGES.aboutKitchenChef}
            alt="Chefs preparing saffron biryani and flame-grilled burgers in the Zaiqa Flame open kitchen"
            className="w-full h-full"
            loading="eager"
          />
        </div>
      </section>

      {/* Why Choose Us Pillars */}
      <section className="pt-12 border-t border-neutral-200">
        <div className="max-w-2xl mb-10">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#121C2A]">
            Why Guests Choose {RESTAURANT_CONFIG.name}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-600">
            Four non-negotiable standards that guide every plate leaving our pass.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {QUALITY_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <article
                key={pillar.title}
                className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-[0_4px_16px_-2px_rgba(17,24,39,0.05)]"
              >
                <div className="w-11 h-11 rounded-xl bg-[#FFFBEB] border border-amber-200 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#D9232D]" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-bold text-[#121C2A]">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                  {pillar.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Visual Culinary Showcase */}
      <section className="bg-[#0B0F17] text-white rounded-2xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold">
            Freshness You Can Taste in Every Bite
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            Whether you are craving a double-crispy Zinger Burger at midnight, fragrant Chicken Biryani for Friday lunch, or chilled Gol Gappay for an evening family gathering, we prepare every order fresh upon confirmation.
          </p>
        </div>
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          <div className="aspect-[4/3] rounded-xl overflow-hidden">
            <FoodImage
              src={FOOD_IMAGES.chickenBiryani}
              alt="Fresh saffron Chicken Biryani"
              className="w-full h-full"
            />
          </div>
          <div className="aspect-[4/3] rounded-xl overflow-hidden">
            <FoodImage
              src={FOOD_IMAGES.golGappay}
              alt="Crisp Gol Gappay platter"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
