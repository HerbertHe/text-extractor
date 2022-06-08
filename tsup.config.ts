import { defineConfig } from "tsup"

export const tsup = defineConfig({
	entry: ["./src/index.ts"],
	format: ["cjs", "esm"],
	clean: true,
	dts: true
})