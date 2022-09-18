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
import PyPDF2

# pdf_file = open(r'C:\Users\Jamie Cole\Documents\Coding\HTML\ipt-sdd-react\ipt-sdd\src\data\2021-hsc-software-design-and-development.pdf', 'rb')
# read_pdf = PyPDF2.PdfFileReader(pdf_file)
# number_of_pages = read_pdf.getNumPages()


# for i in range(1, number_of_pages):
#     page = read_pdf.getPage(i)
#     page_content = page.extractText()
#     #print(page_content)
#     for j in range(21, 36):
#         if f"Question {j}" in page_content and "(a)" in page_content and "Do NOT attempt Question" not in page_content: # remove last and
#             print(f"q{j} part (a) found on page {i + 1}")

def getMultipleChoice():
    with pdfplumber.open(r'C:\Users\Jamie Cole\Documents\Coding\HTML\ipt-sdd-react\ipt-sdd\src\data\2021-hsc-software-design-and-development.pdf') as pdf:
        for i in range(1, len(pdf.pages)):
            text = pdf.pages[i]
            clean_text = text.filter(lambda obj: obj["object_type"] == "char" and "Bold" in obj["fontname"])
            pageTextArr = clean_text.extract_text().split('\n')
            for j in pageTextArr:
                if j.isnumeric():
                    print(f"found Q{j} on page {i+1}!")
                    if j == '20': return i

mcqPageEnd = getMultipleChoice()

def getShortAnswer(startPage):
    with pdfplumber.open(r'C:\Users\Jamie Cole\Documents\Coding\HTML\ipt-sdd-react\ipt-sdd\src\data\2021-hsc-software-design-and-development.pdf') as pdf:
        for i in range(startPage, len(pdf.pages)):
            text = pdf.pages[i]
            clean_text = text.filter(lambda obj: obj["object_type"] == "char" and "Bold" in obj["fontname"])
            pageTextArr = clean_text.extract_text().split('\n')
            for j in pageTextArr:
                if j[0:9] == "Question " and "End of" not in j and "continues on" not in j:
                    #print(f"--- {j} --- on pg{i+1}!")
                    print(f"Found Q{[int(s) for s in j.split() if s.isdigit()][0]} on page {i + 1}")

        #print(pageTextArr)

getShortAnswer(mcqPageEnd)