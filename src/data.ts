import { Product, Branch, Review, StoryEvent } from './types';

export const products: Product[] = [
  {
    id: 'soboro',
    name: '튀김소보로',
    englishName: 'Fried Soboro',
    description: '1980년 탄생한 성심당의 상징. 도넛, 소보로, 팥앙금의 환상적인 3단 합체!',
    detailDescription: '성심당의 No.1 명물로 바삭하고 고소함의 결정체입니다. 대전에 오면 꼭 먹어야 하는 빵 1위로 꼽히며, 달콤하고 가득 찬 통팥 앙금과 소보로의 고소함이 튀겨짐으로써 극상의 바삭함을 제공합니다.',
    price: 1700,
    category: 'signature',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9sufIY_gDyCtuYrQ2YwXXWZ3Hj-TR2fr5LQGippEvzy2w5MD1bfyHz2gMqbmnAyi-r2ySnD8UoILT1soLBGJ4HNxw3-Dmuk1BXmDnYORdMJHzGk9kUT1tUQPDHFfolppAtaD0bK92qMH_OD2-mTDMC5sVO9jzRd00GGbryxDpstHSV5ImBy4hFTTtlWFNgtieRgJfdrQtm41YdIVzylL2aoHLI3QdkcKFlsnun4ezy5me8059-kA2lquH9Gc7aY1OjSlwr98co7Xf',
    tags: ['Best Seller', 'Signature', 'Sweet Bean Fill'],
    bestSeller: true,
    ingredients: ['국산 밀', '국산 단팥앙금', '땅콩 소보로', '버터'],
    calories: 340
  },
  {
    id: 'fruit-shier',
    name: '과일시루 막내',
    englishName: 'Fruit Shier (Junior)',
    description: '제철 과일이 듬뿍 담긴 시그니처 케이크. 흘러넘치듯이 신선한 과일의 하모니.',
    detailDescription: '케익부띠끄의 명물로, 초코 제누와즈 시트 사이사이에 딸기, 샤인머스캣, 귤, 포도가 빈틈없이 차곡차곡 쌓여 묵직한 무게와 달지 않은 부드러운 우유 크림이 어우러지는 환상적인 시그니처 과일 폭탄 케이크입니다.',
    price: 45000,
    category: 'cake',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtK7Q4LQx7ic2j1QOkIxFoily44mFd6PKdq6vli0RsX0pntIM9kg8QMlAT-Yi2nga8NNskdSmRQfuHYyVew2Ri42a1gwmKxDcb9EBoFTeWKAeBrC2PYHla9gGm3jGACkLqX-Uy998eE_KtxJWQ_I6BJxqTV375dFb77J6JsHMjDiX-MI8feOi5191r8qC8A2L2VkH4JNQDoWKTNAV2-8GCX-tS0zE9FpgYLuG2Q8XSS9i746_JNU-F3WY6RjL86Tsu3sOlxGAqgQha',
    tags: ['Fresh Fruit', 'Chocolate Sheet', 'Premium Cream'],
    bestSeller: true,
    ingredients: ['딸기', '샤인머스캣', '귤', '포도', '동물성 크림', '벨기에산 초콜릿'],
    calories: 1450
  },
  {
    id: 'buchu',
    name: '판타롱부추빵',
    englishName: 'Pantaloons Chives Bread',
    description: '신선한 부추와 계란 소가 가득한 추억의 맛. 향긋한 채소가 돋보이는 웰빙 빵.',
    detailDescription: '1986년 판타롱 바지를 입고 다니는 청춘들을 보며 기발하게 만들어냈던 성심당의 시그니처 부추 소빵입니다. 아삭한 생 부추와 영양 가득한 달걀 샐러드, 다진 햄의 담백한 맛이 일품입니다.',
    price: 2000,
    category: 'signature',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1rVsIYwIssugQ3cUKYS3mdMOPy3AobXi41wBQb2Ag_y5IZgUwM0FWnxGCQsqBuERBO9ajStcVqAoqYlIYNutm9nfCTr04g1cXnYs0EOqXaUBgpoUBIU3uoWn51GDi_aX27G6lIkoRKUy5C5PRqoVbp5Y7KexZZQ64RcRBOWuSktDGZVjTxuPF1AVmfkptTyJGSHUL4enF2MhQaAuLQFAeleqAK2hjJIU-AcvfEb2TJWC09jONq_l9xrY1aTFzdgdIk2JDuWkUKpe3',
    tags: ['Choves Egg', 'Traditional', 'Savory Roll'],
    bestSeller: false,
    ingredients: ['신선생부추', '삶은 계란', '돈육 햄', '천일염'],
    calories: 220
  },
  {
    id: 'strawberry-mansion',
    name: '딸기시루 (시즌)',
    englishName: 'Strawberry Mansion',
    description: '압도적인 생딸기 양으로 대전 케이크 대란을 이끈 바로 그 겨울 시즌 한정 케이크!',
    detailDescription: '시즌 오픈하자마자 몇 시간씩 대기 줄을 세운 전설의 딸기시루 케이크입니다. 약 2kg가 넘는 영롱한 논산 생딸기가 진한 초콜릿 브라우니 시트 위에 초콜릿 생크림과 함께 높게 쌓여 있어 압도적 비주얼과 맛을 동시에 보장합니다.',
    price: 43000,
    category: 'cake',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBzTASVmALpWWV3qZqlqv_qxXYTw_G2ceV-8Bs-ckJIW_v0o2nq4VReFEsIZ3tCwdWtcCALFJlyD2YIkU5gxhfS4iIQwLwUuLzzSfqKgX_qAeX_W-ZDMWMIrFmzc29-5h6bV8VHPoiUy_SfezEy1eC5aIIB7SzfDMGu-_WorSfnw1Sr_8HaOuXFqDROdUjzUVnmkVdmfmSahd2lo8BOqO4fwRB1oCTLgNgYGvfbyCXsOCBspidmR75GtjBaj0tM_W8nVbxkAuZSdCn',
    tags: ['Strawberry Bomb', 'Season Only', 'Pure Decadence'],
    bestSeller: true,
    ingredients: ['딸기 2.3kg', '생크림', '코코아 제누와즈'],
    calories: 1580
  },
  {
    id: 'sweet-redbean-bread',
    name: '옛맛 단팥빵',
    englishName: 'Sweet Red Bean Bread',
    description: '옛 시절 정통 레시피 그대로 가마솥으로 끓여 깊고 달콤한 팥이 씹히는 추억의 빵.',
    detailDescription: '얇고 쫄깃한 발효 도우 안에, 오랫동안 저온 숙성시킨 달콤한 수제 팥 앙금을 알차게 채우고 검은 호두 호박씨를 고명으로 올린 남녀노소 누구나 사랑하는 대표 인기 빵입니다.',
    price: 1500,
    category: 'bread',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDO3JxHgTlTKxV3CpsWTKRo2VmiDCa3ZtNggfzxq9hMrZCCBz5gVGp49UfBaf216sIHvIJNqJconIbq2XM_aKM3_zyb_w-Jv1hIayVAtU2iTlk6ah5j79lSCGM9Mk61de0DrO8MDQlEsGvWA9G38VTrW8VOzvUaKicmGcKTY_vx9xCOTQlEqYatMmzyU81Cztcra4KTrbGEQLDlgkVZ08sCfZdP74dIMoUNSJWYfg0GCs0GyKr8_h9XNfHig4dq3eCYn0k0fUuPWVEw',
    tags: ['Classic', 'Sweet Red Bean', 'Local Heritage'],
    bestSeller: true,
    ingredients: ['단팥', '통 밀가루', '흑임자', '버터'],
    calories: 270
  },
  {
    id: 'bomunsan-echo',
    name: '보문산 메아리',
    englishName: 'Bomunsan Echo',
    description: '바삭하면서도 속은 사르르 녹아내리는 페이스트리 명물. 촉촉한 메이플 향의 여운.',
    detailDescription: '보문산 메아리는 대전의 명산 보문산의 시원한 산골짜기 숲길을 걸으며 느끼는 메아리에서 영감을 받아 만든 촉촉하고 부드러운 유기농 황금 페이스트리 빵입니다. 겹겹으로 버터 풍미가 가득 펼쳐져 한 겹씩 뜯어먹는 촉촉함이 예술입니다.',
    price: 6000,
    category: 'signature',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLYjJZORWxXmES5rk_NkIu51izxeh_t42C74AQCA2EWaCXKdHqoG2yv0__ECs3LJ_1aYsbZe4ej9xlTT32GyglChdV7tcGMW_oLWb7JiFVdzzm8gxWsRBLDaqPx-YsKD_Ow-smL82dlqvL4r9K4Z-wxHRbFC7kt4zs5lAI1tBDPMAcFueEbp2T9qJKqSm_YPe3nCEMNnSeWzqxu5BqzYVvN_ltwdBZ8L_-d1Ca7AHYc0DyfHQv-n5pcXqaDXlEzCu3_8wtP2zqTzHy',
    tags: ['Pastry', 'Maple Syrup', 'Marilyn Roll'],
    bestSeller: true,
    ingredients: ['천연 버터', '메이플 시럽', '유기농 밀가루'],
    calories: 450
  },
  {
    id: 'myeongran-baguette',
    name: '명란바게트',
    englishName: 'Pollock Roe Baguette',
    description: '짭조름한 명란과 고소한 김가루가 어우러져 한 번 먹으면 멈출 수 없는 맥주 도둑 빵.',
    detailDescription: '바삭바삭 소리까지 맛있는 바게트 속을 가르고 고소한 참기름을 머금은 짭조름한 청주산 명란젓을 아낌없이 가득 채운 별미 빵입니다. 에어프라이어에 살짝 구워 마요네즈를 찍으면 더 환상적인 맛을 느낄 수 있습니다.',
    price: 3800,
    category: 'bread',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1rVsIYwIssugQ3cUKYS3mdMOPy3AobXi41wBQb2Ag_y5IZgUwM0FWnxGCQsqBuERBO9ajStcVqAoqYlIYNutm9nfCTr04g1cXnYs0EOqXaUBgpoUBIU3uoWn51GDi_aX27G6lIkoRKUy5C5PRqoVbp5Y7KexZZQ64RcRBOWuSktDGZVjTxuPF1AVmfkptTyJGSHUL4enF2MhQaAuLQFAeleqAK2hjJIU-AcvfEb2TJWC09jONq_l9xrY1aTFzdgdIk2JDuWkUKpe3',
    tags: ['Ocean Savory', 'Crisp Baguette', 'Popular Side'],
    ingredients: ['덕적명란젓계', '바게트용 밀', '참깨가루', '참기름'],
    calories: 310
  },
  {
    id: 'pura-choco',
    name: '푸라초코',
    englishName: 'Pura-Choco',
    description: '진한 벨기에산 초콜릿 코팅을 머금은 촉촉한 초콜릿 발효 머핀 빵.',
    detailDescription: '촉촉하게 부서지는 카카오 발효 빵 시트에 고급 다크 초콜릿이 물결치듯 머금고 있어, 쌉싸름하면서도 고급스럽게 밀려오는 초콜릿 맛의 향연을 선사합니다.',
    price: 3000,
    category: 'bread',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBzTASVmALpWWV3qZqlqv_qxXYTw_G2ceV-8Bs-ckJIW_v0o2nq4VReFEsIZ3tCwdWtcCALFJlyD2YIkU5gxhfS4iIQwLwUuLzzSfqKgX_qAeX_W-ZDMWMIrFmzc29-5h6bV8VHPoiUy_SfezEy1eC5aIIB7SzfDMGu-_WorSfnw1Sr_8HaOuXFqDROdUjzUVnmkVdmfmSahd2lo8BOqO4fwRB1oCTLgNgYGvfbyCXsOCBspidmR75GtjBaj0tM_W8nVbxkAuZSdCn',
    tags: ['Sweet Dark', 'Chocolate Glaze'],
    ingredients: ['다크 초코칩', '프랑스 생크림', '코코넛 칩'],
    calories: 360
  }
];

export const branches: Branch[] = [
  {
    name: '성심당 은행동 본점',
    address: '대전광역시 중구 대종로480번길 15 (중앙로역 2번 출구 근처)',
    hours: '매일 08:00 ~ 22:00 (연중무휴)',
    phone: '1588-8069',
    description: '1956년부터 시작한 성심당의 심장이자 역사가 살아 숨 쉬는 대전의 랜드마크 본점입니다. 갓 구워져 진열되는 수백 가지 다양한 빵의 행렬을 즐기실 수 있습니다.',
    mapX: 52,
    mapY: 53
  },
  {
    name: '성심당 케익부띠끄 본점',
    address: '대전광역시 중구 대종로 480 (본점 바로 인근 사거리 코너)',
    hours: '매일 08:00 ~ 21:30 (금/토/일은 22:00 까지)',
    phone: '1588-8069 (내선 2번)',
    description: '과일시루, 순수롤, 컵케이크, 쇼콜라 등 고품격 서양식 디저트와 프리미엄 제과류만 전문적으로 제작하는 성심당의 시그니처 케이크 전문 브랜드 공간입니다.',
    mapX: 43,
    mapY: 48
  },
  {
    name: '성심당 대전역점',
    address: '대전광역시 동구 중앙로 215 (대전역사 내 2층 대합실)',
    hours: '매일 06:30 ~ 22:30',
    phone: '1588-8069 (내선 3번)',
    description: '기차 여행 전후에 들르기 가장 편리한 매장입니다. 출장 및 관광 후 선물용 상자 소보로 세트를 신속하고 정성스럽게 포장하여 기차시간 맞춤 서비스를 제공합니다.',
    mapX: 68,
    mapY: 28
  },
  {
    name: '성심당 롯데백화점 대전점',
    address: '대전광역시 서구 계룡로 598 롯데백화점 지하 1층',
    hours: '매일 10:30 ~ 20:00 (백화점 정기휴점 제외)',
    phone: '1588-8069 (내선 4번)',
    description: '롯데백화점 대전점에서만 한정 생산되는 독창적인 스페셜티 빵들과 시그니처 라인을 조용하고 안락한 디저트 카페 라운지와 함께 여유롭게 맛보실 수 있는 특별 지점입니다.',
    mapX: 30,
    mapY: 72
  }
];

export const reviews: Review[] = [
  {
    id: 'rev-1',
    name: '김지민 님',
    productName: '튀김소보로',
    rating: 5,
    content: '대전 여행의 필수 코스죠! 튀김소보로는 언제 먹어도 질리지 않는 맛이에요. 가마솥에서 갓 튀겨서 나왔을 때 그 바삭바삭 소리가 나는 껍질과 속에 든 따뜻하고 영롱한 단팥의 조화는 단연 우주 최고입니다.',
    tag: '정기 구독 회원',
    date: '2026-05-18',
    likes: 124
  },
  {
    id: 'rev-2',
    name: '이동욱 님',
    productName: '과일시루 막내',
    rating: 5,
    content: '부모님 환갑 생신 때 장장 2시간의 웨이팅 끝에 샀는데, 과일 무게 때문에 상자가 찢어질 뻔할 정도로 묵직하고 실했습니다! 딸기 샤인머스캣 모두 너무 고당도였고 크림도 생유립이라 속이 전혀 부대끼지 않았어요.',
    tag: '단골 손님',
    date: '2026-05-15',
    likes: 98
  },
  {
    id: 'rev-3',
    name: '박서윤 님',
    productName: '판타롱부추빵',
    rating: 5,
    content: '단순히 유명 빵집이 아니라 Daejeon 로컬의 문화와 역사를 지켜가는 성심당의 따뜻한 나눔 행보가 늘 자랑스럽고 지지하게 됩니다. 매달 신작 브레드를 맛보는 행복한 취미가 생겼어요!',
    tag: '로컬 서포터즈',
    date: '2026-05-10',
    likes: 85
  }
];

export const storyEvents: StoryEvent[] = [
  {
    year: '1956년',
    title: '밀가루 두 포대로 시작된 기적',
    description: '한국전쟁 피난길에서 살아남아 대전역 한구석 작은 천막에서 삶의 유일한 전재산인 밀가루 2포대로 찐빵을 쪄 이웃에게 나눠주며 시작된 성심당의 위대한 시조입니다.',
    bgImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACV57wuoyE37yVbt1ImiUQoVou2WwJMGAXdWvDSlJ-SxlC5EOzVuXJp0HVMaFWPFf0VxbxDrhVzmeMYnSqqkzMfPAsXrw3gjVFzpMoL-tag9Q35JaL2iR2FvCK1e0d_-9ODFYx1NoKWNGBYydpdKmjhqmtGEsPfiyOk7E81W3eNUFHdmyJz4BySUufbNGcE17SDFnpaTO0hGe4aUmtJf9679iZ7KhvDssWihdJF86o8fopnV790igBZ-nTVQp9zKnBM-OdaPXUBIFB'
  },
  {
    year: '1980년',
    title: '동방의 영광, 튀김소보로의 센세이션',
    description: '도넛의 쫄깃함, 단팥의 달콤함, 소보로의 고소함과 구수함을 한데 조합하여 오직 독자적인 수제 가마솥 튀김 기법으로 완성시킨 대한민국 제빵 역사에 길이 남을 주역이 창제되었습니다.',
    bgImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9sufIY_gDyCtuYrQ2YwXXWZ3Hj-TR2fr5LQGippEvzy2w5MD1bfyHz2gMqbmnAyi-r2ySnD8UoILT1soLBGJ4HNxw3-Dmuk1BXmDnYORdMJHzGk9kUT1tUQPDHFfolppAtaD0bK92qMH_OD2-mTDMC5sVO9jzRd00GGbryxDpstHSV5ImBy4hFTTtlWFNgtieRgJfdrQtm41YdIVzylL2aoHLI3QdkcKFlsnun4ezy5me8059-kA2lquH9Gc7aY1OjSlwr98co7Xf'
  },
  {
    year: '2014년',
    title: '프란치스코 교황의 식사 빵 제공',
    description: '교황 성하의 방한 당시 공식 오찬과 아침 식사 테이블에 성심당의 아티스널 치아바타와 호밀빵이 낙점되어 교황 청사 비서실로부터 극찬을 받으며 글로벌 명성을 떨쳤습니다.'
  },
  {
    year: '2024년',
    title: '‘시루’ 열풍과 성심당의 선포된 약속',
    description: '과일시루와 딸기시루 케이크 구하러 대전으로 모인 전국적 오픈런 대란 신화를 촉발시키며, 당일 생산 당일 판매 및 남겨진 빵 전량 지역 사회 푸드뱅크 기증 원칙을 지키는 진정한 나눔 가치를 이행 중입니다.'
  }
];
