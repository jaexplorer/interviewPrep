"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const fs_1 = __importDefault(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
const readData = () => __awaiter(void 0, void 0, void 0, function* () {
    const results = [];
    fs_1.default.readdirSync("./data/").forEach((file) => {
        const res = fs_1.default.readFileSync(`./data/${file}`, "utf8");
        results.push(JSON.parse(res));
    });
    return results;
});
const saveData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, data_1, data_1_1;
    var _b, e_1, _c, _d;
    try {
        for (_a = true, data_1 = __asyncValues(data); data_1_1 = yield data_1.next(), _b = data_1_1.done, !_b; _a = true) {
            _d = data_1_1.value;
            _a = false;
            let d = _d;
            try {
                fs_1.default.writeFile(`./results/${d}}.json`, JSON.stringify(d), function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("The file was saved!");
                });
            }
            catch (err) {
                console.log("Error: ", err);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_a && !_b && (_c = data_1.return)) yield _c.call(data_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
});
// Start here
const main = () => {
    const now = new Date();
    console.log(chalk_1.default.bgGreen("Current Time: " + (0, moment_1.default)(now).format("h:mmA")));
};
main();
