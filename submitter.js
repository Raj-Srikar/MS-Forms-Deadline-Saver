// Deadline calculator:
var timeOut,hrs,mins,secs,givenHr,givenMin,timeNow,given,now,x,countDown,ok,dlChk,subInps,subTime,timer,timerChk,timerlbl,timerInterval,is30=false,isOk=false;

function DLcheckbox() {
	dlChk = document.getElementById('DLcheckbox');
	timerLbl = document.getElementById('timerLbl');
	subTime = document.getElementById('subTime');
	if(!dlChk.checked){
		timer.innerHTML='-:--:--';
		timerChk.click();
		clearTimeout(timeOut);
		clearInterval(timerInterval);
		x.disabled=true;
		subInps.disabled=true;
		ok.disabled=true;
		timerChk.disabled=true;
		subTime.style.color='#aaa';
		ok.style.backgroundColor='#aaa';
		timerLbl.style.color='#aaa';
	}
	else{
		x.disabled=false;
		subInps.disabled=false;
		ok.disabled=false;
		timerChk.disabled=false;
		subTime.style.color='#000';
		timerLbl.style.color='#000';
		ok.style.backgroundColor='#03787c';
		timer.style.color='#32cd32';
		isOk=false;
	}
}

function tmrCheckbox() {
	timer = document.getElementById('timer');
	if (timerChk.checked){
		timer.style.display = 'block';
	}
	else{
		timer.style.display = 'none';
	}
}

function runTimer() {
	clearInterval(timerInterval);
	timerInterval = setInterval(function(){
		timer = document.getElementById("timer");
		var hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((countDown % (1000 * 60)) / 1000);

		if(minutes<10){minutes='0'+minutes}
		if(seconds<10){seconds='0'+seconds}
		var noHr = minutes + ":" + seconds;
		if(hours==0){timer.innerHTML = noHr}
		else{timer.innerHTML = hours + ":" + noHr}
		if (countDown/1000 < 60 && countDown/1000 > 0 && !is30){
			timer.style.color = 'red';
		}
		else if (countDown/1000 < 60*5 && countDown/1000 > 0 && !is30){
			timer.style.color = 'orange';
		}
		else if (countDown < 0 || is30) {
			timer.style.color = '#32cd32';
			timer.innerHTML = '-:--:--';
			clearInterval(timerInterval);
		}
		else{
			timer.style.color = '#32cd32';
		}
		countDown-=1000;
	},1000);
}

function timing(){
	clearTimeout(timeOut);
	is30=false;
	ok.style.backgroundColor='#000';
	givenHr = x.value.substr(0,2);
	givenMin = x.value.substr(3,5);
	hrs = new Date().getHours();
	mins = new Date().getMinutes();
	secs = new Date().getSeconds();
	timeNow =  hrs + ":" + mins;
	given = new Date(null,null,null,givenHr,givenMin-1,60-subInps.value);
	now = new Date(null,null,null,hrs,mins,secs);
	countDown = given-now;
	if (countDown > 0 && countDown < 30000){
		ok.style.backgroundColor='#03787c';
		alert('Cannot set timer below 30 seconds. Please provide a higher value!');
		isOk=false;
		is30=true;
		return 86400000;
	}
	else if (countDown > 0) {
		return countDown;
	}
	else{
		ok.style.backgroundColor='#03787c';
		alert('INVALID Deadline!');
		clearTimeout(timeOut);
		isOk=false;
		return 86400000;
	}
}


// Identification of unattempted questions:
function isAttempted(qsn) {
	var onPC = qsn.getElementsByClassName('office-form-question-choice');
	var onMobile = qsn.getElementsByClassName('office-form-question-choice-mobile');
	var options=[];
	let mLength = onMobile.length;
	let pcLength = onPC.length;
	if(pcLength != 0){options=onPC}
	else if (mLength != 0){options=onMobile}
	var attempted = false;
	if (pcLength != 0 || mLength != 0) {
		for (var i = 0; i<options.length; i++) {
			var radio = options[i].getElementsByTagName('input');
			var selected = radio[0].ariaChecked == "true";
			attempted = attempted || selected;
			if (attempted) {break;}
		}
		return attempted;
	}
	else{return true;}
}

function unattemptedQs() {
	var questions = document.getElementsByClassName('__question__');
	var unattempted = [];
	let isReq;
	for (var i = 0; i<questions.length; i++) {
		isReq = questions[i].getElementsByClassName('required-star').length;
		if (!isAttempted(questions[i]) && isReq) {
			unattempted[unattempted.length] = questions[i];
		}
	}
	return unattempted;
}


// Action:
function randomSelect(unattempted) {
	for (var i = 0; i < unattempted.length; i++) {
		var onPC =  unattempted[i].getElementsByClassName('office-form-question-choice');
		var onMobile =  unattempted[i].getElementsByClassName('office-form-question-choice-mobile');
		var choice = [];
		if(onPC.length != 0){choice=onPC;}
		else if (onMobile.length != 0){choice=onMobile}
		choice[Math.floor(Math.random()*(choice.length))].click();
	}
}


// Submission:
function clickSubmit() {
	randomSelect(unattemptedQs());
	var button = document.getElementsByClassName('__submit-button__')[0];
	button.click();
	ok.style.backgroundColor='#03787c';
//	console.log(document.getElementById('deadLine').value);
//	console.log(new Date().getHours()+":"+new Date().getMinutes());
//	console.log(hrs+":"+mins+":"+secs);
}

function setTimer() {
	isOk=true;
	timeOut=setTimeout(clickSubmit,timing());
}

// HTML Injection:
function HTMLinjector() {
	var inject = '<div style="padding-top:35px;position:relative;"><div style="padding-left:20px;padding-right:20px;"><div class="question-title-box"><label style="font-weight:NORMAL;margin-left:-10px;"><input type="checkbox" id="DLcheckbox" style="bottom:0;height:18px;margin:auto 0 auto 0;position:absolute;top:0;width:20px;cursor:pointer" checked onclick="DLcheckbox()"><div class="office-form-question-title" style="margin-left:30px;margin-top:2px;cursor:pointer"><span>Deadline:</span></div></label></div><div class="office-form-question-element"><input type="time" id="deadLine" onchange="if(isOk){setTimer();runTimer()}"><br><label style="margin:25px 0 10px;font-weight:NORMAL;"><div style="font-size:14px;margin-top:1px;white-space: normal;margin-left:0px;display:inline;" class="office-form-question-title"><span id="subTime">Submit before:</span></div></label><select id="subInps" style="width:100px;margin-left:5px;border-radius:5px;" onchange="if(isOk){setTimer();runTimer()}"><option value="10">10 seconds</option><option value="20">20 seconds</option><option value="30">30 seconds</option><option value="45">45 seconds</option></select><br><label style="margin:10px 0"><input type="checkbox" checked="" id="timerChk" style="height:12px;position:absolute;width:20px;cursor:pointer;" onclick="tmrCheckbox()"><div style="margin-left:25px;cursor:pointer;font-weight:NORMAL;font-size:14px;margin-top:1px;white-space:normal;" class="office-form-question-title"><span id="timerLbl">SHOW TIMER</span></div></label></div><button id="okButton" class="light-background-button" onclick="setTimer();runTimer();">OK</button></div></div><style type="text/css">#deadLine{background-color:#fff;text-align:center;font-size:15px;height:40px;padding:12px;width:15%}#okButton{margin:10px 0 0 20px;background:#03787c;color:#fff;font-size:15px;height:35px;text-align:center;width:50px}#timer{font-size:60px;top:-50px;color:#32cd32;background-color:black;right:25px;position:fixed;line-height:normal;z-index:1;padding:0 15px;border-radius:15px;font-family:monospace;}@media only screen and (max-width:375px){#deadLine{width:50%}#okButton{margin-left:0px}#timer{top:-35px;font-size:45px;right:10px;padding:0 15px;}}</style>';
	document.getElementsByClassName("office-form-notice-container")[0].innerHTML += inject;
	document.getElementsByClassName("__title__")[0].innerHTML += '<p id="timer">-:--:--</p>'
}

HTMLinjector();

timerChk = document.getElementById('timerChk');
subInps = document.getElementById('subInps');
ok = document.getElementById('okButton');
x = document.getElementById('deadLine');