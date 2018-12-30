export function paddingZero (num, max) {
    let numStr = num.toString();
    for (let len = numStr.length; len < max; len = numStr.length) {
        numStr = "0" + numStr;
    }
    return numStr;
}
