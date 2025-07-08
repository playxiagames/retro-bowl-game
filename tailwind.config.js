/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        game: {
          bg: '#1a1a1a',
          card: '#2d2d2d',
          accent: '#00ff00',
        },
        // 主题颜色系统
        background: {
          light: '#ffffff',
          dark: '#0f172a'
        },
        surface: {
          light: '#f8fafc',
          dark: '#1e293b'
        },
        card: {
          light: '#ffffff',
          dark: '#334155'
        },
        text: {
          primary: {
            light: '#0f172a',
            dark: '#f1f5f9'
          },
          secondary: {
            light: '#64748b',
            dark: '#94a3b8'
          }
        },
        border: {
          light: '#e2e8f0',
          dark: '#475569'
        }
      },
      fontFamily: {
        'game': ['Courier New', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'theme-transition': 'theme-transition 0.2s ease-in-out',
      },
      keyframes: {
        'theme-transition': {
          '0%': { opacity: '0.8' },
          '100%': { opacity: '1' }
        }
      }
    },
  },
  plugins: [],
} 