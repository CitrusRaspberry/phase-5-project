import json

# Testing functions. Call them to check ratios. Ratios should be close to 1.0


def testComesBeforeRatios():
	for letterKey in wordStats:
		totals = 0.0
		for letter in wordStats[letterKey]["comesBefore"]:
			totals += wordStats[letterKey]["comesBefore"][letter]["ratio"]
		print(totals)


def testStartAndEndRatios():
	totalStartsWord = 0.0
	totalEndsWord = 0.0
	for letterKey in wordStats:
		totalStartsWord += wordStats[letterKey]["startsWord"]["ratio"]
		totalEndsWord += wordStats[letterKey]["endsWord"]["ratio"]
	print(totalStartsWord)
	print(totalEndsWord)


############################################
# Program starts and asks for input
print("Takes list of words and logs patterns into a json file")
print("Input format must be a .json file and it must be a list of words in a single array. Example:")
print("[\n  array,\n  of,\n  words\n]\n")

print("Output file will always be in the same directory that this Python script was called in.")
print("Output file name will always be 'wordStats.json'\n")

print("Please specify input file name. Do not include .json extension in name. It is assumed by the program.")
inputFile = input() + ".json"

############################################
# Initializes main dictionary (used in resulting json file)
wordStats = {}
wordStatsBranch = {
	"total": 0,
	"ratio": 0.0,
}
total = {
	"words": 0,
	"letterPreceedings": {},
}
for i in range(97, 123):
	letterKey = chr(i)
	wordStats[letterKey] = {
		"startsWord": wordStatsBranch.copy(),
		"comesBefore": {},
		"endsWord": wordStatsBranch.copy(),
	}
	for x in range(97, 123):
		letter = chr(x)
		wordStats[letterKey]["comesBefore"][letter] = wordStatsBranch.copy()
	total["letterPreceedings"][letterKey] = 0

############################################
# Fills in totals data in 'wordStats' and 'total' dictionaries
with open(inputFile) as in_file:
	words = json.load(in_file)
	total["words"] = len(words)
	for word in words:
		firstLetter, lastLetter = word[0], word[-1]
		wordStats[firstLetter]["startsWord"]["total"] += 1
		wordStats[lastLetter]["endsWord"]["total"] += 1
		if len(word) > 1:
			for i in range(0, len(word) - 1):
				letter = word[i]
				letterAfter = word[i + 1]
				total["letterPreceedings"][letter] += 1
				wordStats[letter]["comesBefore"][letterAfter]["total"] += 1

############################################
# Fills in ratio data in 'wordStats' using 'total' dict
for letterKey in wordStats:
	for category in wordStats[letterKey]:
		if category == "comesBefore":
			for letter in wordStats[letterKey]["comesBefore"]:
				totalPreceedingsForLetter = float(
					wordStats[letterKey]["comesBefore"][letter]["total"])
				totalPreceedings = float(total["letterPreceedings"][letterKey])
				wordStats[letterKey]["comesBefore"][letter]["ratio"] = totalPreceedingsForLetter / totalPreceedings
		elif category == "startsWord" or category == "endsWord":
			totalInCategory = float(wordStats[letterKey][category]["total"])
			totalWords = float(total["words"])
			wordStats[letterKey][category]["ratio"] = totalInCategory / totalWords
# Wrap wordStats in an another object for easy json-server readability
wordStats = {"data": wordStats}

############################################
# Dumps data into output file. Print success message
with open("wordStats.json", "w") as out_file:
	json.dump(wordStats, out_file, indent=4)

print("Word stats have been successfully dumped in json format to this directory as 'wordStats.json'")
