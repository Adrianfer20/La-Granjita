import { getCollection, addNewDoc } from "./firebase.js";
import { getElement } from "./ui.js";
const $wrapperApp = getElement('wrapper-app');

const isVerifyDraw = (e)=> {
    const $date = getElement('date');
    const isDate = $date.value;
    if(!isDate) return alert('¡FALTA INGRESAR LA FECHA!');

    
    const $inputs =  $wrapperApp.querySelectorAll('#inputs-winners input');
    const inpusLength = $inputs.length;
    const winners = [];

    for (let index = 0; index < inpusLength; index++) {
        const input = $inputs[index];
        const isValue = input.value;
        if(!isValue){return alert("DEBE DE INGRESAR TODOS LOS SORTEOS");}
        if(Number(isValue) < 0 || Number(isValue)  > 36){return alert("!DEBE DE INGRESAR VALORES ENTRE 0 a 36¡")}
        if(isValue === '00'){winners.push('00'); continue}
        winners.push(isValue);
    }
    const obj = {
        date: isDate,
        winners
    }
    return obj;
}

const saveWinners = async ()=>{
    const obj = isVerifyDraw();
    if(!obj) return alert("NO SE PUEDE GUARDAR SORTEO; FALTA INFORMACION.");
    const data = await getCollection('draw');
    const isExist = data.filter(item => item.date == obj.date);
    //EDITAR
    console.log(isExist);
    if(isExist) {
        addNewDoc("draw", isExist[0].id, obj);
    }else{

    }
    // addWinners('draw', obj);
}
const eventClickForm = (e) => {
    // const id = e.target.id; 
    // if(id === 'btn-save'){
    //     e.preventDefault();
    //     saveWinners()
    // }
}


$wrapperApp.addEventListener('click', (e)=>eventClickForm(e));