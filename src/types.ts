import { PresetsType } from "./presets"

type FilterFunctionType = (filename: string) => boolean

export interface IOptions extends IFilesTreeOptions {
	presets?: PresetsType[]
	rules?: Map<string, RegExp>
}

export interface IFilesTreeOptions {
	entry: string
	depth?: number
	filter?: RegExp | FilterFunctionType
}

/**
 * IFile
 */
export interface IFile {
	filename: string
	path: string
	files: IFile[]
	texts: IText[]
}

/**
 * IText
 */
export interface IText {
	idx: number
	offset: number
	content: string
}