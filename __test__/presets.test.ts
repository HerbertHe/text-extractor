// TODO test each preset
import { expect, test } from "vitest"
import fs from "fs"
import path from "path"

import { ChineseCharactersRegExp, JslikeMultiLineCommentRegExp, JslikeSingleLineCommentRegExp } from "../src/presets"

const __dirname = path.resolve()

test("ChineseCharactersRegExp", () => {
	const str = `This is 中文文本测试, hahaha`
	const [, res] = ChineseCharactersRegExp.exec(str)

	const expected = "中文文本测试"
	expect(res).toBe(
		expected
	)
})

test("JslikeSingleLineCommentRegExp", () => {
	const raw = fs.readFileSync(path.join(__dirname, "__test__/texts/CodeWithComments.ts"), "utf8")
	const reg = raw.matchAll(JslikeSingleLineCommentRegExp)

	const res = Array.from(reg).map(([, res]) => res)

	const expected = ["测试带注释的代码文本场景", "测试中文文本输出与翻译", "测试代码单行注释"]

	expect(res).toEqual(expected)
})

test("JslikeMultiLineCommentRegExp", () => {
	const raw = fs.readFileSync(path.join(__dirname, "__test__/texts/CodeWithComments.ts"), "utf8")
	const reg = raw.matchAll(JslikeMultiLineCommentRegExp)

	const res = Array.from(reg).map(([, res]) => res)

	const expected = ["*\n * 测试 jsdocs\n * @param {string} name - 名字\n * 测试符号云云\n "]

	expect(res).toEqual(expected)
})