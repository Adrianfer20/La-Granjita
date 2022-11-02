import { db,doc,getCollection, addNewDoc, deleteFraw } from './firebase.js';

const getElement = element => document.getElementById(element);

const getHeightCanvas = () => {
    const heightCanvas = getElement('id-animals').clientHeight;
    return heightCanvas;
}

// const printGroupCanvas = ()=> {
//     const sectionHeight = boxHeight/4;
//     const wrapperNumber = (boxHeight/20)/2;
//     const sectionWidth = $canvas.width
//     ctx.fillStyle = 'rgb(59 69 84 / 50%)';   
//     ctx.fillRect(0, wrapperNumber, sectionWidth, sectionHeight - wrapperNumber*2);

    
//     ctx.fillStyle = 'rgb(34 40 49)';
//     ctx.fillRect(0, sectionHeight - wrapperNumber, sectionWidth, sectionHeight);

//     ctx.fillStyle = 'rgb(59 69 84 / 50%)';
//     ctx.fillRect(0, 2*sectionHeight - wrapperNumber, sectionWidth, sectionHeight);

//     ctx.fillStyle = 'rgb(34 40 49)';
//     ctx.fillRect(0, 3*sectionHeight- wrapperNumber, sectionWidth, sectionHeight- wrapperNumber);
// }

const creatCanvas = (id) => {
    const $canvas = document.createElement('canvas');
    $canvas.className = ''
    $canvas.height = getHeightCanvas()
    $canvas.id = 'canvas-' + id;
    const ctx = $canvas.getContext('2d');
    
    const boxHeight = getElement('id-animals').clientHeight;

  


    for (let index = 0; index <= 37; index++) {
        const y = Math.ceil((boxHeight / 20) / 2) + (Math.ceil((boxHeight / 20) / 2 * index));
        const w = $canvas.width;
        if (index % 2 == 0) {
            //LINEAS IMPARS
            ctx.fillStyle = '#FFD369';
            ctx.fillRect(0, y, w, 1);
        }
        else {
            //LINEAS PARS
            ctx.fillStyle = '#222831';
            ctx.fillRect(0, y, w, 1);
        }
    }
    return $canvas;
}
const creatHeaderBox = (text) => {
    const $div = document.createElement('div');
    $div.className = 'w-full h-8 flex items-center justify-center text-ligth'
    const $h2 = document.createElement('h2');
    $h2.textContent = text;
    $h2.className = 'font-semibold uppercase px-2';

    $div.appendChild($h2)

    return $div;
}
const creatFooterBox = () => {
    const $footer = document.createElement('div');
    $footer.className = 'w-full h-6 grid grid-cols-11';
    $footer.innerHTML = `
                    <span class="col-span-1 text-xs text-center font-semibold p-1 bg-ligth text-dark">9</span>
                    <span class="col-span-1 text-xs text-center font-semibold p-1 bg-ligth text-dark">10</span>
                    <span class="col-span-1 text-xs text-center font-semibold p-1 bg-ligth text-dark">11</span>
                    <span class="col-span-1 text-xs text-center font-semibold p-1 bg-ligth text-dark">12</span>
                    <span class="col-span-1 text-xs text-center font-semibold p-1 bg-ligth text-dark">1</span>
                    <span class="col-span-1 text-xs text-center font-semibold p-1 bg-ligth text-dark">2</span>
                    <span class="col-span-1 text-xs text-center font-semibold p-1 bg-ligth text-dark">3</span>
                    <span class="col-span-1 text-xs text-center font-semibold p-1 bg-ligth text-dark">4</span>
                    <span class="col-span-1 text-xs text-center font-semibold p-1 bg-ligth text-dark">5</span>
                    <span class="col-span-1 text-xs text-center font-semibold p-1 bg-ligth text-dark">6</span>
                    <span class="col-span-1 text-xs text-center font-semibold p-1 bg-ligth text-dark">7</span>
    `;

    return $footer;
}

//Require ID => data.date;
const creatBoxCanvas = (id,text) => {
    const $box = document.createElement('div');
    const classBox = 'w-auto flex flex-col items-center justify-between border-l-4  border-dark';
    $box.className = classBox;

    const $h2 = creatHeaderBox(text);
    const $canvas = creatCanvas(id);
    const $footer = creatFooterBox();


    $box.appendChild($h2)
    $box.appendChild($canvas)
    $box.appendChild($footer);
    return $box;
}

const getCanvas = id => getElement("canvas-"+id);

//Require ID => date.date; WINNER => date.winner;
const creatGraph = (id,winners) => {
    let xAfter;
    let yAfter;
    const $canvas = getCanvas(id);
    const ctx = $canvas.getContext('2d');
    const boxHeight = getElement('id-animals').clientHeight / 20;
    const boxWidth = $canvas.clientWidth / 11;

    winners.forEach((numberAnimal, index) => {
        let positionAnimal;
        if (numberAnimal == '00') { positionAnimal = 0 }
        else { positionAnimal = (Number(numberAnimal) + 1) }
        const y = (boxHeight / 2) + ((boxHeight / 2) * positionAnimal);
        const x = (boxWidth / 2) + (boxWidth * index);

        if (Number(numberAnimal) % 2 == 0 && numberAnimal != '00') {
            //LINEA IMPAR "GRIS"
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, 2 * Math.PI);
            ctx.fillStyle = '#DDDDDD';
            ctx.fill()
        } else {
            //LINEA PAR "AMARILLA"
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, 2 * Math.PI);
            ctx.fillStyle = '#FFD369';
            ctx.fill()

        }

        if (!xAfter) { return xAfter = x, yAfter = y };
        ctx.beginPath();
        ctx.moveTo(xAfter, yAfter);
        ctx.lineTo(x, y);
        ctx.strokeStyle = '#DDD';
        ctx.stroke()
        xAfter = x;
        yAfter = y;
    });
}


//Require arrayWinner = [{ID => date.date; WINNER => date.winner}];
const showGraph = (WINNERS) => {
    WINNERS.forEach(obj => {
        const {id, winners} = obj;
        creatGraph(id, winners);
    });
}


const showPatters = (DATA) => {
    const $wrapperPatters = getElement('wrapper-patters');
    const $frament = new DocumentFragment();
    DATA.forEach(obj => {
        const $box = document.createElement('div');
        $box.className = "flex items-center justify-center bg-ligth text-xs text-dark rounded shadow font-bold py-2 mb-2";
        const $h4 = document.createElement('h4');
        $h4.className = "";
        $h4.textContent = obj.date;
    
        $box.appendChild($h4);
        
        
        const $div = document.createElement('div');
        $div.className = 'w-5/12 max-screen-md grid grid-cols-11 mx-4'
        
        obj.winners.forEach((winner, index) => {
            $div.innerHTML += `<div class="col-span-1 flex flex-col">
            <span class="text-center scale-125">${obj.pattersEmojis[index]}</span>
            <span class="text-center">${obj.pattersLetters[index]}</span>
            <span class="text-center">${winner}</span>
            </div>`
        });
        
        $box.appendChild($div);
        
        const $divCountPatters = document.createElement('div');
        $divCountPatters.className = "";
        $divCountPatters.innerHTML = `
        ${obj.countEmojis.join(", ")}
        <br>
        ${obj.countLetters.join(", ")}
        `;
        
        $box.appendChild($divCountPatters);
        $frament.appendChild($box);
        return
    });

    $wrapperPatters.innerHTML = "";
    $wrapperPatters.appendChild($frament);
}

//Require ID => date.date; WINNER => date.winner;
const showWrapper = (WINNERS) => {
    const $frament = new DocumentFragment();
    WINNERS.forEach(item => {
        const {id,date} = item;
        const $boxGraph = creatBoxCanvas(id,date);
        $frament.appendChild($boxGraph);
    });

    getElement('wrapper-graph').innerHTML = '';
    getElement('wrapper-graph').appendChild($frament);
    showGraph(WINNERS);
}
const readFraw = async (e) => {
    const id = e.target.dataset.id;
    const data = await getCollection('draw');
    const isFraw = data.filter(item => item.id == id)[0];
    if(!isFraw)alert("NO SE AH ENCONTRADO EL ELEMENTO ID: "+id);
    console.log("ELEMENTO ENCONTRADO: ", isFraw);
    const $inputDate = document.getElementById('date');
    $inputDate.value = isFraw.date;
    const $btnEstimacion = document.getElementById('btn-estimacion');
    const $btnSave = document.getElementById('btn-save');
    $btnEstimacion.setAttribute('data-id', id);
    $btnSave.setAttribute('data-id', id);
    const $inputs = document.getElementById('inputs-winners').querySelectorAll("input");
    $inputs.forEach(($input, index)=>{
        const numberFraw = isFraw.winners[index]  || '';
        $input.value = numberFraw;
    })
    // AQUI TRABAJANDO EN EDITAR
}
const creatListFraw = (fraw)=> {
    const $li = document.createElement('li');
        $li.className = "flex items-center justify-between"
        const $h4 = document.createElement('h4');
        $h4.className = "underline";
        $h4.textContent = fraw.date;
        const $div = document.createElement('div');
        $div.className = "w-16 flex items-center justify-around";
        const $buttonEdit = document.createElement('button');
        $buttonEdit.className = "w-6 h-6 bg-no-repeat bg-center p-2";
        $buttonEdit.style.backgroundImage = "url('./img/pen.svg')";
        $buttonEdit.setAttribute('data-btn', "edit");
        $buttonEdit.setAttribute('data-id', fraw.id);
        const $buttonDelet = document.createElement('button');
        $buttonDelet.className = "w-6 h-6 bg-no-repeat bg-center p-2";
        $buttonDelet.style.backgroundImage = "url('./img/times.svg')";
        $buttonDelet.setAttribute('data-btn', "delet");
        $buttonDelet.setAttribute('data-id', fraw.id);
        
       $div.appendChild($buttonEdit);
       $div.appendChild($buttonDelet);

       $li.appendChild($h4);
       $li.appendChild($div);
       return $li;
}
const showListFraw = (DATA)=> {
    const items = DATA.map(({id, date})=> {return {id,date}});
    const $frament = new DocumentFragment();
    const $ul = getElement('list-draw');
    $ul.innerHTML = '';
    items.forEach((item) => {
        const $li = creatListFraw(item);
       $frament.appendChild($li);
    });
    $ul.appendChild($frament);

}
const getFraw = () => {
    const $inputs = document.querySelectorAll('#inputs-winners input');
    const FRAW = [];

    $inputs.forEach(item => {
        if (item.value) {return FRAW.push(item.value);}
    });
    return FRAW;
}

const getDateInput = ()=> {
    let date = document.getElementById('date').value;
    if(!date) return undefined;
    date = date.split("-").join("/");
    return date;
}

const saveDoc = async (id)=> {
    if(id === "ESTIMACION")return alert("Este archivo no se puede guardar");
    const data = await getCollection('draw');
    const res = data.find(obj => obj.id === id);
    
    const getDate = getDateInput();
    const date =  getDate || res.date;
    const FRAW  = getFraw();
    const obj = { date, winners:FRAW}
        await addNewDoc("draw", id, obj);
        alert('SORTEO GUARDADO SADISFACTORIAMENTE');
}

const getDateEstimacion = () => {
    // crea un nuevo objeto `Date`
    var today = new Date();
    // `getDate()` devuelve el día del mes (del 1 al 31)
    var day = today.getDate()+3;
    // `getMonth()` devuelve el mes (de 0 a 11)
    var month = today.getMonth() + 1;
    // `getFullYear()` devuelve el año completo
    var year = today.getFullYear();
    
    // muestra la fecha de hoy en formato `MM/DD/YYYY`
    return `${year}/${month}/${day}`
}
const saveEstimacion = async (e) => {
    const id = e.target.dataset.id;
    console.log(id);
    if(id != "ESTIMACION")return alert("ESTE SORTEO NO SE PUEDE ESTIMAR; VERIFICA.")
    const date = getDateEstimacion();
    const data = await getCollection('draw');
    let isExist = data.filter(item => item.id == id)[0];
    const FRAW  = getFraw();
    const obj = {date, winners:FRAW}
    await addNewDoc("draw", id, obj);
    alert('¡Listo Estimacion Guardada!');
}

export {getElement, showWrapper, showPatters, showListFraw, readFraw,saveDoc, saveEstimacion, deleteFraw};