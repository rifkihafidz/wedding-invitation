import React from 'react'
import { useNavigate } from 'react-router-dom'

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-pink-600 mb-4">404</h1>
          <p className="text-4xl font-bold text-gray-800 mb-2">Page Not Found</p>
          <p className="text-xl text-gray-600 mb-8">Halaman yang Anda cari tidak ditemukan</p>
        </div>

        <div className="flex flex-col gap-4 justify-center items-center">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition"
          >
            Kembali ke Undangan
          </button>
        </div>

        <div className="mt-16 text-6xl opacity-20 animate-bounce">
          😕
        </div>
      </div>
    </div>
  )
}
