import ArrowButton from './ArrowButton.jsx';
import model1 from '../assets/images/model-1.webp';
import model2 from '../assets/images/model-2.webp';
import model3 from '../assets/images/model-3.webp';
import model4 from '../assets/images/model-4.webp';

const modelImages = [model1, model2, model3, model4];

function ModelCutSection() {
  return (
    <section id="model_cut">
      <div className="model_cut_title">
        <h2>모델컷</h2>
        <div className="buttons">
          <ArrowButton direction="left" label="Previous model image" />
          <ArrowButton label="Next model image" />
        </div>
      </div>

      <p>
        모델 165cm / 착용 사이즈 S
        <br />
        실제 상품의 컬러는 상세 이미지와 가장 가깝습니다.
      </p>

      <div className="image_container">
        {modelImages.map((image, index) => (
          <div className="image_container_card show" key={image}>
            <img src={image} alt={`모델컷 ${index + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default ModelCutSection;
