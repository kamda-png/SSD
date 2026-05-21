import React, { useState } from 'react';
import { CartItem } from '../types';
import { ShoppingBag, X, Trash2, Heart, ShieldCheck, Sparkles, MapPin } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, name: string, quantity: number) => void;
  onRemoveItem: (id: string, name: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [donate, setDonate] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState('성심당 은행동 본점');
  const [pickupTime, setPickupTime] = useState('11:00');

  if (!isOpen) return null;

  // Compute pricing
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const donationAmount = donate ? 1000 : 0;
  const grandTotal = subtotal + donationAmount;

  const handleCheckout = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleReset = () => {
    onClearCart();
    setStep(1);
    setDonate(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-outline-variant/30">
          
          {/* Header */}
          <div className="p-6 border-b border-outline-variant/20 flex items-center justify-between bg-butter-cream">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-secondary" />
              <h2 className="text-lg font-bold font-serif text-gray-800">모바일 장바구니</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 hover:bg-black/5 rounded-full transition-colors"
              aria-label="닫기"
            >
              <X size={20} />
            </button>
          </div>

          {/* Steps Indicator (Not shown in Success state) */}
          {step !== 3 && (
            <div className="grid grid-cols-2 text-center text-xs border-b border-outline-variant/10 font-bold">
              <button 
                onClick={() => step === 2 && setStep(1)}
                className={`py-3 ${step === 1 ? 'border-b-2 border-secondary text-secondary' : 'text-gray-400'}`}
              >
                1. 빵 목록 확인
              </button>
              <div className={`py-3 ${step === 2 ? 'border-b-2 border-secondary text-secondary' : 'text-gray-400'}`}>
                2. 지점 및 픽업 예약
              </div>
            </div>
          )}

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {step === 1 ? (
              // Step 1: Cart Items List
              cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-butter-cream flex items-center justify-center text-gray-400">
                    <ShoppingBag size={28} />
                  </div>
                  <h3 className="font-bold text-gray-700">장바구니가 비어 있습니다</h3>
                  <p className="text-xs text-on-surface-variant max-w-xs">
                    고소한 냄새가 물씬 풍기는 성심당 베스트셀러 빵들을 담아 특별한 미식을 완성해 보세요!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs text-on-surface-variant uppercase font-bold tracking-tight">
                    <span>담은 품목 ({cart.length}개)</span>
                    <button onClick={onClearCart} className="hover:text-red-600 transition-colors">전체 삭제</button>
                  </div>
                  
                  <div className="space-y-3 Divide-y divide-gray-100">
                    {cart.map((item) => (
                      <div key={`${item.product.id}-${item.product.name}`} className="flex gap-4 py-3 items-start text-left">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-16 h-16 object-cover rounded-xl border border-outline-variant/30 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-800 text-sm truncate">{item.product.name}</h4>
                          <span className="text-xs text-on-surface-variant block mt-0.5">{item.product.price.toLocaleString()}원</span>
                          
                          {/* Counter */}
                          <div className="flex items-center mt-2.5 space-x-1.5">
                            <div className="flex items-center border border-outline-variant/30 rounded-lg overflow-hidden scale-90 origin-left">
                              <button 
                                onClick={() => onUpdateQuantity(item.product.id, item.product.name, Math.max(1, item.quantity - 1))}
                                className="px-2 py-0.5 bg-gray-50 hover:bg-gray-100 font-bold text-gray-600 text-xs transition-colors"
                              >
                                -
                              </button>
                              <span className="px-3 py-0.5 text-xs font-bold text-gray-800 bg-white">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => onUpdateQuantity(item.product.id, item.product.name, item.quantity + 1)}
                                className="px-2 py-0.5 bg-gray-50 hover:bg-gray-100 font-bold text-gray-600 text-xs transition-colors"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="text-right flex flex-col justify-between items-end h-16 flex-shrink-0">
                          <button 
                            onClick={() => onRemoveItem(item.product.id, item.product.name)}
                            className="p-1 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-50 transition-all"
                            aria-label="제거"
                          >
                            <Trash2 size={14} />
                          </button>
                          <span className="font-semibold text-gray-800 text-sm">
                            {(item.product.price * item.quantity).toLocaleString()}원
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Sung Sim Dang Donation Box */}
                  <div className="border border-secondary-container/40 bg-butter-cream p-4 rounded-xl space-y-2 mt-6 text-left relative overflow-hidden transition-all hover:shadow-sm">
                    <div className="flex items-center gap-2">
                      <Heart className="text-secondary fill-secondary" size={18} />
                      <h4 className="font-bold text-sm text-gray-800">따뜻한 동행 밀가루 기부 캠페인</h4>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      "모든 이가 다 좋게 여기는 일을 하십시오" 창립 기조에 맞춰, 1,000원을 함께 기증하시면 대전 전역 푸드뱅크에 밀가루 포대를 충당하여 소외된 이웃에 온정을 빵으로 구워 바칩니다.
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-bold text-secondary">한 포대 빵 나금 기부 (+1,000원)</span>
                      <input 
                        type="checkbox" 
                        checked={donate}
                        onChange={(e) => setDonate(e.target.checked)}
                        className="w-4 h-4 accent-secondary rounded"
                      />
                    </div>
                  </div>
                </div>
              )
            ) : step === 2 ? (
              // Step 2: Pickup details input
              <div className="space-y-6 text-left">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-secondary font-bold text-sm border-b border-outline-variant/20 pb-1">
                    <MapPin size={16} />
                    <span>대전 픽업 수령 매장 선택</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      '성심당 은행동 본점',
                      '성심당 케익부띠끄 본점',
                      '성심당 대전역점',
                      '성심당 롯데백화점 대전점'
                    ].map(branch => (
                      <button
                        key={branch}
                        onClick={() => setSelectedBranch(branch)}
                        className={`p-3 rounded-xl text-left border text-xs font-bold transition-all ${
                          selectedBranch === branch 
                            ? 'border-secondary bg-butter-cream text-secondary ring-1 ring-secondary' 
                            : 'border-outline-variant/30 hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        {branch}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-secondary font-bold text-sm border-b border-outline-variant/20 pb-1">
                    <span>방문 예약 시간설정</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {['09:00', '11:00', '13:00', '15:00', '17:00', '19:00', '20:35'].map(time => (
                      <button
                        key={time}
                        onClick={() => setPickupTime(time)}
                        className={`py-2 rounded-lg text-xs font-bold transition-all border ${
                          pickupTime === time 
                            ? 'bg-secondary text-white border-secondary' 
                            : 'border-outline-variant/20 hover:bg-gray-50 text-gray-600'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-on-surface-variant">
                    ※ 당일 수령 기준이며, 예약 시간 기준 1시간 동안 온열 보관함에 온전히 빵의 겉바속촉함을 지켜내어 맞이해 드립니다.
                  </p>
                </div>

                <div className="border border-outline-variant/30 rounded-xl p-4 bg-gray-50 text-xs text-gray-600 space-y-2">
                  <div className="flex items-center gap-1 font-bold text-gray-700">
                    <ShieldCheck size={14} className="text-green-600" />
                    <span>성심당 안심 결제보장</span>
                  </div>
                  <p className="leading-relaxed">
                    선결제가 요구되지 않으며 예약 시 지정 수량의 빵이 전용 박스 트레이에 오븐 직후 세팅됩니다. 현장 방문 후 무인 픽업 키오스크에 바코드를 전송하시면 1초 결제 및 즉시 수화가 종료됩니다.
                  </p>
                </div>
              </div>
            ) : (
              // Step 3: Success order screen!
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-6 animate-in fade-in duration-300">
                <div className="w-20 h-20 bg-secondary-container rounded-full flex items-center justify-center text-on-secondary-container shadow-lg shadow-yellow-500/20">
                  <Sparkles size={36} />
                </div>
                
                <div className="space-y-2">
                  <span className="text-xs text-secondary font-extrabold uppercase tracking-widest block">Reserve Booked!</span>
                  <h3 className="text-2xl font-black font-serif text-crust-brown">예약 완료 및 영수증</h3>
                  <p className="text-xs text-on-surface-variant max-w-xs mx-auto leading-relaxed">
                    성심당 빵들의 신선한 바삭함 보존 예약이 성황리에 등록되었습니다! 아래의 픽업 바우처 코드를 지참해 주세요.
                  </p>
                </div>

                <div className="w-full bg-butter-cream border border-outline-variant/30 rounded-2xl p-5 text-left space-y-4 relative">
                  {/* Decorative notch */}
                  <div className="absolute left-[-11px] top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-r border-outline-variant/30 rounded-full"></div>
                  <div className="absolute right-[-11px] top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-l border-outline-variant/30 rounded-full"></div>

                  <div className="flex justify-between border-b border-outline-variant/10 pb-3 text-xs">
                    <span className="text-gray-400 font-bold">수령점</span>
                    <span className="font-extrabold text-secondary">{selectedBranch}</span>
                  </div>

                  <div className="flex justify-between border-b border-outline-variant/10 pb-3 text-xs">
                    <span className="text-gray-400 font-bold">도착 예약</span>
                    <span className="font-extrabold text-gray-700">오늘 {pickupTime}</span>
                  </div>

                  <div className="flex justify-between border-b border-outline-variant/10 pb-3 text-xs">
                    <span className="text-gray-400 font-bold">인도 제품</span>
                    <span className="font-extrabold text-gray-700 truncate max-w-[180px]">
                      {cart[0]?.product.name} {cart.length > 1 ? `외 ${cart.length - 1}가지` : ''}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm pt-1">
                    <span className="text-gray-500 font-black">현장 결제 예상</span>
                    <span className="font-black text-crust-brown font-mono">{grandTotal.toLocaleString()}원</span>
                  </div>

                  <div className="border-t border-dashed border-outline-variant/40 pt-4 text-center">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">인증 픽업 바코드</span>
                    <div className="bg-white border text-center font-mono py-2 rounded-lg font-bold text-gray-800 tracking-widest border-outline-variant/20 mb-1">
                      SSD - {Math.floor(1000 + Math.random() * 9000)} - {pickupTime.replace(':', '')}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="bg-primary text-white w-full py-3.5 rounded-xl font-bold hover:bg-primary/95 transition-all text-xs"
                >
                  홈 화면으로 안전 수렴
                </button>
              </div>
            )}
          </div>

          {/* Footer of Drawer (Totals & Button) */}
          {step !== 3 && cart.length > 0 && (
            <div className="p-6 border-t border-outline-variant/20 bg-gray-50 space-y-4">
              <div className="space-y-1.5 text-xs text-gray-600 text-left">
                <div className="flex justify-between">
                  <span>제품 소계</span>
                  <span className="font-mono">{subtotal.toLocaleString()}원</span>
                </div>
                {donate && (
                  <div className="flex justify-between text-secondary">
                    <span>이웃 온정 기부액</span>
                    <span className="font-mono">1,000원</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-gray-800 pt-1.5 border-t border-outline-variant/10">
                  <span>현장 예상 총 결제액</span>
                  <span className="text-lg text-crust-brown font-black font-mono">{grandTotal.toLocaleString()}원</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className="w-full bg-secondary text-white font-bold py-3.5 rounded-xl hover:bg-secondary/90 transition-all active:scale-95 text-xs shadow-md shadow-secondary/10 flex items-center justify-center gap-2"
              >
                {step === 1 ? '지점 예약하기' : '즉시 픽업권 발행 및 예약 확정'}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
