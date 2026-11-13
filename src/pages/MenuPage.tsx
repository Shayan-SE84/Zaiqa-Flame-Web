import React, { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, Flame, PlusCircle } from 'lucide-react';
import { MenuCard } from '../components/MenuCard';
import { useRestaurant } from '../context/RestaurantContext';
import { FoodCategory } from '../types/restaurant';

const CATEGORY_TABS: ('All' | FoodCategory)[] = [
  'All',
  'Fast Food',
  'Biryani',
  'Gol Gappay',
  'Chaat',
  'Drinks',
];

type SortOption = 'featured' | 'popular' | 'price-asc' | 'price-desc';

export function MenuPage() {
  const { menuItems, selectedCategory, setSelectedCategory, setOwnerModalOpen } = useRestaurant();

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [popularOnly, setPopularOnly] = useState(false);

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const list = menuItems.filter((item) => {
      if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
      if (popularOnly && !item.isPopular && !item.isBestSeller) return false;
      if (query) {
        const matches =
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query);
        if (!matches) return false;
      }
      return true;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.price - a.price);
    }
    if (sortBy === 'popular') {
      return [...list].sort((a, b) => {
        const scoreA = (a.isBestSeller ? 2 : 0) + (a.isPopular ? 1 : 0);
        const scoreB = (b.isBestSeller ? 2 : 0) + (b.isPopular ? 1 : 0);
        return scoreB - scoreA;
      });
    }
    return list;
  }, [menuItems, popularOnly, searchQuery, selectedCategory, sortBy]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
      {/* Page Heading & Owner Menu Manager Button */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#121C2A]">
            Our Complete Menu
          </h1>
          <p className="mt-2 text-sm sm:text-base text-neutral-600 max-w-2xl">
            Freshly cooked Fast Food, Biryani, Gol Gappay, Chaat, and Chilled Drinks in PKR. Click any dish for full details or add directly to your cart.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOwnerModalOpen(true)}
          className="inline-flex items-center gap-2 bg-[#0B0F17] hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4 text-[#FEA619]" aria-hidden="true" />
          <span>Manage Menu (Owner)</span>
        </button>
      </div>

      {/* Category Filter Bar */}
      <div
        className="flex items-center gap-2 overflow-x-auto pb-2 mb-6"
        role="tablist"
        aria-label="Food Categories"
      >
        {CATEGORY_TABS.map((cat) => {
          const active = selectedCategory === cat;
          const count =
            cat === 'All'
              ? menuItems.length
              : menuItems.filter((item) => item.category === cat).length;

          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap shrink-0 transition-colors min-h-[40px] ${
                active
                  ? 'bg-[#D9232D] text-white shadow-[0_4px_14px_-2px_rgba(217,35,45,0.35)]'
                  : 'bg-white text-[#121C2A] border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
              }`}
            >
              {cat} <span className={`tabular-nums text-xs ml-1 ${active ? 'text-[#FEF08A]' : 'text-neutral-400'}`}>({count})</span>
            </button>
          );
        })}
      </div>

      {/* Search, Popular Toggle & Price Sort Toolbar */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 p-4 mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search
            className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Zinger Burger, Chicken Biryani, Gol Gappay, Juices..."
            aria-label="Search menu items"
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#F9FAFB] border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D9232D]/25 focus:border-[#D9232D]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setPopularOnly((p) => !p)}
            aria-pressed={popularOnly}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-sm font-semibold border transition-colors whitespace-nowrap min-h-[42px] ${
              popularOnly
                ? 'bg-[#FEF08A] border-[#F59E0B] text-[#684000]'
                : 'bg-white border-neutral-200 text-[#121C2A] hover:bg-neutral-50'
            }`}
          >
            <Flame className="w-4 h-4 text-[#D9232D]" aria-hidden="true" />
            <span>Popular Only</span>
          </button>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-neutral-500 shrink-0" aria-hidden="true" />
            <label htmlFor="sort-menu" className="sr-only">
              Sort menu items
            </label>
            <select
              id="sort-menu"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3.5 py-2.5 text-sm font-semibold bg-[#F9FAFB] border border-neutral-200 rounded-lg text-[#121C2A] focus:outline-none focus:ring-2 focus:ring-[#D9232D]/25 focus:border-[#D9232D] min-h-[42px]"
            >
              <option value="featured">Sort: Featured</option>
              <option value="popular">Sort: Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-5 text-xs font-semibold text-neutral-500">
        <span>
          Showing <strong className="tabular-nums text-[#121C2A]">{filteredItems.length}</strong>{' '}
          {filteredItems.length === 1 ? 'dish' : 'dishes'}
          {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
        </span>
        {(searchQuery || selectedCategory !== 'All' || popularOnly) && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setPopularOnly(false);
              setSortBy('featured');
            }}
            className="text-[#D9232D] hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Menu Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center">
          <h2 className="font-display text-xl font-bold text-[#121C2A]">No matching dishes found</h2>
          <p className="mt-2 text-sm text-neutral-600">
            Try clearing your search term or switching back to all categories.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setPopularOnly(false);
            }}
            className="mt-5 bg-[#D9232D] hover:bg-[#B3001A] text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
          >
            Show All Dishes
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </main>
  );
}
