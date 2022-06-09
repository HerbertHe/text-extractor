import { FilesTree } from "@herberthe/filestree"
import { lstatSync, readdirSync, readFileSync, Stats } from "fs"
import { join } from "path"
import { Presets } from "./presets"
import { IOptions, IFile, ISpecificRule } from "./types"

export class Extractor {
    private _options: IOptions = {
        entry: "",
        depth: Infinity,
    }

    // Global rules
    private _allowed_rules_global: Map<string, RegExp> = new Map()
    private _banned_rules_global: Map<string, RegExp> = new Map()

    private _rules_specific: ISpecificRule[] = []

    constructor(opts: IOptions) {
        this._options = {
            ...this._options,
            ...opts,
        }

        const { presets, rules } = opts

        // import presets
        if (!!presets && presets.length > 0) {
            presets.forEach(p => {
                if (!!Presets[p]) {
                    if (/^no-([a-zA-Z0-9\-]+)$/.test(<string>p)) {
                        this._banned_rules_global.set(<string>p, Presets[p])
                    } else {
                        this._allowed_rules_global.set(<string>p, Presets[p])
                    }
                }
            })
        }

        // support custom global rules
        if (!!rules && rules instanceof Map && rules.size > 0) {
            rules.forEach((v, k) => {
                if (/^no-([a-zA-Z0-9\-]+)$/.test(k)) {
                    this._banned_rules_global.set(k, v)
                } else {
                    this._allowed_rules_global.set(k, v)
                }
            })
        }

        // support custom specific rules
        if (!!rules && Array.isArray(rules) && rules.length > 0) {
            this._rules_specific = rules
        }
    }

    private _custom = (filename: string, path: string, stats: Stats): IFile => {
        let file: IFile = {
            filename,
            path,
            texts: [],
            files: []
        }

        if (stats.isDirectory()) {
            const f = readdirSync(path)
            f.forEach((fn) => {
                const fp = join(path, fn)
                const stats = lstatSync(fp)
                file.files.push(this._custom(fn, fp, stats))
            })

            return file
        } else {
            const raw = readFileSync(path, "utf8")

            if (!!this._rules_specific && this._rules_specific.length > 0) {
                this._rules_specific.forEach((rule) => {
                    const { test, rules } = rule
                    if (!!test && test.test(filename)) {
                        rules[0].forEach(r => {
                            const tmp = raw.matchAll(r)
                            Array.from(tmp).forEach(v => {
                                if (!Array.from(rule[1] as ISpecificRule["rules"][1]).some((r) => r.test(v[0]))) {
                                    file.texts.push({
                                        content: v[0],
                                        idx: v.index,
                                        offset: v[0].length
                                    })
                                }
                            })
                        })
                    } else {
                        this._allowed_rules_global.forEach((v) => {
                            const tmp = raw.matchAll(v)
                            Array.from(tmp).forEach(v => {
                                if (!Array.from(this._banned_rules_global.values()).some((r) => r.test(v[0]))) {
                                    file.texts.push({
                                        content: v[0],
                                        idx: v.index,
                                        offset: v[0].length
                                    })
                                }
                            })
                        })
                    }
                })
            } else {
                this._allowed_rules_global.forEach((v) => {
                    const tmp = raw.matchAll(v)
                    this._allowed_rules_global.forEach((v) => {
                        const tmp = raw.matchAll(v)
                        Array.from(tmp).forEach(v => {
                            if (!Array.from(this._banned_rules_global.values()).some((r) => r.test(v[0]))) {
                                file.texts.push({
                                    content: v[0],
                                    idx: v.index,
                                    offset: v[0].length
                                })
                            }
                        })
                    })
                })
            }

            return file
        }
    }

    /**
     * extractor
     */
    extract = () => {
        const { entry, depth, filter } = this._options
        const res = new FilesTree({
            entry,
            depth,
            filter,
            flat: true,
            custom: this._custom,
        })

        return res.output() as IFile[]
    }
}