module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/jsx-runtime',
		'plugin:i18next/recommended'
	],
	'overrides': [
		{
			files: ['**/src/**/*.test.{ts,tsx}'],
			rules: {
				'i18next/no-literal-string': 'off'
			}
		}
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'plugins': [
		'react',
		'@typescript-eslint',
		'i18next'
	],
	'rules': {
		'react/jsx-indent': [2, 4],
		'no-unused-vars': 'warn',
		'@typescript-eslint/ban-ts-comment': 'warn',
		'quotes': ['error', 'single'],
		'semi': ['error', 'always'],
		'i18next/no-literal-string': ['error', { markupOnly: true, 'ignoreAttribute': ['data-testid'] }]
	},
};
