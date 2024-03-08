async function asy1() {
    console.log(1);
    await asy2();
    console.log(2);
}

asy2 = async () => {
    await setTimeout((_)=>{
        Promise.resolve().then((_)=>{
            console.log(3);
        });
        console.log(4);
    },0);
}

asy3 = async () => {
    Promise.resolve().then((_)=>{
        console.log(6);
    })
}

asy1();
console.log(7);
asy3();

/**
 * 調用 asy1 函數：

輸出 1
調用 asy2
調用 asy2 函數：

調用 setTimeout，設定計時器，但因為時間是 0 毫秒，所以不會立即執行，而是放入宏隊列中。
執行宏隊列：

宏隊列中的 setTimeout 時間到，將其回調函數放入微隊列。
執行微隊列：

微隊列中的 Promise 回調函數執行，輸出 3。
總結：

1 會在 asy1 函數中同步輸出。
2 會在 asy1 函數中等待 asy2 完成後同步輸出。
3 會在 setTimeout 的回調中，通過 Promise 被放入微隊列，最終在微隊列中執行。
4 會在 setTimeout 的回調中同步輸出。
至於返回的 timerId，setTimeout 返回的是一個定時器的唯一識別符，可以用來清除計時器。
在這個代碼中，我們沒有使用 clearTimeout，因此 timerId 對於整個流程的結果並不重要。如果需要停止計時器，可以使用 clearTimeout(timerId)。
 * 
 */


// 宏: 4 3 
// 微: 6 2
// log : 1 7