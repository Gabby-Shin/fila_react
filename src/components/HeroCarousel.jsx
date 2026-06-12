import { useCallback, useEffect, useRef, useState } from 'react';
import ArrowButton from './ArrowButton.jsx';

const slideMoveMillisecond = 800;
const autoplayDelay = 5000;
const swipeThreshold = 50;

function HeroCarousel({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const currentIndexRef = useRef(0);
  const movingRef = useRef(false);
  const timeoutRef = useRef(null);
  const dragStartXRef = useRef(0);
  const videoRefs = useRef([]);

  useEffect(() => {
    currentIndexRef.current = currentIndex;

    const currentVideo = videoRefs.current[currentIndex];
    if (!currentVideo) {
      return;
    }

    const playPromise = currentVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }, [currentIndex]);

  useEffect(() => () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const moveToSlide = useCallback((index) => {
    if (movingRef.current || slides.length === 0) {
      return;
    }

    movingRef.current = true;
    setIsMoving(true);

    const nextIndex = (index + slides.length) % slides.length;
    setCurrentIndex(nextIndex);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      movingRef.current = false;
      setIsMoving(false);
    }, slideMoveMillisecond);
  }, [slides.length]);

  useEffect(() => {
    if (isPaused || slides.length === 0) {
      return undefined;
    }

    const autoplayTimer = setInterval(() => {
      moveToSlide(currentIndexRef.current + 1);
    }, autoplayDelay);

    return () => clearInterval(autoplayTimer);
  }, [isPaused, moveToSlide, slides.length]);

  const moveLeft = () => {
    moveToSlide(currentIndexRef.current - 1);
  };

  const moveRight = () => {
    moveToSlide(currentIndexRef.current + 1);
  };

  const handlePointerDown = (event) => {
    setIsPaused(true);
    dragStartXRef.current = event.clientX;
  };

  const handlePointerUp = (event) => {
    const diffX = dragStartXRef.current - event.clientX;

    if (event.pointerType !== 'mouse') {
      setIsPaused(false);
    }

    if (Math.abs(diffX) <= swipeThreshold) {
      return;
    }

    if (diffX > 0) {
      moveRight();
    } else {
      moveLeft();
    }
  };

  return (
    <section
      className="carousel_container"
      aria-label="FILA featured promotions"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <div className="button_container">
        <ArrowButton direction="left" label="Previous banner" onClick={moveLeft} />
        <ArrowButton label="Next banner" onClick={moveRight} />
      </div>

      <ul
        className="carousel"
        aria-live={isPaused ? 'polite' : 'off'}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transitionDuration: isMoving ? `${slideMoveMillisecond}ms` : '0ms',
        }}
      >
        {slides.map((slide, index) => (
          <li
            className="slide"
            key={slide.id}
            aria-hidden={index !== currentIndex}
            aria-label={`${index + 1} / ${slides.length}`}
            aria-roledescription="slide"
          >
            <video
              ref={(element) => {
                videoRefs.current[index] = element;
              }}
              aria-label={slide.title}
              autoPlay
              muted
              loop
              playsInline
              preload={index === 0 ? 'auto' : 'metadata'}
            >
              <source src={slide.video} type="video/mp4" />
            </video>
            <div className="hero_text">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default HeroCarousel;
