import { FilesTree } from "@herberthe/filestree"
import { lstatSync, readdirSync, readFileSync, Stats } from "fs"
import { join } from "path"
import { Presets } from "./presets"
import { IOptions, IText, IFile } from "./types"

export class Extractor {
    private _options: IOptions = {
        entry: "",
        depth: Infinity,
    }

    private _allowed_rules: Map<string, RegExp> = new Map()
    private _banned_rules: Map<string, RegExp> = new Map()

    constructor(opts: IOptions) {
        this._options = {
            ...this._options,
            ...opts,
        }

        // import presets
        if (!!opts.presets && opts.presets.length > 0) {
            opts.presets.forEach(p => {
                if (!!Presets[p]) {
                    if (/^no-([a-zA-Z0-9\-]+)$/.test(<string>p)) {
                        this._banned_rules.set(<string>p, Presets[p])
                    } else {
                        this._allowed_rules.set(<string>p, Presets[p])
                    }
                }
            })
        }

        // support custom rules
        if (!!opts.rules && opts.rules.size > 0) {
            opts.rules.forEach((v, k) => {
                if (/^no-([a-zA-Z0-9\-]+)$/.test(k)) {
                    this._banned_rules.set(k, v)
                } else {
                    this._allowed_rules.set(k, v)
                }
            })
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
            let t: IText[] = []

            this._allowed_rules.forEach((v) => {
                const tmp = raw.matchAll(v)
                t = [...t, ...Array.from(tmp).map((v) => {
                    return {
                        content: v[0],
                        idx: v.index,
                        offset: v[0].length
                    }
                })]
            })

            file.texts.push(...t.filter(({ content }) => !Array.from(this._banned_rules.values()).some((v) => v.test(content))))

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

        return res.output()
    }
}