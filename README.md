# MS-Forms-Deadline-Saver
It really breaks our hearts, when we attempt the questions in a quizz which we're confident about and leave the doubtful questions for later inspection, only to realise while we're trying to come up with a satisfying answer for the doubtful questions, that we've actually ran out of time and could no longer submit the form, making all our efforts go in vain. Well, we no longer have to worry about the deadlines. This tool will help you avoid this pain by saving you from running out of deadlines while submitting in MS Forms.
 
## Working
The tool will be triggered automatically, 10 seconds prior to the deadline of the MS Form. After it's on, it will identify all the unattempted questions in the form and selects a single option of each unattempted question randomly and submits the form by itself.

**Note: The options will be selected randomly. So, obviously the answers have equal chances of being either right or wrong.**
## Usage
Save a bookmark in your browser with any desired name and paste the following in the URL/address section and save it:

    javascript:(function () {var script = document.createElement('script');script.innerHTML="var hrs, mins, secs, givenHr, givenMin, timeNow, given, now, x, countDown;function timing() {x = document.getElementById(\'deadLine\').value;givenHr = x.substr(0,2);givenMin = x.substr(3,5);hrs = new Date().getHours();mins = new Date().getMinutes();secs = new Date().getSeconds();timeNow = hrs + \":\" + mins;given = new Date(null,null,null,givenHr,givenMin-1,50);now = new Date(null,null,null,hrs,mins,secs);countDown = given-now;if (countDown > 0) {return countDown;}else{alert(\'INVALID Deadline!\');return 86400000;}}function isAttempted(qsn) {var options = qsn.getElementsByClassName(\'office-form-question-choice\');var attempted = false;for (var i = 0; i<options.length; i++) {var radio = options[i].getElementsByTagName(\'input\');var selected = radio[0].ariaChecked == \'true\';attempted = attempted || selected;if (attempted) {break;}}return attempted;}function unattemptedQs() {var questions = document.getElementsByClassName(\'__question__\');var unattempted = [];for (var i = 0; i<questions.length; i++) {if (!isAttempted(questions[i])) {unattempted[unattempted.length] = questions[i];}}return unattempted;}function randomSelect(unattempted) {for (var i = 0; i < unattempted.length; i++) {var choice = unattempted[i].getElementsByClassName(\'office-form-question-choice\');choice[Math.floor(Math.random()*(choice.length))].click();}}function clickSubmit() {randomSelect(unattemptedQs());var button = document.getElementsByClassName(\'__submit-button__\')[0];button.click();console.log(document.getElementById(\'deadLine\').value);console.log(new Date().getHours()+\":\"+new Date().getMinutes());console.log(hrs+\":\"+mins+\":\"+secs);}function HTMLinjector() {var notice = document.getElementsByClassName(\"office-form-notice-container\");var inject = \'<div style=\"padding-bottom: 35px; padding-top: 35px; position: relative;\"><div><div class=\"question-title-box \"><div class=\"office-form-question-title\"><span><span>Deadline:</span></span></div></div><div class=\"office-form-question-element\"><input type=\"time\" style=\"background-color: #fff; text-align: center; font-size: 15px; height: 40px; padding: 12px; width: 15%;\" id=\"deadLine\"></div><br><button class=\"light-background-button\" style=\"margin-left:20px; background:#000; color:#fff; font-size:15px; height:40px;text-align:center; width:50px;\" onclick=\"setTimeout(function(){clickSubmit()},timing())\">OK</button></div></div>\';notice[0].innerHTML = notice[0].innerHTML + inject;}HTMLinjector();";document.body.appendChild(script);})();

After you open an MS Form, just click on this bookmark and it will create an **input time field**, using which you can provide the deadline time of that form and a new **OK** button, that looks similar to the submit button in the form.

<img src="https://i.imgur.com/s1A0Ood.png" width = 75% height = 75%/>

On clicking the **OK** button, the timer will be set. And when 10 seconds are remaining to hit the deadline, any one option of all the unattempted questions will be selected randomly and the form will be submitted automatically.
 
## Advantages
- No more running out of time.
- No more losing grades of the questions, that you know the answers of. 
- Helps you concentrate more on the questions that you might be familiar with.
- No more worrying about the questions, you're not confident about.
- Helps in saving time.
