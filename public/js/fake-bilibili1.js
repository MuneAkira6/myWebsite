//获取元素
let displayArea = document.getElementsByClassName('center-banner')[0];
console.log(displayArea);
let ul = document.getElementById('js_ul');
console.log(ul);
let liArray = ul.children;
let left = 0;
let presentNumber = 1;
let dotsArray = document.getElementsByClassName('dots-wrapper')[0];
dotsArray = dotsArray.children;
dotsArray = Array.from(dotsArray);
liArray[1].id = 'present';//默认第一个在展示
dotsArray[0].id = 'focused';
// let piancha = 0;

let WIDTH = 460;
let newNode = liArray[0].cloneNode(true);
let lastNode = liArray[liArray.length - 1].cloneNode(true);
console.log('我还是活的！');
ul.appendChild(newNode);

ul.insertBefore(lastNode, liArray[0]);
//更新li数组
liArray = ul.children;
let maxLength = liArray.length;

ul.style.left = -WIDTH + 'px';
ul.offsetHeight;

//点击下一个按钮
function nextBtnClicked(){
    //怎么使transition不穿帮呢？
    bangding(presentNumber, dotsArray);
    // console.log(presentNumber);
    if (presentNumber == maxLength - 1){
        let imaLeft = ul.offsetLeft;//获取当前的left值
        // let tmpPiancha = 500 - (Math.abs(imaLeft) % 500);//偏差值
        let tmpPiancha = WIDTH - (Math.abs(imaLeft) % WIDTH);
        tmpPiancha = tmpPiancha == WIDTH ? 0 : tmpPiancha;
        let tmp = tmpPiancha - WIDTH;
        ul.style.transition = "none";
        ul.style.left = tmp.toString() + 'px';

        ul.offsetHeight;//这里调用的意思，难道是让它刷新一下？
        presentNumber = 1;
        ul.style.transition = 'all 1s';
    } 
    left = ul.offsetLeft;
    presentNumber++;
    for (let li of liArray){
        li.id = "";
    }
    liArray[presentNumber].id = 'present';//present = 3就表示第4个元素
    //当前的left
    let piancha = WIDTH - (Math.abs(left) % WIDTH);//偏差值
    piancha = piancha == WIDTH ? 0 : piancha;

    ul.style.left = (left - WIDTH - piancha).toString() + 'px';    
    bangding(presentNumber, dotsArray) 
 
}

//点击上一个按钮
function prevBtnClicked(){
    bangding(presentNumber, dotsArray);
    if (presentNumber == 0){
        let imaLeft = ul.offsetLeft;//获取当前的left值
        let tmpPiancha = Math.abs(imaLeft) % WIDTH;//偏差值
        // tmpPiancha = tmpPiancha == 500 ? 0 : tmpPiancha;
        let tmp = -(tmpPiancha + (WIDTH * 5));////////////

        ul.style.transition = "none";//那为什么这个都能赋值成功呢？
        ul.style.left = tmp.toString() + 'px';
        // ul.style.left = '-2500px';//这样才是回到原点
        ul.offsetHeight;
        presentNumber = 5;
        ul.style.transition = 'all 1s';
    } 
    left = ul.offsetLeft;
    presentNumber--;
    for (let li of liArray){
        li.id = "";
    }
    liArray[presentNumber].id = 'present';//present = 3就表示第4个元素
    let piancha = Math.abs(left) % WIDTH;//偏差值
    // piancha = piancha == 0 ? 500 : piancha;
    ul.style.left = (left + WIDTH + piancha).toString() + 'px';    
    // ul.style.left = (left + 500).toString() + 'px';    
    bangding(presentNumber, dotsArray) 
}
//将小圆点框与之绑定
function bangding(number, array){//这个number从零开始
    if (number == maxLength - 1)
        number = 1;
    if (number == 0)
        number = 5;
    number--;
    //这样number就和dots对应上了
    // console.log('传进数组的number：' + number);
    for (let i of array)
        i.id = '';
    // console.log('number:');
    // console.log(number);
    array[number].id = 'focused';
}


//下一步：点击小圆点可使跳转（难）
function swapToThis(e){
    console.log('e:');
    console.log(e);
    let dotsXuhao = dotsArray.indexOf(e);//怎么获取当前的dotsxuhao？
    dotsXuhao = parseInt(dotsXuhao);
    dotsXuhao++;
    // console.log('当前的dotsxuhao：' + dotsXuhao);
    dotsXuhao = parseInt(dotsXuhao);//dotsxuhao是number
    let newKyori =  (dotsXuhao * (-WIDTH)).toString() + 'px';
    // let newKyori = '-1000px'
    ul.style.left = newKyori;
    bangding(dotsXuhao, dotsArray);
    //怎样在鼠标离开以后跳向下一个
    //应该是全局变量的原因
    left = parseInt(dotsXuhao) * (-WIDTH);
    presentNumber = dotsXuhao;//使用全局变量确实要小心呀！
}

//设置自动化
let timer = setInterval(() => {
    nextBtnClicked();
}, 1000);
displayArea.onmouseover = function(){
    clearInterval(timer);
}
displayArea.onmouseout = function(){
    timer = setInterval(() => {
        nextBtnClicked();
    }, 1000)
}

