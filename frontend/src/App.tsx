import { useState, useEffect, useCallback } from 'react'
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

const DESKTOP_BREAKPOINT = 1024
const PHONE_WIDTH = 430
const PHONE_HEIGHT = 932

function MainApp() {
  const [currentPage, setCurrentPage] = useState(0)
  const [isOpened, setIsOpened] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [phoneScale, setPhoneScale] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const updateLayout = () => {
      const isDesktopView = window.innerWidth >= DESKTOP_BREAKPOINT
      setIsDesktop(isDesktopView)

      if (isDesktopView) {
        const maxHeight = window.innerHeight - 100
        const s = Math.min(0.85, maxHeight / PHONE_HEIGHT)
        setPhoneScale(s)
      }
    }

    updateLayout()
    window.addEventListener('resize', updateLayout)
    return () => window.removeEventListener('resize', updateLayout)
  }, [])

  const handleNavigate = useCallback((pageIndex: number) => {
    if (pageIndex === currentPage) return

    if (pageIndex !== 0 && !isOpened) {
      setIsOpened(true)
    }

    setCurrentPage(pageIndex)
  }, [currentPage, isOpened])

  const handleOpen = useCallback(() => {
    setIsOpened(true)
    setCurrentPage(1)
  }, [])

  const pages = [
    <OpeningPage key="opening" onOpen={handleOpen} />,
    <QuotesPage key="quotes" />,
    <CouplePage key="couple" />,
    <GalleryPage key="gallery" />,
    <EventPage key="event" />,
    <LocationPage key="location" />,
    <RSVPPage key="rsvp" />,
    <ThanksPage key="thanks" />,
  ]

  // Mobile/Tablet View - Full Screen Edge to Edge
  if (!isDesktop) {
    return (
      <div className="fixed inset-0 flex flex-col bg-[#1f1b18]">
        {/* Audio Player - only shown when opened */}
        {isOpened && (
          <AudioPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
        )}

        {/* Main content - fills remaining space */}
        <div className="flex-1 relative overflow-hidden">
          {pages[currentPage]}
        </div>

        {/* Bottom Navigation - only shown when opened */}
        {isOpened && (
          <BottomNav currentPage={currentPage} onNavigate={handleNavigate} />
        )}
      </div>
    )
  }

  // Desktop View - Phone Mockup
  return (
    <div className="min-h-screen bg-[#0f0e0d] flex items-center justify-center p-8">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-amber-500/5 blur-[150px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-rose-500/5 blur-[120px]"></div>
      </div>

      <div className="flex items-center gap-16 z-10">
        {/* Left Panel */}
        <div className="hidden lg:block w-80 text-center">
          <div className="mb-8">
            <p className="text-amber-400/70 text-sm tracking-[0.3em] uppercase mb-4">Wedding Invitation</p>
            <h1 className="text-5xl font-serif text-amber-50 font-light mb-2">Selpia</h1>
            <span className="text-3xl font-serif text-amber-400">&</span>
            <h1 className="text-5xl font-serif text-amber-50 font-light mt-2">Ernest</h1>
          </div>
          <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mb-8"></div>
          <p className="text-amber-100/60 text-base font-light mb-2">Sabtu, 14 Februari 2026</p>
          <p className="text-amber-100/40 text-sm font-light">Millennium Centennial Center</p>
          <p className="text-amber-100/40 text-sm font-light">Jakarta Selatan</p>
        </div>

        {/* Phone Mockup */}
        <div className="relative">
          <div
            className="relative rounded-[50px] p-3 bg-gradient-to-b from-gray-700 to-gray-900"
            style={{
              boxShadow: '0 50px 100px -20px rgba(0,0,0,0.5), 0 0 60px rgba(232,200,114,0.08), inset 0 1px 1px rgba(255,255,255,0.1)'
            }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-2xl z-20"></div>

            <div
              className="overflow-hidden"
              style={{
                width: `${PHONE_WIDTH * phoneScale}px`,
                height: `${PHONE_HEIGHT * phoneScale}px`,
                borderRadius: '38px',
              }}
            >
              <div
                className="flex flex-col bg-[#1f1b18]"
                style={{
                  width: `${PHONE_WIDTH}px`,
                  height: `${PHONE_HEIGHT}px`,
                  transform: `scale(${phoneScale})`,
                  transformOrigin: 'top left'
                }}
              >
                {isOpened && (
                  <AudioPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
                )}

                <div className="flex-1 relative overflow-hidden">
                  {pages[currentPage]}
                </div>

                {isOpened && (
                  <BottomNav currentPage={currentPage} onNavigate={handleNavigate} />
                )}
              </div>
            </div>
          </div>

          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-gradient-to-t from-amber-400/5 to-transparent blur-xl rounded-full"></div>
        </div>

        {/* Right Panel */}
        <div className="hidden xl:block w-72">
          <div className="glass-dark rounded-2xl p-6 mb-6">
            <h3 className="text-amber-400 text-xs tracking-[0.2em] uppercase mb-4">Acara</h3>
            <div className="space-y-4">
              <div>
                <p className="text-amber-50 font-serif mb-1">Akad Nikah</p>
                <p className="text-amber-100/60 text-sm">08:00 - 10:00 WIB</p>
              </div>
              <div>
                <p className="text-amber-50 font-serif mb-1">Resepsi</p>
                <p className="text-amber-100/60 text-sm">11:00 - 14:00 WIB</p>
              </div>
            </div>
          </div>

          <div className="glass-dark rounded-2xl p-6">
            <h3 className="text-amber-400 text-xs tracking-[0.2em] uppercase mb-4">Navigasi</h3>
            <div className="grid grid-cols-4 gap-2">
              {['🏠', '💬', '💑', '📷', '📅', '📍', '✉️', '🙏'].map((icon, i) => (
                <button
                  key={i}
                  onClick={() => { if (i > 0 || isOpened) handleNavigate(i) }}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${currentPage === i
                    ? 'bg-amber-400/20 ring-1 ring-amber-400/50'
                    : 'bg-white/5 hover:bg-white/10'
                    }`}
                >
                  <span className={currentPage === i ? '' : 'grayscale opacity-50'}>{icon}</span>
                </button>
              ))}
            </div>
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