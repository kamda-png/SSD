import React, { useState } from 'react';
import { Review, Product } from '../types';
import { MessageSquare, Star, ArrowRight, CheckCircle2, ThumbsUp } from 'lucide-react';

interface ReviewSectionProps {
  initialReviews: Review[];
  products: Product[];
}

export default function ReviewSection({ initialReviews, products }: ReviewSectionProps) {
  const [reviewsList, setReviewsList] = useState<Review[]>(initialReviews);

  const [formName, setFormName] = useState('');
  const [formProduct, setFormProduct] = useState(products[0]?.name || '튀김소보로');
  const [formRating, setFormRating] = useState(5);
  const [formContent, setFormContent] = useState('');
  const [formTag, setFormTag] = useState('가족과 함께');

  const [successMsg, setSuccessMsg] = useState(false);

  const handleLike = (id: string) => {
    setReviewsList(prev => prev.map(rev => {
      if (rev.id === id) {
        return { ...rev, likes: rev.likes + 1 };
      }
      return rev;
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formContent) return;

    const newReview: Review = {
      id: `rev-dyn-${Date.now()}`,
      name: `${formName} 님`,
      productName: formProduct,
      rating: formRating,
      content: formContent,
      tag: formTag,
      date: new Date().toISOString().split('T')[0],
      likes: 0
    };

    setReviewsList(prev => [newReview, ...prev]);
    setSuccessMsg(true);

    // reset fields
    setFormName('');
    setFormContent('');
    setFormRating(5);

    setTimeout(() => {
      setSuccessMsg(false);
    }, 4000);
  };

  return (
    <section className="py-24 bg-white overflow-hidden scroll-reveal">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column - List Reviews */}
        <div className="lg:col-span-7 space-y-8 text-left">
          <div>
            <span className="text-secondary font-bold tracking-widest text-xs uppercase block mb-2">Warm Hearts</span>
            <h2 className="font-headline-lg text-4xl text-crust-brown font-serif">고객님들이 전하는 따뜻한 진심</h2>
            <p className="text-sm text-on-surface-variant max-w-md mt-1">
              밀가루 두 포대로 시작해 60여 년간 사랑방을 지켜온 성심당만의 소박하고 든든한 한 말씀들을 모았습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {reviewsList.map((rev) => (
              <div 
                key={rev.id} 
                className="p-6 md:p-8 rounded-2xl bg-surface-container-low border border-outline-variant/30 relative transition-all hover:bg-white hover:shadow-lg group"
              >
                {/* Quote Icon representation */}
                <div className="absolute top-4 right-6 text-6xl text-secondary font-serif opacity-10 select-none">“</div>
                
                <div className="flex items-center gap-1.5 mb-3 text-secondary">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={i < rev.rating ? 'fill-secondary text-secondary' : 'text-gray-200'} 
                    />
                  ))}
                  <span className="text-xs text-on-surface-variant font-bold ml-1">{rev.productName} 추천</span>
                </div>

                <p className="font-medium text-gray-700 italic leading-relaxed text-sm mb-4">
                  "{rev.content}"
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-secondary-fixed/40 flex items-center justify-center font-bold text-xs uppercase text-on-secondary-fixed-variant">
                      {rev.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-800">{rev.name}</p>
                      <span className="text-[10px] text-on-surface-variant bg-tertiary-fixed text-primary px-2 py-0.5 rounded-full inline-block mt-0.5 font-semibold">
                        {rev.tag}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-on-surface-variant">
                    <span>{rev.date}</span>
                    <button 
                      onClick={() => handleLike(rev.id)}
                      className="flex items-center gap-1 hover:text-secondary font-bold group-hover:scale-105 transition-all text-[11px]"
                    >
                      <ThumbsUp size={12} />
                      공감하기 ({rev.likes})
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - User Guestbook review input */}
        <div className="lg:col-span-5 bg-butter-cream p-8 rounded-2xl border border-outline-variant/40 space-y-6 text-left self-start relative">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="text-secondary" size={20} />
              <h3 className="font-serif font-black text-crust-brown text-xl">이웃 방명록 한 소절</h3>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              성심당 빵을 드시며 느낀 행복한 상해나 대전 추억을 가포함하여 남겨주시면, 이웃들의 소망 피드로 즉시 전시됩니다!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1" htmlFor="guestName">올리시는 분명</label>
              <input 
                id="guestName"
                type="text" 
                required
                value={formName}
                onChange={e => setFormName(e.target.value)}
                placeholder="예: 김성심"
                className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-outline-variant/40 text-xs focus:ring-1 focus:ring-secondary focus:border-secondary outline-none text-gray-800"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1" htmlFor="guestBread">가장 선호하는 빵</label>
                <select 
                  id="guestBread"
                  value={formProduct}
                  onChange={e => setFormProduct(e.target.value)}
                  className="w-full bg-white px-3 py-2.5 rounded-xl border border-outline-variant/40 text-xs focus:ring-1 focus:ring-secondary focus:border-secondary outline-none text-gray-700"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                  <option value="모든 빵">전부 맛있음</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1" htmlFor="guestTopic">이웃 키워드</label>
                <select 
                  id="guestTopic"
                  value={formTag}
                  onChange={e => setFormTag(e.target.value)}
                  className="w-full bg-white px-3 py-2.5 rounded-xl border border-outline-variant/40 text-xs focus:ring-1 focus:ring-secondary focus:border-secondary outline-none text-gray-700"
                >
                  <option value="단골 손님">단골 손님</option>
                  <option value="대전 토박이">대전 토박이</option>
                  <option value="외지 여행자">외지 여행자</option>
                  <option value="소보로 매니아">소보로 매니아</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">정성 별점</label>
              <div className="flex items-center gap-1.5 pt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setFormRating(star)}
                    className="p-1 hover:scale-110 transition-transform"
                    aria-label={`${star}점 선택`}
                  >
                    <Star 
                      size={24} 
                      className={star <= formRating ? 'fill-secondary text-secondary' : 'text-gray-300'} 
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1" htmlFor="guestMsg">행복 후기 소감</label>
              <textarea 
                id="guestMsg"
                required
                rows={3}
                value={formContent}
                onChange={e => setFormContent(e.target.value)}
                placeholder="빵맛은 물론 우리 이웃들과 나누었던 소박한 사연들을 적어주세요."
                className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-outline-variant/40 text-xs focus:ring-1 focus:ring-secondary focus:border-secondary outline-none text-gray-800"
              />
            </div>

            <button
              type="submit"
              className="bg-secondary text-stone-white w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-1.5 hover:bg-secondary/90 transition-all active:scale-95 text-xs shadow-md"
            >
              사랑 소감 등록하기 
              <ArrowRight size={14} />
            </button>
          </form>

          {/* Success messages */}
          {successMsg && (
            <div className="flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 p-3 rounded-xl animate-in slide-in-from-bottom duration-300 text-xs">
              <CheckCircle2 size={16} className="text-green-600" />
              <span>방명록 감사 전각이 무사 등재되었습니다!</span>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
