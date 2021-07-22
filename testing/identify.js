var qsns = document.getElementsByClassName('__question__');
var ops = qsns[0].getElementsByClassName('office-form-question-choice');
var rad = ops[0].getElementsByTagName('input');
rad[0].ariaChecked;

function isAttempted(qsn) {
	var options = qsn.getElementsByClassName('office-form-question-choice');
	var attempted = false;
	for (var i = 0; i<options.length; i++) {
		var radio = options[i].getElementsByTagName('input');
		var selected = radio[0].ariaChecked == 'true';
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


notice = document.getElementsByClassName("office-form-notice-container");
inject = '<div style="padding-bottom: 35px; padding-top: 35px; position: relative;"><div><div class="question-title-box "><div class="office-form-question-title"><span><span>Deadline:</span></span></div></div><div class="office-form-question-element"><input type="time" style="background-color: #fff; text-align: center; font-size: 15px; height: 40px; padding: 12px; width: 15%;" id="deadLine"></div><br><button class="light-background-button" style="margin-left:20px; background:#000; color:#fff; font-size:15px; height:40px;text-align:center; width:50px;" onclick="setTimeout(function(){clickSubmit()},timing())">OK</button></div></div>';
notice[0].innerHTML = notice[0].innerHTML + inject;