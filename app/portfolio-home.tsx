"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  digitalWorks,
  exhibitionHeroImages,
  homeHeroImages,
  projects,
  sections,
  type DigitalWork,
  type PortfolioSection,
  type Project,
} from "./projects";

const assetUrl = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

const mobileAssetUrl = (path: string) => {
  const extensionIndex = path.lastIndexOf(".");
  const mobilePath = extensionIndex === -1
    ? `${path}-mobile.webp`
    : `${path.slice(0, extensionIndex)}-mobile.webp`;

  return assetUrl(mobilePath);
};

const homeHeroSlides = [
  { image: homeHeroImages[0], mobileImage: "/portfolio-v2/work-cover-p1-mobile.webp", title: "Paper Embers (for my grandpa)", year: "2023", projectId: "words-memory" },
  { image: homeHeroImages[1], mobileImage: "/portfolio-v2/branch-01-mobile.webp", title: "Root Unbound", year: "2022", projectId: "the-branch" },
  { image: homeHeroImages[2], mobileImage: "/portfolio-v2/post-viewing-001-mobile.webp", title: "Post Viewing", year: "2023", projectId: "post-viewing" },
  { image: homeHeroImages[3], mobileImage: "/portfolio-v2/respiration-01-mobile.webp", title: "Respiration, Connection", year: "2022", projectId: "respiration-connection" },
];

const homeHeroColumns = [
  homeHeroSlides.filter((_, index) => index % 2 === 0),
  homeHeroSlides.filter((_, index) => index % 2 === 1),
];

const mobileArchiveCoverImages = projects.map((project) =>
  project.id === "post-viewing"
    ? "/portfolio-v2/post-viewing-03-mobile.webp"
    : mobileAssetUrl(project.images[0]),
);

function DiamondCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const cursor = cursorRef.current;

    if (!finePointer.matches || !cursor) return;

    document.documentElement.classList.add("custom-cursor-active");
    let frame = 0;
    let hasPosition = false;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let currentTilt = 0;

    const renderCursor = () => {
      const distanceX = targetX - currentX;
      const distanceY = targetY - currentY;

      currentX += distanceX * 0.24;
      currentY += distanceY * 0.24;
      const rawTilt = distanceX * 0.34;
      const targetTilt =
        rawTilt >= 0 ? Math.min(18, rawTilt) : Math.max(-8, rawTilt);
      currentTilt += (targetTilt - currentTilt) * 0.24;

      cursor.style.setProperty("--cursor-x", `${currentX}px`);
      cursor.style.setProperty("--cursor-y", `${currentY}px`);
      cursor.style.setProperty("--cursor-motion-tilt", `${currentTilt}deg`);

      if (
        Math.abs(distanceX) > 0.08 ||
        Math.abs(distanceY) > 0.08 ||
        Math.abs(currentTilt) > 0.08
      ) {
        frame = window.requestAnimationFrame(renderCursor);
      } else {
        currentTilt = 0;
        cursor.style.setProperty("--cursor-motion-tilt", "0deg");
        frame = 0;
      }
    };

    const moveCursor = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!hasPosition) {
        currentX = targetX;
        currentY = targetY;
        hasPosition = true;
      }

      if (!frame) frame = window.requestAnimationFrame(renderCursor);
      cursor.classList.add("is-visible");
    };

    const updateHoverState = (event: PointerEvent) => {
      const target = event.target;
      const projectTrigger =
        target instanceof Element ? target.closest(".project-trigger") : null;
      const isInteractive =
        target instanceof Element &&
        Boolean(
          target.closest(
            "a, button, input, textarea, select, summary, [role='button'], [tabindex]",
          ),
        );

      cursor.classList.toggle("is-hovering", isInteractive);
      cursor.classList.toggle("is-viewing", Boolean(projectTrigger));
    };

    const press = () => cursor.classList.add("is-pressed");
    const release = () => cursor.classList.remove("is-pressed");
    const hide = () => cursor.classList.remove("is-visible");

    window.addEventListener("pointermove", moveCursor, { passive: true });
    window.addEventListener("pointerover", updateHoverState, { passive: true });
    window.addEventListener("pointerdown", press, { passive: true });
    window.addEventListener("pointerup", release, { passive: true });
    window.addEventListener("blur", hide);
    document.documentElement.addEventListener("mouseleave", hide);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", moveCursor);
      window.removeEventListener("pointerover", updateHoverState);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("blur", hide);
      document.documentElement.removeEventListener("mouseleave", hide);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="diamond-cursor" ref={cursorRef} aria-hidden="true">
      <img
        src={assetUrl("/cursors/lowpoly-green-diamond-cursor.png")}
        alt=""
        draggable={false}
      />
      <span>VIEW</span>
    </div>
  );
}

function ProjectViewer({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    setSlideIndex(0);
  }, [project.id]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") {
        setSlideIndex((current) =>
          current === 0 ? project.images.length - 1 : current - 1,
        );
      }
      if (event.key === "ArrowRight") {
        setSlideIndex((current) => (current + 1) % project.images.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, project.images.length]);

  const previousImage = () =>
    setSlideIndex((current) =>
      current === 0 ? project.images.length - 1 : current - 1,
    );
  const nextImage = () =>
    setSlideIndex((current) => (current + 1) % project.images.length);

  return (
    <div
      className="project-viewer"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} 项目图片与说明`}
    >
      <img
        className="viewer-image"
        key={`${project.id}-${slideIndex}`}
        src={assetUrl(project.images[slideIndex])}
        alt={`${project.title} 项目图片 ${slideIndex + 1}`}
      />
      <div className="viewer-shade" aria-hidden="true" />

      <button
        className="viewer-close"
        type="button"
        onClick={onClose}
        aria-label="关闭项目"
      >
        <span aria-hidden="true">×</span>
      </button>

      <div className="viewer-caption">
        <span className="viewer-title-line">
          <h2>{project.title}</h2>
          {project.section === "exhibition" && (
            <span className="exhibition-tag">EXHIBITION</span>
          )}
        </span>
        <p>{project.year}</p>
      </div>

      <div className="viewer-controls">
        <button type="button" onClick={previousImage} aria-label="上一张图片">
          ←
        </button>
        <span aria-live="polite">
          {String(slideIndex + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}
        </span>
        <button type="button" onClick={nextImage} aria-label="下一张图片">
          →
        </button>
      </div>
    </div>
  );
}

function DigitalSequence({
  work,
  index,
}: {
  work: DigitalWork;
  index: number;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [frameIndex, setFrameIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.7 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setFrameIndex((current) => (current + 1) % work.frames.length);
    }, work.frameInterval);

    return () => window.clearInterval(timer);
  }, [isVisible, work.frameInterval, work.frames.length]);

  return (
    <article className="digital-work" ref={sectionRef} aria-label={`${work.title} 动画作品`}>
      <div className="digital-frames">
        {work.frames.map((frame, currentIndex) => (
          <img
            className={currentIndex === frameIndex ? "is-active" : ""}
            key={frame}
            src={assetUrl(frame)}
            alt={currentIndex === frameIndex ? `${work.title} 动画画面` : ""}
            aria-hidden={currentIndex !== frameIndex}
          />
        ))}
      </div>
      <div className="digital-shade" aria-hidden="true" />
      <div className="digital-caption">
        <div>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <h2>{work.title}</h2>
        </div>
        <p>
          {work.category}
          {work.year ? ` · ${work.year}` : ""}
        </p>
      </div>
      <div className="digital-status" aria-live="off">
        <span className={isVisible ? "is-playing" : ""} aria-hidden="true" />
        {isVisible ? "PLAYING" : "PAUSED"}
        <span>
          {String(frameIndex + 1).padStart(2, "0")} / {String(work.frames.length).padStart(2, "0")}
        </span>
      </div>
    </article>
  );
}

function DigitalSection() {
  return (
    <section className="digital-section" id="work" aria-label="Digital works">
      {digitalWorks.map((work, index) => (
        <DigitalSequence key={work.id} work={work} index={index} />
      ))}
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
  isClone = false,
  archive = false,
  coverOverride,
  mobileCoverOverride,
  eager = false,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
  isClone?: boolean;
  archive?: boolean;
  coverOverride?: string;
  mobileCoverOverride?: string;
  eager?: boolean;
}) {
  const archiveNumber = String(index + 1).padStart(3, "0");
  const coverImage = coverOverride ?? project.images[0];
  const loadImmediately = eager || index < 3;
  const mobileCoverImage = mobileCoverOverride
    ? assetUrl(mobileCoverOverride)
    : mobileAssetUrl(coverImage);
  const mobileCoverType = mobileCoverImage.endsWith(".webp")
    ? "image/webp"
    : undefined;

  return (
    <article className="project-card" aria-hidden={isClone || undefined}>
      <button
        className={`project-trigger${archive ? " project-trigger--archive" : ""}`}
        type="button"
        onClick={onOpen}
        tabIndex={isClone ? -1 : undefined}
        aria-label={`打开 ${project.title} 项目`}
      >
        {archive ? (
          <>
            <span className="archive-media-row">
              <span className="archive-number-rail" aria-hidden="true">
                {archiveNumber.split("").map((digit, digitIndex) => (
                  <span key={`${digit}-${digitIndex}`}>{digit}</span>
                ))}
                <i />
              </span>
              <span className="project-media">
                <picture>
                  <source
                    media="(max-width: 760px)"
                    srcSet={mobileCoverImage}
                    type={mobileCoverType}
                  />
                  <img
                    src={assetUrl(coverImage)}
                    alt={`${project.title} 项目封面`}
                    loading={loadImmediately ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={loadImmediately ? "auto" : "low"}
                    style={{
                      objectPosition: project.coverPosition,
                      objectFit: project.coverFit,
                    }}
                  />
                </picture>
              </span>
            </span>
            <span className="archive-meta-row">
              <span className="archive-title-copy">
                <strong>{project.title}</strong>
                <small
                  className={project.section === "exhibition" ? "is-exhibition" : undefined}
                >
                  {project.section.toUpperCase()}
                </small>
              </span>
              <span className="project-year">{project.year || "—"}</span>
            </span>
          </>
        ) : (
          <>
            <span className="project-media">
              <picture>
                  <source
                    media="(max-width: 760px)"
                    srcSet={mobileCoverImage}
                    type={mobileCoverType}
                  />
                <img
                  src={assetUrl(coverImage)}
                  alt={`${project.title} 项目封面`}
                  loading={loadImmediately ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={loadImmediately ? "auto" : "low"}
                  style={{
                    objectPosition: project.coverPosition,
                    objectFit: project.coverFit,
                  }}
                />
              </picture>
            </span>
            <span className="project-title-row">
              <span className="project-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="project-title-copy">
                <span className="project-name-line">
                  <strong>{project.title}</strong>
                  {project.section === "exhibition" && (
                    <span className="exhibition-tag">EXHIBITION</span>
                  )}
                </span>
                <small>{project.category}</small>
              </span>
              <span className="project-year">{project.year}</span>
            </span>
          </>
        )}
      </button>
    </article>
  );
}

export default function Home({
  initialSection = null,
}: {
  initialSection?: PortfolioSection | null;
} = {}) {
  const [activeSection, setActiveSection] =
    useState<PortfolioSection | null>(initialSection);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const mobileMenuRef = useRef<HTMLDetailsElement>(null);
  const activeHeroImages =
    activeSection === "exhibition" ? exhibitionHeroImages : homeHeroImages;
  const mobileHeroSlide = homeHeroSlides[heroIndex % homeHeroSlides.length];

  useEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    if (window.location.hash !== "#top") {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}#top`,
      );
    }

    const returnToHero = () => window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    returnToHero();
    const frame = window.requestAnimationFrame(returnToHero);
    const timer = window.setTimeout(returnToHero, 80);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    setHeroIndex(0);
  }, [activeSection]);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 760px)");
    const syncMobileViewport = () => {
      setIsMobileViewport(mobileQuery.matches);
      if (!mobileQuery.matches) mobileMenuRef.current?.removeAttribute("open");
    };

    syncMobileViewport();
    mobileQuery.addEventListener("change", syncMobileViewport);
    return () => mobileQuery.removeEventListener("change", syncMobileViewport);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % activeHeroImages.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [activeHeroImages.length]);

  const visibleProjects = useMemo(() => {
    const matchingProjects = activeSection
      ? projects.filter((project) => project.section === activeSection)
      : projects;

    const reversedProjects = [...matchingProjects].reverse();

    if (activeSection !== null) return reversedProjects;

    const homepageOrder = [
      "words-memory",
      "the-branch",
      "surgery-for-equipment",
      "the-last-rose",
      "window-memory",
      "the-surveillance",
      "post-viewing",
      "painting",
      "respiration-connection",
      "try-to-fall-asleep",
      "tight-strings",
      "happy-birthday",
      "degree-show",
      "fading-spaciousness",
      "hovered-keyframe",
      "val-der-ada",
      "tight-strings-exhibition",
      "the-queer-museum",
      "tale-of-the-chain",
      "kurzfilmtage",
      "darkroom-ra4-hand-print",
    ];

    return [
      ...homepageOrder
        .map((id) => reversedProjects.find((project) => project.id === id))
        .filter((project): project is Project => Boolean(project)),
      ...reversedProjects.filter((project) => !homepageOrder.includes(project.id)),
    ];
  }, [activeSection]);

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedProjectId) ?? null,
    [selectedProjectId],
  );

  const flowColumns = useMemo(
    () => [
      visibleProjects
        .map((project, index) => ({ project, index }))
        .filter((_, index) => index % 2 === 0),
      visibleProjects
        .map((project, index) => ({ project, index }))
        .filter((_, index) => index % 2 === 1),
    ],
    [visibleProjects],
  );

  const usesAnimatedFlow = false;

  const resetWork = () => {
    setActiveSection(null);
    setSelectedProjectId(null);
    mobileMenuRef.current?.removeAttribute("open");
  };

  const scrollToWork = () => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        document.getElementById("work")?.scrollIntoView({
          behavior: window.matchMedia("(max-width: 760px)").matches ? "auto" : "smooth",
          block: "start",
        });
      });
    });
  };

  return (
    <>
      {activeSection === null && mobileArchiveCoverImages.map((image, index) => (
        <link
          rel="preload"
          as="image"
          href={image.startsWith(process.env.NEXT_PUBLIC_BASE_PATH ?? "") ? image : assetUrl(image)}
          media="(max-width: 760px)"
          fetchPriority={index < 4 ? "high" : "low"}
          key={image}
        />
      ))}
      <DiamondCursor />
      <div
        className="drafting-paper-bg"
        style={{
          "--drafting-bg": `url(${assetUrl("/backgrounds/red-drafting-grid.png")})`,
          "--drafting-bg-mobile": `url(${assetUrl("/backgrounds/red-drafting-grid-mobile.webp")})`,
        } as CSSProperties}
        aria-hidden="true"
      />
      <main
        id="top"
        className={activeSection === null ? "home-archive" : undefined}
        style={({
          "--drafting-bg": `url(${assetUrl("/backgrounds/red-drafting-grid.png")})`,
          "--drafting-bg-mobile": `url(${assetUrl("/backgrounds/red-drafting-grid-mobile.webp")})`,
        } as CSSProperties)}
      >
        <header className="site-header">
          <a className="wordmark" href="#top" onClick={resetWork} aria-label="返回首页">
            XI<span className="wordmark-n">n</span>YI
          </a>
          <nav aria-label="主导航">
            <a href="#work" onClick={resetWork}>WORK</a>
          </nav>
          <details className="mobile-nav-shell" ref={mobileMenuRef}>
            <summary
              className="mobile-menu-toggle"
              aria-label="打开或关闭导航"
              aria-controls="mobile-navigation"
            >
              <span />
              <span />
              <span />
            </summary>

            <nav
              className="mobile-nav-panel"
              id="mobile-navigation"
              aria-label="手机端作品分类导航"
            >
              <a
                className={activeSection === null ? "is-active" : ""}
                href={assetUrl("/#top")}
              >
                ALL
              </a>
              {sections.map((section) => (
                <a
                  className={activeSection === section.id ? "is-active" : ""}
                  key={`mobile-${section.id}`}
                  href={assetUrl(`/${section.id === "graphic" ? "cv" : section.id}/#work`)}
                >
                  {section.label}
                </a>
              ))}
            </nav>
          </details>
        </header>

        <div className="filters filters--desktop" role="group" aria-label="按文件夹分类筛选作品">
          <button
            className={activeSection === null ? "is-active" : ""}
            aria-pressed={activeSection === null}
            onClick={() => {
              setActiveSection(null);
              setSelectedProjectId(null);
              window.requestAnimationFrame(() => {
                window.scrollTo({
                  top: 0,
                  behavior: window.matchMedia("(max-width: 760px)").matches ? "auto" : "smooth",
                });
              });
            }}
            type="button"
          >
            ALL
          </button>
          {sections.map((section) => (
            <button
              className={activeSection === section.id ? "is-active" : ""}
              key={section.id}
              aria-pressed={activeSection === section.id}
              onClick={() => {
                setActiveSection(section.id);
                setSelectedProjectId(null);
                scrollToWork();
              }}
              type="button"
            >
              {section.label}
            </button>
          ))}
        </div>

        {activeSection === "digital" ? (
          <DigitalSection />
        ) : (
          <>
            {activeSection === null ? (
              <>
                <section className="home-split-hero" aria-label="首页作品图像轮播">
                  {homeHeroColumns.map((slides, columnIndex) => {
                    const activeIndex = columnIndex === 0
                      ? Math.floor((heroIndex + 1) / 2) % slides.length
                      : Math.floor(heroIndex / 2) % slides.length;
                    const activeSlide = slides[activeIndex];

                    return (
                      <button
                        className="home-split-panel"
                        type="button"
                        onClick={() => setSelectedProjectId(activeSlide.projectId)}
                        aria-label={`打开 ${activeSlide.title} 项目`}
                        key={columnIndex}
                      >
                        <span className="home-split-media">
                          {slides.map((slide, index) => (
                            <picture key={slide.image}>
                              <source
                                media="(max-width: 760px)"
                                srcSet={assetUrl(slide.mobileImage)}
                                type="image/webp"
                              />
                              <img
                                className={index === activeIndex ? "is-active" : ""}
                                src={assetUrl(slide.image)}
                                alt=""
                                aria-hidden={index !== activeIndex}
                                loading={index === activeIndex ? "eager" : "lazy"}
                                decoding="async"
                                fetchPriority={index === activeIndex ? "high" : "low"}
                              />
                            </picture>
                          ))}
                        </span>
                        <span className="home-split-caption">
                          <span>{String(columnIndex + 1).padStart(3, "0")}</span>
                          <strong>{activeSlide.title}</strong>
                          <span>{activeSlide.year}</span>
                        </span>
                      </button>
                    );
                  })}
                </section>

                <section className="home-mobile-hero" aria-label="手机版首页作品封面轮播">
                  <div className="home-mobile-frame">
                    <button
                      className="home-mobile-project"
                      type="button"
                      onClick={() => setSelectedProjectId(mobileHeroSlide.projectId)}
                      aria-label={`打开 ${mobileHeroSlide.title} 项目`}
                    >
                      <span className="home-mobile-media">
                        <picture>
                          <source srcSet={assetUrl(mobileHeroSlide.mobileImage)} type="image/webp" />
                          <img
                            src={assetUrl(mobileHeroSlide.image)}
                            alt={`${mobileHeroSlide.title} 项目封面`}
                            loading="eager"
                            decoding="async"
                            fetchPriority="high"
                          />
                        </picture>
                      </span>
                    </button>
                    <button
                      className="home-mobile-arrow home-mobile-arrow--previous"
                      type="button"
                      aria-label="上一张封面"
                      onClick={() => setHeroIndex((current) => (current - 1 + homeHeroSlides.length) % homeHeroSlides.length)}
                    >
                      ←
                    </button>
                    <button
                      className="home-mobile-arrow home-mobile-arrow--next"
                      type="button"
                      aria-label="下一张封面"
                      onClick={() => setHeroIndex((current) => (current + 1) % homeHeroSlides.length)}
                    >
                      →
                    </button>
                  </div>
                  <div className="home-mobile-caption">
                    <span>{String(heroIndex % homeHeroSlides.length + 1).padStart(3, "0")}</span>
                    <strong>{mobileHeroSlide.title}</strong>
                    <span>{mobileHeroSlide.year}</span>
                  </div>
                  <div className="home-mobile-pagination">
                    {String(heroIndex % homeHeroSlides.length + 1).padStart(2, "0")} / {String(homeHeroSlides.length).padStart(2, "0")}
                  </div>
                </section>
              </>
            ) : (
              <section className="hero" aria-label="作品图像流">
                <div className="hero-images" data-count={activeHeroImages.length}>
                  {activeHeroImages.map((image, index) => (
                    <img
                      className={heroIndex === index ? "is-active" : ""}
                      key={image}
                      src={assetUrl(image)}
                      alt=""
                      aria-hidden={heroIndex !== index}
                      style={{ "--hero-delay": `${index * 4.2}s` } as CSSProperties}
                    />
                  ))}
                </div>
                <div className="hero-interface">
                  <a href="#work">WORKS ↓</a>
                  <span>
                    {String(heroIndex + 1).padStart(2, "0")} / {String(activeHeroImages.length).padStart(2, "0")}
                  </span>
                </div>
              </section>
            )}

            <section className={`work-section${activeSection === null ? " work-section--home" : ""}`} id="work">
              {visibleProjects.length > 0 ? (
                usesAnimatedFlow ? (
                  <>
                    <div className="project-flow project-flow--desktop">
                      {flowColumns.map((column, columnIndex) => (
                        <div
                          className={`project-flow-column project-flow-column--${
                            columnIndex === 0 ? "up" : "down"
                          }`}
                          key={columnIndex}
                        >
                          <div className="project-flow-track">
                            {[0, 1].map((copyIndex) => (
                              <div className="project-flow-set" key={copyIndex}>
                                {column.map(({ project, index }) => (
                                  <ProjectCard
                                    project={project}
                                    index={index}
                                    archive={activeSection === null}
                                    isClone={copyIndex === 1}
                                    onOpen={() => setSelectedProjectId(project.id)}
                                    key={`${copyIndex}-${project.id}`}
                                  />
                                ))}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="projects-grid project-flow--mobile">
                      {visibleProjects.map((project, index) => (
                        <ProjectCard
                          project={project}
                          index={index}
                          archive={activeSection === null}
                          eager={isMobileViewport}
                          onOpen={() => setSelectedProjectId(project.id)}
                          key={project.id}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div
                    className={`projects-grid${
                      activeSection === null
                        ? " projects-grid--archive"
                        : activeSection === "installation"
                          ? " projects-grid--two"
                          : ""
                    }`}
                  >
                    {visibleProjects.map((project, index) => (
                      <ProjectCard
                        project={project}
                        index={index}
                        archive={activeSection === null}
                        eager={isMobileViewport}
                        coverOverride={
                          activeSection === null && project.id === "post-viewing"
                            ? project.images[2]
                            : undefined
                        }
                        mobileCoverOverride={
                          activeSection === null && project.id === "post-viewing"
                            ? "/portfolio-v2/post-viewing-03-mobile.webp"
                            : undefined
                        }
                        onOpen={() => setSelectedProjectId(project.id)}
                        key={project.id}
                      />
                    ))}
                  </div>
                )
              ) : (
                <div className="empty-section">
                  <p>内容尚未放入这个文件夹。</p>
                  <button type="button" onClick={() => setActiveSection(null)}>
                    返回全部作品
                  </button>
                </div>
              )}
            </section>
          </>
        )}
      </main>

      {selectedProject && (
        <ProjectViewer
          project={selectedProject}
          onClose={() => setSelectedProjectId(null)}
        />
      )}
    </>
  );
}
