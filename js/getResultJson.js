import { getCollection, addNewDoc } from './firebase.js';

const getApi = () => {
    const data = fetch('../public/data/result.json').then(res => res.json())
    return data;
}

const creatNewData = (API) => {
    let DATA = API.map((obj) => {
        const date = obj[0].date.slice(0, 10);
        const winners = obj.map(item => { return item.result.split('-')[0] });
        const DATA = { date, winners};
        return DATA
    });

    return DATA;

}

const getResultJson = async () => {
    let API = await getApi();
    const DATA = creatNewData(API);
    return DATA;
}

const saveAllObj = async () => {
    const db = await getResultJson();
    const data = await getCollection('draw');
    db.forEach(async(obj) => {
        let isExist;
        if(data[0]){isExist =  data.filter(item => item.date == obj.date)[0].id;}
        else{isExist =  undefined;}
        await addNewDoc("draw", isExist, obj);
        console.log(obj);
    });
}

export {saveAllObj}