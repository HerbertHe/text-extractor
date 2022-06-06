import { FilesTree } from "@herberthe/filestree"
import { IOptions } from "./types"

interface CustomType {}

export class Extractor {
	private _options: IOptions = {
		entry: "",
		depth: Infinity,
	}

	constructor(opts: IOptions) {
		this._options = {
			...this._options,
			...opts,
		}
	}

	/**
	 * extractor
	 */
	extract = () => {
		const { entry, depth, filter } = this._options
		const res  = new FilesTree({
			entry,
			depth,
			filter,
			custom: () => {

			}
		})
	}
}