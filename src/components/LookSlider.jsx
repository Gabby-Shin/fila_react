import { useEffect, useMemo, useRef, useState } from 'react';

const slideSpeed = 0.8;

function LookSlider({ images, onItemClick }) {
  const slideContainerRef = useRef(null);
  const animationIdRef = useRef(null);
  const isDraggingRef = useRef(false);
  const isHoveringRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const loopImages = useMemo(() => [...images, ...images], [images]);

  useEffect(() => {
    const slideContainer = slideContainerRef.current;
    if (!slideContainer || images.length === 0) {
      return undefined;
    }

    const getHalfScrollWidth = () => slideContainer.scrollWidth / 2;

    const resetInfiniteScroll = () => {
      const halfScrollWidth = getHalfScrollWidth();

      if (halfScrollWidth <= 0) {
        return;
      }

      if (slideContainer.scrollLeft >= halfScrollWidth) {
        slideContainer.scrollLeft -= halfScrollWidth;
      }

      if (slideContainer.scrollLeft <= 0) {
        slideContainer.scrollLeft += halfScrollWidth;
      }
    };

    const autoSlide = () => {
      if (!isHoveringRef.current && !isDraggingRef.current) {
        slideContainer.scrollLeft += slideSpeed;
        resetInfiniteScroll();
      }

      animationIdRef.current = requestAnimationFrame(autoSlide);
    };

    const handleResize = () => {
      resetInfiniteScroll();
    };

    window.addEventListener('resize', handleResize);
    animationIdRef.current = requestAnimationFrame(autoSlide);

    return () => {
      window.removeEventListener('resize', handleResize);

      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [images.length]);

  const getPageX = (event) => {
    if (event.touches && event.touches.length > 0) {
      return event.touches[0].pageX;
    }

    return event.pageX;
  };

  const resetInfiniteScroll = () => {
    const slideContainer = slideContainerRef.current;
    if (!slideContainer) {
      return;
    }

    const halfScrollWidth = slideContainer.scrollWidth / 2;
    if (halfScrollWidth <= 0) {
      return;
    }

    if (slideContainer.scrollLeft >= halfScrollWidth) {
      slideContainer.scrollLeft -= halfScrollWidth;
    }

    if (slideContainer.scrollLeft <= 0) {
      slideContainer.scrollLeft += halfScrollWidth;
    }
  };

  const startDrag = (event) => {
    const slideContainer = slideContainerRef.current;
    if (!slideContainer) {
      return;
    }

    isDraggingRef.current = true;
    isHoveringRef.current = true;
    startXRef.current = getPageX(event);
    startScrollLeftRef.current = slideContainer.scrollLeft;
    dragDistanceRef.current = 0;
    setIsDragging(true);
  };

  const moveDrag = (event) => {
    const slideContainer = slideContainerRef.current;
    if (!slideContainer || !isDraggingRef.current) {
      return;
    }

    event.preventDefault();

    const currentX = getPageX(event);
    const moveX = currentX - startXRef.current;

    dragDistanceRef.current = Math.abs(moveX);
    slideContainer.scrollLeft = startScrollLeftRef.current - moveX;
    resetInfiniteScroll();
  };

  const endDrag = (shouldKeepHovering = false) => {
    isDraggingRef.current = false;
    isHoveringRef.current = shouldKeepHovering;
    setIsDragging(false);
  };

  const handleClick = (event, imageIndex) => {
    if (dragDistanceRef.current > 5) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    onItemClick?.(imageIndex);
  };

  return (
    <div className="slide_wrapper" aria-label="FILA shop the look slider">
      <ul
        className={isDragging ? 'slide_container dragging' : 'slide_container'}
        ref={slideContainerRef}
        aria-label="Shop the Look images"
        onMouseEnter={() => {
          isHoveringRef.current = true;
        }}
        onMouseLeave={() => endDrag(false)}
        onMouseDown={startDrag}
        onMouseMove={moveDrag}
        onMouseUp={() => endDrag(true)}
        onTouchStart={startDrag}
        onTouchMove={moveDrag}
        onTouchEnd={() => endDrag(false)}
      >
        {loopImages.map((image, index) => {
          const imageIndex = index % images.length;
          const isClone = index >= images.length;

          return (
            <li
              key={`${image}-${index}`}
              role="button"
              tabIndex={isClone ? -1 : 0}
              aria-label={`FILA look ${imageIndex + 1} 자세히 보기`}
              aria-hidden={isClone ? 'true' : undefined}
              onClick={(event) => handleClick(event, imageIndex)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  handleClick(event, imageIndex);
                }
              }}
            >
              <img
                src={image}
                alt={`FILA look ${imageIndex + 1}`}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 480px) 80vw, (max-width: 768px) 45vw, 28vw"
                className={imageIndex === 0 && !isClone ? 'open_popup' : undefined}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default LookSlider;
