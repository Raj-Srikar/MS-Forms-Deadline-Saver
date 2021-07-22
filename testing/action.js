var qsns = document.getElementsByClassName('__question__');
var choice = ele[0].getElementsByClassName('office-form-question-choice');
choice[Math.floor(Math.random()*(choice.length))].click()

function randomSelect(unattempted) {
	for (var i = 0; i < unattempted.length; i++) {
		var choice = unattempted[i].getElementsByClassName('office-form-question-choice');
		choice[Math.floor(Math.random()*(choice.length))].click();
	}
}


var button = document.getElementsByClassName('__submit-button__')[0];
button.click();