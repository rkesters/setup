module.exports = {
	parser: '@typescript-eslint/parser', // Specifies the ESLint parser
	plugins: ['@typescript-eslint', 'filenames'],
	parserOptions: {
		ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
		sourceType: 'module', // Allows for the use of imports
		ecmaFeatures: {
			jsx: true, // Allows for the parsing of JSX
		},
	},
	settings: {
		react: {
			version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
		},
	},

	env: {
		browser: true,
		es6: true,
	},
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	settings: {
		react: {
			version: 'detect', // React version. "detect" automatically picks the version you have installed.
			// You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
			// default to latest and warns if missing
			// It will default to "detect" in the future
		},
	},

	rules: {
		'filenames/match-regex': ['error', '^[a-z]{1}[a-zA-Z-_.]+$|^[0-9]+_[a-z]{1}[a-zA-Z-_.]+$', true],
		'@typescript-eslint/ban-types': 'warn',
		// Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
		// e.g. "@typescript-eslint/explicit-function-return-type": "off",
		camelcase: 'off',
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
		'@typescript-eslint/camelcase': 'off',
		'@typescript-eslint/naming-convention': [
			'warn',
			{
				selector: 'default',
				format: ['camelCase'],
				leadingUnderscore: 'allow',
			},
			{ selector: 'property', format: ['camelCase', 'snake_case'] },
			{
				selector: ['class', 'function', 'interface', 'typeAlias', 'typeParameter'],
				format: ['camelCase', 'PascalCase'],
			},
			{ selector: 'interface', format: ['camelCase', 'PascalCase'], prefix: ['IFace'] },
			{ selector: 'variable', format: ['camelCase', 'StrictPascalCase'] },
		],
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
	],
};
