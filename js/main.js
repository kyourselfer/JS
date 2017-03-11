//////// Задание 1 ////////
console.log('\n');
console.log('//////// Задание 1 ////////');
/*
При щелчке мышью на любую клетку доски – необходимо писать ее адрес в произвольное место страницы, например, в div. Адрес должен извлекаться в «шахматном» формате. Например: A1, G6 и тп. При этом, ячейка, на которую нажали должна помечаться произвольным образом, например, выделением рамки или другим цветом. При выделении другой ячейки, предыдущая должна возвращаться к первоначальному виду.
Научиться обрабатывать стрелки клавиатуры таким образом, чтобы активную ячейку из предыдущего пункта можно было перемещать по доске. Если ячейка выходит за границы таблицы – она должна появиться с другой стороны. При перемещении ячейки, так же должен извлекаться ее адрес.
*/


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
// фун. возвращения прежнего цвета ячейки доски
function adder() {
//	alert('adder()');
	// подфункции
	function bgColor(arg1,arg2,arg3) {
		return el.childNodes[1].childNodes[arg1].childNodes[arg2].style.background=arg3;
	}
	function detectSiblingColor(arg1,arg2) {
// получаем значение цвета фона справа от кликнутой ячейки
		var rig = el.childNodes[1].childNodes[arg1].childNodes[arg2].nextElementSibling.style.cssText,
			rigPrev = el.childNodes[1].childNodes[arg1].childNodes[arg2].previousElementSibling.style.cssText,
			color='black';
//		console.log('Y & X: ', arg1, ' ', arg2);
//		console.log('previousEl: ', el.childNodes[1].childNodes[arg1].childNodes[arg2].previousElementSibling.style.cssText);
//		console.log('nextEl: ', rig);
		if(rig === 'background: black;' && rigPrev === 'background: black;') {
/////			alert(' NextSibling has Black color ');
			color='white';
			alert('next && prev = black ' + rig + ' ' + rigPrev);
//			el.childNodes[1].childNodes[arg1].childNodes[arg2].previousElementSibling.style.cssText = "background: green;"
		}
		else {
/////			alert(' NextSibling has White color ');
//			el.childNodes[1].childNodes[arg1].childNodes[arg2].previousElementSibling.style.cssText = "background: pink;"
		}
// фун. возвращения прежнего цвета ячейки доски
		return color
	}
	
	// код фун. adder()
//	var stYX=pYpX, c1;
	var stYX=stack[0], c1; // stYX предыдущий клик!!!
	// Добавляем координаты клика в конец массива stack
	stack.push( pYpX ); // pYpX текущий клик!!!
//	alert('pYpX = ' + pYpX + ' stYX = ' + stYX);
	if(stack.length == 1) { // 1-st click
//		console.log('Clicked on pYpX = ',pYpX,'stack.length = ', stack.length,'stack = ',stack);
	}
	else if(stack.length == 2) { // 2-st click
		// Красим ячейку обратно W or B
		c1 = detectSiblingColor(pYpX[0],pYpX[1]); alert('Определим цвет у pYpX ' + pYpX);
		bgColor(stYX[0],stYX[1],c1); alert('Покрасим stYX в c1 ' + stYX + ' в цвет ' + c1);
//		console.log('Clicked on pYpX = ',pYpX,'stack.length = ', stack.length,'stack = ',stack);
		alert('else if ' + stYX[0] + ' ' + stYX[1] + ' ' + c1);
	}
	else {
		stack.shift(); // сдвигаем элементы массива удалив первый элемент массива //////////////////////////////////////////////////////////////// можеть смещение здесь!!!!!!!!!!!! вникнуть
		c1 = detectSiblingColor(pYpX[0],pYpX[1]); alert('Определим цвет у pYpX ' + pYpX);
		bgColor(stYX[0],stYX[1],c1); alert('Покрасим stYX в c1 ' + stYX + ' в цвет ' + c1);
//    	console.log('Clicked on pYpX = ',pYpX,'stack.length = ', stack.length,'stack = ',stack);
		alert('else' + stYX[0] + ' ' + stYX[1] + ' ' + c1);
	}
	console.log('End = ',stack);
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
el.onclick=function(event) {
//	alert('el.onclick(fun(e))');
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
		// фун. покраски фона ячейки
		function bgColor(arg1,arg2,arg3) {
			return el.childNodes[1].childNodes[arg1].childNodes[arg2].style.background=arg3;
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
// Возвращаем прежний цвет ячейки доски предидущего клика
// навешаем СлушателяНаЭлемент el на событие click с исполнением фун. adder
el.addEventListener('click',adder);

// При выделении другой ячейки, предыдущая должна возвращаться к первоначальному виду.


















