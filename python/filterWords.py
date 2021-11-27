import json

print('This file clears all single letter words from a list, except "a" and "i".')


print("Choose input file name. Do not enter .json file extension. It is assumed by the program.")
inputFileName = input() + ".json"

print("Choose output file name. Do not enter .json file extension.")
outputFileName = input() + ".json"


oldList, newList = [], []
with open(inputFileName) as in_file:
	oldList = json.load(in_file)

for i in oldList:
	if (len(i) != 1) or (i == "a") or (i == "i"):
		newList.append(i)

with open(outputFileName, "w") as out_file:
	json.dump(newList, out_file, indent = 2)
