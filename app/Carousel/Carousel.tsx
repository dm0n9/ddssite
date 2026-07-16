"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import cardDetails from "./carouselConfig";

const AUTO_PLAY_TIME = 5000;
const TRANSITION_MS = 1000;

export const Carousel = () => {
  const hasMultipleSlides = cardDetails.length > 1;

  const [activeIndex, setActiveIndex] = useState(hasMultipleSlides ? 1 : 0);
  const [withTransition, setWithTransition] = useState(true);

  // Ref-флаг вместо ещё одного state — не даёт пользователю "сломать" слайдер,
  // кликая по стрелкам быстрее, чем идёт анимация (иначе индекс уезжает за
  // пределы массива клонов и лента дёргается/пустеет).
  const isAnimatingRef = useRef(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Клоны первого/последнего слайда по краям — классический приём для
  // бесконечной карусели без "прыжка" в момент возврата к началу.
  const slides = useMemo(() => {
    if (!hasMultipleSlides) return cardDetails;
    const firstSlide = cardDetails[0];
    const lastSlide = cardDetails[cardDetails.length - 1];
    return [lastSlide, ...cardDetails, firstSlide];
  }, [hasMultipleSlides]);

  const goToNextSlide = useCallback(() => {
    if (!hasMultipleSlides || isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setWithTransition(true);
    setActiveIndex((currentIndex) => currentIndex + 1);
  }, [hasMultipleSlides]);

  const goToPreviousSlide = useCallback(() => {
    if (!hasMultipleSlides || isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setWithTransition(true);
    setActiveIndex((currentIndex) => currentIndex - 1);
  }, [hasMultipleSlides]);

  const resetAutoplay = useCallback(() => {
    if (!hasMultipleSlides) return;
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(goToNextSlide, AUTO_PLAY_TIME);
  }, [goToNextSlide, hasMultipleSlides]);

  // Автоплей — перезапускается после ручного клика, чтобы слайд не
  // "перескакивал" почти сразу после того, как пользователь сам его выбрал.
  useEffect(() => {
    resetAutoplay();
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [resetAutoplay]);

  useEffect(() => {
    if (withTransition) return;
    const raf = requestAnimationFrame(() => setWithTransition(true));
    return () => cancelAnimationFrame(raf);
  }, [withTransition]);

  const handleTransitionEnd = () => {
    isAnimatingRef.current = false;

    if (!hasMultipleSlides) return;

    if (activeIndex === slides.length - 1) {
      setWithTransition(false);
      setActiveIndex(1);
    } else if (activeIndex === 0) {
      setWithTransition(false);
      setActiveIndex(cardDetails.length);
    }
  };

  const handleManualNav = (action: () => void) => {
    action();
    resetAutoplay();
  };

  const goToSlide = (index: number) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setWithTransition(true);
    setActiveIndex(index + 1);
    resetAutoplay();
  };

  const visibleSlideIndex = !hasMultipleSlides
    ? 0
    : activeIndex === 0
      ? cardDetails.length - 1
      : activeIndex === slides.length - 1
        ? 0
        : activeIndex - 1;

  return (
    <section
      aria-label="Image carousel"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "#0d233a",
      }}
    >
      <div
        onTransitionEnd={handleTransitionEnd}
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          transform: `translateX(-${activeIndex * 100}%)`,
          transition: withTransition
            ? `transform ${TRANSITION_MS}ms ease-in-out`
            : "none",
        }}
      >
        {slides.map((card, index) => (
          <div
            key={`${card.id}-${index}`}
            style={{
              position: "relative",
              // flex: "0 0 100%" вместо width: "100%" — гарантирует, что
              // каждый слайд занимает ровно ширину контейнера и не сжимается,
              // сколько бы слайдов ни было в массиве.
              flex: "0 0 100%",
              maxWidth: "100%",
              height: "100%",
            }}
          >
            <Image
              src={card.imgUrl}
              alt={card.alt || "slide"}
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
              priority={index === 1}
            />
          </div>
        ))}
      </div>

      {hasMultipleSlides && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => handleManualNav(goToPreviousSlide)}
            style={{
              position: "absolute",
              left: "24px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "48px",
              height: "48px",
              border: "none",
              borderRadius: "999px",
              background: "rgba(13, 35, 58, 0.55)",
              color: "#fff",
              cursor: "pointer",
              fontSize: "28px",
              lineHeight: "48px",
              zIndex: 2,
            }}
          >
            &lsaquo;
          </button>

          <button
            type="button"
            aria-label="Next slide"
            onClick={() => handleManualNav(goToNextSlide)}
            style={{
              position: "absolute",
              right: "24px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "48px",
              height: "48px",
              border: "none",
              borderRadius: "999px",
              background: "rgba(13, 35, 58, 0.55)",
              color: "#fff",
              cursor: "pointer",
              fontSize: "28px",
              lineHeight: "48px",
              zIndex: 2,
            }}
          >
            &rsaquo;
          </button>

          <div
            aria-label="Current slide"
            style={{
              position: "absolute",
              left: "50%",
              bottom: "28px",
              display: "flex",
              gap: "10px",
              transform: "translateX(-50%)",
              zIndex: 2,
            }}
          >
            {cardDetails.map((card, index) => (
              <button
                key={card.id}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => goToSlide(index)}
                style={{
                  width: "10px",
                  height: "10px",
                  padding: 0,
                  border: "none",
                  borderRadius: "999px",
                  background:
                    index === visibleSlideIndex
                      ? "rgba(255, 255, 255, 0.95)"
                      : "rgba(255, 255, 255, 0.4)",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};