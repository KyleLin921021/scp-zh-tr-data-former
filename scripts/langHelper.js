"use strict";

/**Format Doc
 * [
 *  ["Ago" List],
 *  [Tag List],
 *  [Author Info],
 *  [xlsx / json props],
 *  [lang code]
 * ]
 *///By ChAoS=================

let Lang = ["EN", "ZH_TR"];

let EN_US =
    [
        [
            "Currently",
            "1 Months Ago",
            "2 Months Ago",
            "3 Months Ago",
            "4 Months Ago",
            "5 Months Ago",
            "6 Months Ago",
            "7 Months Ago",
            "8 Months Ago",
            "9 Months Ago",
            "10 Months Ago",
            "11 Months Ago",],
        [
            "Original",
            "Translate",
            "SCP",
            "GOI",
            "Tale",
            "Hub"
        ],
        [
            "ChAoS_UnItY, SCP ZH-TR Branch Tech Support"
        ],
        [
            "Month/Category",
            "category"
        ],
        [
            "en-us"
        ]
    ],
    ZH_TR =
    [
        [
            "當前",
            "1個月前",
            "2個月前",
            "3個月前",
            "4 個月前",
            "5 個月前",
            "6 個月前",
            "7 個月前",
            "8 個月前",
            "9 個月前",
            "10 個月前",
            "11 個月前",],
        [
            "原創",
            "翻譯",
            "SCP",
            "GOI格式",
            "故事",
            "中心頁"
        ],
        [
            "ChAoS_UnItY, SCP 繁中分部技術人員"
        ],
        [
            "月份/類別",
            "類別"
        ],
        [
            "zh-tr"
        ]
    ];

module.exports.getLang = function (code) {
    switch(code) {
        case "en-us":
            return EN_US;
        case "zh-tr":
            return ZH_TR;
        default:
            return EN;
    }
}