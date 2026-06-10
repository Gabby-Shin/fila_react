import shoesImage from '../assets/images/product-shoes.webp';
import shirtImage from '../assets/images/product-shirt.webp';
import sneakerImage from '../assets/images/product-sneaker.webp';
import cartImage from '../assets/images/cart-airism.avif';
import detailImage1 from '../assets/images/detail-1.webp';
import detailImage2 from '../assets/images/detail-2.webp';
import detailImage3 from '../assets/images/detail-3.webp';
import detailImage4 from '../assets/images/detail-4.jpg';
import editMain from '../assets/images/edit-main.webp';
import editSub from '../assets/images/edit-sub.webp';
import info1 from '../assets/images/info-1.webp';
import info2 from '../assets/images/info-2.webp';
import flow1 from '../assets/images/flow-1.webp';
import flow2 from '../assets/images/flow-2.webp';
import flow3 from '../assets/images/flow-3.webp';
import flow4 from '../assets/images/flow-4.webp';
import flow5 from '../assets/images/flow-5.webp';
import flow6 from '../assets/images/flow-6.webp';
import flow7 from '../assets/images/flow-7.webp';
import flow8 from '../assets/images/flow-8.webp';
import heroVideo1 from '../assets/videos/fila-video-1.mp4';
import heroVideo2 from '../assets/videos/fila-video-2.mp4';
import heroVideo3 from '../assets/videos/fila-video-3.mp4';

const detailImages = [detailImage1, detailImage2, detailImage3, detailImage4];

export const trendTabs = [
  { id: 'mytee', label: '마이티셔츠' },
  { id: 'glio', label: '글리오' },
  { id: 'light', label: '경량' },
  { id: 'peito', label: '페이토' },
  { id: 'echappe', label: '에샤페' },
  { id: 'harepin', label: '하레핀' },
  { id: 'tennis', label: '테니스' },
];

export const heroSlides = [
  {
    id: 1,
    video: heroVideo1,
    title: 'My Favorite : Puppy',
    description: 'FILA favorite campaign with playful daily sportswear.',
  },
  {
    id: 2,
    video: heroVideo2,
    title: 'Shape of Running',
    description: 'FLOAT TR9 2.0 Collaboration with ARC.',
  },
  {
    id: 3,
    video: heroVideo3,
    title: 'Pianist Yeolum Son',
    description: 'Clair de Lune, interpreted through FILA mood.',
  },
];

export const homeImages = {
  editMain,
  editSub,
  info1,
  info2,
  flow: [flow1, flow2, flow3, flow4, flow5, flow6, flow7, flow8],
};

export const products = [
  {
    id: 1,
    category: 'Unisex',
    trendCategory: 'mytee',
    name: 'My Tee Graphic Overfit T-Shirt',
    price: '49,900원',
    image: shirtImage,
    detailImages,
    code: 'FS252TS01F001',
  },
  {
    id: 2,
    category: 'Shoes',
    trendCategory: 'glio',
    name: 'Classic Court Sneakers',
    price: '89,000원',
    image: shoesImage,
    detailImages,
    code: 'FS262OP11F003',
  },
  {
    id: 3,
    category: 'Running',
    trendCategory: 'light',
    name: 'Daily Runner Float',
    price: '109,000원',
    image: sneakerImage,
    detailImages,
    code: 'FS252SH02F002',
  },
  {
    id: 4,
    category: 'Inner',
    trendCategory: 'peito',
    name: 'Air Comfort Top',
    price: '29,000원',
    image: cartImage,
    detailImages,
    code: 'FS252IN03F004',
  },
  {
    id: 5,
    category: 'Women',
    trendCategory: 'echappe',
    name: 'Echappe Velvet Mary Jane',
    price: '99,900원',
    image: shoesImage,
    detailImages,
    code: 'FS252MJ04F005',
  },
  {
    id: 6,
    category: 'Accessories',
    trendCategory: 'harepin',
    name: 'Heritage Hairpin Set',
    price: '19,000원',
    image: shirtImage,
    detailImages,
    code: 'FS252AC05F006',
  },
  {
    id: 7,
    category: 'Tennis',
    trendCategory: 'tennis',
    name: 'Speed Serve Tennis Polo',
    price: '79,000원',
    image: sneakerImage,
    detailImages,
    code: 'FS252TN06F007',
  },
  {
    id: 8,
    category: 'Unisex',
    trendCategory: 'mytee',
    name: 'Logo Graphic Tee',
    price: '45,000원',
    image: shirtImage,
    detailImages,
    code: 'FS252TS07F008',
  },
];
