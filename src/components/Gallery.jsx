
import React, { useState, useEffect, useRef, useCallback } from 'react';


const galleryItems = [
  {
    id: 1,
    title: "Modern Apartment",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
    fullImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop",
    description: "Contemporary apartment interior with minimalist design and natural lighting.",
    tag: "Interior"
  },
  {
    id: 2,
    title: "Mountain Retreat",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    fullImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop",
    description: "Cozy mountain cabin surrounded by breathtaking nature and fresh air.",
    tag: "Nature"
  },
  {
    id: 3,
    title: "Rustic Farmhouse",
    thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
    fullImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop",
    description: "Charming farmhouse with wooden accents and countryside views.",
    tag: "Rustic"
  },
  {
    id: 4,
    title: "Penthouse Suite",
    thumbnail: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
    fullImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop",
    description: "Lavish penthouse suite with panoramic city skyline views.",
    tag: "Luxury"
  },
  {
    id: 5,
    title: "Desert Villa",
    thumbnail: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop",
    fullImage: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&h=800&fit=crop",
    description: "Stunning desert villa with adobe architecture and warm earthy tones.",
    tag: "Exotic"
  },
  {
    id: 6,
    title: "Lakeside Cottage",
    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=300&fit=crop",
    fullImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=800&fit=crop",
    description: "Peaceful lakeside cottage perfect for a quiet weekend escape.",
    tag: "Nature"
  },
  {
    id: 7,
    title: "Scandinavian Studio",
    thumbnail: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
    fullImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=800&fit=crop",
    description: "Clean Scandinavian studio with functional furniture and soft neutral palette.",
    tag: "Interior"
  },
  {
    id: 8,
    title: "Tropical Bungalow",
    thumbnail: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400&h=300&fit=crop",
    fullImage: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1200&h=800&fit=crop",
    description: "Open-air tropical bungalow surrounded by lush palm trees and ocean breeze.",
    tag: "Exotic"
  },
  {
    id: 9,
    title: "Gothic Manor",
    thumbnail: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop",
    fullImage: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&h=800&fit=crop",
    description: "Historic gothic manor with dramatic architecture and ornate detailing.",
    tag: "Historic"
  },
  {
    id: 10,
    title: "Glass Treehouse",
    thumbnail: "https://images.unsplash.com/photo-1448630360428-65456885c650?w=400&h=300&fit=crop",
    fullImage: "https://images.unsplash.com/photo-1448630360428-65456885c650?w=1200&h=800&fit=crop",
    description: "Unique glass treehouse nestled in the forest canopy with sky-high views.",
    tag: "Unique"
  },
  {
    id: 11,
    title: "Mediterranean Villa",
    thumbnail: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=400&h=300&fit=crop",
    fullImage: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&h=800&fit=crop",
    description: "Sun-drenched Mediterranean villa with terracotta roofs and a private pool.",
    tag: "Luxury"
  },
  {
    id: 12,
    title: "Snowy Chalet",
    thumbnail: "https://images.unsplash.com/photo-1601628828688-632f38a5a7d0?w=400&h=300&fit=crop",
    fullImage: "https://images.unsplash.com/photo-1601628828688-632f38a5a7d0?w=1200&h=800&fit=crop",
    description: "Cozy alpine chalet blanketed in snow with a roaring fireplace inside.",
    tag: "Winter"
  }
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, visible];
}

function GalleryCard({ item, index, onClick }) {
  const [ref, visible] = useReveal();
  const [hovered, setHovered] = useState(false);

  return (
    <article
      ref={ref}
      className={`gallery-card ${visible ? 'gallery-card--visible' : ''}`}
      style={{ '--delay': `${(index % 4) * 80}ms` }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`Open ${item.title}`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
    >
      <div className="gallery-card__frame">
        <img
          src={item.thumbnail}
          alt={item.title}
          className={`gallery-card__img ${hovered ? 'gallery-card__img--zoomed' : ''}`}
          loading="lazy"
        />
        <span className="gallery-card__tag">{item.tag}</span>
        <div className="gallery-card__shine" />
      </div>

      <div className="gallery-card__body">
        <h3 className="gallery-card__title">{item.title}</h3>
        <p className="gallery-card__desc">{item.description}</p>
        <span className="gallery-card__cta">
          View full photo
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 8h10M9 4l4 4-4 4"/>
          </svg>
        </span>
      </div>
    </article>
  );
}

function Lightbox({ items, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [direction, setDirection] = useState(null); 
  const thumbRef = useRef(null);
  const current = items[index];

  const navigate = useCallback((dir) => {
    setDirection(dir);
    setImageLoaded(false);
    setTimeout(() => {
      setIndex(i =>
        dir === 'right'
          ? (i === items.length - 1 ? 0 : i + 1)
          : (i === 0 ? items.length - 1 : i - 1)
      );
      setDirection(null);
    }, 220);
  }, [items.length]);

  useEffect(() => {
    const container = thumbRef.current;
    if (!container) return;
    const active = container.querySelector('.thumb--active');
    if (active) active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [index]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') navigate('left');
      if (e.key === 'ArrowRight') navigate('right');
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [navigate, onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const touchStart = useRef(null);
  const handleTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) navigate(diff > 0 ? 'right' : 'left');
    touchStart.current = null;
  };

  return (
    <div className="lb-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="lb-modal"
        onClick={e => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="lb-header">
          <span className="lb-counter">{index + 1} / {items.length}</span>
          <button className="lb-close" onClick={onClose} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="lb-stage">
          <button className="lb-nav lb-nav--prev" onClick={() => navigate('left')} aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          <div className={`lb-img-wrap ${direction ? `lb-img-wrap--exit-${direction}` : ''} ${imageLoaded ? 'lb-img-wrap--loaded' : ''}`}>
            {!imageLoaded && <div className="lb-skeleton" />}
            <img
              key={current.id}
              src={current.fullImage}
              alt={current.title}
              className="lb-img"
              onLoad={() => setImageLoaded(true)}
            />
          </div>

          <button className="lb-nav lb-nav--next" onClick={() => navigate('right')} aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>

        <div className="lb-info">
          <div className="lb-info__text">
            <span className="lb-info__tag">{current.tag}</span>
            <h2 className="lb-info__title">{current.title}</h2>
            <p className="lb-info__desc">{current.description}</p>
          </div>
        </div>

        <div className="lb-thumbs" ref={thumbRef}>
          {items.map((item, i) => (
            <button
              key={item.id}
              className={`lb-thumb ${i === index ? 'thumb--active' : ''}`}
              onClick={() => { setImageLoaded(false); setIndex(i); }}
              aria-label={item.title}
            >
              <img src={item.thumbnail} alt={item.title} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <div className="gallery-root">
        <div className="gallery-orb gallery-orb--1" />
        <div className="gallery-orb gallery-orb--2" />

        <header className={`gallery-header ${mounted ? 'gallery-header--visible' : ''}`}>
          <p className="gallery-header__eyebrow">Curated Collection</p>
          <h1 className="gallery-header__title">Portfolio Gallery</h1>
          <p className="gallery-header__sub">
            {galleryItems.length} stunning properties from around the world
          </p>
        </header>

        <div className="gallery-grid">
          {galleryItems.map((item, i) => (
            <GalleryCard
              key={item.id}
              item={item}
              index={i}
              onClick={() => setLightboxIndex(i)}
            />
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={galleryItems}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}