const table = document.getElementById('table')
const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
const colors = ['White','Silver','Red','Maroon','Olive','Lime','Green','Aqua','Teal','Blue','Navy','Fuchsia','Purple']
let prev;
let objects = []

function startGame(){
    let gameSet = randomize(array)
    for(let i = 0; i<=15;i++){
        if(i==0){
            table.innerHTML += `<div class="spanner">`
        }
        if([4, 8, 12].includes(i)){
            table.innerHTML += `</div>
            <div class="spanner">`
        }
        
        table.innerHTML += `<canvas id="${gameSet[i]}" width="100px" height="100px">`
        generateCanvas(gameSet[i])
    }
}

function randomize(array){
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
}

function convertCanvasToImage(canvas) {
	var image = new Image();
	image.src = canvas.toDataURL("image/png");
	return image;
}

function generateCanvas(canvas){
    let cnvs = document.getElementById(canvas)
    let ctx = cnvs.getContext('2d')
    let rdmColor = colors[Math.floor(Math.random() * colors.length)]
    rdmColor = rdmColor === prev? colors[colors.indexOf(rdmColor) + 1] : rdmColor 
    
    if(canvas == 0){
        ctx.fillStyle = 'orange'
        ctx.fillRect(0, 0, 100, 100)
    }else{
        ctx.fillStyle = rdmColor
        ctx.fillRect(0, 0, 100, 100)
        ctx.fillStyle = ['Navy', 'Purple', 'Blue'].includes(rdmColor)? 'white' : 'black'
        ctx.font = "bold 25px Arial"
        ctx.textAlign = 'center';
        ctx.fillText(canvas, cnvs.width/2, (cnvs.height/2) +12.5)    
    }

    let img = convertCanvasToImage(document.getElementById(canvas))

    objects.push({id: canvas, img: img.src})
    cnvs.remove()
    prev = rdmColor
    table.innerHTML += `<img src="${img.src}" id="${canvas}">`
}

window.onload = () =>{
    startGame()

    for(let i = 1; i<=14; i++){
        let img = document.getElementById(i);
    
        img.onclick = () =>{
            move(i)
        }
    }
    
}

function genWorld() {
    table.innerHTML = ''
    let i = 0;
    objects.forEach(obj=>{
        if(i==0){
            table.innerHTML += `<div class="spanner">`
        }
        if([4, 8, 12].includes(i)){
            table.innerHTML += `</div>
            <div class="spanner">`
        }
        
        table.innerHTML += `<img src="${obj.img}" id="${obj.id}">`
        i++
    })
}

function move(i){
    let obj = objects[i]
 
    let n=0;
    let voidPos;
    objects.forEach(o=>{
        if(o.id == 0){
            return voidPos = n
        }
        n++
    });


    let v = objects[voidPos];
    objects[voidPos] = {id: obj.id, img: obj.img}
    objects[i] = v

    genWorld();
}