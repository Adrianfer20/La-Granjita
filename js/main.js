import { saveAllObj } from "./getResultJson.js";
import { getData } from "./api.js";
import { showWrapper, showPatters, showListFraw, readFraw, saveEstimacion, saveDoc, deleteFraw } from "./ui.js";

const scrollEnd = () => {
    const $wrapperPatters = document.getElementById("wrapper-graph");
    const x = $wrapperPatters.scrollWidth;
    $wrapperPatters.scrollTo(x, 0);

    const div = document.getElementById("wrapper-patters");
    const y = div.scrollHeight;
    div.scrollTo(0, y);
}

const pattersPlayGroupA = (DATA) => {
    console.info("GRUPO ''A'' || 00, 0, 01, 02, 03, 04, 05, 06, 07");
    DATA.forEach(({ pattersLetters, date }) => {
        const [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11] = pattersLetters;
        const sorteo = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM"];


        const isUndefined = p1 == undefined || p2 == undefined || p3 == undefined || p4 == undefined || p5 == undefined || p6 == undefined || p7 == undefined || p8 == undefined || p9 == undefined || p10 == undefined || p11 == undefined;
        if (isUndefined) return;

        const isAp4 = p1 != "A" && p2 != "A" && p3 != "A" && p4 === "A";
        const isAp5 = p1 != "A" && p2 != "A" && p3 != "A" && p4 != "A" && p5 === "A";
        const isAp6 = p1 != "A" && p2 != "A" && p3 != "A" && p4 != "A" && p5 != "A" && p6 === "A";
        const isAp7 = p1 != "A" && p2 != "A" && p3 != "A" && p4 != "A" && p5 != "A" && p6 != "A" && p7 === "A";
        const isAp8 = p1 != "A" && p2 != "A" && p3 != "A" && p4 != "A" && p5 != "A" && p6 != "A" && p7 != "A" && p8 === "A";
        const isAp9 = p1 != "A" && p2 != "A" && p3 != "A" && p4 != "A" && p5 != "A" && p6 === "A" && p7 != "A" && p8 != "A" && p9 === "A";

        if (isAp4) { console.log("DIA " + date + " == " + p1, p2, p3 + " == " + " ✔️ A salio *P4* "); }
        else if (isAp5) { console.log("DIA " + date + " == " + p1, p2, p3, p4 + " == " + " ✔️ A salio *P5* "); }
        else if (isAp6) { console.log("DIA " + date + " == " + p1, p2, p3, p4, p5 + " == " + " ✔️ A salio *P6* "); }

        if (isAp6) { console.log("DIA " + date + " == " + p1, p2, p3, p4, p5, p6 + " == " + " ✔️ A salio *P7* "); }
        else if (isAp7) { console.log("DIA " + date + " == " + p1, p2, p3, p4, p5, p6, p7 + " == " + " ✔️ A salio *P8* "); }
        else if (isAp8) { console.log("DIA " + date + " == " + p1, p2, p3, p4, p5, p6, p7, p8 + " == " + " ✔️ A salio *P9* "); }

        else if (p1 != "A" && p2 != "A" && p3 != "A" && p4 != "A" && p5 != "A" && p6 != "A" && p7 != "A" && p8 != "A" && p9 != "A" && p10 != "A" && p11 != "A") {
            console.log("DIA " + date + "A sin salir en todo el sorteo.");
        }


    });
}

let arrAmountPrevius = [];

const getleverage = ({ ticketsAmount, initial, nivels, growth, count }) => {
    if (count > nivels) return;

    const ticket = initial.toFixed(2);
    const apuesta = (ticket * ticketsAmount).toFixed(2)
    const premio = (ticket * 30).toFixed(2);

    if (count % 2 == 0) { growth = growth - .02 }

    arrAmountPrevius.push(apuesta);
    const invertido = arrAmountPrevius.reduce((previus, now) => Number(previus) + Number(now), 0).toFixed(2);
    const ganancia = (premio - invertido).toFixed(2);

    const message =
        `RONDA ${count} 
        TICKETS (${ticketsAmount}) * ${ticket} Bs. 
        GASTO ${apuesta} Bs. 
        PREMIO ${premio} Bs. - INVERTIDO ${invertido}
        GANANCIA ${ganancia}
    `;
    console.log(message);
    const settingLeverage = { ticketsAmount, initial: initial * growth, growth, nivels, count: ++count }

    return getleverage(settingLeverage);
}
const allShow = async () => {
    const DATA = await getData();
    showWrapper(DATA);
    showPatters(DATA);
    showListFraw(DATA)
    // saveAllObj()

    // pattersPlayGroupA(DATA);

    // const settingLeverage = {
    //     ticketsAmount: 9,
    //     initial:1,
    //     growth:1.8,
    //     nivels: 11,
    //     count:1
    // }

    // getleverage(settingLeverage);

    scrollEnd()
}

const $app = document.getElementById('wrapper-app');
$app.addEventListener('click',(e)=> {
    const id = e.target.id;
    const dataID = e.target.dataset.id;
    const dataSet = e.target.dataset.btn;
    if(dataSet == 'edit'){return readFraw(e)}
    if(dataSet == 'delet')return deleteFraw(dataID);
    if(id == "btn-estimacion"){
        e.preventDefault();
        return saveEstimacion(e)
    }
    if(id == "btn-save"){
        e.preventDefault();
        return saveDoc(dataID);
    }
})

window.addEventListener('DOMContentLoaded', allShow());