import { useRef } from 'react';
import ArrowButton from './ArrowButton.jsx';
import checkpoint1 from '../assets/images/checkpoint-1.jpg';
import checkpoint2 from '../assets/images/checkpoint-2.webp';
import checkpoint3 from '../assets/images/checkpoint-3.webp';
import checkpoint4 from '../assets/images/checkpoint-4.webp';

const checkpoints = [
  {
    image: checkpoint1,
    title: '레이어드 볼륨 디자인',
    text: '레이어드 구조로 볼륨감을 더해 생동감 있는 스타일을 완성합니다.',
  },
  {
    image: checkpoint2,
    title: '리브 조직 스트레치 소재',
    text: '스트레치 소재가 편안한 착용감을 제공하고 움직임을 자연스럽게 받쳐줍니다.',
  },
  {
    image: checkpoint3,
    title: '이너 쇼츠 & 포켓',
    text: '안정적인 착용을 위한 이너 쇼츠와 실용적인 포켓 디테일을 적용했습니다.',
  },
  {
    image: checkpoint4,
    title: '활동 중심 설계',
    text: '다양한 활동 상황에서도 안정적으로 착용할 수 있도록 설계했습니다.',
  },
];

function CheckpointSection() {
  const cardboxRef = useRef(null);

  const moveCheckpoint = (direction) => {
    const cardbox = cardboxRef.current;
    if (!cardbox) return;

    cardbox.scrollBy({
      left: direction * cardbox.clientWidth * 0.8,
      behavior: 'smooth',
    });
  };

  return (
    <section id="checkpoint" aria-labelledby="checkpoint-heading">
      <div className="check_title">
        <h2 id="checkpoint-heading">체크포인트</h2>
        <div className="buttons">
          <ArrowButton
            direction="left"
            label="Previous checkpoint"
            onClick={() => moveCheckpoint(-1)}
          />
          <ArrowButton label="Next checkpoint" onClick={() => moveCheckpoint(1)} />
        </div>
      </div>

      <section className="cardbox" ref={cardboxRef} aria-label="Product checkpoints">
        {checkpoints.map((item) => (
          <div key={item.title}>
            <div className="card">
              <div className="image_container show">
                <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
}

export default CheckpointSection;
