import React, { useState, useMemo } from 'react';
import { products, branches, reviews, storyEvents } from './data';
import { Product, CartItem, Branch } from './types';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import ReviewSection from './components/ReviewSection';
import { 
  ShoppingBag, 
  User, 
  Search, 
  ArrowRight, 
  MapPin, 
  Clock, 
  Phone, 
  HelpCircle,
  Sparkles,
  Award,
  Heart,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Coffee,
  X
} from 'lucide-react';

export default function App() {
  // Navigation & Category states
  const [activeTab, setActiveTab] = useState<'all' | 'signature' | 'bread' | 'cake'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Cart states
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Detail Modal state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Time-Capsule active story index
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);

  // Map Active Branch selection page state
  const [selectedBranchName, setSelectedBranchName] = useState('성심당 은행동 본점');

  // Find the selected branch object
  const activeBranch = useMemo(() => {
    return branches.find(b => b.name === selectedBranchName) || branches[0];
  }, [selectedBranchName]);

  // General Bread search/filter logic
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchCategory = activeTab === 'all' || p.category === activeTab;
      const matchSearch = p.name.includes(searchQuery) || p.englishName.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.includes(searchQuery);
      return matchCategory && matchSearch;
    });
  }, [activeTab, searchQuery]);

  // Cart operations
  const handleAddToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      // If item with exact same packing option or id already exists
      const existingIdx = prev.findIndex(item => item.product.id === product.id && item.product.name === product.name);
      if (existingIdx > -1) {
        const update = [...prev];
        update[existingIdx].quantity += quantity;
        return update;
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, name: string, quantity: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === id && item.product.name === name) {
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const handleRemoveItem = (id: string, name: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === id && item.product.name === name)));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Quick helper to immediately add 1 item of signature breads
  const handleQuickAdd = (p: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    handleAddToCart(p, 1);
  };

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  return (
    <div className="bg-background text-on-surface font-sans min-h-screen flex flex-col antialiased selection:bg-secondary-container selection:text-on-secondary-container">
      
      {/* Top Banner indicating offline pickup booking option */}
      <div className="bg-secondary-container text-on-secondary-container px-4 py-2 text-center text-xs font-bold flex items-center justify-center gap-1.5 z-40 relative">
        <Sparkles size={14} className="animate-spin text-amber-800" />
        <span>지금 대전 방문 픽업 예약 서비스를 이용하여 오븐 직후 최고의 겉바속촉 성심당 빵을 당일 수령하세요!</span>
      </div>

      {/* Top Header Navigation bar */}
      <header className="bg-white/95 sticky top-0 backdrop-blur border-b border-outline-variant/30 shadow-sm z-40 transition-all duration-300">
        <div className="flex justify-between items-center w-full px-4 md:px-margin-desktop py-4 max-w-container-max mx-auto h-20">
          
          {/* Logo & Slogan */}
          <div className="flex items-center gap-3">
            <a href="#" className="text-3xl font-bold font-serif text-crust-brown tracking-tighter">성심당</a>
            <span className="hidden lg:inline bg-butter-cream text-secondary text-[11px] font-extrabold px-2.5 py-1 rounded-full border border-outline-variant/20">
              대전의 문화, 1956
            </span>
          </div>

          {/* Center navigation anchors */}
          <nav className="hidden md:flex space-x-8 items-center">
            <a 
              href="#products" 
              className="font-bold text-xs uppercase tracking-wider text-secondary border-b-2 border-secondary pb-1"
            >
              Breads
            </a>
            <a 
              href="#products" 
              onClick={() => setActiveTab('cake')}
              className="font-bold text-xs uppercase tracking-wider text-on-surface-variant hover:text-secondary transition-colors"
            >
              Cakes
            </a>
            <a 
              href="#story" 
              className="font-bold text-xs uppercase tracking-wider text-on-surface-variant hover:text-secondary transition-colors"
            >
              Our Story
            </a>
            <a 
              href="#map" 
              className="font-bold text-xs uppercase tracking-wider text-on-surface-variant hover:text-secondary transition-colors"
            >
              Locations
            </a>
          </nav>

          {/* Quick actions: Search, Profile, Cart */}
          <div className="flex items-center gap-4">
            
            {/* Search Input field inside Header */}
            <div className="relative hidden sm:block w-48 md:w-64">
              <input 
                type="text" 
                placeholder="어떤 빵을 찾으시나요?"
                value={searchQuery}
                aria-label="빵 검색"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-butter-cream/60 text-xs text-gray-800 pl-8 pr-4 py-2 rounded-xl border border-outline-variant/20 focus:outline-none focus:ring-1 focus:ring-secondary/50 placeholder:text-gray-400"
              />
              <Search className="absolute left-2.5 top-2.5 text-gray-400" size={13} />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2"
                  aria-label="검색어 지우기"
                >
                  <X size={14} className="text-gray-400 hover:text-secondary" />
                </button>
              )}
            </div>

            {/* Account symbol */}
            <button 
              className="p-2.5 hover:bg-butter-cream rounded-full transition-colors relative group" 
              title="회원 정보"
              aria-label="회원 정보"
            >
              <User size={18} className="text-gray-700 hover:text-secondary transition-colors" />
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-outline-variant/30 rounded-xl p-3 shadow-xl opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all text-xs text-left text-gray-600 line-clamp-2">
                <span className="font-bold text-gray-800">나눔의 동반자님, 환영합니다.</span>
                <p className="mt-1 text-[10px]">성심당은 이웃 사랑의 실천을 위해 회원제 혜택과 매월 빵 기부 영수증을 발행해 드립니다.</p>
              </div>
            </button>

            {/* Shopping cart trigger */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2.5 hover:bg-butter-cream rounded-full transition-colors relative"
              title="장바구니 보기"
              aria-label="장바구니 보기"
            >
              <ShoppingBag size={18} className="text-gray-700 hover:text-secondary transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-stone-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold font-mono animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="hidden lg:block bg-secondary hover:bg-secondary/90 text-stone-white text-[11px] font-bold tracking-wider px-5 py-2.5 rounded-xl active:scale-95 transition-all shadow-sm"
            >
              Order Online
            </button>
          </div>

        </div>
      </header>

      <main className="flex-1">

        {/* Hero Section */}
        <section className="relative h-[640px] md:h-[720px] flex items-center justify-center overflow-hidden">
          {/* Main Background Cover */}
          <div className="absolute inset-0 bg-black/45 z-10"></div>
          <img 
            alt="Warm Bakery traditional interior background" 
            className="absolute inset-0 w-full h-full object-cover scale-105 animate-pulse duration-[10000ms]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLYjJZORWxXmES5rk_NkIu51izxeh_t42C74AQCA2EWaCXKdHqoG2yv0__ECs3LJ_1aYsbZe4ej9xlTT32GyglChdV7tcGMW_oLWb7JiFVdzzm8gxWsRBLDaqPx-YsKD_Ow-smL82dlqvL4r9K4Z-wxHRbFC7kt4zs5lAI1tBDPMAcFueEbp2T9qJKqSm_YPe3nCEMNnSeWzqxu5BqzYVvN_ltwdBZ8L_-d1Ca7AHYc0DyfHQv-n5pcXqaDXlEzCu3_8wtP2zqTzHy" 
          />

          <div className="relative z-20 text-center px-4 max-w-4xl space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] font-extrabold text-[#ffd2a0] bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md inline-block">
              Since 1956 • 대전의 자랑이자 심장
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-stone-white font-serif tracking-tight leading-tight md:leading-normal">
              갓구운 빵 한 조각,<br />오늘 하루의 에너지 충전!
            </h1>
            <p className="text-sm md:text-lg text-stone-white/90 max-w-2xl mx-auto leading-relaxed">
              대전의 자부심, 1956년부터 이어온 진심의 맛입니다.<br />성심당의 모든 빵에는 이웃들과 더불어 사랑을 나누고자 하는 마음이 고스란히 담겨있습니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a 
                href="#map"
                className="bg-secondary-container text-on-secondary-container font-black text-xs tracking-wider px-8 py-4 rounded-xl shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                매장 찾아오시는 길
              </a>
              <a 
                href="#products"
                className="bg-white/10 backdrop-blur-md border border-white/30 text-white font-black text-xs tracking-wider px-8 py-4 rounded-xl hover:bg-white/20 active:scale-95 transition-all"
              >
                실시간 빵 구경하기
              </a>
            </div>
          </div>
        </section>

        {/* Bento Grid layout "성심당 명예의 전당" (Hall of Fame) */}
        <section id="hall-of-fame" className="py-24 px-4 md:px-margin-desktop bg-butter-cream/40 scroll-reveal">
          <div className="max-w-container-max mx-auto space-y-12">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-outline-variant/20 pb-6 text-left">
              <div>
                <span className="text-secondary font-extrabold text-xs tracking-widest uppercase block mb-1">
                  SUNG SIM DANG BESTSELLERS
                </span>
                <h2 className="font-headline-lg text-3xl md:text-4xl text-crust-brown font-serif">
                  성심당 명예의 전당
                </h2>
                <p className="text-xs text-on-surface-variant max-w-md mt-0.5">
                  창사 이래 대전 전역 및 미식가들로부터 가장 오랜 시간 사랑받으며 문화가 된 대표 명물 빵집의 주인공들입니다.
                </p>
              </div>
              <a 
                href="#products" 
                className="text-secondary font-bold text-xs uppercase tracking-wider flex items-center gap-1 hover:underline mt-2 md:mt-0"
              >
                전체 맛보기 리스트 <ChevronRight size={14} />
              </a>
            </div>

            {/* Bento Layout Grid representing 1 large and 2 right cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-auto lg:h-[720px]">
              
              {/* Large Featured left slot - Fried Soboro */}
              <div 
                onClick={() => setSelectedProduct(products[0])}
                className="lg:col-span-8 group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer text-left border border-outline-variant/20"
              >
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9sufIY_gDyCtuYrQ2YwXXWZ3Hj-TR2fr5LQGippEvzy2w5MD1bfyHz2gMqbmnAyi-r2ySnD8UoILT1soLBGJ4HNxw3-Dmuk1BXmDnYORdMJHzGk9kUT1tUQPDHFfolppAtaD0bK92qMH_OD2-mTDMC5sVO9jzRd00GGbryxDpstHSV5ImBy4hFTTtlWFNgtieRgJfdrQtm41YdIVzylL2aoHLI3QdkcKFlsnun4ezy5me8059-kA2lquH9Gc7aY1OjSlwr98co7Xf" 
                  alt="Fried Soboro macro view"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[7000ms]"
                />
                
                {/* Gradient shade overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent z-10 opacity-75"></div>
                
                <div className="absolute bottom-0 left-0 p-6 md:p-10 text-stone-white z-20 space-y-3">
                  <span className="inline-block bg-secondary-container text-on-secondary-container text-[11px] font-black px-3.5 py-1.5 rounded-full mb-2">
                    NO.1 BEST SELLER
                  </span>
                  <h3 className="font-serif text-3xl md:text-5xl font-black">{products[0]?.name}</h3>
                  <p className="text-stone-white/95 text-xs md:text-sm max-w-xl leading-relaxed">
                    {products[0]?.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/15">
                    <span className="font-mono text-lg md:text-2xl font-black text-yellow-400">
                      {products[0]?.price.toLocaleString()}원
                    </span>
                    <button 
                      onClick={(e) => handleQuickAdd(products[0], e)}
                      className="bg-secondary text-stone-white font-bold text-xs px-6 py-3 rounded-xl hover:bg-secondary/90 transition-all flex items-center justify-center gap-1.5 self-start"
                    >
                      <ShoppingBag size={14} />
                      장바구니 간편 담기
                    </button>
                  </div>
                </div>
              </div>

              {/* Right column slots: cake and chives bread */}
              <div className="lg:col-span-4 grid grid-rows-2 gap-8 text-left">
                
                {/* Cake Boutique Card (과일시루 막내) */}
                <div 
                  onClick={() => setSelectedProduct(products[1])}
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-outline-variant/20"
                >
                  <img 
                    src={products[1]?.image} 
                    alt="과일시루 막내 cake look" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[7000ms]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                  
                  <div className="absolute bottom-0 left-0 p-6 text-stone-white z-20 space-y-1">
                    <span className="bg-yellow-500 text-stone-white text-[9px] font-bold px-2 py-0.5 rounded-full inline-block uppercase tracking-wider mb-1">
                      인기 부띠끄 케이크
                    </span>
                    <h3 className="font-serif text-xl md:text-2xl font-bold">{products[1]?.name}</h3>
                    <p className="text-xs text-gray-200 line-clamp-1">{products[1]?.description}</p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-amber-300 text-sm font-black font-mono">{products[1]?.price.toLocaleString()}원</span>
                      <span className="text-[10px] text-gray-300 font-bold border-b border-gray-400">자세히 보기</span>
                    </div>
                  </div>
                </div>

                {/* Chives Bread Card (판타롱부추빵) */}
                <div 
                  onClick={() => setSelectedProduct(products[2])}
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-outline-variant/20"
                >
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1rVsIYwIssugQ3cUKYS3mdMOPy3AobXi41wBQb2Ag_y5IZgUwM0FWnxGCQsqBuERBO9ajStcVqAoqYlIYNutm9nfCTr04g1cXnYs0EOqXaUBgpoUBIU3uoWn51GDi_aX27G6lIkoRKUy5C5PRqoVbp5Y7KexZZQ64RcRBOWuSktDGZVjTxuPF1AVmfkptTyJGSHUL4enF2MhQaAuLQFAeleqAK2hjJIU-AcvfEb2TJWC09jONq_l9xrY1aTFzdgdIk2JDuWkUKpe3" 
                    alt="Artisanal sourdough spread" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[7000ms]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                  
                  <div className="absolute bottom-0 left-0 p-6 text-stone-white z-20 space-y-1">
                    <span className="bg-orange-600 text-stone-white text-[9px] font-bold px-2 py-0.5 rounded-full inline-block uppercase tracking-wider mb-1">
                      향긋웰빙전통
                    </span>
                    <h3 className="font-serif text-xl md:text-2xl font-bold">{products[2]?.name}</h3>
                    <p className="text-xs text-gray-200 line-clamp-1">{products[2]?.description}</p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-amber-300 text-sm font-black font-mono">{products[2]?.price.toLocaleString()}원</span>
                      <span className="text-[10px] text-gray-300 font-bold border-b border-gray-400">자세히 보기</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* Main Bread and Cake Explorer Explorer Section with dynamic Search and Filters */}
        <section id="products" className="py-24 px-4 md:px-margin-desktop bg-white scroll-reveal">
          <div className="max-w-container-max mx-auto space-y-12">
            
            {/* Header and Filter Tab switches */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-outline-variant/20 pb-6 text-left">
              <div>
                <span className="text-secondary font-bold tracking-wider text-xs block mb-1">Daily Prep Bakes</span>
                <h2 className="font-headline-lg text-3xl text-primary font-bold">실시간 신선 빵 탐색하기</h2>
                <p className="text-xs text-on-surface-variant">여섯 대의 가마솥에서 쏟아지는 아티스널 호밀빵들과 케이크 쇼케이스를 만나보세요.</p>
              </div>

              {/* Small Category Filter options */}
              <div className="flex flex-wrap gap-2.5">
                {[
                  { key: 'all', label: '전체' },
                  { key: 'signature', label: '대표시그니처' },
                  { key: 'bread', label: '일반빵류' },
                  { key: 'cake', label: '케익부띠끄 디저트' }
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`px-4.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      activeTab === tab.key 
                        ? 'bg-secondary text-stone-white shadow-md' 
                        : 'bg-butter-cream text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* General Products Catalog Grid */}
            {filteredProducts.length === 0 ? (
              <div className="py-16 text-center space-y-2">
                <p className="font-bold text-gray-700">검색 조건에 맞는 제품이 없습니다</p>
                <p className="text-xs text-gray-400">다른 키워드나 제품 유형을 터치해 탐색을 이어나가 보세요.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((p) => (
                  <div 
                    key={p.id}
                    onClick={() => setSelectedProduct(p)}
                    className="group bg-white rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between text-left"
                  >
                    <div className="relative aspect-[1.33] overflow-hidden bg-gray-50 flex-shrink-0">
                      <img 
                        src={p.image || 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=600&auto=format&fit=crop'} 
                        alt={p.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {p.bestSeller && (
                        <span className="absolute top-3 left-3 bg-[#e65100] text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm z-10">
                          Best Seller
                        </span>
                      )}
                    </div>
                    
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-1">
                        <span className="text-[10px] text-secondary font-bold uppercase tracking-wider block">
                          {p.category}
                        </span>
                        <h3 className="font-serif text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-secondary transition-colors">
                          {p.name}
                        </h3>
                        <p className="text-slate-500 text-xs line-clamp-2 h-8">
                          {p.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-outline-variant/10">
                        <span className="font-bold text-crust-brown font-mono">
                          {p.price.toLocaleString()}원
                        </span>
                        
                        <button
                          onClick={(e) => handleQuickAdd(p, e)}
                          className="bg-butter-cream hover:bg-secondary text-secondary hover:text-white p-2.5 rounded-xl transition-all mr-0.5 shadow-sm"
                          title="즉시 장바구니 담기"
                        >
                          <ShoppingBag size={14} className="flex-shrink-0" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

            {/* Quick Promo box detailing standard policy */}
            <div className="p-6 md:p-8 bg-butter-cream/20 rounded-2xl border border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
              <div className="space-y-1">
                <h4 className="font-bold text-gray-800 flex items-center gap-1.5 text-sm">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  당일 미판매 빵은 이웃 푸드뱅크에 100% 당일 기증합니다
                </h4>
                <p className="text-xs text-on-surface-variant max-w-2xl leading-relaxed">
                  성심당의 모든 사업부는 당일 생산 및 당일 완판 보장 원칙을 철저히 준수합니다. 남겨진 어떠한 빵과 소보로도 뒷문을 돌리지 않으며, 가톨릭 복지요양원 및 지역 장애인 단체, 저소득 가구 노인 분들을 위한 소중한 식사 빵으로 매일 저녁 정성스레 수송 배달합니다.
                </p>
              </div>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="bg-secondary text-stone-white font-black text-xs px-6 py-3 rounded-lg hover:opacity-90 transition-all flex-shrink-0 whitespace-nowrap"
              >
                나눔 픽업 동참하기
              </button>
            </div>

          </div>
        </section>

        {/* Vintage Storefront Split Section with Interactive Archival historical timeline */}
        <section id="story" className="bg-butter-cream border-y border-outline-variant/30 scroll-reveal">
          <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2">
            
            {/* Left Archival Historical Photograph Frame */}
            <div className="relative min-h-[480px] lg:min-h-full overflow-hidden">
              <img 
                alt="Sung Sim Dang 1950s classic facade photography" 
                className="absolute inset-0 w-full h-full object-cover grayscale brightness-90 contrast-125 transition-all duration-1000"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuACV57wuoyE37yVbt1ImiUQoVou2WwJMGAXdWvDSlJ-SxlC5EOzVuXJp0HVMaFWPFf0VxbxDrhVzmeMYnSqqkzMfPAsXrw3gjVFzpMoL-tag9Q35JaL2iR2FvCK1e0d_-9ODFYx1NoKWNGBYydpdKmjhqmtGEsPfiyOk7E81W3eNUFHdmyJz4BySUufbNGcE17SDFnpaTO0hGe4aUmtJf9679iZ7KhvDssWihdJF86o8fopnV790igBZ-nTVQp9zKnBM-OdaPXUBIFB" 
              />
              <div className="absolute inset-0 bg-secondary/15 backdrop-brightness-75"></div>
              
              <div className="absolute bottom-8 left-8 right-8 bg-black/60 backdrop-blur-md p-6 rounded-2xl text-left text-white space-y-1">
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">Historic Store Arc</span>
                <p className="text-xs text-gray-300 font-medium">성심당 대전역 앞 초대 천막 매장 (1956년 가을 촬영)</p>
              </div>
            </div>

            {/* Right Storytelling interactive panels */}
            <div className="flex flex-col justify-center p-8 md:p-16 xl:p-24 space-y-8 text-left">
              <div>
                <span className="text-secondary font-bold tracking-widest text-xs uppercase block mb-2">Our Heritage Story</span>
                <h2 className="font-serif font-black text-4xl text-crust-brown leading-tight block">
                  모든 이가 다 좋게 여기는<br />일을 하십시오
                </h2>
                <p className="text-xs text-on-surface-variant max-w-xl mt-3 leading-relaxed">
                  1956년 대전역 앞 작은 찐빵집에서 피난 밀가루 두 포대로 시작된 기적입니다. 성심당은 60여 년이 넘는 세월공안 단순히 밀가루 반죽을 구워 파는 데 그치지 않고, 우리 이웃과 그늘진 곳에 사랑의 빵 나눔을 실천하며 따뜻하게 성장해 왔습니다.
                </p>
              </div>

              {/* Time Capsule timeline slider cards */}
              <div className="bg-white p-6 rounded-2xl border border-outline-variant/30 space-y-4 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-outline-variant/10 pb-3">
                  <span className="text-lg font-black text-secondary font-serif">
                    {storyEvents[activeStoryIdx].year}
                  </span>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => setActiveStoryIdx(i => Math.max(0, i - 1))}
                      disabled={activeStoryIdx === 0}
                      className="p-1 hover:bg-gray-100 disabled:opacity-35 rounded-lg transition-all"
                      aria-label="이전 역사 보기"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button 
                      onClick={() => setActiveStoryIdx(i => Math.min(storyEvents.length - 1, i + 1))}
                      disabled={activeStoryIdx === storyEvents.length - 1}
                      className="p-1 hover:bg-gray-100 disabled:opacity-35 rounded-lg transition-all"
                      aria-label="다음 역사 보기"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-bold text-gray-800 font-serif">
                    {storyEvents[activeStoryIdx].title}
                  </h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    {storyEvents[activeStoryIdx].description}
                  </p>
                </div>
              </div>

              {/* Two key icons representing quality statement */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary-fixed/50 flex flex-shrink-0 items-center justify-center text-secondary">
                    <Award size={16} />
                  </div>
                  <span className="text-xs font-bold text-gray-800">당일 생산 완판 보장</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary-fixed/50 flex flex-shrink-0 items-center justify-center text-secondary">
                    <Heart size={16} />
                  </div>
                  <span className="text-xs font-bold text-gray-800">이웃 밀가루 68년 후원</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Traditional styled leader Menu list as requested in photo */}
        <section id="menu-board" className="py-24 px-4 md:px-margin-desktop bg-butter-cream/20">
          <div className="max-w-4xl mx-auto space-y-16">
            
            <div className="text-center space-y-3">
              <Coffee className="text-secondary mx-auto animate-bounce" size={24} />
              <h2 className="font-serif font-black text-3xl text-crust-brown">정성을 가포함한 성심당 정전 식탁</h2>
              <div className="w-16 h-1 bg-secondary mx-auto rounded-full"></div>
              <p className="text-xs text-on-surface-variant max-w-md mx-auto">
                사랑과 정성을 고스란히 담아 가마솥으로 끓여 머금은 성심당의 전통 시그니처 빵과 케익부띠끄 차림표입니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 text-left">
              
              {/* Signature Breads */}
              <div className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#a85f00] border-b border-outline-variant/30 pb-2">
                  Signature Breads (대표 소장빵)
                </h3>
                
                <div className="space-y-4">
                  {[
                    { name: '튀김소보로', price: '1,700원' },
                    { name: '판타롱부추빵', price: '2,000원' },
                    { name: '보문산 메아리', price: '6,000원' },
                    { name: '명란바게트', price: '3,800원' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-end text-sm">
                      <span className="font-serif font-bold text-gray-800">{item.name}</span>
                      <div className="flex-1 border-b border-dashed border-outline-variant/40 mx-2.5 mb-1"></div>
                      <span className="font-bold text-secondary font-mono">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Boutique Cakes */}
              <div className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#a85f00] border-b border-outline-variant/30 pb-2">
                  Cake Boutique (디저트 & 시루)
                </h3>

                <div className="space-y-4">
                  {[
                    { name: '딸기시루 (시즌한정)', price: '43,000원' },
                    { name: '과일시루 막내', price: '45,000원' },
                    { name: '순수롤 브래드', price: '14,000원' },
                    { name: '티라미수 시그니처', price: '28,000원' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-end text-sm">
                      <span className="font-serif font-bold text-gray-800">{item.name}</span>
                      <div className="flex-1 border-b border-dashed border-outline-variant/40 mx-2.5 mb-1"></div>
                      <span className="font-bold text-secondary font-mono">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Customer reviews section utilizing dynamic additions hooks */}
        <ReviewSection 
          initialReviews={reviews} 
          products={products} 
        />

        {/* Map branch pinpoint navigation layout */}
        <section id="map" className="py-24 bg-surface-container-high border-t border-outline-variant/20 scroll-reveal">
          <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left coordinates descriptions */}
            <div className="text-left space-y-6">
              
              <div className="space-y-1">
                <span className="text-secondary font-bold text-xs uppercase tracking-wider block">Branch Locator</span>
                <h2 className="font-serif font-black text-3xl md:text-4xl text-crust-brown">
                  성심당 본점 오시는 길
                </h2>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  대전 중구 은행동 본점을 필두로, 케익부띠끄 및 대전역 역사 신선 픽업 상점을 운영합니다. 방문 매장을 터치하여 정확한 주소와 예약 운영시간을 확인하세요.
                </p>
              </div>

              {/* Branch quick lists switcher buttons */}
              <div className="grid grid-cols-2 gap-3.5 pt-2">
                {branches.map((b) => (
                  <button 
                    key={b.name}
                    onClick={() => setSelectedBranchName(b.name)}
                    className={`p-3 text-left rounded-xl border text-xs font-bold transition-all flex items-start gap-2 ${
                      selectedBranchName === b.name 
                        ? 'bg-secondary text-stone-white border-secondary shadow-md' 
                        : 'bg-white text-gray-700 border-outline-variant/10 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xs pt-0.5">•</span>
                    <span>{b.name.replace('성심당 ', '')}</span>
                  </button>
                ))}
              </div>

              {/* Dynamic schedules card */}
              <div className="bg-white border text-left p-6 rounded-2xl shadow-sm border-outline-variant/30 space-y-4">
                
                <div className="flex gap-4.5 items-start">
                  <div className="p-3 bg-secondary-fixed/50 text-secondary rounded-xl flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-[#7c5000] text-sm mb-1">상세 도로명 주소</h5>
                    <p className="text-xs text-gray-700 font-medium">{activeBranch.address}</p>
                  </div>
                </div>

                <div className="flex gap-4.5 items-start">
                  <div className="p-3 bg-secondary-fixed/50 text-secondary rounded-xl flex-shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-[#7c5000] text-sm mb-1">영업 운영 시간</h5>
                    <p className="text-xs text-gray-700 font-medium">{activeBranch.hours}</p>
                  </div>
                </div>

                <div className="flex gap-4.5 items-start">
                  <div className="p-3 bg-secondary-fixed/50 text-secondary rounded-xl flex-shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-[#7c5000] text-sm mb-1">실시간 즉시 문의</h5>
                    <p className="text-xs text-gray-700 font-medium">{activeBranch.phone}</p>
                  </div>
                </div>

              </div>

              <div className="flex gap-4">
                <a 
                  href="https://map.naver.com" 
                  target="_blank" 
                  rel="noreferrer noopener"
                  className="bg-primary text-stone-white font-bold text-xs px-6 py-3 px-8 py-3.5 rounded-xl hover:bg-primary/95 transition-all text-center inline-block"
                >
                  네이버 지도에서 본점 보기
                </a>
              </div>
            </div>

            {/* Right Map Image container with Pin animates */}
            <div className="h-96 md:h-[480px] bg-white rounded-2xl shadow-inner overflow-hidden border border-outline-variant/50 relative">
              <img 
                alt="Map graphics showing street blocks in Daejeon" 
                className="w-full h-full object-cover grayscale brightness-110 contrast-75 cursor-crosshair"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCehZWQs9iE2nBsxE9bGbz15k2PIl0pB8X99RcmmUnzJ209rR-fChmV2Lxn0-3IgD48WZV4-RXfwU_7keJkplWXRjnI5tKuicxP7Oy2BBK7kPW6xISAV5Kkwd30jeWxQCY9bXwFu2WayPSKqqbE2s5nBGQdVXLz38irKpZ5No4mRfKSyPGKwpxJSB4WxhDzYowcjiXXSd4UyL9hT0W44gURYMvbP5g2eDHb6jMg8SvQvgYiZlnUuLakg3kCeeoTbRXIqqcvL8ARTAPq" 
              />
              
              {/* Dynamic Absolute Pin reflecting selected branch percentages */}
              <div 
                className="absolute p-3 bg-secondary text-stone-white rounded-full shadow-xl animate-bounce z-20 cursor-pointer"
                style={{
                  left: `${activeBranch.mapX}%`,
                  top: `${activeBranch.mapY}%`,
                  transform: 'translate(-50%, -100%)'
                }}
              >
                <span className="text-xs font-black uppercase tracking-widest whitespace-nowrap bg-black/85 text-yellow-300 pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-3 py-1.5 rounded-lg border border-[#ffca28]/35">
                  {activeBranch.name.replace('성심당 ', '')}
                </span>
                <Coffee size={18} />
              </div>

              {/* Tiny helpful notice */}
              <span className="absolute bottom-4 right-4 bg-white/75 backdrop-blur text-[10px] text-gray-500 px-3 py-1.5 rounded-lg border border-gray-200 pointer-events-none">
                ※ 대전 중구 중앙로역 인근 핵심가에 위치하고 있습니다.
              </span>
            </div>

          </div>
        </section>

      </main>

      {/* Main Footer of the application */}
      <footer className="bg-surface-container border-t border-outline-variant/50">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 px-4 md:px-margin-desktop py-16 max-w-container-max mx-auto text-left">
          
          <div className="md:col-span-5 space-y-4">
            <h3 className="font-serif text-3xl font-black text-crust-brown">성심당</h3>
            <p className="text-xs text-slate-600 max-w-xs leading-relaxed">
              성심당은 대전의 고유 문화이자 이웃의 온정입니다. 1956년 대전역 앞 작은 찐빵 오븐에서 출발해 지금까지 사람들의 마음을 굽습니다.
            </p>
            <div className="pt-2 text-xs text-gray-400">
              <span className="block font-semibold">대표자: 임영진, 김미진</span>
              <span className="block">본사: 대전광역시 중구 우송로 3</span>
            </div>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h4 className="font-bold text-xs text-gray-800 uppercase tracking-widest">Explore</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-on-surface-variant hover:text-secondary transition-colors">홈 상단으로</button></li>
              <li><a href="#hall-of-fame" className="text-on-surface-variant hover:text-secondary transition-colors block">명예의 전당 베스트</a></li>
              <li><a href="#products" className="text-on-surface-variant hover:text-secondary transition-colors block">실시간 제품 목록</a></li>
              <li><a href="#story" className="text-on-surface-variant hover:text-secondary transition-colors block">68주년 러브 스토리</a></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h4 className="font-bold text-xs text-gray-800 uppercase tracking-widest">SungSimDang Family Brands</h4>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-600">
              <span className="bg-white/60 p-2.5 rounded-lg font-medium">성심당 은행동 본점</span>
              <span className="bg-white/60 p-2.5 rounded-lg font-medium">성심당 케익부띠끄</span>
              <span className="bg-white/60 p-2.5 rounded-lg font-medium">성심당 옛맛솜씨</span>
              <span className="bg-white/60 p-2.5 rounded-lg font-medium">성심당 테라스키친</span>
            </div>
            <p className="text-[10px] text-gray-400 leading-normal">
              당사가 생산한 모든 신선 빵은 국가식품안전인증(HACCP) 및 유기농 밀가루 가공인증을 완벽하게 취득하였습니다.
            </p>
          </div>

        </div>

        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-6 border-t border-outline-variant/30 text-center text-[11px] text-slate-400">
          <p>© 1956 SungSimDang Bakery Co., Ltd. All rights heritage-preserved.</p>
        </div>
      </footer>

      {/* Floating Action Buttons: Cart Drawer & Quick order trigger */}
      <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-3">
        <button 
          onClick={() => setIsCartOpen(true)}
          className="bg-secondary text-stone-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform group relative"
          aria-label="장바구니 열기"
        >
          <ShoppingBag size={24} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-stone-white text-[11px] w-6 h-6 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
          <span className="absolute right-full mr-4 bg-white text-gray-800 border font-bold text-xs px-3.5 py-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            모바일 예약 주문하기
          </span>
        </button>
      </div>

      {/* Dynamically triggered modal & drawer components */}
      <ProductDetailModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
