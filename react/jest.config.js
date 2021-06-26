module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	testMatch: ['**/*.spec.ts', '**/*.spec.tsx'],
	restoreMocks: true,
	clearMocks: true,
	setupFilesAfterEnv: ['<rootDir>/test/support/setupFramework.ts'],
	roots: ['<rootDir>/src', '<rootDir>/test'],
	coverageReporters: ['lcov', 'cobertura'],
	coverageDirectory: '.coverage',
	coveragePathIgnorePatterns: ['/test/', '/node_modules/'],
	//reporters: ['default', ['jest-summary-reporter', { failuresOnly: true }]],
};
