// Deadline calculator:
var timeOut,hrs,mins,secs,givenHr,givenMin,timeNow,given,now,x,countDown,ok,dlChk;

function DLcheckbox() {
	dlChk = document.getElementById('DLcheckbox');
	if(!dlChk.checked){
		clearTimeout(timeOut);
		x.disabled=true;
		ok.disabled=true;
		ok.style.backgroundColor='#aaa';
	}
	else{
		x.disabled=false;
		ok.disabled=false;
		ok.style.backgroundColor='#03787c';
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
	given = new Date(null,null,null,givenHr,givenMin-1,50);
	now = new Date(null,null,null,hrs,mins,secs);
	countDown = given-now;
	if (countDown > 0) {
		return countDown;
	}
	else{
		ok.style.backgroundColor='#03787c';
		alert('INVALID Deadline!');
		return 86400000;
	}
}


// Identification of unattempted questions:
function isAttempted(qsn) {
	var onPC = qsn.getElementsByClassName('office-form-question-choice');
	var onMobile = qsn.getElementsByClassName('office-form-question-choice-mobile');
	var options=[];
	if(onPC.length != 0){options = onPC;}
	else if (onMobile.length != 0){options=onMobile}
	var attempted = false;
	for (var i = 0; i<options.length; i++) {
		var radio = options[i].getElementsByTagName('input');
		var selected = radio[0].ariaChecked == "true";
		attempted = attempted || selected;
		if (attempted) {break;}
	}
	return attempted;
}

function unattemptedQs() {
	var questions = document.getElementsByClassName('__question__');
	var unattempted = [];
	for (var i = 0; i<questions.length; i++) {
		if (!isAttempted(questions[i])) {
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
//	console.log(document.getElementById('deadLine').value);
//	console.log(new Date().getHours()+":"+new Date().getMinutes());
//	console.log(hrs+":"+mins+":"+secs);
}


// HTML Injection:
function HTMLinjector() {
	var notice = document.getElementsByClassName("office-form-notice-container");
	var inject = '<div style="padding-bottom:35px;padding-top:35px;position:relative;"><div style="padding-left:20px;padding-right:20px;"><div class="question-title-box"><label style="font-weight:NORMAL;margin-left:-10px;"><input type="checkbox" style="bottom:0;height:18px;margin:auto 0 auto 0;position:absolute;top:0;width:20px;cursor:pointer" checked id="DLcheckbox" onclick="DLcheckbox()"><div class="office-form-question-title" style="margin-left:30px;margin-top:2px;cursor:pointer"><span>Deadline:</span></div></label></div><div class="office-form-question-element"><input type="time" id="deadLine"></div><br><button id = "okButton" class="light-background-button" onclick="timeOut=setTimeout(clickSubmit,timing())">OK</button></div></div><style type="text/css">#deadLine{background-color:#fff;text-align:center;font-size:15px;height:40px;padding:12px;width:15%;}#okButton{margin:10px 0 0 20px;background:#03787c;color:#fff;font-size:15px;height:35px;text-align:center;width:50px;}@media only screen and (max-width:375px){#deadLine{width:50%;}#okButton{margin-left:0px;}}</style>';
	notice[0].innerHTML = notice[0].innerHTML + inject;
}

HTMLinjector();

ok = document.getElementById('okButton');
x = document.getElementById('deadLine');