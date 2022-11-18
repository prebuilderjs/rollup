
module.exports = {
    srcDir: 'tests/typescript-plugin/src',
    log: false,
    onTheSpot: true,
    preprocessOptions: {
        defines: [
            "MY_DIRECTIVE"
        ],
        mode: "both"
    }
}