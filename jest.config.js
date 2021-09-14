module.exports = {
	testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
	moduleNameMapper: {
		'^.+\\.(css|sass|scss)$': 'identity-obj-proxy',
	},
	transform: {
		'^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
	},
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	preset: 'ts-jest'
}