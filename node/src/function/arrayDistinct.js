/* 一般 跟set一樣 */

const arr = [1, 3, 2, 4, 1, 2, 7, 4, 3, 1];
/* 這邊也可以arr.slice()做淺拷貝 */
const newArr = [...arr];
for (let i = 0; i < newArr.length; i++) {
    for (let j = i + 1; j < newArr.length; j++) {
        if (newArr[i] === newArr[j]) {
            newArr.splice(j, 1);
            j--;
        }
    }
}



console.log(newArr);
console.log(arr);

/* 自組判斷邏輯 正常 */

const isObject = (value) => typeof value === 'object' && value !== null;

const equals = (value1,value2) => {
    if (isObject(value1) && isObject(value2)) {
        const keys1 = Object.keys(value1);
        const keys2 = Object.keys(value2);
        /* 判斷長度 */
        if (keys1.length !== keys2.length) {
         return false;
        }
        /* 判斷key是不是一樣 */
        for (const key of keys1) {
            if (!keys2.includes(key)) {
                return false;
            }
            /* 遞歸調用 */
            if (!equals(value1[key],value2[key])) {
                return false;
            }
        }
        return true;
    } 
    return value1 === value2;
}
const arr2 = [1, 3, 2, 4, 1, 2, 7, 4, 3, 1,{a:1,b:2},{a:1,b:2},{a:2,b:2}];
const newArr2 = [...arr2];
for (let i = 0; i < newArr2.length; i++) {
    for (let j = i + 1; j < newArr2.length; j++) {
        if (equals(newArr2[i],newArr2[j])) {
            newArr2.splice(j, 1);
            j--;
        }
    }
}

console.log(newArr2); // [ 1, 3, 2, 4, 7, { a: 1, b: 2 }, { a: 2, b: 2 } ]

/* GPT 解答1 複雜數據變成字串 這完全沒用 因為字串key順序不一樣就爆了 */
const arr3 = [1, 3, 2, 4, 1, 2, 7, 4, 3, 1, {a:1, b:2}, {a:1, b:2}, {a:2, b:2}];

const uniqueSet = new Set(arr3.map(item => (isObject(item) ? JSON.stringify(item) : item)));
const newArr3 = [...uniqueSet].map(item => (isObject(item) ? JSON.parse(item) : item));

console.log(newArr3); // [ 1, 3, 2, 4, 7, '{"a":1,"b":2}', '{"a":2,"b":2}' ]

/* GPT 解答2 沒有簡單數據類型 */
const arr4 = [1, 3, 2, 4, 1, 2, 7, 4, 3, 1, {a:1, b:2}, {a:1, b:2}, {a:2, b:2}];

const seenObjects = new Map();
const newArr4 = arr4.filter(item => {
    if (isObject(item)) {
        const key = JSON.stringify(item);
        if (!seenObjects.has(key)) {
            seenObjects.set(key, true);
            return true;
        }
        return false;
    }
    return !seenObjects.has(item);
});

console.log(newArr4); // [ 1, 3, 2, 4, 1, 2, 7, 4, 3, 1, { a: 1, b: 2 }, { a: 2, b: 2 } ]

