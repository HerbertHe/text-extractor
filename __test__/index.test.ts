import { expect, test } from "vitest"
import { join } from "path"

import { Extractor } from "../src/index"

test("test extractor", () => {
	const res = new Extractor({
		entry: join("__test__/texts"),
		presets: ["chinese-characters", "no-jslike-multi-line-comment"],
	})

	const expected = [{
		"filename": "CodeWithComments.ts", "path": "F:\\Projects\\text-extractor\\__test__\\texts\\CodeWithComments.ts", "texts": [{
			"content": "测试带注释的代码文本场景", "idx": 3, "offset": 12
		}, { "content": "测试", "idx": 24, "offset": 2 }, { "content": "名字", "idx": 60, "offset": 2 }, { "content": "测试符号云云", "idx": 66, "offset": 6 }, { "content": "测试中文文本输出与翻译", "idx": 110, "offset": 11 }, { "content": "测试文本内容", "idx": 139, "offset": 6 }, { "content": "测试代码单行注释", "idx": 185, "offset": 8 }], "files": []
	}]

	expect(res.extract()).toEqual(expected)
})