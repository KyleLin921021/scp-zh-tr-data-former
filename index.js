'use strict';

const got = require('got');
const cheerio = require('cheerio');
const fs = require('fs');
const { getMonthName } = require("./scripts/getMonthName");
const dir = './gen';

(async () => {
    console.log('=========================================================================\n| This tool is created by ChAoS UnItY, no bussiness usages are allowed. |\n=========================================================================\n');
    const response = await got('http://scp-zh-tr.wikidot.com/chaos-unitys-analysis-scrapper');
    var $ = cheerio.load(response.body);
    var rowMonth = [];
    var orgs = { name: "原創" }, trans = { name: "翻譯" }, scps = { name: "SCP項目" }, gois = { name: "GOI格式" }, tales = { name: "故事" }, hubs = { name: "中心頁" };
    //Get Months In Traditional Chinese
    $('div.total-track tr:first-child').find('th').slice(0).each((index, element) => {
        if (index != 0) {
            rowMonth.push($(element).text());
        }
    });
    //Get all datas : Orgs, trans, SCPs, GOIs, Tales, Hubs
    $('div.total-track > table > tbody > tr:nth-child(2)').find('p').slice(0).each((index, element) => {
        orgs[rowMonth[index]] = $(element).text();
    });
    $('div.total-track > table > tbody > tr:nth-child(3)').find('p').slice(0).each((index, element) => {
        trans[rowMonth[index]] = $(element).text();
    });
    $('div.total-track > table > tbody > tr:nth-child(4)').find('p').slice(0).each((index, element) => {
        scps[rowMonth[index]] = $(element).text();
    });
    $('div.total-track > table > tbody > tr:nth-child(5)').find('p').slice(0).each((index, element) => {
        gois[rowMonth[index]] = $(element).text();
    });
    $('div.total-track > table > tbody > tr:nth-child(6)').find('p').slice(0).each((index, element) => {
        tales[rowMonth[index]] = $(element).text();
    });
    $('div.total-track > table > tbody > tr:nth-child(7)').find('p').slice(0).each((index, element) => {
        hubs[rowMonth[index]] = $(element).text();
    });
    let d = new Date;
    let month = getMonthName(d.getMonth());
    let mmddyyyy = `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
    let jsonFile = { _createAt: month, _credit: "ChAoS_UnItY, SCP 繁中分部技術人員", orgs, trans, scps, gois, tales, hubs };

    let data = JSON.stringify(jsonFile, null, 2);
    let fileName = `SCP-ZH-TR_Datas_${mmddyyyy}.json`;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    fs.writeFileSync(`./gen/${fileName}`, data);
    console.log(`===========================================\nSuccessfully Generated File!\nIn ./gen/${fileName}\n===========================================`);
})();