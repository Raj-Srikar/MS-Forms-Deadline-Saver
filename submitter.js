// Deadline calculator:
var timeOut,hrs,mins,secs,givenHr,givenMin,timeNow,given,now,x,countDown,ok,dlChk,subInps,subTime,isOk=false;

function DLcheckbox() {
	dlChk = document.getElementById('DLcheckbox');
	if(!dlChk.checked){
		clearTimeout(timeOut);
		x.disabled=true;
		subInps.disabled=true;
		ok.disabled=true;
		subTime.style.color='#aaa';
		ok.style.backgroundColor='#aaa';
	}
	else{
		x.disabled=false;
		subInps.disabled=false;
		ok.disabled=false;
		subTime.style.color='#000';
		ok.style.backgroundColor='#03787c';
		isOk=false;
	}
}

function timing() {
	clearTimeout(timeOut);
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
	if (countDown > 0) {
		return countDown;
	}
	else{
		ok.style.backgroundColor='#03787c';
		alert('INVALID Deadline!');
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
	var notice = document.getElementsByClassName("office-form-notice-container");
	var inject = '<div style="padding-top:35px;position:relative;"><div style="padding-left:20px;padding-right:20px;"><div class="question-title-box"><label style="font-weight:NORMAL;margin-left:-10px;"><input type="checkbox" id="DLcheckbox" style="bottom:0;height:18px;margin:auto 0 auto 0;position:absolute;top:0;width:20px;cursor:pointer" checked onclick="DLcheckbox()"><div class="office-form-question-title" style="margin-left:30px;margin-top:2px;cursor:pointer"><span>Deadline:</span></div></label></div><div class="office-form-question-element"><input type="time" id="deadLine" onchange="if(isOk)setTimer()"><br><label style="margin:25px 0 10px;font-weight:NORMAL;"><div style="font-size:14px;margin-top:1px;white-space: normal;margin-left:0px;display:inline;" class="office-form-question-title"><span id="subTime">Submit before:</span></div></label><select id="subInps" style="width:100px;margin-left:5px;border-radius:5px;" onchange="if(isOk)setTimer()"><option value="10">10 seconds</option><option value="20">20 seconds</option><option value="30">30 seconds</option><option value="45">45 seconds</option></select><br></div><button id="okButton" class="light-background-button" onclick="setTimer()">OK</button></div></div><style type="text/css">#deadLine{background-color:#fff;text-align:center;font-size:15px;height:40px;padding:12px;width:15%}#okButton{margin:10px 0 0 20px;background:#03787c;color:#fff;font-size:15px;height:35px;text-align:center;width:50px}@media only screen and (max-width:375px){#deadLine{width:50%}#okButton{margin-left:0px}}</style>';
	notice[0].innerHTML = notice[0].innerHTML + inject;
}

HTMLinjector();

subTime = document.getElementById('subTime');
subInps = document.getElementById('subInps');
ok = document.getElementById('okButton');
x = document.getElementById('deadLine');