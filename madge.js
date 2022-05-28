const madge = require("madge");
const config = require("./.madgerc.json");

// console.log(config);
// const PATH = "src/index.tsx";
const PATH = "src/app/index.tsx";

madge(PATH, config)
    .then((res) => {
        res.image("madge.gh-cli.svg");
        return res;
    })
    .then((res) => {
        console.log(res.obj());
    });
