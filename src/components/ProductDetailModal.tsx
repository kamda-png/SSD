import React, { useState } from 'react';
import { Product } from '../types';
import { X, ShoppingBag, Leaf, Sparkles } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductDetailModal({ product, onClose, onAddToCart }: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [useGiftBox, setUseGiftBox] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    let finalProduct = { ...product };
    if (useGiftBox) {
      finalProduct.price += 1000;
      finalProduct.name = `${product.name} (선물상자포장)`;
    }
    onAddToCart(finalProduct, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-outline-variant/40 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="relative h-64 md:h-80 bg-surface-container overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-all"
            aria-label="정보창 닫기"
          >
            <X size={20} />
          </button>
          
          <div className="absolute bottom-6 left-6 right-6 text-white text-left">
            <div className="flex gap-2 mb-2">
              {product.tags.map(tag => (
                <span key={tag} className="bg-secondary-container text-on-secondary-container text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Sparkles size={10} /> {tag}
                </span>
              ))}
            </div>
            <h2 className="text-3xl font-bold font-serif mb-1">{product.name}</h2>
            <p className="text-sm text-gray-200 uppercase font-bold tracking-wider">{product.englishName}</p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="text-left">
            <h4 className="text-xs uppercase tracking-widest text-secondary font-bold mb-1">Bakemasters Story</h4>
            <p className="text-gray-700 font-medium leading-relaxed mb-4">
              {product.detailDescription || product.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 border-y border-outline-variant/30 py-4 text-left">
            <div>
              <span className="text-xs text-on-surface-variant block uppercase font-bold tracking-tight">주요 성분 & 레시피</span>
              <span className="text-sm font-semibold text-gray-800 flex items-center gap-1 mt-1">
                <Leaf size={14} className="text-green-600" />
                {product.ingredients ? product.ingredients.join(', ') : '유기농 밀가루, 국산 설탕'}
              </span>
            </div>
            <div>
              <span className="text-xs text-on-surface-variant block uppercase font-bold tracking-tight">에너지 정보</span>
              <span className="text-sm font-semibold text-gray-800 mt-1 block">
                {product.calories ? `${product.calories} kcal` : '상세정보 별도표기'}
              </span>
            </div>
          </div>

          {/* Options and Quantity controls */}
          <div className="space-y-4 text-left">
            <h4 className="text-sm font-bold text-gray-800 uppercase tracking-tight">주문 옵션 선택</h4>
            
            <div className="flex items-center justify-between p-3.5 bg-butter-cream rounded-xl border border-outline-variant/30">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-800">성심당 실속 선물 상자 패키지</span>
                <span className="text-xs text-on-surface-variant">정성스러운 박스 포장 및 쇼핑백 증정 (+1,000원)</span>
              </div>
              <input 
                type="checkbox" 
                checked={useGiftBox}
                onChange={(e) => setUseGiftBox(e.target.checked)}
                className="w-5 h-5 accent-secondary text-white rounded focus:ring-secondary border-gray-300"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="font-bold text-gray-800">수량 선택</span>
              <div className="flex items-center border border-outline-variant/40 rounded-xl overflow-hidden bg-white">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-3 py-1.5 hover:bg-gray-100 font-bold text-gray-600 transition-colors"
                >
                  -
                </button>
                <span className="px-5 py-1.5 font-bold text-gray-800 min-w-[40px] text-center">
                  {quantity}
                </span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-3 py-1.5 hover:bg-gray-100 font-bold text-gray-600 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Pricing and Action button */}
          <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20">
            <div>
              <span className="text-xs text-on-surface-variant block uppercase font-bold">총 합계 금액</span>
              <span className="text-2xl font-black text-crust-brown font-mono">
                {((product.price + (useGiftBox ? 1000 : 0)) * quantity).toLocaleString()}원
              </span>
            </div>
            <button
              onClick={handleAdd}
              className="bg-secondary text-white font-bold px-8 py-3.5 rounded-xl hover:bg-secondary/90 transition-all active:scale-95 flex items-center gap-2 shadow-md hover:shadow-lg text-sm"
            >
              <ShoppingBag size={16} />
              장바구니 담기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
