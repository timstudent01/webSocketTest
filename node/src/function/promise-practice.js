// 結論: 微任務 任務執行時機 比宏任務早
// 宏任務: setTimeout ,setInterval ,DOM事件 ,AJAX請求
// DOM渲染
// 微任務: Promise ,async/await

// 微任務 > DOM渲染 > 宏任務

console.log(1);

setTimeout(()=>{
    console.log(2);
},0);

Promise.resolve().then(()=>{
    console.log(3);
})
const promisePractice = (value) => {
    return new Promise((resolve, reject) => {
        if (value > 3) {
            resolve('ok');
        } else {
            reject('error');
        }
    });
 }


promisePractice(5).then((data)=>{console.log(data)}).catch((err)=>{console.log(err)})
promisePractice(1).then((data)=>{console.log(data)}).catch((err)=>{console.log(err)})


console.log(4);

