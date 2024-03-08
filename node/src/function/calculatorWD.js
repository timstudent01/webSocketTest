const priceList = [
    {capacity:4,price:5490},
    {capacity:6,price:7390},
    {capacity:8,price:7488},
    {capacity:10,price:8590},
    {capacity:12,price:9990},
    {capacity:14,price:11480},
    {capacity:16,price:12620},
    {capacity:18,price:14890},
]

const cpValue = (productName,unit,productList) => {
    for (let i = 0; i < productList.length ; i++ ) {
        const cpValue = (productList[i].price / productList[i].capacity).toFixed(2)
        if ((i+1 >= productList.length)) {
            console.log(`此${productName}${productList[i].capacity}${unit}，1${unit} :${cpValue} 元`);
            break;
        } 
        const nextPrice = (productList[i+1].price / productList[i+1].capacity).toFixed(2)
        const differencePrice = ( cpValue- nextPrice).toFixed(2)
        console.log(`此${productName}${productList[i].capacity}${unit}，1${unit} :${cpValue} 元，與${productList[i+1].capacity}${unit}的${productName}，1${unit}價差${differencePrice}元`);
    }
}

cpValue("硬碟","TB",priceList);
