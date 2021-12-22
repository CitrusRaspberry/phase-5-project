import json

print("This program reformats a '\\n'-delimited list of words (with no quotes) as a json file")

print("Please specify an input file. Include full file name")
inputFile = input()

print("Please specify an output file. Do not include .json extension. It is assumed by the program")
outputFile = input() + ".json"

dict = []

with open(inputFile) as rawDict:
	for line in rawDict:
		wordInList = line.split("\n")
		word = wordInList[0].lower().strip()
		dict.append(word)

print(str(len(dict)) + " words")

with open(outputFile, 'w') as out_file:
	json.dump(dict, out_file, indent=2)

print("Program complete. File written to: " + outputFile)
