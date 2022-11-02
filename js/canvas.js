let eje = [];
const creatCanvas = (height, width) => {
    const canvas = document.getElementById('canvas');
    canvas.height = height;
    canvas.width = width;
    return canvas;
}

const printCanvas = (animals) => {
    const heightBox = document.getElementById('box-animals').clientHeight;
    const widthBox = document.querySelector('.box-hours').clientWidth;

    const canvas = creatCanvas(heightBox, widthBox);
    const ctx = canvas.getContext("2d");
    // ctx.fillStyle = "rgb(180, 0, 0)";

    const h = heightBox / 38;
    const w = widthBox / 11;

    // animals.forEach((animal, index)=> {
    //     const px = (index * w);
    //     const py = (animal * h);
    //     ctx.fillRect(px, py, w, h);
    // });

    // const centerX = canvas.width / 2;
    // const centerY = canvas.height / 2;
    const radius = 4;


    animals.forEach((animal, index) => {
        ctx.beginPath();
        ctx.fillStyle = '#bb2121';
        ctx.strokeStyle = '#bb212147';
        ctx.lineWidth = 8;
        const px = (index * w) + 12;
        const py = (animal * h) + 2;

        ctx.arc(px, py, radius, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();

        if (eje.length === 0) return eje = [px, py]

        ctx.lineWidth = 4;
        ctx.lineTo(eje[0], eje[1])
        ctx.lineTo(px, py)
        ctx.stroke()
        eje = [px, py]


    });


}


const showCanvas = () => {
    const arrAnimals = [1, 7, 2, 3, 10, 15, 36, 29, 37, 37, 37]
    printCanvas(arrAnimals)
}

showCanvas()