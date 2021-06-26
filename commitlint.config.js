const {
	utils: { getPackages },
} = require('@commitlint/config-lerna-scopes');

module.exports = {
	extends: ['@commitlint/config-lerna-scopes'],
	parserPreset: {
		parserOpts: {
			issuePrefixes: ['MSENC2-'],
			headerPattern: /^\[(\w*-\d*)\] (\w*)\(([a-z\-]*)\):\s(.*)$/,
			headerCorrespondence: ['references', 'type', 'scope', 'subject'],
			referenceActions: null,
		},
	},
	rules: {
		'scope-empty': [2, 'never'],
		'type-enum': [2, 'always', ['build', 'feat', 'fix', 'docs', 'style', 'refactor', 'test', 'revert', 'perf', 'BREAKING CHANGE']],
		'references-empty': [2, 'never'],
		'scope-enum': async (ctx) => [2, 'always', [...(await getPackages(ctx)), 'root', 'multiple']],
		'header-max-length': [2, 'always', 80],
	},
};
