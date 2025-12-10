import { useState, useEffect, useRef } from 'react'
import { AudioPlayer } from './components/AudioPlayer'
import { BottomNav } from './components/BottomNav'
import { OpeningPage } from './components/pages/OpeningPage'
import { QuotesPage } from './components/pages/QuotesPage'
import { CouplePage } from './components/pages/CouplePage'
import { GalleryPage } from './components/pages/GalleryPage'
import { EventPage } from './components/pages/EventPage'
import { LocationPage } from './components/pages/LocationPage'
import { RSVPPage } from './components/pages/RSVPPage'
import { ThanksPage } from './components/pages/ThanksPage'

const CANVAS_WIDTH = 430
const CANVAS_HEIGHT = 932

const PAGE_BG_COLORS = [
  '#fdf2f8', '#fffbeb', '#f0fdfa', '#eef2ff',
  '#fff1f2', '#ecfeff', '#fffbeb', '#fff1f2',
]

function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentPage, setCurrentPage] = useState(0) // used for nav selection (immediate)
  const [visiblePage, setVisiblePage] = useState(0) // the page currently rendered
  const [isAnimating, setIsAnimating] = useState(false)
  const [scale, setScale] = useState(1)
  // actual CSS width used to render the canvas; increase slightly on mobile for better visuals
  const [renderWidth, setRenderWidth] = useState(CANVAS_WIDTH)
  const [hideSideBg, setHideSideBg] = useState(false)

  // overlay states for cover transition
  const [overlayVisible, setOverlayVisible] = useState(false)
  const [overlayOpaque, setOverlayOpaque] = useState(false)
  const [pendingPage, setPendingPage] = useState<number | null>(null)

  const overlayRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayFallback = useRef<number | null>(null)

  useEffect(() => {
    const updateScale = () => {
      // when the app is in "hide side background" (mobile-centered) mode
      // make the canvas slightly wider for better visual balance
      const thresholdW = CANVAS_WIDTH + 40 // small buffer width
      const thresholdH = CANVAS_HEIGHT + 40 // small buffer height
      const shouldHide = window.innerWidth <= thresholdW || window.innerHeight <= thresholdH
      setHideSideBg(shouldHide)

      const extraMobileWidth = 30 // increase canvas width by 30px on mobile
      const newRenderWidth = shouldHide ? CANVAS_WIDTH + extraMobileWidth : CANVAS_WIDTH
      setRenderWidth(newRenderWidth)

      // compute scale using the render width so the visible canvas becomes slightly wider
      const scaleX = window.innerWidth / newRenderWidth
      const scaleY = window.innerHeight / CANVAS_HEIGHT
      const s = Math.min(scaleX, scaleY)
      setScale(s)

      // apply body background depending on hideSideBg immediately
      if (shouldHide) {
        document.documentElement.classList.add('no-side-bg')
      } else {
        document.documentElement.classList.remove('no-side-bg')
        document.body.style.background = `var(--page-bg-color)`
      }
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  // keep body background in sync when visiblePage changes and sides are visible
  useEffect(() => {
    if (hideSideBg) return
    document.body.style.background = `var(--page-bg-color)`
  }, [visiblePage, hideSideBg])

  useEffect(() => {
    document.documentElement.style.setProperty('--page-bg-color', PAGE_BG_COLORS[visiblePage])
  }, [visiblePage])

  const pages = [
    <OpeningPage key="opening" onOpen={() => handleNavigate(1)} />,
    <QuotesPage key="quotes" />,
    <CouplePage key="couple" />,
    <GalleryPage key="gallery" />,
    <EventPage key="event" />,
    <LocationPage key="location" />,
    <RSVPPage key="rsvp" />,
    <ThanksPage key="thanks" />,
  ]

  const clearOverlayFallback = () => {
    if (overlayFallback.current) {
      window.clearTimeout(overlayFallback.current)
      overlayFallback.current = null
    }
  }

  const handleNavigate = (pageIndex: number) => {
    if (isAnimating || pageIndex === visiblePage) return

    // highlight nav immediately
    setCurrentPage(pageIndex)

    // set target background immediately to reduce perceived color jump
    document.documentElement.style.setProperty('--page-bg-color', PAGE_BG_COLORS[pageIndex])

    // start overlay-driven transition
    setPendingPage(pageIndex)
    setOverlayVisible(true)
    // give the overlay a frame to mount then make it opaque
    requestAnimationFrame(() => setOverlayOpaque(true))
    setIsAnimating(true)
  }

  // listen for overlay transition end to perform swap then fade out
  useEffect(() => {
    const node = overlayRef.current
    if (!node) return

    const onOverlayTransition = (e: TransitionEvent) => {
      if (e.propertyName !== 'opacity') return

      // if overlay is opaque now -> swap content then fade overlay out
      if (overlayOpaque) {
        if (pendingPage !== null) {
          setVisiblePage(pendingPage)
        }
        // force paint then start fade-out
        requestAnimationFrame(() => setOverlayOpaque(false))
      } else {
        // fade-out finished
        setOverlayVisible(false)
        setPendingPage(null)
        setIsAnimating(false)
        clearOverlayFallback()

        // reset scroll of visible content if any
        if (containerRef.current) {
          const scrollContainer = containerRef.current.querySelector('.overflow-y-auto')
          if (scrollContainer) (scrollContainer as HTMLElement).scrollTop = 0
        }
      }
    }

    node.addEventListener('transitionend', onOverlayTransition as any)

    // fallback in case transitionend doesn't fire
    overlayFallback.current = window.setTimeout(() => {
      // if overlay is opaque, commit immediately
      if (overlayOpaque) {
        if (pendingPage !== null) setVisiblePage(pendingPage)
        requestAnimationFrame(() => setOverlayOpaque(false))
      } else {
        setOverlayVisible(false)
        setPendingPage(null)
        setIsAnimating(false)
      }
      clearOverlayFallback()
    }, 800)

    return () => {
      node.removeEventListener('transitionend', onOverlayTransition as any)
      clearOverlayFallback()
    }
  }, [overlayOpaque, pendingPage])

  return (
    <div
      className="canvas-wrapper"
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
    <div
      ref={containerRef}
      className="app-container"
      style={{
        width: `${renderWidth}px`,
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
      }}
     >
      <AudioPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />

      <div className="w-full h-[932px] relative overflow-hidden flex flex-col">
        {/* Content area (fills available canvas height) */}
        <div className="flex-1 relative overflow-hidden">
          {/* Render visible page immediately and center its content */}
          <div className="absolute inset-0 flex items-center justify-center">
            {pages[visiblePage]}
          </div>

          {/* Overlay used to cover and cross-fade during page swap (covers content area) */}
          {overlayVisible && (
            <div
              ref={overlayRef}
              className={`absolute inset-0 z-40 pointer-events-none bg-[var(--page-bg-color)] transition-opacity duration-350 ease-out ${overlayOpaque ? 'opacity-100' : 'opacity-0'}`}
            />
          )}
        </div>

        {/* Bottom navigation stays fixed inside the canvas and centered to original canvas width */}
        <div className="w-full h-[80px]"> <BottomNav currentPage={currentPage} onNavigate={handleNavigate} /> </div>
      </div>
    </div>
    </div>
   )
 }
 
 export default App