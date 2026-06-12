import { useRef } from 'react';
import ArrowButton from './ArrowButton.jsx';
import model1 from '../assets/images/model-1.webp';
import model2 from '../assets/images/model-2.webp';
import model3 from '../assets/images/model-3.webp';
import model4 from '../assets/images/model-4.webp';

const modelImages = [model1, model2, model3, model4];

function ModelCutSection() {
  const sliderRef = useRef(null);

  const slideModelCut = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const firstCard = slider.querySelector('.image_container_card');
    const cardWidth = firstCard?.getBoundingClientRect().width || slider.clientWidth;
    const gap = Number.parseFloat(window.getComputedStyle(slider).columnGap) || 0;

    slider.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: 'smooth',
    });
  };

  return (
    <section id="model_cut" aria-labelledby="model-cut-heading">
      <div className="model_cut_title">
        <h2 id="model-cut-heading">모델컷</h2>
        <div className="buttons">
          <ArrowButton direction="left" label="Previous model image" onClick={() => slideModelCut(-1)} />
          <ArrowButton label="Next model image" onClick={() => slideModelCut(1)} />
        </div>
      </div>

      <p>
        모델 165cm / 착용 사이즈 S
        <br />
        실제 상품의 컬러는 상세 이미지와 가장 가깝습니다.
      </p>

      <div className="image_container" ref={sliderRef} aria-label="Model cut images">
        {modelImages.map((image, index) => (
          <div className="image_container_card show" key={image}>
            <img
              src={image}
              alt={`모델컷 ${index + 1}`}
              loading="lazy"
              decoding="async"
              sizes="(max-width: 480px) 70vw, (max-width: 768px) 45vw, 25vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default ModelCutSection;
