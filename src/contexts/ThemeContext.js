'use client'

import { createContext, useContext, useEffect, useState } from 'react'

// 主题类型 - 只保留明暗两种主题
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
}

// 创建主题上下文
const ThemeContext = createContext({
  theme: THEMES.DARK,
  setTheme: () => {},
  resolvedTheme: THEMES.DARK
})

// 主题提供者组件
export function ThemeProvider({ children, defaultTheme = THEMES.DARK }) {
  const [theme, setTheme] = useState(defaultTheme)
  const [mounted, setMounted] = useState(false)

  // 直接使用theme作为resolvedTheme，无需处理系统主题
  const resolvedTheme = theme

  // 获取当前DOM上的主题类（从初始化脚本设置的类中读取）
  const getCurrentDOMTheme = () => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement
      if (root.classList.contains('dark')) {
        return THEMES.DARK
      } else if (root.classList.contains('light')) {
        return THEMES.LIGHT
      }
    }
    return THEMES.LIGHT
  }

  // 应用主题到DOM
  const applyTheme = (newTheme) => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement
      
      // 移除之前的主题类
      root.classList.remove('light', 'dark')
      
      // 添加新主题类
      if (newTheme === THEMES.DARK) {
        root.classList.add('dark')
      } else {
        root.classList.add('light')
      }

      // 设置meta标签（用于状态栏样式）
      const metaThemeColor = document.querySelector('meta[name="theme-color"]')
      if (metaThemeColor) {
        metaThemeColor.setAttribute(
          'content', 
          newTheme === THEMES.DARK ? '#0f172a' : '#ffffff'
        )
      }
    }
  }

  // 保存主题到localStorage
  const saveTheme = (newTheme) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('theme', newTheme)
      } catch (error) {
        console.warn('Failed to save theme preference:', error)
      }
    }
  }

  // 从localStorage加载主题
  const loadTheme = () => {
    if (typeof window !== 'undefined') {
      try {
        const savedTheme = localStorage.getItem('theme')
        // 如果存储的是system主题，则使用默认主题
        if (savedTheme && Object.values(THEMES).includes(savedTheme)) {
          return savedTheme
        }
      } catch (error) {
        console.warn('Failed to load theme preference:', error)
      }
    }
    return defaultTheme
  }

  // 切换主题
  const changeTheme = (newTheme) => {
    if (Object.values(THEMES).includes(newTheme)) {
      setTheme(newTheme)
      saveTheme(newTheme)
    }
  }

  // 初始化主题
  useEffect(() => {
    // 加载保存的主题
    const savedTheme = loadTheme()
    
    // 检查当前DOM状态，确保与初始化脚本设置的状态一致
    const currentDOMTheme = getCurrentDOMTheme()
    
    // 如果存储的主题与当前DOM主题不匹配，应用存储的主题
    if (currentDOMTheme !== savedTheme) {
      applyTheme(savedTheme)
    }
    
    setTheme(savedTheme)
    setMounted(true)
  }, [])

  // 应用主题到DOM - 只在主题真正变化时执行
  useEffect(() => {
    if (mounted) {
      // 检查当前DOM状态
      const currentDOMTheme = getCurrentDOMTheme()
      
      // 只有当需要应用的主题与当前DOM主题不同时才更新
      if (currentDOMTheme !== resolvedTheme) {
        applyTheme(resolvedTheme)
      }
    }
  }, [resolvedTheme, mounted])

  // 防止服务端渲染不匹配 - 在mounted之前总是返回默认状态
  if (!mounted) {
    return (
      <ThemeContext.Provider 
        value={{
          theme: defaultTheme,
          setTheme: () => {},
          resolvedTheme: defaultTheme
        }}
      >
        {children}
      </ThemeContext.Provider>
    )
  }

  return (
    <ThemeContext.Provider 
      value={{
        theme,
        setTheme: changeTheme,
        resolvedTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

// 使用主题的Hook
export function useTheme() {
  const context = useContext(ThemeContext)
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  
  return context
}

export default ThemeContext 