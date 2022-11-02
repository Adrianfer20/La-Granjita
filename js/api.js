import {getCollection} from "./firebase.js"


const getApi = async () => {
    const data = await getCollection("draw");
    return data;
}

const getPatterLetters = (number) => {
    const isNumber = Number(number);
    if (isNumber <= 7) return "A";
    if (isNumber >= 8 && isNumber <= 18) return "B"
    if (isNumber >= 18 && isNumber <= 27) return "C"
    if (isNumber >= 27 && isNumber <= 36) return "D"
}

const getPatterEmojis = (arrLetterNow, index, arrMain) => {
    const indexBefore = --index;
    const { pattersLetters } = arrMain[indexBefore] || {};
    let letterPreviusArr = '👀';
    if (pattersLetters) letterPreviusArr = pattersLetters.slice(-1)[0]

    const pattersEmojis = arrLetterNow.map((letter, index, arr) => {
        const letterBefore = arrLetterNow[--index] || letterPreviusArr;
        if (letterBefore === '👀') return '👀';

        const arrOrder = [letter, letterBefore].sort();
        if (letter === arrOrder[0]) {
            if (letter != arrOrder[1]) return '📈';
            return '📌';
        }
        return '📉';
    });
    return pattersEmojis;

}

const getcountPatters = ({ pattersLetters, pattersEmojis }) => {
    const lettersA = pattersLetters.filter(letter => letter == "A").length;
    const lettersB = pattersLetters.filter(letter => letter == "B").length;
    const lettersC = pattersLetters.filter(letter => letter == "C").length;
    const lettersD = pattersLetters.filter(letter => letter == "D").length;

    const emojiUp = pattersEmojis.filter(emoji => emoji == "📈").length;
    const emojiYouToo = pattersEmojis.filter(emoji => emoji == "📌").length;
    const emojiDown = pattersEmojis.filter(emoji => emoji == "📉").length;



    const countLetters = ["A" + lettersA, "B" + lettersB, "C" + lettersC, "D" + lettersD];
    const countEmojis = ["📈" + emojiUp, "📌" + emojiYouToo, "📉" + emojiDown];
    return {countEmojis, countLetters}
}

const creatNewData = (API) => {
    let DATA = API.map(({id, winners, date}) => {
        const pattersLetters = winners.map(number => getPatterLetters(number));
        const DATA = { id,winners,date, pattersLetters };
        return DATA
    });

    DATA = DATA.map((obj, index, arr) => {
        const pattersEmojis = getPatterEmojis(obj.pattersLetters, index, arr)
        return { ...obj, pattersEmojis }
    });

    DATA = DATA.map(obj => {
        const countPatters = getcountPatters(obj);
        return {...obj, ...countPatters}
    })

    return DATA;

}

const getData = async () => {
    let API = await getApi();
    API = API.sort(function (a, b) {
        if (a.date > b.date) {
          return 1;
        }
        if (a.date < b.date) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    // const ESTIMACION = { "date": "ESTIMACION", "winners": [2] };
    // API.push(ESTIMACION);
    const DATA = creatNewData(API);
    return DATA;
}


// [
//     {
//         date: '2022/10/08', winners: Array(11), pattersLetters: Array(11), countLetters: Array(4)
//     }
// ]


export { getData }