export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        noir: {
          bg: '#0B0B0C',
          surface: '#121214',
          card: '#18181B',
          border: '#27272A',
          text: '#FAFAFA',
          muted: '#A1A1AA',
          accent: '#E5E5E5',
          success: '#22C55E',
          error: '#EF4444'
        }
      },
      fontFamily: {
        heading: ['Space Grotesk', 'Inter', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        premium: '0 24px 80px rgba(0,0,0,0.42)'
      }
    }
  },
  plugins: []
};
