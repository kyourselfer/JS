//////// Задание 1 ////////
console.log('\n');
console.log('//////// Задание 1 ////////');
/*
При щелчке мышью на любую клетку доски – необходимо писать ее адрес в произвольное место страницы, например, в div. Адрес должен извлекаться в «шахматном» формате. Например: A1, G6 и тп. При этом, ячейка, на которую нажали должна помечаться произвольным образом, например, выделением рамки или другим цветом. При выделении другой ячейки, предыдущая должна возвращаться к первоначальному виду.
Научиться обрабатывать стрелки клавиатуры таким образом, чтобы активную ячейку из предыдущего пункта можно было перемещать по доске. Если ячейка выходит за границы таблицы – она должна появиться с другой стороны. При перемещении ячейки, так же должен извлекаться ее адрес.
*/
// создаём доску
window.stack = [];

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
				// Меняем порядок черных фигур у короля и королевы
				if(j==5) { cn.innerHTML = arrSb[j];}
				if(j==6) { cn.innerHTML = arrSb[j-2];
			}
		}
		// Красим нечетные ячейки cn 
		rn.appendChild(cn);
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
// Вывод координат клика на доске
function bildDisplay(pY,pX) {
	var rn1 = crD(), display = crD();
	display.className = "display";
	display.innerHTML = "Информация";
	document.body.appendChild(display);
	rn1.className = "displayIn";
	rn1.innerHTML = pY + '' + pX;
	display.appendChild(rn1);
}

// красим ячейки
function bgColor(arg1,arg2,arg3) {
	return el.childNodes[1].childNodes[arg1].childNodes[arg2].style.background=arg3;
}
function bgColorRandom(min,max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Создать элемент
function crD() { return document.createElement('div'); }

////////////////// Кодим //////////////////

var table = crD(), el = document.getElementById('chess'); // 

table.className = "table";
table.innerHTML = "<strong>Chess board - JS</strong>";
el.appendChild(table);

// Массивы нумерации + фигуры
var arr = [' ','A','B','C','D','E','F','G','H'],
arrN = [' ','1' ,'2' ,'3' ,'4' ,'5' ,'6' ,'7' ,'8' ],
arrSw = ['&#9817;','&#9814;', '&#9816;', '&#9815;', '&#9813;', '&#9812;', '&#9815;', '&#9816;', '&#9814;'],
arrSb = ['&#9823;','&#9820;', '&#9822;', '&#9821;', '&#9819;', '&#9818;', '&#9821;', '&#9822;', '&#9820;'];

// Построить доску с фигурами
bildCell();
var ir1='Нажмите на любую ячейку',
    ir0='';
bildDisplay(ir1,ir0);
// Ловим клик мышью
el.onclick=function(event) {
	// Выделяем номер строки клика
	ir0 = event.path[1].firstChild.nextElementSibling.innerHTML;
	// Подсчитаем кол-во соседий слево от клика
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
		// Красим фон ячейки
		function bgColor(arg1,arg2,arg3) {
			return el.childNodes[1].childNodes[arg1].childNodes[arg2].style.background=arg3;
		}
		// Меняем цвет фона ячейки на произвольный
		function bgColorRandom(min,max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		
		bgColor(pY,pX,'#' + bgColorRandom(0,255));
		// Запоминаем последнюю ячейку клика
		pYpX = [pY,pX];
		

		// if(el.row.cell.prevSibling.style.bg=='white') {el.row.cell.prevSibling.style.bg=='black'} 
	}
	else {
		ir1 = 'Click to the Chess board, please';
		ir0 = '';
	}
	// Перестроим Display для отображения информации с данными из event
	bildDisplay(ir1,ir0);

	
	
//	console.log(pYpX + ' Last cell is: ' + '');
}
function adder() {
	function bgColor(arg1,arg2,arg3) {
		return el.childNodes[1].childNodes[arg1].childNodes[arg2].style.background=arg3;
	}
	function detectSiblingColor(arg1,arg2,arg3) {
// получаем заначение цвета фона справа от кликнутой ячейки
		var rig = el.childNodes[1].childNodes[arg1].childNodes[arg2].nextElementSibling.style.cssText;
		console.log('Y & X: ', arg1, ' ', arg2);
		console.log('previousEl: ', el.childNodes[1].childNodes[arg1].childNodes[arg2].previousElementSibling.style.cssText);
		console.log('nextEl: ', rig);

		if(rig === 'background: black;') {
//			alert(' NextSiblin has Black color ');
			el.childNodes[1].childNodes[arg1].childNodes[arg2].previousElementSibling.style.cssText = "background: green;"
		}
		else {
//			alert(' NextSiblin has White color ');
			el.childNodes[1].childNodes[arg1].childNodes[arg2].previousElementSibling.style.cssText = "background: pink;"
		}
//		alert(rig);
//		return arg3
	}
	var stYX=stack[0];
	stack.push( pYpX );
	if(stack.length == 1) { // 1-st click
//		console.log('1-step', stack, pYpX);
	}
	else if(stack.length >= 2) { // 2-st click
//		console.log('2-step',stack, pYpX,'\nstack[0]',stack[0]);		

		// Красим ячейку обратно W or B
		detectSiblingColor(stYX[0],stYX[1],'red'); //////////////////////////////////////// откорректировать при помощи alert'ов
////////////		bgColor(stYX[0],stYX[1],'red');

//		arrp.shift(arrp[1]);
//		console.log('4-step',arrp); 
	}
//// изучить с практикой addEventListener!
/// ОЧЕРЕДЬ -- http://shuvalov.info/2013/03/21/stack-and-queue/
//	}
	else {
		detectSiblingColor(stYX[0],stYX[1],'red'); //////////////////////////////////////// откорректировать при помощи alert'ов
		stack.shift();
		console.log('\nwrong length\n', pYpX);
//		alert(stack[0],stack[1]);
		var stYX=stack[0];
////////////		bgColor(stYX[0],stYX[1],'red');
	}
	console.log('End = ',stack);
//	alert(stack);
//	console.log(pYpXlast + ' ' + pYpX);
}


el.addEventListener('click',adder);



//console.log(aaa);

/*var i=0, pYpXlast =[];
for(i; i<=1; i++) {
	pYpXlast.push(i);
}
console.log(pYpXlast);*/

//  При выделении другой ячейки, предыдущая должна возвращаться к первоначальному виду.


















