
module.exports = {
    srcDir: 'tests/no-plugin/src',
    log: false,
    onTheSpot: true,
    preprocessOptions: {
        defines: [
            "MY_DIRECTIVE"
        ],
        mode: "both"
    }
}