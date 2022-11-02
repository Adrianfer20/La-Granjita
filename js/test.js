
const date = '2022/10/19'
fetch(`https://webservice.premierpluss.com/loteries/results3?since=${date}&product=1`).then((res)=>{return res.json()}).then((data)=>{const newObj = data.map((obj)=>{return {"result": obj.result, "name":obj.lottery.name, "date": date } }); const JsonArray = JSON.stringify(newObj);  console.log(JsonArray)})