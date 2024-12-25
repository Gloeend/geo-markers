export default {
    darkMode: ["class"],
    mode: "jit",
    content: [
        "./index.html",
        "./src/**/*.{ts,tsx}",
    ],
    theme: {
    	screens: {
    		'max-375px': {
    			'max': '375px'
    		},
    		'min-375px': {
    			'min': '376px'
    		},
    		'max-475px': {
    			'max': '475px'
    		},
    		'min-475px': {
    			'min': '475px'
    		},
    		'max-680px': {
    			'max': '680px'
    		},
    		'min-680px': {
    			'min': '681px'
    		},
    		'min-768px': {
    			'min': '769px'
    		},
    		'max-768px': {
    			'max': '768px'
    		},
    		'max-834px': {
    			'max': '834px'
    		},
    		'min-834px': {
    			'min': '835px'
    		},
    		'max-1060px': {
    			'max': '1060px'
    		},
    		'min-1060px': {
    			'min': '1061px'
    		},
    		'max-1200px': {
    			'max': '1200px'
    		},
    		'min-1200px': {
    			'min': '1201px'
    		},
    		'min-1440px': {
    			'min': '1441px'
    		},
    		'max-1440px': {
    			'max': '1440px'
    		},
    		'max-1260px': {
    			'max': '1260px'
    		},
    		'min-1260px': {
    			'min': '1261px'
    		},
    		'max-1330px': {
    			'max': '1330px'
    		},
    		'min-1330px': {
    			'min': '1331px'
    		}
    	},
    	fontSize: {
    		'10px': [
    			'.625rem'
    		],
    		'12px': [
    			'.75rem'
    		],
    		'13px': [
    			'.8125rem'
    		],
    		'14px': [
    			'.875rem'
    		],
    		'15px': [
    			'.9375rem'
    		],
    		'16px': [
    			'1rem'
    		],
    		'17px': [
    			'1.0625rem'
    		],
    		'18px': [
    			'1.125rem'
    		],
    		'20px': [
    			'1.25rem'
    		],
    		'21px': [
    			'1.3125rem'
    		],
    		'22px': [
    			'1.375rem'
    		],
    		'23px': [
    			'1.4375rem'
    		],
    		'24px': [
    			'1.5rem'
    		],
    		'26px': [
    			'1.625rem'
    		],
    		'28px': [
    			'1.75rem'
    		],
    		'31px': [
    			'1.9375rem'
    		],
    		'48px': [
    			'3rem'
    		],
    		'56px': [
    			'3.5rem'
    		]
    	},
    	letterSpacing: {
    		'1.2%': '0.012rem'
    	},
    	extend: {
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		}
    	}
    },
    plugins: [require("tailwindcss-animate")],
}