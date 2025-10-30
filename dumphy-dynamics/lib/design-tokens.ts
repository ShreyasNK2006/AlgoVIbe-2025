// Design tokens for consistent styling across the application

export const designTokens = {
  colors: {
    background: {
      primary: '#0B0F19',
      secondary: '#1B2430',
      tertiary: '#2A3342'
    },
    accent: {
      cyan: '#00FFFF',
      gold: '#FFD93D',
      magenta: '#FF6EC7',
      purple: '#A855F7'
    },
    state: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#FF4E50',
      info: '#3B82F6'
    },
    text: {
      primary: '#F1F5F9',
      secondary: '#A0AEC0',
      tertiary: '#64748B'
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem'
  },
  borderRadius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    '2xl': '2rem',
    full: '9999px'
  },
  typography: {
    fontFamily: {
      heading: 'Orbitron, sans-serif',
      body: 'Manrope, sans-serif',
      mono: 'JetBrains Mono, monospace'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem'
    }
  },
  animation: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms'
    },
    easing: {
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      custom: 'cubic-bezier(0.22, 1, 0.36, 1)'
    }
  }
} as const;
