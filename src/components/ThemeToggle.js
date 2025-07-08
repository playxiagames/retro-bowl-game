'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { isFeatureEnabled } from '../utils/templateConfig'

/**
 * Simple theme toggle button - light/dark mode switcher
 */
export function ThemeToggle({ className = '' }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render if theme toggle is disabled
  if (!isFeatureEnabled('enableThemeToggle')) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const buttonClasses = `
    inline-flex items-center justify-center w-9 h-9
    rounded-lg border transition-colors duration-200
    bg-white dark:bg-slate-800
    border-gray-200 dark:border-slate-600
    text-gray-700 dark:text-gray-300
    hover:bg-gray-50 dark:hover:bg-slate-700
    focus:outline-none focus:ring-2 focus:ring-blue-500/20
    ${className}
  `

  if (!mounted) {
    return (
      <button className={buttonClasses} disabled aria-label="Loading theme toggle">
        <span className="animate-pulse">⚪</span>
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className={buttonClasses}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}

export default ThemeToggle 