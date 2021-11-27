import json

print("This program reformats a space-delimited list of words (no quotes) as a json file")

print("Please specify an input file. Include full file name")
inputFile = input()

print("Please specify an output file. Do not include .json extension. It is assumed by the program")
outputFile = input()

dict1 = {}

with open(inputFile) as rawDict:
	for line in rawDict:
		wordInList = line.split()
		word = wordInList[0].lower()
		dict1[word] = "1"
		
print(len(dict1) + " words")

out_file = open(outputFile, 'w')
json.dump(dict1, out_file, indent = 2)
out_file.close()
