"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = random;
function random(len) {
    let options = "qwertypoqwieruyuertyhre034958304958";
    let length = options.length;
    let ans = "";
    for (let i = 0; i < len; i++) {
        ans = ans + options[Math.floor((Math.random() * length))]; //0 =>20
    }
    return ans;
}
