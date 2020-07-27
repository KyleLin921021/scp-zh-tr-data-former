"use strict";

const got = require("got");
const cheerio = require("cheerio");

const langHelper = require("./scripts/langHelper");
const fileWriter = require("./scripts/fileWriter");
const { isNull } = require("util");
const dir = "./gen";

//mode init w/ lang init
let mode = null;
let langPkg = null;

//customize properties phase
process.argv.forEach((val, index, array) => {
    if (index >= 2) {
        let v = val.trim();
        if (isNull(mode)) {
            if (val.trim() === "json" || val.trim() === "xlsx" || val.trim() === "help") {
                mode = val;
            }
        }
        if (isNull(langPkg)) {
            if (val === "en-us" || val === "zh-tr") {
                langPkg = langHelper.getLang(val);
            }
        }
    }
});

//if no args detected, then fill with default options
if (isNull(mode)) mode = "json";
if (isNull(langPkg)) langPkg = langHelper.getLang("en-us");

//date init
let d = new Date();
let mmddyyyy = `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;

//main process
(async () => {
    console.log("=========================================================================\n| This tool is created by ChAoS UnItY, no bussiness usages are allowed. |\n=========================================================================\n");
    const response = await got("http://scp-zh-tr.wikidot.com/chaos-unitys-analysis-scrapper");
    var $ = cheerio.load(response.body);
    var orgs = {}, trans = {}, scps = {}, gois = {}, tales = {}, hubs = {};
    for (let i = 0, c = langPkg[3][1], t = langPkg[1]; i < 6; i++) {
        switch (i) {
            case 0:
                orgs[c] = t[0];
                break;
            case 1:
                trans[c] = t[1];
                break;
            case 2:
                scps[c] = t[2];
                break;
            case 3:
                gois[c] = t[3];
                break;
            case 4:
                tales[c] = t[4];
                break;
            case 5:
                hubs[c] = t[5];
                break;
            default:
                break;
        }
    }
    for (let i = 0, m = langPkg[0]; i < 6; i++) {
        $(`div.total-track > table > tbody > tr:nth-child(${i + 2})`).find("p").slice(0).each((index, element) => {
            let t = $(element).text();
            switch (i) {
                case 0:
                    orgs[m[index]] = t;
                    break;
                case 1:
                    trans[m[index]] = t;
                    break;
                case 2:
                    scps[m[index]] = t;
                    break;
                case 3:
                    gois[m[index]] = t;
                    break;
                case 4:
                    tales[m[index]] = t;
                    break;
                case 5:
                    hubs[m[index]] = t;
                    break;
                default:
                    break;
            }
        });
    }
    let fileName = `${dir}/SCP-ZH-TR_Datas_${mmddyyyy}_${langPkg[4][0]}.${mode}`;
    let categories = [];
    categories[0] = orgs;
    categories[1] = trans;
    categories[2] = scps;
    categories[3] = gois;
    categories[4] = tales;
    categories[5] = hubs;

    fileWriter.mode[mode](langPkg, fileName, categories);;
    console.log(`=========================================================================\nSuccessfully Generated File!\nIn ${fileName}\n=========================================================================`);
    setTimeout(() => {
        console.log("\n\nProgress End. Closing......\n\n");
    }, 5000);
})();
