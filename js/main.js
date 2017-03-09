//////// «адание 1 ////////
console.log('\n');
console.log('//////// «адание 1 ////////');
/*
ѕри щелчке мышью на любую клетку доски Ц необходимо писать ее адрес в произвольное место страницы, например, в div. јдрес должен извлекатьс¤ в Ђшахматномї формате. Ќапример: A1, G6 и тп. ѕри этом, ¤чейка, на которую нажали должна помечатьс¤ произвольным образом, например, выделением рамки или другим цветом. ѕри выделении другой ¤чейки, предыдуща¤ должна возвращатьс¤ к первоначальному виду.
Ќаучитьс¤ обрабатывать стрелки клавиатуры таким образом, чтобы активную ¤чейку из предыдущего пункта можно было перемещать по доске. ≈сли ¤чейка выходит за границы таблицы Ц она должна по¤витьс¤ с другой стороны. ѕри перемещении ¤чейки, так же должен извлекатьс¤ ее адрес.
*/
// создаЄм доску
window.stack = [];

function bildCell() {
	var i=1;
	while(i!==10) { // строка
		var rn = crD();
		rn.className = "row";
		rn.innerHTML = " ";
		table.appendChild(rn);
		var j=1;
		while(j!==10) { // ¤чейка
			var cn = crD();
			cn.className = "cell";
			cn.innerHTML = " ";
			// «аполнение строк rn ¤чейками cn 
			if(i==1 && j>=1) { cn.innerHTML = arr[j-1]; }
			if(i>=2 && j==1) { cn.innerHTML = arrN[i-1]; }
			// Ѕелые фигуры
			if(i==8 && j>=2) { cn.innerHTML = arrSw[0]; }
			if(i==9 && j>=2) { cn.innerHTML = arrSw[j-1]; }
			// „ерные фигуры
			if(i==3 && j>=2) { cn.innerHTML = arrSb[0]; }
			if(i==2 && j>=2) { 
				cn.innerHTML = arrSb[j-1];
				// ћен¤ем пор¤док черных фигур у корол¤ и королевы
				if(j==5) { cn.innerHTML = arrSb[j];}
				if(j==6) { cn.innerHTML = arrSb[j-2];
			}
		}
		//  расим нечетные ¤чейки cn 
		rn.appendChild(cn);
		if((j%2 !== 0 && i%2 !== 0) || (j%2 == 0 && i%2 == 0)) { bgColor(i,j,'black'); }
		j++;
	}
	i++;	
}
//  расим всю 1-ю строку и 1-й столбец
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
// ¬ывод координат клика на доске
function bildDisplay(pY,pX) {
	var rn1 = crD(), display = crD();
	display.className = "display";
	display.innerHTML = "»нформаци¤";
	document.body.appendChild(display);
	rn1.className = "displayIn";
	rn1.innerHTML = pY + '' + pX;
	display.appendChild(rn1);
}

// красим ¤чейки
function bgColor(arg1,arg2,arg3) {
	return el.childNodes[1].childNodes[arg1].childNodes[arg2].style.background=arg3;
}
function bgColorRandom(min,max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// —оздать элемент
function crD() { return document.createElement('div'); }

//////////////////  одим //////////////////

var table = crD(), el = document.getElementById('chess'); // 

table.className = "table";
table.innerHTML = "<strong>Chess board - JS</strong>";
el.appendChild(table);

// ћассивы нумерации + фигуры
var arr = [' ','A','B','C','D','E','F','G','H'],
arrN = [' ','1' ,'2' ,'3' ,'4' ,'5' ,'6' ,'7' ,'8' ],
arrSw = ['&#9817;','&#9814;', '&#9816;', '&#9815;', '&#9813;', '&#9812;', '&#9815;', '&#9816;', '&#9814;'],
arrSb = ['&#9823;','&#9820;', '&#9822;', '&#9821;', '&#9819;', '&#9818;', '&#9821;', '&#9822;', '&#9820;'];

// ѕостроить доску с фигурами
bildCell();
var ir1='Ќажмите на любую ¤чейку',
    ir0='';
bildDisplay(ir1,ir0);
// Ћовим клик мышью
el.onclick=function(event) {
	// ¬ыдел¤ем номер строки клика
	ir0 = event.path[1].firstChild.nextElementSibling.innerHTML;
	// ѕодсчитаем кол-во соседий слево от клика
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
		//  расим фон ¤чейки
		function bgColor(arg1,arg2,arg3) {
			return el.childNodes[1].childNodes[arg1].childNodes[arg2].style.background=arg3;
		}
		// ћен¤ем цвет фона ¤чейки на произвольный
		function bgColorRandom(min,max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		
		bgColor(pY,pX,'#' + bgColorRandom(0,255));
		// «апоминаем последнюю ¤чейку клика
		pYpX = [pY,pX];
		

		// if(el.row.cell.prevSibling.style.bg=='white') {el.row.cell.prevSibling.style.bg=='black'} 
	}
	else {
		ir1 = 'Click to the Chess board, please';
		ir0 = '';
	}
	// ѕерестроим Display дл¤ отображени¤ информации с данными из event
	bildDisplay(ir1,ir0);

	
	
//	console.log(pYpX + ' Last cell is: ' + '');
}
function adder() {
	function bgColor(arg1,arg2,arg3) {
		return el.childNodes[1].childNodes[arg1].childNodes[arg2].style.background=arg3;
	}
	function detectSiblingColor(arg1,arg2,arg3) {
// получаем заначение цвета фона справа от кликнутой ¤чейки
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

		//  расим ¤чейку обратно W or B
		detectSiblingColor(stYX[0],stYX[1],'red'); //////////////////////////////////////// откорректировать при помощи alert'ов
////////////		bgColor(stYX[0],stYX[1],'red');

//		arrp.shift(arrp[1]);
//		console.log('4-step',arrp);
	}
//// изучить с практикой addEventListener!
/// ќ„≈–≈ƒ№ -- http://shuvalov.info/2013/03/21/stack-and-queue/
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

//  ѕри выделении другой ¤чейки, предыдуща¤ должна возвращатьс¤ к первоначальному виду.


















