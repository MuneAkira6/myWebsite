//获取元素
let displayArea2 = document.getElementById('lunbotu-2');
console.log(displayArea2);
let ul2 = document.getElementById('js_ul2');
console.log(ul2);
console.log('我也是活的！');
let liArray2 = ul2.children;
let left2 = 0;
let presentNumber2 = 1;
let dotsArray2 = document.getElementsByClassName('dots-wrapper')[1];
dotsArray2 = dotsArray2.children;
dotsArray2 = Array.from(dotsArray2);
liArray2[1].id = 'present';//默认第一个在展示
dotsArray2[0].id = 'focused';
// let piancha = 0;

let WIDTH2 = 267;

let newNode2 = liArray2[0].cloneNode(true);
let lastNode2 = liArray2[liArray2.length - 1].cloneNode(true);
ul2.appendChild(newNode2);
// newNode2 = liArray2[liArray2.length - 1].cloneNode(true);
// console.log(lastNode2);
ul2.insertBefore(lastNode2, liArray2[0]);
//更新li数组
liArray2 = ul2.children;
let macLength2 = liArray2.length;
//liArray2 1到length - 2是正常的

//开始先向左移一个
// ul2.style.left = '-500px';
// ul2.style.left = '-775px';
ul2.style.left = -WIDTH2 + 'px';
ul2.offsetHeight;

//点击下一个按钮
function nextBtnClicked2(){
    console.log('2');
    //怎么使transition不穿帮呢？

    // console.log('前');
    // console.log(presentNumber2);
    bangding2(presentNumber2, dotsArray2);
    // console.log(presentNumber2);
    if (presentNumber2 == macLength2 - 1){
        let imaLeft = ul2.offsetLeft;//获取当前的left值
        // let tmpPiancha = 500 - (Math.abs(imaLeft) % 500);//偏差值
        let tmpPiancha = WIDTH2 - (Math.abs(imaLeft) % WIDTH2);
        tmpPiancha = tmpPiancha == WIDTH2 ? 0 : tmpPiancha;
        let tmp = tmpPiancha - WIDTH2;
        ul2.style.transition = "none";//那为什么这个都能赋值成功呢？
        ul2.style.left = tmp.toString() + 'px';

        ul2.offsetHeight;
        presentNumber2 = 1;
        ul2.style.transition = 'all 1s';
    } 
    left2 = ul2.offsetLeft;
    // console.log('此时的left值：');
    // console.log(left);
    presentNumber2++;
    for (let li of liArray2){
        li.id = "";
    }
    liArray2[presentNumber2].id = 'present';//present = 3就表示第4个元素

    //当前的left
    let piancha = WIDTH2 - (Math.abs(left2) % WIDTH2);//偏差值
    piancha = piancha == WIDTH2 ? 0 : piancha;
    // console.log('偏差值');
    // console.log(piancha);
    ul2.style.left = (left2 - WIDTH2 - piancha).toString() + 'px';    
    bangding2(presentNumber2, dotsArray2) 
}

//点击上一个按钮
function prevBtnClicked2(){
    bangding2(presentNumber2, dotsArray2);
    if (presentNumber2 == 0){//鬼鬼，不对劲！
        let imaLeft = ul2.offsetLeft;//获取当前的left值
        let tmpPiancha = Math.abs(imaLeft) % WIDTH2;//偏差值
        // tmpPiancha = tmpPiancha == 500 ? 0 : tmpPiancha;
        let tmp = -(tmpPiancha + (WIDTH2 * 3));

        ul2.style.transition = "none";//那为什么这个都能赋值成功呢？
        ul2.style.left = tmp.toString() + 'px';
        // ul2.style.left = '-2500px';//这样才是回到原点
        ul2.offsetHeight;
        presentNumber2 = 3;
        ul2.style.transition = 'all 1s';
    } 
    left2 = ul2.offsetLeft;
    presentNumber2--;
    for (let li of liArray2){
        li.id = "";
    }
    liArray2[presentNumber2].id = 'present';//present = 3就表示第4个元素
    //绘制动画 用你妈的JS，CSS多优雅
    let piancha = Math.abs(left2) % WIDTH2;//偏差值
    // piancha = piancha == 0 ? 500 : piancha;
    ul2.style.left = (left2 + WIDTH2 + piancha).toString() + 'px';    
    // ul2.style.left = (left + 500).toString() + 'px';    
    bangding2(presentNumber2, dotsArray2) 
}
//将小圆点框与之绑定
function bangding2(number, array){//这个number从零开始
    if (number == macLength2 - 1)
        number = 1;
    if (number == 0)
        number = 3;
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
function swapToThis2(e){
    console.log('e:');
    console.log(e);
    let dotsXuhao = dotsArray2.indexOf(e);//怎么获取当前的dotsxuhao？
    dotsXuhao = parseInt(dotsXuhao);
    dotsXuhao++;
    // console.log('当前的dotsxuhao：' + dotsXuhao);
    dotsXuhao = parseInt(dotsXuhao);//dotsxuhao是number
    let newKyori =  (dotsXuhao * (-WIDTH2)).toString() + 'px';
    // let newKyori = '-1000px'
    ul2.style.left = newKyori;
    bangding2(dotsXuhao, dotsArray2);
    //怎样在鼠标离开以后跳向下一个
    //应该是全局变量的原因
    left2 = parseInt(dotsXuhao) * (-WIDTH2);
    presentNumber2 = dotsXuhao;//使用全局变量确实要小心呀！
}

//设置自动化
let timer2 = setInterval(() => {
    nextBtnClicked2();
}, 1000);
displayArea2.onmouseover = function(){
    clearInterval(timer2);
}
displayArea2.onmouseout = function(){
    timer2 = setInterval(() => {
        nextBtnClicked2();
    }, 1000)
}

