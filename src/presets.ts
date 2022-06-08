export const ChineseCharactersRegExp = /([\u4E00-\u9FA5]+)/g

export const JslikeSingleLineCommentRegExp = /\/\/\s+([^\n]*)\n/gm

export const JslikeMultiLineCommentRegExp = /\/\*([^]*)\*\//g

export const Presets: Record<string, RegExp> = {
	"chinese-characters": ChineseCharactersRegExp,
	"no-jslike-single-line-comment": JslikeSingleLineCommentRegExp,
	"no-jslike-multi-line-comment": JslikeMultiLineCommentRegExp,
}
