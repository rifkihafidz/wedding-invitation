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
const LARGE_DESKTOP_BREAKPOINT = 1440 // Show phone mockup only for large screens
const PHONE_WIDTH = 430
const PHONE_HEIGHT = 932

function MainApp() {
  const [currentPage, setCurrentPage] = useState(0)
  const [isOpened, setIsOpened] = useState(false)
  const [viewMode, setViewMode] = useState<'mobile' | 'compact' | 'full'>('mobile')
  const [phoneScale, setPhoneScale] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      if (width < DESKTOP_BREAKPOINT) {
        // Mobile/Tablet - full screen
        setViewMode('mobile')
      } else if (width < LARGE_DESKTOP_BREAKPOINT || height < 800) {
        // Small desktop (like 1280x720) - compact view without phone mockup
        setViewMode('compact')
      } else {
        // Large desktop - full phone mockup view
        setViewMode('full')
        const availableHeight = height - 80
        const s = Math.min(0.72, availableHeight / PHONE_HEIGHT)
        setPhoneScale(Math.max(0.55, s))
      }
    }

    updateLayout()
    window.addEventListener('resize', updateLayout)
    return () => window.removeEventListener('resize', updateLayout)
  }, [])

  const handleNavigate = useCallback((pageIndex: number) => {
    if (pageIndex === currentPage) return
    if (pageIndex !== 0 && !isOpened) setIsOpened(true)
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

  // Mobile/Tablet View - Full Screen
  if (viewMode === 'mobile') {
    return (
      <div className="fixed inset-0 flex flex-col bg-[#1f1b18]">
        {isOpened && <AudioPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />}
        <div className="flex-1 relative overflow-hidden">
          {pages[currentPage]}
        </div>
        {isOpened && <BottomNav currentPage={currentPage} onNavigate={handleNavigate} />}
      </div>
    )
  }

  // Compact Desktop View - No phone mockup, centered content with max-width
  if (viewMode === 'compact') {
    return (
      <div className="fixed inset-0 bg-[#0f0e0d] flex overflow-hidden">
        {/* Background decoration */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-amber-500/5 blur-[150px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-rose-500/5 blur-[120px]"></div>
        </div>

        {/* Left Info Panel */}
        <div className="hidden lg:flex w-64 flex-col justify-center p-8 z-10">
          <div className="mb-8">
            <p className="text-amber-400/70 text-xs tracking-[0.3em] uppercase mb-3">Wedding Invitation</p>
            <h1 className="text-4xl font-serif text-amber-50 font-light mb-1">Selpia</h1>
            <span className="text-2xl font-serif text-amber-400">&</span>
            <h1 className="text-4xl font-serif text-amber-50 font-light mt-1">Ernest</h1>
          </div>
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent mb-6"></div>
          <p className="text-amber-100/60 text-sm font-light mb-1">Sabtu, 14 Februari 2026</p>
          <p className="text-amber-100/40 text-xs font-light">Millennium Centennial Center</p>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col max-w-lg mx-auto relative z-10">
          {isOpened && <AudioPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />}

          {/* Content with elegant border */}
          <div className="flex-1 flex flex-col m-4 rounded-3xl overflow-hidden border border-amber-400/20 bg-[#1f1b18] shadow-2xl shadow-black/50">
            <div className="flex-1 relative overflow-hidden">
              {pages[currentPage]}
            </div>
            {isOpened && <BottomNav currentPage={currentPage} onNavigate={handleNavigate} />}
          </div>
        </div>

        {/* Right Info Panel */}
        <div className="hidden lg:flex w-64 flex-col justify-center p-8 z-10">
          <div className="glass-dark rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-amber-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              <h3 className="text-amber-400 text-sm tracking-wider uppercase">Jadwal</h3>
            </div>

            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-400/20">
                <p className="text-base font-serif text-amber-50 mb-1">Akad Nikah</p>
                <p className="text-sm text-amber-100/60">08:00 - 10:00 WIB</p>
              </div>
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-400/20">
                <p className="text-base font-serif text-amber-50 mb-1">Resepsi</p>
                <p className="text-sm text-amber-100/60">11:00 - 14:00 WIB</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-amber-400/60">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className="text-xs text-amber-100/50">Lokasi</span>
              </div>
              <p className="text-sm text-amber-50">Millennium Centennial Center</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Full Desktop View - Phone Mockup
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
            <div
              className="overflow-hidden relative"
              style={{
                width: `${PHONE_WIDTH * phoneScale}px`,
                height: `${PHONE_HEIGHT * phoneScale}px`,
                borderRadius: '38px',
              }}
            >
              {/* Dynamic Island / Notch - inside screen */}
              <div
                className="absolute top-2 left-1/2 -translate-x-1/2 bg-black rounded-full z-30"
                style={{
                  width: `${100 * phoneScale}px`,
                  height: `${28 * phoneScale}px`,
                }}
              />

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

                {/* Added top safe area for notch */}
                <div className="h-10 flex-shrink-0" />

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

        {/* Right Panel - Event Info Only */}
        <div className="hidden xl:block w-72">
          <div className="glass-dark rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-amber-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
              <h3 className="text-amber-400 text-base tracking-[0.15em] uppercase font-medium">Jadwal Acara</h3>
            </div>

            <div className="space-y-6">
              {/* Akad */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-400/20">
                <div className="flex items-center gap-3 mb-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-amber-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                  </svg>
                  <span className="text-xs text-amber-400/70 uppercase tracking-wider">Holy Matrimony</span>
                </div>
                <p className="text-2xl font-serif text-amber-50 font-light mb-2">Akad Nikah</p>
                <p className="text-lg text-amber-100/70">08:00 - 10:00 WIB</p>
              </div>

              {/* Resepsi */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-rose-500/10 to-transparent border border-rose-400/20">
                <div className="flex items-center gap-3 mb-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-rose-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                  <span className="text-xs text-rose-400/70 uppercase tracking-wider">Reception</span>
                </div>
                <p className="text-2xl font-serif text-amber-50 font-light mb-2">Resepsi</p>
                <p className="text-lg text-amber-100/70">11:00 - 14:00 WIB</p>
              </div>
            </div>

            {/* Venue */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-amber-400/60">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span className="text-sm text-amber-100/50">Lokasi</span>
              </div>
              <p className="text-base text-amber-50 font-light">Millennium Centennial Center</p>
              <p className="text-sm text-amber-100/50">Jakarta Selatan</p>
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