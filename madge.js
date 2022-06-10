const fs = require("fs");
const madge = require("madge");
const config = require("./.madgerc.json");

// console.log(config);
// const PATH = "src/app/index.tsx";
const PATH = "src/index.tsx";

madge(PATH, config)
    .then((res) => {
        res.image("madge.gh-cli.svg");
        return res;
    })
    .then((res) => {
        const imports = res.obj();
        // console.log(imports);
        fs.writeFileSync("imports.json", JSON.stringify(imports, null, "\t"));
    });
