# need to export JSON in this format
# {
# 	"sdd": {
# 		"2021": {
# 			"1": "2",
# 			"2": "2",
# 			"3": "2",
# 			...
# 			"21": "14"
# 		}
# 	} 
# }

from pydoc import pager
import pdfplumber
import os
import json

sdd = {"2021": {}, "2020": {}, "2019": {}, "2018": {}, "2017": {}, "2016": {}, "2015": {}, "2014": {}, "2013": {}, "2012": {}, "2011": {}, "2010": {}, "2009": {}, "2008": {}, "2007": {}, "2006": {}, "2005": {}, "2004": {}, "2003": {}, "2002": {}, "2001": {}}
dir = 'C:/Users/Jamie Cole/Documents/Coding/HTML/ipt-sdd-react/ipt-sdd/src/data/papers/sols/engineering/'



def getMultipleChoice(filepath, year):
    with pdfplumber.open(filepath) as pdf:
        for i in range(1, len(pdf.pages)):
            text = pdf.pages[i]
            clean_text = text.filter(lambda obj: obj["object_type"] == "char" and "Bold" in obj["fontname"])
            pageTextArr = clean_text.extract_text().replace('\t', '\n').replace(' ', '').split('\n')
            print(pageTextArr)
            for j in pageTextArr:
                if j.isnumeric():
                    print(f"found Q{j} on page {i+1}")
                    try:
                        x = sdd[year][j]
                        break
                    except: sdd[year][str(j)] = str(i + 1)
                    
                    if j == '20': return i
                    


def getShortAnswer(startPage, filepath, year):
    with pdfplumber.open(filepath) as pdf:
        for i in range(startPage, len(pdf.pages)):
            text = pdf.pages[i]
            clean_text = text.filter(lambda obj: obj["object_type"] == "char" and "Bold" in obj["fontname"])
            pageTextArr = clean_text.extract_text().split('\n')
            for j in pageTextArr:
                if j[0:9] == "Question " and "End of" not in j and "continues on" not in j:
                    num = [int(s) for s in j.split() if s.isdigit()][0]
                    print(f"found Q{num} on page {i + 1} - {year}")
                    try:
                        x = sdd[year][num]
                        break
                    except: sdd[year][str(num)] = str(i + 1)

def getSolutions(filepath, year):
    with pdfplumber.open(filepath) as pdf:
        for i in range(1, 21):
            print(f"set q{i} to page 1")
            sdd[year][str(i)] = '1'
        
        for i in range(1, len(pdf.pages)):
            text = pdf.pages[i]
            clean_text = text.filter(lambda obj: obj["object_type"] == "char" and "Bold" in obj["fontname"])
            pageTextArr = clean_text.extract_text().split('\n')
            for j in pageTextArr:
                if j[0:9] == "Question " and "End of" not in j and "continues on" not in j:
                    try:
                        num = [int(s) for s in j.split() if s.isdigit()][0]
                        print(f"found Q{num} on page {i + 1} - {year}")
                        try:
                            x = sdd[year][num]
                            break
                        except: sdd[year][str(num)] = str(i + 1)
                    except:
                        break

#getShortAnswer(mcqPageEnd)
#print(sdd)

def processPaper(filepath, year):
    mcqPageEnd = getMultipleChoice(filepath, year)
    getShortAnswer(mcqPageEnd, filepath, year)

for filename in os.scandir(dir):
    if filename.is_file():
        year = filename.name[0:4]
        #processPaper(filename.path, year)
        getSolutions(filename.path, year)

#print(sdd)
jsonObj = json.dumps(sdd, indent = 4)
print(jsonObj)