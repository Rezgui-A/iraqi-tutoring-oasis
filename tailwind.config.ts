import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'inter': ['Inter', 'sans-serif'],
				'nunito': ['Nunito', 'sans-serif'],
			},
			colors: {
				// Enhanced teaching platform color palette
				'primary-blue': 'hsl(210 100% 25%)',
				'primary-green': 'hsl(142 76% 36%)',
				'secondary-turquoise': 'hsl(204 70% 53%)',
				'light-green': 'hsl(142 52% 67%)',
				'accent-orange': 'hsl(27 87% 51%)',
				'accent-yellow': 'hsl(48 89% 60%)',
				'light-gray': 'hsl(210 17% 96%)',
				'medium-gray': 'hsl(210 11% 78%)',
				'dark-gray': 'hsl(0 0% 20%)',
				'text-primary': 'hsl(0 0% 15%)',
				'text-secondary': 'hsl(0 0% 45%)',
				
				// Enhanced semantic colors
				'success': 'hsl(142 76% 36%)',
				'warning': 'hsl(48 89% 60%)',
				'info': 'hsl(204 70% 53%)',
				
				// Keep existing tutor colors for backward compatibility
				'tutor-yellow': 'hsl(48 89% 60%)',
				'tutor-green': 'hsl(142 76% 36%)',
				'tutor-blue': 'hsl(204 70% 53%)',
				'warm-gray': {
					50: 'hsl(210 17% 96%)',
					100: 'hsl(210 11% 95%)',
					200: 'hsl(210 11% 90%)',
					300: 'hsl(210 11% 83%)',
					400: 'hsl(210 11% 64%)',
					500: 'hsl(210 11% 45%)',
					600: 'hsl(210 11% 32%)',
					700: 'hsl(210 11% 25%)',
					800: 'hsl(210 11% 15%)',
					900: 'hsl(210 11% 9%)',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
			},
			keyframes: {
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'slide-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'bounce-gentle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-2px)' }
				}
			},
			animation: {
				'fade-in': 'fade-in 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'slide-up': 'slide-up 0.3s ease-out',
				'bounce-gentle': 'bounce-gentle 2s infinite'
			},
			boxShadow: {
				'soft': '0 2px 8px -2px rgba(0, 0, 0, 0.1)',
				'medium': '0 4px 16px -4px rgba(0, 0, 0, 0.12)',
				'strong': '0 8px 32px -8px rgba(0, 0, 0, 0.16)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
