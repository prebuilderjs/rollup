

export default {
    input: process.env.__prebuilderOutput + "/index.js",
    output: {
        format: "esm",
        file: "tests/no-plugin/dist/index.js",
    },
}