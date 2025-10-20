import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './stories/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          app: '#0D0D0E',
        },
        panel: {
          base: '#1B1C1E',
          elev: '#212225',
        },
        line: {
          divider: '#2A2B2E',
          border: '#2A2B2E',
        },
        sidebar: {
          bg: '#BE3B5E',
          icon: '#FFFFFF',
        },
        accent: {
          orange: '#FF6A00',
          yellow: '#FFDA3E',
          yellowText: '#151517',
          primary: '#3A1B49',
        },
        chip: {
          bg: '#2B2C2F',
          text: '#D9D9DC',
        },
        text: {
          primary: '#F5F5F6',
          secondary: '#BABBC0',
          tertiary: '#8D8F95',
          inverse: '#0E0E10',
        },
        focus: '#8B5CF6',
      },
      borderRadius: {
        lg: '16px',
        md: '12px',
        sm: '10px',
      },
      boxShadow: {
        elev: '0 8px 24px rgba(0,0,0,0.35)',
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Text', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        hero: ['28px', { lineHeight: '1.2', fontWeight: '700' }],
        h2: ['18px', { lineHeight: '1.3', fontWeight: '600' }],
        body: ['15px', { lineHeight: '1.45', fontWeight: '400' }],
        meta: ['12.5px', { lineHeight: '1.3', fontWeight: '500' }],
        btn: ['14.5px', { lineHeight: '1.2', fontWeight: '600', letterSpacing: '0.01em' }],
      },
    },
  },
  plugins: [],
}
export default config