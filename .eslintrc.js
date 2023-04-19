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
	'globals': {
		__IS_DEV__: true,
		__API__: true,
		__PROJECT__: true,
	},
	'overrides': [
		{
			files: ['**/src/**/*.test.{ts,tsx}', '**/src/**/*.stories.{ts,tsx}'],
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
		'i18next',
		'react-hooks',
		'owldelaide-plugin'
	],
	'rules': {
		'react/jsx-indent': [2, 4],
		'react/display-name': 0,
		'no-unused-vars': 'warn',
		'@typescript-eslint/ban-ts-comment': 'warn',
		'quotes': ['error', 'single'],
		'semi': ['error', 'always'],
		'no-undef': 'off',
		'i18next/no-literal-string': [
			'error',
			{
				markupOnly: true,
				'ignoreAttribute': [
					'data-testid',
					'to',
					'target',
					'justify',
					'align',
					'direction',
					'gap',
					'role',
					'as',
					'border'
				]
			}
		],
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'error',
		'react/jsx-key': 'off',
		'owldelaide-plugin/path-checker': 'error',
	},
};
