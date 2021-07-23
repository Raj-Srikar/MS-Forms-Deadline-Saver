# This python file reads the 'submitter.js' JavaScript file and converts the code into a single line code and updates the bookmark URL section of 'README.md' file.

import re

js = open('submitter.js')
readme = open('README.md','r')
url = ''
for line in js:
	if not line.startswith('//'):
		singleLine = line.rstrip()
		singleLine = singleLine.replace("\t","")
		singleLine = singleLine.replace("  ","")
		singleLine = singleLine.replace('\"','\\\"')
		singleLine = singleLine.replace("\'","\\\'")
		singleLine = re.sub(r'\s([^\w\s])\s', lambda x: x.group(1),singleLine)
		url += singleLine
url = "javascript:(function () {var script = document.createElement('script');script.innerHTML=\'"+url+"\';document.body.appendChild(script);})();"

lines = readme.readlines()
for i in lines:
	if i.startswith('    javascript'):
		lines[lines.index(i)] = '    '+url+'\n'

readme = open('README.md','w')
readme.writelines(lines)
readme.close()
js.close()