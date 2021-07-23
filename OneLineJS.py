# This python file converts the multi-line code in 'submitter.js' file into a single line and stores it in 'OneLine.js'

import re

js = open('submitter.js')
oljs = open('oneLine.js','a')
oljs.write('\'')
for line in js:
	if not line.startswith('//'):
		codeLine = line.rstrip()
		singleLine = codeLine.replace("\t","")
		singleLine = singleLine.replace("  ","")
		singleLine = singleLine.replace('\"','\\\"')
		singleLine = singleLine.replace("\'","\\\'")
		singleLine = re.sub(r'\s([^\w\s])\s', lambda x: x.group(1),singleLine)
		oljs.write(singleLine)
oljs.write('\'')