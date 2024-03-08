async function asy1() {
    console.log(1);
    await asy2();
    console.log(2);
}

asy2 = async () => {
    await (async()=>{
        await(()=>{
            console.log(3);
        })();
        console.log(4);
    })();
}

asy3 = async () => {
    Promise.resolve().then((_)=>{
        console.log(6);
    })
}

asy1();
console.log(7);
asy3();

// 宏: 
// 微: asy2()
// log : 1 宏任務
const asy2 = async () => {
    timestamp = +new Date();
}