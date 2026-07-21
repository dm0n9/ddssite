"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import cardDetails from "./carouselConfig";
import { useLanguage } from "@/app/context/LanguageContext";

const AUTO_PLAY_TIME = 5000;
const TRANSITION_MS = 1000;

export const Carousel = () => {
  const hasMultipleSlides = cardDetails.length > 1;
  const { currentLang } = useLanguage();

  const [activeIndex, setActiveIndex] = useState(hasMultipleSlides ? 1 : 0);
  const [withTransition, setWithTransition] = useState(true);

  const isAnimatingRef = useRef(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
              flex: "0 0 100%",
              maxWidth: "100%",
              height: "100%",
            }}
          >
            {/* Картинка слайда */}
            <Image
              src={card.imgUrl}
              // ДОБАВЛЕНО [currentLang]
              alt={card.alt[currentLang] || "slide"}
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
              priority={index === 1}
            />

            {/*  ТЕКСТОВЫЙ ОВЕРЛЕЙ ПОВЕРХ ИЗОБРАЖЕНИЯ  */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.65)",
                backdropFilter: "blur(4px)",
                padding: "24px 32px 60px 32px",
                boxSizing: "border-box",
                color: "#ffffff",
                zIndex: 1,
              }}
            >
              {card.title && (
                <h3
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "1.9rem",
                    fontWeight: 600,
                    color: "#ffffff",
                  }}
                >
                  {/* ДОБАВЛЕНО [currentLang] */}
                  {card.title[currentLang]}
                </h3>
              )}
              {card.description && (
                <p
                  style={{
                    margin: 0,
                    fontSize: "1.4rem",
                    lineHeight: 1.5,
                    color: "rgba(255, 255, 255, 0.85)",
                    maxWidth: "800px",
                  }}
                >
                  {/* ДОБАВЛЕНО [currentLang] */}
                  {card.description[currentLang]}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Кнопки навигации и точки */}
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
              zIndex: 3,
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
              zIndex: 3,
            }}
          >
            &rsaquo;
          </button>

          <div
            aria-label="Current slide"
            style={{
              position: "absolute",
              left: "50%",
              bottom: "16px",
              display: "flex",
              gap: "10px",
              transform: "translateX(-50%)",
              zIndex: 3,
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