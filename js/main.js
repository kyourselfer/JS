/////// создаём доску на JS ///////
// внешний массив в "window" для хранения координат кликов (1-го и 2-го)
window.stack = [];

//// Тело функций ////
// фун. создания элемента div
function crD() { return document.createElement('div'); }
// фун. построить доску и покрасить ячейки
function bildCell() {
	var i=1;
	while(i!==10) { // строка
		var rn = crD();
		rn.className = "row";
		rn.innerHTML = " ";
		table.appendChild(rn);
		var j=1; 
		while(j!==10) { // ячейка
			var cn = crD();
			cn.className = "cell";
			cn.innerHTML = " ";
			// Заполнение строк rn ячейками cn 
			if(i==1 && j>=1) { cn.innerHTML = arr[j-1]; }
			if(i>=2 && j==1) { cn.innerHTML = arrN[i-1]; }
			// Белые фигуры
			if(i==8 && j>=2) { cn.innerHTML = arrSw[0]; }
			if(i==9 && j>=2) { cn.innerHTML = arrSw[j-1]; }
			// Черные фигуры
			if(i==3 && j>=2) { cn.innerHTML = arrSb[0]; }
			if(i==2 && j>=2) { 
				cn.innerHTML = arrSb[j-1];
				// Меняем местами черные фигуры короля и королевы
				if(j==5) { cn.innerHTML = arrSb[j];}
				if(j==6) { cn.innerHTML = arrSb[j-2];}
			}
			// Красим все в белый и нечетные ячейки в черный cn 
			rn.appendChild(cn);
			if((j !== 0 && i !== 0) || (j == 0 && i == 0)) { bgColor(i,j,'white'); }
			if((j%2 !== 0 && i%2 !== 0) || (j%2 == 0 && i%2 == 0)) { bgColor(i,j,'black'); }
			j++;
		}
		i++;
	}
	// Красим всю 1-ю строку и 1-й столбец
	var k=9;
	while(k!==0) {
		var h=k;
		while(h!==0) {
			bgColor(1,k,'white');
			bgColor(h,1,'white');
			h--;
		}
		k--;
	}
}
// фун. вывода координат клика на доске
function bildDisplay(pY,pX) {
	var rn1 = crD(), display = crD();
	display.className = "display";
	display.innerHTML = "Информация";
	document.body.appendChild(display);
	rn1.className = "displayIn";
	rn1.innerHTML = pY + '' + pX;
	display.appendChild(rn1);
}
// фун. покраски ячейки
function bgColor(arg1,arg2,arg3) {
	return el.childNodes[1].childNodes[arg1].childNodes[arg2].style.background=arg3;
}
// фун. генерации случайного цвета
function bgColorRandom(min,max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
// фун. рандомной окраски фона ячейки
function adderClickRandomColor() {
	// Выделяем номер строки клика
	ir0 = event.path[1].firstChild.nextElementSibling.innerHTML;
	// фун. счета кол-ва соседий слева от клика
	function countSib(event) {
		var els = event.path[0].previousElementSibling, counter=0;
		while(els !== null) {
			els = els.previousElementSibling;
			counter++;
		}
		return counter
	}
	
	var ku = countSib(event), i=0, ir1, pX = ku+1, pY = +ir0+1;
	if((ku > 0 && ku < 9) && (ir0 > 0 && ir0 < 9)) {
		while(ku !== i) {
			ir1 = arr[i+1];
			i++;
		}
		// фун. смены цвет фона ячейки на произвольный
		function bgColorRandom(min,max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		
		//// Покрасим ячейку клика произвольным цветом ////
		bgColor(pY,pX,'#' + bgColorRandom(0,255));
		// Запоминаем последнюю ячейку клика
		pYpX = [pY,pX];
	}
	else {
		ir1 = 'Click to the Chess board, please';
		ir0 = '';
	}
	// Выведем на табло данные из event
	bildDisplay(ir1,ir0);
}
// фун. возвращения прежнего цвета ячейки доски
function adderClickReturnColor() {
	// фун. окраски ячейки
	function bgColor(arg1,arg2,arg3) {
		return el.childNodes[1].childNodes[arg1].childNodes[arg2].style.background=arg3;
	}
	// фун. возвращения прежнего цвета ячейки доски
	function detectSiblingColor(arg1,arg2) {
		// 
		var rigNext,rigPrev;
		
		if(arg2 > 2 && arg2 < 9) {
			// получаем значение цвета фона справа от кликнутой ячейки и слево
			rigNext = el.childNodes[1].childNodes[arg1].childNodes[arg2].nextElementSibling.style.cssText,
			rigPrev = el.childNodes[1].childNodes[arg1].childNodes[arg2].previousElementSibling.style.cssText;
			if(rigPrev !== 'background: black;' && rigNext !== 'background: black;') {
				color='black';
			}
			else {
				color='white';
			}
		}
		else if(arg2 == 2) {
			rigNext = el.childNodes[1].childNodes[arg1].childNodes[arg2].nextElementSibling.style.cssText;
			if(arg1 == 2) {
				color='black';
			}
			else if(rigNext == 'background: white;') {
				color='black';
			}
			else if(rigNext == 'background: black;') {
				color='white';
			}
			else {
				rigNext = el.childNodes[1].childNodes[arg1-1].childNodes[arg2].nextElementSibling.style.cssText;
				color = (rigNext == 'background: black;') ? 'black' : 'white';
			}
		}
		else if(arg2 == 9) {
			rigPrev = el.childNodes[1].childNodes[arg1].childNodes[arg2].previousElementSibling.style.cssText;
			if(rigPrev == 'background: white;') {
				color='black';
			}
			else if(rigPrev == 'background: black;') {
				color='white';
			}
			else {
				rigPrev = el.childNodes[1].childNodes[arg1-1].childNodes[arg2].previousElementSibling.style.cssText;
				color = (rigPrev == 'background: black;') ? 'black' : 'white';
			}
		}
		return color
	}
	
	// код фун. adderClick()
	var stYX=stack[0], c1; // stYX предыдущий клик!!!
	// Добавляем координаты клика в конец массива stack
	stack.push( pYpX ); // pYpX текущий клик!!!
	if(stack.length == 1) {  }
	else if(stack.length == 2) {
		// Красим ячейку обратно W or B
		c1 = detectSiblingColor(stYX[0],stYX[1]);
		bgColor(stYX[0],stYX[1],c1);
	}
	else {
		stack.shift(); // сдвигаем элементы массива удалив первый элемент массива
		stYX=stack[0];
		c1 = detectSiblingColor(stYX[0],stYX[1]);
		bgColor(stYX[0],stYX[1],c1);
	}
}
// ловим нажатие 
function adderKey() {
	// подфункции
	// фун. возвращения прежнего цвета ячейки доски
	function detectSiblingColor(arg1,arg2) {
		// 
		var rigNext,rigPrev;
		
		if(arg2 > 2 && arg2 < 9) {
			rigNext = el.childNodes[1].childNodes[arg1].childNodes[arg2].nextElementSibling.style.cssText,
			rigPrev = el.childNodes[1].childNodes[arg1].childNodes[arg2].previousElementSibling.style.cssText;

			if(rigPrev !== 'background: black;' && rigNext !== 'background: black;') { color='black'; }
			else { color='white'; }
		}
		else if(arg1 == 1) { color='white'; }
		else if(arg2 == 2) {
			rigNext = el.childNodes[1].childNodes[arg1].childNodes[arg2].nextElementSibling.style.cssText;
			if(arg1 == 2) {	color='black'; }
			else if(rigNext == 'background: white;') { color='black'; }
			else if(rigNext == 'background: black;') { color='white'; }
			else {
				rigNext = el.childNodes[1].childNodes[arg1-1].childNodes[arg2].nextElementSibling.style.cssText;
				color = (rigNext == 'background: black;') ? 'black' : 'white';
			}
		}
		else if(arg2 == 9) {
			rigPrev = el.childNodes[1].childNodes[arg1].childNodes[arg2].previousElementSibling.style.cssText;
			if(rigPrev == 'background: white;') { color='black'; }
			else if(rigPrev == 'background: black;') { color='white'; }
			else {
				rigPrev = el.childNodes[1].childNodes[arg1-1].childNodes[arg2].previousElementSibling.style.cssText;
				color = (rigPrev == 'background: black;') ? 'black' : 'white';
			}
		}
		return color
	}
	// код фун. adderKey()
	var stYX=stack[0],
		rc = '#' + bgColorRandom(0,255);
			
	if (event.key == 'ArrowDown') { // спуститься на одну ячейку по Y
		if( pYpX[0] !== 9 ) {
			pYpX[0] = pYpX[0] + 1;
			bgColor(pYpX[0],pYpX[1],rc);
			stack.push( pYpX ); // добавляем в stack массив pYpX текущие нажатие
			stack.shift(); // сдвигаем элементы массива удалив первый элемент массива
			c1 = detectSiblingColor(pYpX[0] - 1,pYpX[1]);
			bgColor(pYpX[0] - 1,pYpX[1],c1);
		}
		else {
			pYpX[0] = 2;
			c1 = detectSiblingColor(pYpX[0] + 7,pYpX[1]);
			bgColor(pYpX[0],pYpX[1],rc);
			bgColor(pYpX[0] + 7,pYpX[1],c1);
		}
    }
    else if(event.key == 'ArrowUp') { // подняться на одну ячейку по Y
    	if( pYpX[0] !== 2 ) {
   		    pYpX[0] = pYpX[0] - 1;
    	   	bgColor(pYpX[0],pYpX[1],rc);
			stack.push( pYpX );
			stack.shift();
			if( pYpX[0] !== 9 ) {
				c1 = detectSiblingColor(pYpX[0] + 1,pYpX[1]);
				bgColor(pYpX[0] + 1,pYpX[1],c1);
			}
			else {
				c1 = detectSiblingColor(pYpX[0] - 1,pYpX[1]);
				bgColor(pYpX[0] - 1,pYpX[1],c1)
			}
		}
		else {
			pYpX[0] = 9;
			c1 = detectSiblingColor(pYpX[0] - 7,pYpX[1]);
			bgColor(pYpX[0],pYpX[1],rc);
			bgColor(pYpX[0] - 7,pYpX[1],c1);
		}
    }
    else if(event.key == 'ArrowRight') { // Сдвинуться на одну ячейку вправо
    	if( pYpX[1] !== 9 ) {
	    	pYpX[1] = pYpX[1] + 1;
	    	bgColor(pYpX[0],pYpX[1],rc);
			stack.push( pYpX ); 
			stack.shift();
			c1 = detectSiblingColor(pYpX[0],pYpX[1] - 1);
			bgColor(pYpX[0],pYpX[1] - 1,c1);
		}
		else {
			pYpX[1] = 2;
			c1 = detectSiblingColor(pYpX[0],pYpX[1] + 7);
			bgColor(pYpX[0],pYpX[1],rc);
			bgColor(pYpX[0],pYpX[1] + 7,c1);
		}
    }
    else if(event.key == 'ArrowLeft') { // Сдвинуться на одну ячейку влево
    	if( pYpX[1] !== 2 ) {
   		    pYpX[1] = pYpX[1] - 1;
    	   	bgColor(pYpX[0],pYpX[1],rc);
			stack.push( pYpX );
			stack.shift();
			if( pYpX[1] !== 9 ) {
				c1 = detectSiblingColor(pYpX[0],pYpX[1] + 1);
				bgColor(pYpX[0],pYpX[1] + 1,c1);
			}
			else {
				c1 = detectSiblingColor(pYpX[0],pYpX[1] - 1);
				bgColor(pYpX[0],pYpX[1] - 1,c1)
			}
		}
		else {
			pYpX[1] = 9;
			c1 = detectSiblingColor(pYpX[0],pYpX[1] - 7);
			bgColor(pYpX[0],pYpX[1],rc);
			bgColor(pYpX[0],pYpX[1] - 7,c1);
		}
    }
    else { bildDisplay('Нажата не верная кнопка, нажмите на одну из стрелок, пожалуйста',''); }
}


////////////////// Тело кода //////////////////
var table = crD(),
	el = document.getElementById('chess'),
	// Массивы нумерация + фигуры
	arr = [' ','A','B','C','D','E','F','G','H'],
	arrN = [' ','1' ,'2' ,'3' ,'4' ,'5' ,'6' ,'7' ,'8' ],
	arrSw = ['&#9817;','&#9814;', '&#9816;', '&#9815;', '&#9813;', '&#9812;', '&#9815;', '&#9816;', '&#9814;'],
	arrSb = ['&#9823;','&#9820;', '&#9822;', '&#9821;', '&#9819;', '&#9818;', '&#9821;', '&#9822;', '&#9820;'];
// Создаём div table в div с id=="chess"
table.className = "table";
table.innerHTML = "<strong>Chess board - JS</strong>";
el.appendChild(table);
//// Построить доску с фигурами ////
bildCell();
//// Построить информационное табло ////
bildDisplay('Нажмите на любую ячейку','');
// Слушаем клик мышью и красим фон ячейки в произвольный цвет

// Возвращаем прежний цвет ячейки доски предидущего клика
// подключим СлушателяНаЭлемент el на событие click с исполнением фун. adderClickPaint
el.addEventListener('click',adderClickRandomColor);
el.addEventListener('click',adderClickReturnColor);
// подключим СлушателяНаЭлемент el на событие keydown с исполнением фун. adderKey
document.addEventListener('keydown',adderKey);
















