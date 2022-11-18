import typescript from "@rollup/plugin-typescript"

export default {
    input: process.env.__prebuilderOutput + "/index.ts",
    output: {
        format: "esm",
        file: "tests/typescript-plugin/dist/index.js",
    },
    plugins: [ 
        typescript({
            compilerOptions: {
                allowJs: true,
                outDir: "tests/typescript-plugin/dist",
                strict: false,
                target: "ES6",
            },
            include: [
                process.env.__prebuilderOutput
            ],
            exclude: ["node_modules"]
        })
    ]
}