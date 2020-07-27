const fs = require("fs");
const xlsx = require("xlsx");
const dir = "./gen";
const mode = [];

/**
 * @param {string} month The localed month
 * @param {object} langPkg The language package interface is using
 * @param {object} categories The data pack
 */
mode["json"] = (langPkg, fileName, categories) => {
    let d = new Date;
    let month = d.toLocaleString(langPkg[4][0], { month: "long" });
    let orgs = categories[0],
        trans = categories[1],
        scps = categories[2],
        gois = categories[3],
        tales = categories[4],
        hubs = categories[5];

    let jsonFile = { _createAt: month, _credit: langPkg[2][0], orgs, trans, scps, gois, tales, hubs };
    let data = JSON.stringify(jsonFile, null, 2);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    fs.writeFileSync(fileName, data);
};

/**
 * @param {object} langPkg The language package interface is using
 * @param {object} categories The data pack
 */
mode["xlsx"] = (langPkg, fileName, categories) => {
    let orgs = categories[0],
        trans = categories[1],
        scps = categories[2],
        gois = categories[3],
        tales = categories[4],
        hubs = categories[5];

    let arr = [];
    for (let i = 0, m = langPkg[0]; i < 12; i++) {
        let obj = {};
        obj[langPkg[3][0]] = m[i];
        obj[langPkg[1][0]] = orgs[m[i]];
        obj[langPkg[1][1]] = trans[m[i]];
        obj[langPkg[1][2]] = scps[m[i]];
        obj[langPkg[1][3]] = gois[m[i]];
        obj[langPkg[1][4]] = tales[m[i]];
        obj[langPkg[1][5]] = hubs[m[i]];
        arr.push(obj);
    }
    var ws = xlsx.utils.json_to_sheet(arr);
    var wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "Main");

    xlsx.writeFile(wb, fileName);
}

module.exports.mode = mode;