//////// ������� 1 ////////
console.log('\n');
console.log('//////// ������� 1 ////////');
/*
��� ������ ����� �� ����� ������ ����� � ���������� ������ �� ����� � ������������ ����� ��������, ��������, � div. ����� ������ ����������� � ���������� �������. ��������: A1, G6 � ��. ��� ����, ������, �� ������� ������ ������ ���������� ������������ �������, ��������, ���������� ����� ��� ������ ������. ��� ��������� ������ ������, ���������� ������ ������������ � ��������������� ����.
��������� ������������ ������� ���������� ����� �������, ����� �������� ������ �� ����������� ������ ����� ���� ���������� �� �����. ���� ������ ������� �� ������� ������� � ��� ������ ��������� � ������ �������. ��� ����������� ������, ��� �� ������ ����������� �� �����.
*/
// ������ �����
window.stack = [];

function bildCell() {
	var i=1;
	while(i!==10) { // ������
		var rn = crD();
		rn.className = "row";
		rn.innerHTML = " ";
		table.appendChild(rn);
		var j=1;
		while(j!==10) { // ������
			var cn = crD();
			cn.className = "cell";
			cn.innerHTML = " ";
			// ���������� ����� rn �������� cn 
			if(i==1 && j>=1) { cn.innerHTML = arr[j-1]; }
			if(i>=2 && j==1) { cn.innerHTML = arrN[i-1]; }
			// ����� ������
			if(i==8 && j>=2) { cn.innerHTML = arrSw[0]; }
			if(i==9 && j>=2) { cn.innerHTML = arrSw[j-1]; }
			// ������ ������
			if(i==3 && j>=2) { cn.innerHTML = arrSb[0]; }
			if(i==2 && j>=2) { 
				cn.innerHTML = arrSb[j-1];
				// ������ ������� ������ ����� � ������ � ��������
				if(j==5) { cn.innerHTML = arrSb[j];}
				if(j==6) { cn.innerHTML = arrSb[j-2];
			}
		}
		// ������ �������� ������ cn 
		rn.appendChild(cn);
		if((j%2 !== 0 && i%2 !== 0) || (j%2 == 0 && i%2 == 0)) { bgColor(i,j,'black'); }
		j++;
	}
	i++;	
}
// ������ ��� 1-� ������ � 1-� �������
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
// ����� ��������� ����� �� �����
function bildDisplay(pY,pX) {
	var rn1 = crD(), display = crD();
	display.className = "display";
	display.innerHTML = "����������";
	document.body.appendChild(display);
	rn1.className = "displayIn";
	rn1.innerHTML = pY + '' + pX;
	display.appendChild(rn1);
}

// ������ ������
function bgColor(arg1,arg2,arg3) {
	return el.childNodes[1].childNodes[arg1].childNodes[arg2].style.background=arg3;
}
function bgColorRandom(min,max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ������� �������
function crD() { return document.createElement('div'); }

////////////////// ����� //////////////////

var table = crD(), el = document.getElementById('chess'); // 

table.className = "table";
table.innerHTML = "<strong>Chess board - JS</strong>";
el.appendChild(table);

// ������� ��������� + ������
var arr = [' ','A','B','C','D','E','F','G','H'],
arrN = [' ','1' ,'2' ,'3' ,'4' ,'5' ,'6' ,'7' ,'8' ],
arrSw = ['&#9817;','&#9814;', '&#9816;', '&#9815;', '&#9813;', '&#9812;', '&#9815;', '&#9816;', '&#9814;'],
arrSb = ['&#9823;','&#9820;', '&#9822;', '&#9821;', '&#9819;', '&#9818;', '&#9821;', '&#9822;', '&#9820;'];

// ��������� ����� � ��������
bildCell();
var ir1='������� �� ����� ������',
    ir0='';
bildDisplay(ir1,ir0);
// ����� ���� �����
el.onclick=function(event) {
	// �������� ����� ������ �����
	ir0 = event.path[1].firstChild.nextElementSibling.innerHTML;
	// ���������� ���-�� ������� ����� �� �����
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
		// ������ ��� ������
		function bgColor(arg1,arg2,arg3) {
			return el.childNodes[1].childNodes[arg1].childNodes[arg2].style.background=arg3;
		}
		// ������ ���� ���� ������ �� ������������
		function bgColorRandom(min,max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		
		bgColor(pY,pX,'#' + bgColorRandom(0,255));
		// ���������� ��������� ������ �����
		pYpX = [pY,pX];
		

		// if(el.row.cell.prevSibling.style.bg=='white') {el.row.cell.prevSibling.style.bg=='black'} 
	}
	else {
		ir1 = 'Click to the Chess board, please';
		ir0 = '';
	}
	// ���������� Display ��� ����������� ���������� � ������� �� event
	bildDisplay(ir1,ir0);

	
	
//	console.log(pYpX + ' Last cell is: ' + '');
}
function adder() {
	function bgColor(arg1,arg2,arg3) {
		return el.childNodes[1].childNodes[arg1].childNodes[arg2].style.background=arg3;
	}
	function detectSiblingColor(arg1,arg2,arg3) {
// �������� ��������� ����� ���� ������ �� ��������� ������
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

		// ������ ������ ������� W or B
		detectSiblingColor(stYX[0],stYX[1],'red'); //////////////////////////////////////// ���������������� ��� ������ alert'��
////////////		bgColor(stYX[0],stYX[1],'red');

//		arrp.shift(arrp[1]);
//		console.log('4-step',arrp);
	}
//// ������� � ��������� addEventListener!
/// ������� -- http://shuvalov.info/2013/03/21/stack-and-queue/
//	}
	else {
		detectSiblingColor(stYX[0],stYX[1],'red'); //////////////////////////////////////// ���������������� ��� ������ alert'��
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

//  ��� ��������� ������ ������, ���������� ������ ������������ � ��������������� ����.


















