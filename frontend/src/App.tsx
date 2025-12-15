import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import { AdminPage } from './components/pages/AdminPage'
import { NotFoundPage } from './components/pages/NotFoundPage'

const CANVAS_WIDTH = 430
const CANVAS_HEIGHT = 932

const PAGE_BG_COLORS = [
  '#fdf2f8', '#fffbeb', '#f0fdfa', '#eef2ff',
  '#fff1f2', '#ecfeff', '#fffbeb', '#fff1f2',
]

function MainApp() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [visiblePage, setVisiblePage] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [scale, setScale] = useState(1)
  const [isOpened, setIsOpened] = useState(false)
  const [renderWidth, setRenderWidth] = useState(CANVAS_WIDTH)
  const [hideSideBg, setHideSideBg] = useState(false)

  const [overlayVisible, setOverlayVisible] = useState(false)
  const [overlayOpaque, setOverlayOpaque] = useState(false)
  const [pendingPage, setPendingPage] = useState<number | null>(null)

  const overlayRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const overlayFallback = useRef<number | null>(null)

  useEffect(() => {
    const updateScale = () => {
      const thresholdW = CANVAS_WIDTH + 40
      const thresholdH = CANVAS_HEIGHT + 40
      const shouldHide = window.innerWidth <= thresholdW || window.innerHeight <= thresholdH
      setHideSideBg(shouldHide)

      const extraMobileWidth = 30
      const newRenderWidth = shouldHide ? CANVAS_WIDTH + extraMobileWidth : CANVAS_WIDTH
      setRenderWidth(newRenderWidth)

      const scaleX = window.innerWidth / newRenderWidth
      const scaleY = window.innerHeight / CANVAS_HEIGHT
      const s = Math.min(scaleX, scaleY)
      setScale(s)

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

    if (pageIndex !== 0 && !isOpened) {
      setIsOpened(true)
    }

    setCurrentPage(pageIndex)
    document.documentElement.style.setProperty('--page-bg-color', PAGE_BG_COLORS[pageIndex])

    setPendingPage(pageIndex)
    setOverlayVisible(true)
    requestAnimationFrame(() => setOverlayOpaque(true))
    setIsAnimating(true)
  }

  useEffect(() => {
    const node = overlayRef.current
    if (!node) return

    const onOverlayTransition = (e: TransitionEvent) => {
      if (e.propertyName !== 'opacity') return

      if (overlayOpaque) {
        if (pendingPage !== null) {
          setVisiblePage(pendingPage)
        }
        requestAnimationFrame(() => setOverlayOpaque(false))
      } else {
        setOverlayVisible(false)
        setPendingPage(null)
        setIsAnimating(false)
        clearOverlayFallback()

        if (containerRef.current) {
          const scrollContainer = containerRef.current.querySelector('.overflow-y-auto')
          if (scrollContainer) (scrollContainer as HTMLElement).scrollTop = 0
        }
      }
    }

    node.addEventListener('transitionend', onOverlayTransition as any)

    overlayFallback.current = window.setTimeout(() => {
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
        <AudioPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} isOpened={isOpened} />

        <div className="w-full h-[932px] relative overflow-hidden flex flex-col">
          <div className="flex-1 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              {pages[visiblePage]}
            </div>

            {overlayVisible && (
              <div
                ref={overlayRef}
                className={`absolute inset-0 z-40 pointer-events-none bg-[var(--page-bg-color)] transition-opacity duration-350 ease-out ${overlayOpaque ? 'opacity-100' : 'opacity-0'}`}
              />
            )}
          </div>

          <div className="w-full h-[80px]">
            <BottomNav currentPage={currentPage} onNavigate={handleNavigate} isOpened={isOpened} />
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App