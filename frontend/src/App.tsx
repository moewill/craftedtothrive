import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-pewter-blue-50 flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-pewter-blue-900 mb-4">
          Podcast Planner Web App
        </h1>
        <p className="text-pewter-blue-700 mb-6">
          Tailwind CSS with custom brand colors is working!
        </p>
        <div className="flex gap-4 justify-center mb-6">
          <div className="w-8 h-8 bg-pewter-blue-500 rounded"></div>
          <div className="w-8 h-8 bg-coral-500 rounded"></div>
          <div className="w-8 h-8 bg-baby-pink-500 rounded"></div>
          <div className="w-8 h-8 bg-gainsboro-500 rounded"></div>
          <div className="w-8 h-8 bg-cookies-cream-500 rounded"></div>
        </div>
        <button 
          onClick={() => setCount((count) => count + 1)}
          className="bg-coral-500 hover:bg-coral-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Count is {count}
        </button>
      </div>
    </div>
  )
}

export default App
