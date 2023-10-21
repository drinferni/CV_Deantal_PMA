var numItems = 4;

var countHandler = [];

for (var i = 0; i < numItems; ++i) {
    countHandler[i]=0;
}
for (var i = 0; i < numItems; ++i) {
    countHandler[i]=0;
}

console.log(countHandler);


var mode =1

var button = document.getElementsByClassName('darkMode')
button[0].onclick = function () {
    if (mode===1) mode=-1
    else mode=1
    set (mode)
}
console.log(mode)

var color_1
var color_2

function set (mode) {

if (mode===1 ) {
    document.body.style.backgroundColor = 'white'
    document.body.style.color = 'black'
    color_1 = '#e2ffb9'
    color_2 = '#ffe95e'
    var image = document.getElementsByClassName('toggle')
    image[0].src = '1.jpg'
}
else {
    document.body.style.backgroundColor = '#333'
    document.body.style.color = '#f0ff07'
    color_1 = '#191970'
    color_2 = '#2F4F4F'
    var image = document.getElementsByClassName('toggle')
    image[0].src = '2.jpg'
}

for (var i=0;i<numItems;++i) {
    var b = document.getElementsByClassName('a'+i)
    if(countHandler[i]%2 === 0) {
        b[0].style.backgroundColor = color_1
    }
    else {
        b[0].style.backgroundColor = color_2
    }
}
}

async function rotate(classname) {
    set(mode)
    var a = document.getElementsByClassName(classname);
    var b = classname[1];

    if (countHandler[b] % 2 == 0) {
        a[0].style.backgroundColor = color_1;

    let p1 = new Promise((resolve) => {
        var degree = 0;
        let interval1 = setInterval(function () {
            a[0].style.transform = 'rotate(' + degree + 'deg)';
            degree += 5;
            //console.log(degree)
            if (degree > 180) {
                clearInterval(interval1);
                resolve(1);
            }
        }, 10);
    });

    await p1;
} else {
    a[0].style.backgroundColor = color_2;


    let p2 = new Promise((resolve) => {
        var degree = 180;
        let interval2 = setInterval(function () {
            a[0].style.transform = 'rotate(' + degree + 'deg)';
            degree -= 5;
           // console.log(degree)
            if (degree < 0) {
                clearInterval(interval2);
                resolve(2);
            }
        }, 10);
    });

    await p2;
}
}

async function solve(className) {
    var a = document.getElementsByClassName(className);
    var index = className[1];
    var string = "error";
    if (countHandler[index] % 2 === 0) {
        string = await new Promise((resolve) => {
            let p = fetch('https://official-joke-api.appspot.com/random_joke?timestamp=' + Date.now());
            p.then((value) => value.json()).then((data) => {
                var ans = data['setup'] + '\n' + data['punchline'];
                resolve(ans);
            });
        });
    } else {
        string = await new Promise((resolve) => {
            let p = fetch('https://api.quotable.io/random?timestamp=' + Date.now());
            p.then((value) => value.json()).then((data) => {
                var ans = data['content'] + '\n' + data['author'];
                resolve(ans);
            });
        });
    }

   
    var element = document.getElementsByClassName(className);
    var toRemove = element[0].firstChild
    if (toRemove) element[0].removeChild(toRemove)

    let p3 = new Promise((resolve) => {
        resolve(1);
    }).then(() => rotate(className)).then ( () => {
        if (countHandler[index] % 2 === 1) {
            var toAdd = document.createElement('p')
        var text = document.createTextNode(string)
        toAdd.appendChild(text)
        element[0].appendChild(toAdd)
        element[0].style.display = 'flex'
        element[0].style.alignItems = 'center'
        element[0].style.alignContent = 'center'
        element[0].style.justifyContent = 'center'
        }
        else {
        var toAdd = document.createElement('p')
        var text = document.createTextNode(string)
        toAdd.appendChild(text)
        toAdd.style.transform = 'rotate(180deg)'
        element[0].appendChild(toAdd)
        element[0].style.display = 'flex'
        element[0].style.alignItems = 'center'
        element[0].style.alignContent = 'center'
        element[0].style.justifyContent = 'center'
        }
    }
    
    
    )
    countHandler[index] += 1
}

var audioPlayer = document.getElementById('audio');

var para = document.createElement('p');
para.style.display = 'grid';
para.style.gridTemplateColumns = '1fr 1fr 1fr 1fr';
para.style.gridTemplateRow = '1fr 1fr 1fr';
para.style.alignSelf = 'center';
para.style.alignContent = 'center';
para.style.alignItems = 'center';
para.style.justifyContent = 'center';

for (var i = 0; i < numItems; ++i) {
    var b = document.createElement('div');
    var toAdd = document.createTextNode('');
    b.appendChild(toAdd);
    b.style.backgroundColor = '#e2ffb9'
    b.style.borderRadius = '20px'
    b.style.display = 'flex'
    b.style.alignItems = 'center'
    b.style.alignContent = 'center'
    b.className = 'a' + i;
    b.style.border = '5px ridge #fa9502';
    b.style.margin = '10px';
    b.style.height = '25vh';
    b.style.boxShadow= '3px 3px 3px 3px #888888'
    b.onclick = function () {
        var class_id = this.getAttribute('class');
        solve(class_id);
        audioPlayer.play();
    };
    para.appendChild(b);
    solve('a' + i);
}

var a = document.getElementsByClassName('toAddBeforeIt');
document.body.insertBefore(para, a[0]);


