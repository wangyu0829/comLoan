const readlineSync = require('readline-sync');

const readlineNumber = (question) => parseFloat(readlineSync.question(question));

let principal = readlineNumber('请输入借款本金（默认为144000）:') || 144000;    // 借款本金
let discount = readlineNumber('请输入借款利息折扣（默认为0.6）:') || (0.6 || 1);        // 分期折扣
let payFeeRateMonth = readlineNumber('请输入分期手续费（默认为0.75）:') * 0.01 || (0 || 0.75 * 0.01);  // 分期手续费
let payFeeRateYear = readlineNumber('请输入借款年化（默认0）:') || (0 || 0);             // 借款年化
let earnFeeRateYear = readlineNumber('请输入收益年化（默认3.9890）:') * 0.01 || (3.9890 * 0.01);       // 收益年化
let totalMonth = readlineNumber('请输入分期次数:(默认18)') || 18;         // 分期次数

let payRateMonth = payFeeRateMonth * discount || payFeeRateYear;
let recRateMonth = earnFeeRateYear / 12;

console.log(`本金:${principal}`)
console.log(`支付年化:${payRateMonth * 12}`);
console.log(`收益年化:${recRateMonth * 12}`);


// 支付利息
let payMonthInterest = principal * payRateMonth
let payTotalInterest = payMonthInterest * totalMonth;

console.log(`月付利息：${payMonthInterest}`);
console.log(`${totalMonth}期分期，共支付利息: ${payTotalInterest}`);

let installment = principal / totalMonth + payMonthInterest;
console.log(`每期还款:${installment}`);

// 收益利息

let recRateDay = recRateMonth * 12 / 365;
let tempPrincipal = principal;
let recDay = 0;
let totalRec = 0;
for (let i = 0; i < totalMonth * 30; i++) {
    if (i != 0 && i % 30 == 0) {
        tempPrincipal -= installment;
        // console.log(`剩余本金:${tempPrincipal}`);
    }
    tempPrincipal += recDay;
    recDay = tempPrincipal * recRateDay;
    // console.log(`每日收益:${recDay}`);
    totalRec += recDay;
}

console.log(`累计收益:${totalRec}`);