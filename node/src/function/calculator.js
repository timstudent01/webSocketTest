const getTax = (收入) => {
    const 綜合所得稅總額 = 收入 - 207000;
    const 免稅額 = 92000;
    const 單身者一般扣除額 = 124000;
    const 基本生活費差額 = 196000 - 免稅額 - 單身者一般扣除額;
    const 綜合所得稅淨額 =  綜合所得稅總額  - 免稅額 - 單身者一般扣除額
    // console.log(收入,綜合所得稅淨額);
    // console.log(基本生活費差額); // -20000 不計算
    if (560001>綜合所得稅淨額 && 綜合所得稅淨額 > 0) {
        return (綜合所得稅淨額) *0.05 - 0;
    }
    if (1260000>綜合所得稅淨額 && 綜合所得稅淨額 > 560001) {
        return (綜合所得稅淨額) *0.12 - 39200;
    }
    if (2520000>綜合所得稅淨額 && 綜合所得稅淨額 > 1260001) {
        return (綜合所得稅淨額) *0.2 - 140000;
    }
    if (4720000>綜合所得稅淨額 && 綜合所得稅淨額 > 2520001) {
        return (綜合所得稅淨額) *0.3 - 392000;
    }
    return (綜合所得稅淨額) *0.4 - 864000;
}

console.log("收入500000的稅金:",getTax(500000),"扣掉所得稅收入為:", 500000 - getTax(500000));
console.log("收入520000的稅金:",getTax(520000),"扣掉所得稅收入為:", 520000 - getTax(520000));
console.log("收入540000的稅金:",getTax(540000),"扣掉所得稅收入為:", 540000 - getTax(540000));
console.log("收入560000的稅金:",getTax(560000),"扣掉所得稅收入為:", 560000 - getTax(560000));
console.log("收入700000的稅金:",getTax(700000),"扣掉所得稅收入為:", 700000 - getTax(700000));
console.log("收入750000的稅金:",getTax(750000),"扣掉所得稅收入為:", 750000 - getTax(750000));
console.log("收入800000的稅金:",getTax(800000),"扣掉所得稅收入為:", 800000 - getTax(800000));
console.log("收入900000的稅金:",getTax(900000),"扣掉所得稅收入為:", 900000 - getTax(900000));
console.log("收入1260000的稅金:",getTax(1260000),"扣掉所得稅收入為:", 1260000 - getTax(1260000));