export const ChineseCharactersRegExp = /([\u4E00-\u9FA5]+)/g

export const JslikeSingleLineCommentRegExp = /\/\/\s+([^\n]*)\n/gm

export const JslikeMultiLineCommentRegExp = /\/\*([^]*)\*\//g

export const JslikeBackQuoteStringRegExp = /`([^`]+)`/g

export const JslikeQuoteStringRegExp = /"([^"]+)"/g

export const JslikeSingleQuoteStringRegExp = /'([^']+)'/g

export const JslikeImportModuleRegExp = /import\s+([^\s]+)\s+from\s+([^\s]+)\s*;?/g

export const JslikeRequireModuleRegExp = /require\s*\(\s*(['"])([^'"]+)\1\s*\)/g

export interface IPresets {
	[key: string]: RegExp

	"chinese-characters": RegExp
	"jslike-backquote-string": RegExp
	"jslike-quote-string": RegExp
	"jslike-single-quote-string": RegExp
	"jslike-import-module": RegExp
	"jslike-require-module": RegExp
	"no-jslike-single-line-comment": RegExp
	"no-jslike-multi-line-comment": RegExp
}

export const Presets: IPresets = {
	"chinese-characters": ChineseCharactersRegExp,
	"jslike-backquote-string": JslikeBackQuoteStringRegExp,
	"jslike-quote-string": JslikeQuoteStringRegExp,
	"jslike-single-quote-string": JslikeSingleQuoteStringRegExp,
	"jslike-import-module": JslikeImportModuleRegExp,
	"jslike-require-module": JslikeRequireModuleRegExp,
	"no-jslike-single-line-comment": JslikeSingleLineCommentRegExp,
	"no-jslike-multi-line-comment": JslikeMultiLineCommentRegExp,
}

export type PresetsType = keyof IPresets
