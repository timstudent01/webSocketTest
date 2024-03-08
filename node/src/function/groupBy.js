const data =
    [
        { age: 12, gender: 'male', name: 'Jhon' },
        { age: 25, gender: 'female', name: 'Alex' },
        { age: 25, gender: 'male', name: 'Tim' },
        { age: 12, gender: 'female', name: 'Terry' },
        { age: 17, gender: 'male', name: 'Dennis' },
        { age: 17, gender: 'female', name: 'Jack' },
        { age: 12, gender: 'male', name: 'Rose' },
    ]
const groupBy = (arr, getKey) => {
    if (typeof getKey === 'string') {
        /* 參數規一化 */
        const propName = getKey;
        getKey = (item) => item[propName];
    }
    const result = {};
    for (const item of arr) {
        const key = getKey(item);
        if (!result[key]) {
            result[key] = [];
        }
        result[key].push(item);
    }
    return result;
}

console.log(groupBy(data, (item) => `${item.age}-${item.gender}`));
// console.log(groupBy(data,'gender'));

const groupBy2 = (arr, getKey) => {
    return arr.reduce((result, item) => {
        const key = getKey(item);
        if (!result[key]) {
            result[key] = []
        }
        result[key].push(item);
        return result;
    }, {})
}
// console.log(groupBy2(data, (item) => `${item.age}-${item.gender}`));

const data2 =
    [
        { srcId: "HDL1", key: 'country', value: 'TW' },
        { srcId: "HDL1", key: 'state', value: '台南市' },
        { srcId: "HDL1", key: 'city', value: '南區' },
        { srcId: "HDL1", key: 'address1', value: '金華路' },
        { srcId: "HDL1", key: 'address2', value: '1號' },
        { srcId: "HDL1", key: 'age', value: '15' },
        { srcId: "HDL1", key: 'name', value: 'Rose' },
        { srcId: "HDL2", key: 'country', value: 'TW' },
        { srcId: "HDL2", key: 'state', value: '台北市' },
        { srcId: "HDL2", key: 'city', value: '中西區' },
        { srcId: "HDL2", key: 'address1', value: '中華西路' },
        { srcId: "HDL2", key: 'address2', value: '12號' },
        { srcId: "HDL2", key: 'age', value: '17' },
        { srcId: "HDL2", key: 'name', value: 'Tim' },
        { srcId: "URE1", key: 'order', value: '1' },
        { srcId: "URE1", key: 'url', value: 'abc.com' },
        { srcId: "URE2", key: 'order', value: '1' },
        { srcId: "URE2", key: 'url', value: 'abc.com' },
    ]

const groupBy3 = (arr) => {
    return Object.values(
        arr.reduce((result, item) => {
            const { srcId, key, value } = item;
            if (!result[srcId]) {
                result[srcId] = { srcId: srcId }
            }
            result[srcId][key] = value;
            return result;
        }, {})
    )
}
const groupBy4 = (arr, getKey) => {
    return Object.values(arr.reduce((result, item) => {
        const key = getKey(item);
        if (!result[key]) {
            result[key] = { srcId: key }
        }
        result[key][item.key] = item.value;
        return result;
    }, {}))
}
// console.log("3", groupBy3(data2));
// console.log("4", groupBy4(data2, (item) => item.srcId));

const groupBy5 = (arr, getKey) => {
    if (typeof getKey === 'string') {
        /* 參數規一化 */
        const propName = getKey;
        getKey = (item) => item[propName];
    }

    const result = {};

    for (const item of arr) {
        // 如果属性包含 srcId、key、value，则按照相应逻辑进行处理
        if ('srcId' in item && 'key' in item && 'value' in item) {
            const { srcId, key, value } = item;
            if (!result[srcId]) {
                result[srcId] = { srcId: srcId };
            }
            result[srcId][key] = value;
        } else {
            // 否则，按照一般方式进行分组
            const key = getKey(item);
            if (!result[key]) {
                result[key] = [];
            }
            result[key].push(item);
        }
    }

    return result;
}

// console.log("5", groupBy5(data, (item) => item.age));

const groupByPrefix = (arr) => {
    const result = {
        handler: [],
        imageEvent: []
    };

    arr.forEach(item => {
        const { srcId, key, value } = item;

        if (srcId.startsWith('HDL')) {
            const existingItem = result.handler.find(entry => entry.srcId === srcId);
            if (existingItem) {
                existingItem[key] = value;
            } else {
                const newItem = { srcId: srcId };
                newItem[key] = value;
                result.handler.push(newItem);
            }
        } else if (srcId.startsWith('URE')) {
            const existingItem = result.imageEvent.find(entry => entry.srcId === srcId);
            if (existingItem) {
                existingItem[key] = value;
            } else {
                const newItem = { srcId: srcId };
                newItem[key] = value;
                result.imageEvent.push(newItem);
            }
        }
    });

    return result;
}

const groupedData = groupByPrefix(data2);

// console.log(groupedData);

const groupByPrefix2 = (arr) => {
    return arr.reduce((result, item) => {
        const { srcId, key, value } = item;

        if (srcId.startsWith('HDL')) {
            const existingItemIndex = result.handler.findIndex(entry => entry.srcId === srcId);
            if (existingItemIndex !== -1) {
                result.handler[existingItemIndex][key] = value;
            } else {
                const newItem = { srcId: srcId };
                newItem[key] = value;
                result.handler.push(newItem);
            }
        } else if (srcId.startsWith('URE')) {
            const existingItemIndex = result.imageEvent.findIndex(entry => entry.srcId === srcId);
            if (existingItemIndex !== -1) {
                result.imageEvent[existingItemIndex][key] = value;
            } else {
                const newItem = { srcId: srcId };
                newItem[key] = value;
                result.imageEvent.push(newItem);
            }
        }

        return result;
    }, { handler: [], imageEvent: [] });
}

const groupedData2 = groupByPrefix2(data2);

// console.log(groupedData2);

