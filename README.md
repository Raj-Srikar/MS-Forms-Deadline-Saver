# MS-Forms-Deadline-Saver
It really breaks our hearts, when we attempt the questions in a quizz which we're confident about and leave the doubtful questions for later inspection, only to realise while we're trying to come up with a satisfying answer for the doubtful questions, that we've actually ran out of time and could no longer submit the form, making all our efforts go in vain. Well, we no longer have to worry about the deadlines. This tool will help you avoid this pain by saving you from running out of deadlines while submitting in MS Forms.
 
## Working
The tool will be triggered automatically, 10 seconds prior to the deadline of the MS Form. After it's on, it will identify all the required and unattempted questions in the form and randomly selects a single option of each unattempted question that is marked as "required" and submits the form by itself.

**Note: The options will be selected randomly. So, obviously the answers have equal chances of being either right or wrong.**
## Usage
Save a bookmark in your browser with any desired name and paste the following in the URL/address section and save it:

    javascript:(function () {var script = document.createElement('script');script.innerHTML='var timeOut,hrs,mins,secs,givenHr,givenMin,timeNow,given,now,x,countDown,ok,dlChk;function DLcheckbox() {dlChk=document.getElementById(\'DLcheckbox\');if(!dlChk.checked){clearTimeout(timeOut);x.disabled=true;ok.disabled=true;ok.style.backgroundColor=\'#aaa\';}else{x.disabled=false;ok.disabled=false;ok.style.backgroundColor=\'#03787c\';}}function timing() {clearTimeout(timeOut);ok.style.backgroundColor=\'#000\';givenHr=x.value.substr(0,2);givenMin=x.value.substr(3,5);hrs=new Date().getHours();mins=new Date().getMinutes();secs=new Date().getSeconds();timeNow =hrs+\":\"+mins;given=new Date(null,null,null,givenHr,givenMin-1,50);now=new Date(null,null,null,hrs,mins,secs);countDown=given-now;if (countDown>0) {return countDown;}else{ok.style.backgroundColor=\'#03787c\';alert(\'INVALID Deadline!\');return 86400000;}}function isAttempted(qsn) {var onPC=qsn.getElementsByClassName(\'office-form-question-choice\');var onMobile=qsn.getElementsByClassName(\'office-form-question-choice-mobile\');var options=[];let mLength=onMobile.length;let pcLength=onPC.length;if(pcLength != 0){options=onPC}else if (mLength != 0){options=onMobile}var attempted=false;if (pcLength != 0 || mLength != 0) {for (var i=0; i<options.length; i++) {var radio=options[i].getElementsByTagName(\'input\');var selected=radio[0].ariaChecked == \"true\";attempted=attempted || selected;if (attempted) {break;}}return attempted;}else{return true;}}function unattemptedQs() {var questions=document.getElementsByClassName(\'__question__\');var unattempted=[];let isReq;for (var i=0; i<questions.length; i++) {isReq=questions[i].getElementsByClassName(\'required-star\').length;if (!isAttempted(questions[i]) && isReq) {unattempted[unattempted.length]=questions[i];}}return unattempted;}function randomSelect(unattempted) {for (var i=0; i<unattempted.length; i++) {var onPC =unattempted[i].getElementsByClassName(\'office-form-question-choice\');var onMobile =unattempted[i].getElementsByClassName(\'office-form-question-choice-mobile\');var choice=[];if(onPC.length != 0){choice=onPC;}else if (onMobile.length != 0){choice=onMobile}choice[Math.floor(Math.random()*(choice.length))].click();}}function clickSubmit() {randomSelect(unattemptedQs());var button=document.getElementsByClassName(\'__submit-button__\')[0];button.click();ok.style.backgroundColor=\'#03787c\';}function HTMLinjector() {var notice=document.getElementsByClassName(\"office-form-notice-container\");var inject=\'<div style=\"padding-top:35px;position:relative;\"><div style=\"padding-left:20px;padding-right:20px;\"><div class=\"question-title-box\"><label style=\"font-weight:NORMAL;margin-left:-10px;\"><input type=\"checkbox\" id=\"DLcheckbox\" style=\"bottom:0;height:18px;margin:auto 0 auto 0;position:absolute;top:0;width:20px;cursor:pointer\" checked onclick=\"DLcheckbox()\"><div class=\"office-form-question-title\" style=\"margin-left:30px;margin-top:2px;cursor:pointer\"><span>Deadline:</span></div></label></div><div class=\"office-form-question-element\"><input type=\"time\" id=\"deadLine\"><br><br></div><button id=\"okButton\" class=\"light-background-button\" onclick=\"timeOut=setTimeout(function(){clickSubmit()},timing())\">OK</button></div></div><style type=\"text/css\">#deadLine{background-color:#fff;text-align:center;font-size:15px;height:40px;padding:12px;width:15%;}#okButton{margin:10px 0 0 20px;background:#03787c;color:#fff;font-size:15px;height:35px;text-align:center;width:50px;}@media only screen and (max-width:375px){#deadLine{width:50%;}#okButton{margin-left:0px;}}</style>\';notice[0].innerHTML=notice[0].innerHTML+inject;}HTMLinjector();ok=document.getElementById(\'okButton\');x=document.getElementById(\'deadLine\');';document.body.appendChild(script);})();

After you open an MS Form, just click on this bookmark and it will create a **time input field**, using which you can provide the deadline time of that form and a new **OK** button, that looks similar to the submit button in the form.

<img src="https://i.imgur.com/K8TYLIC.png" width = 75% height = 75%/>

On clicking the **OK** button, the timer will be set and the color (of this button) changes to black, indicating that the timer is active. And when 10 seconds are remaining to hit the deadline, any one option of each required and unattempted question, will be selected randomly and the form will be submitted automatically. To disable the timer, check the checkbox besides the word 'Deadline'. To clear the timer, disable and enable the timer one time.
 
### Editing the URL of a Bookmark in different browsers *(PC)*:
- [Chrome](https://www.howtogeek.com/427777/how-to-create-view-and-edit-bookmarks-in-google-chrome/#:~:text=Editing%20in%20the%20Bookmarks%20Bar%20or%20Bookmarks%20Menu&text=Right-click%20the%20Bookmark%2C%20and,Save.)
- [Safari](https://support.apple.com/en-in/guide/safari/ibrw1039/mac#:~:text=Manage%20bookmarks&text=Rename%20or%20edit%20a%20bookmark%20or%20folder.,Edit%20a%20bookmark’s%20website%20address%20%28URL%29)
- [Edge](https://www.surfacetablethelp.com/2017/06/how-to-edit-bookmarks-or-favorites-url-in-microsoft-edge-on-windows-10.html#:~:text=*%20Within%20Edge%2C%20hold-and,as%20you%20want%20to%20have.)
- [Firefox](https://support.mozilla.org/en-US/questions/876728#:~:text=Show%20all%20bookmarks.-,Find%20and%20select%20the%20bookmark%20you%20want%20to%20edit%2C%20then,the%20bottom%20of%20the%20window.&text=You%20can%20also%20click%20the,URL%20in%20the%20location%20field.&text=Thanks!)
- [Opera](https://www.youtube.com/watch?v=EGChNw1Cjqw&t=30s)

### Editing the URL of a Bookmark in different browsers *(Mobile)*:
- [Chrome](https://www.verizon.com/support/knowledge-base-180311/#:~:text=Tap%20Bookmarks.,Tap%20Edit.)
- [Safari](https://www.businessinsider.in/how-to-delete-or-edit-the-saved-bookmarks-on-your-iphones-safari-browser/articleshow/70505443.cms#:~:text=To%20rename%20a%20bookmark%20or%20change%20the%20URL%2C,when%20you%27re%20done%20to%20go%20back%20to%20the%20previous%20page.)

## Advantages
- No more running out of time.
- No more losing grades of the questions, that you know the answers of. 
- Helps you concentrate more on the questions that you might be familiar with.
- No more worrying about the questions, you're not confident about.
- Helps in saving time.

## Note from the Developer
- Before using this tool make sure that you know the exact deadline of the form and also that you set the timer accordingly.
- Before completely relying upon this tool, if the form has any text fields that are mandatory to be answered before submitting, make sure you fill them all. Else, when this tool tries to submit the form, it will not get submitted.
- If clicking on the bookmark doesn't work, type the name of the bookmark in your browser's address bar and find the bookmark in the suggestions and click on it.
- While on PC, you can also use this tool by copying the code in [submitter.js](https://github.com/Raj-Srikar/MS-Forms-Deadline-Saver/blob/main/submitter.js) file and pasting it in the developer tools console of your browser (inspect element) and executing it.
- Please don't deploy the tool more than once. Else, multiple clones of the tool will be created and they may missbehave. In this case, just reload the page and deploy the tool again.

## *Feature Updates*
- *(25-07-2021)* **Removed random selection** - Almost removed the random selection functionality. Now the tool selects the options randomly, only for the questions that are both required and are left unattempted.
- *(25-07-2021)* **Optional random selection** - Now it's optional to choose whether the tool should select the options randomly before submitting or not.
- *(25-07-2021)* **Color Indicator for OK button** - Color of the OK button will change to black, when the timer is active. Default button color changed to green.
- *(23-07-2021)* **Added Mobile compatibility** - Now supported on mobile devices as well.

## *Bug Fixes*
- *(25-07-2021)* **[FIXED]** Old timer staying active even after new timer is set, causing the form to be submitted automatically when the clock hits the previously set deadline time.