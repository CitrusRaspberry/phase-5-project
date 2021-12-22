import json

# Testing functions. Call them to check ratios. Ratios should be close to 1.0


def testComesBeforeRatios():
	for letterKey in singleLetterPatterns:
		totals = 0.0
		for letter in singleLetterPatterns[letterKey]["comesBefore"]:
			totals += singleLetterPatterns[letterKey]["comesBefore"][letter]["ratio"]
		print(totals)


def testStartRatios():
	totalStartsWord = 0.0
	for letterKey in singleLetterPatterns:
		totalStartsWord += singleLetterPatterns[letterKey]["startsWord"]["ratio"]
	print(totalStartsWord)


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
singleLetterPatterns = {}
words = []
uniqueCombos = {}
totalCombos = 0
singleLetterPatternsBranch = {
	"total": 0,
	"ratio": 0.0,
}
total = {
	"words": 0,
	"letterPreceedings": {},
}
for i in range(97, 123):
	letterKey = chr(i)
	singleLetterPatterns[letterKey] = {
		"startsWord": singleLetterPatternsBranch.copy(),
		"comesBefore": {},
	}
	for x in range(97, 123):
		letter = chr(x)
		singleLetterPatterns[letterKey]["comesBefore"][letter] = singleLetterPatternsBranch.copy()
	total["letterPreceedings"][letterKey] = 0

with open(inputFile) as in_file:
	words = json.load(in_file)

############################################
# ONE-TWO-LETTER PATTERNS
############################################
# Fills in totals data in 'singleLetterPatterns' and 'total' dictionaries
print("Counting single-letter patterns...")

total["words"] = len(words)
for word in words:
	firstLetter = word[0]
	singleLetterPatterns[firstLetter]["startsWord"]["total"] += 1
	if len(word) > 1:
		for i in range(0, len(word) - 1):
			letter = word[i]
			letterAfter = word[i + 1]
			total["letterPreceedings"][letter] += 1
			singleLetterPatterns[letter]["comesBefore"][letterAfter]["total"] += 1
	

############################################
# Fills in ratio data in 'singleLetterPatterns' using 'total' dict
for letterKey in singleLetterPatterns:
	for category in singleLetterPatterns[letterKey]:
		if category == "comesBefore":
			for letter in singleLetterPatterns[letterKey]["comesBefore"]:
				totalPreceedingsForLetter = float(
					singleLetterPatterns[letterKey]["comesBefore"][letter]["total"])
				totalPreceedings = float(total["letterPreceedings"][letterKey])
				singleLetterPatterns[letterKey]["comesBefore"][letter]["ratio"] = totalPreceedingsForLetter / totalPreceedings
		elif category == "startsWord":
			totalInCategory = float(singleLetterPatterns[letterKey][category]["total"])
			totalWords = float(total["words"])
			singleLetterPatterns[letterKey][category]["ratio"] = totalInCategory / totalWords


##############################################
# THREE-LETTER PATTERNS
##############################################
# Counting 3-letter combinations in list of words, if word is > 3 characters
print("Counting combos...")

for word in words:
    if len(word) >= 3:
        for i in range(len(word) - 2):
            totalCombos += 1
            combo = word[i] + word[i + 1] + word[i + 2]
            try:
                uniqueCombos[combo]["total"] += 1
            except:
                uniqueCombos[combo] = {"total": 1, "ratio": 0.0}

##############################################
# Calculating ratio, based on total combinations counted and each combo occurance
for combo in uniqueCombos:
	uniqueCombos[combo]["ratio"] = uniqueCombos[combo]["total"] / totalCombos

print("\n" + str(len(uniqueCombos))
      + " unique 3-letter combos found in " + str(len(words)) + " words.")
print(str(totalCombos) + " total 3-letter combos found.\n")

############################################
# Wrap all results in an another object for easy readability
wordStats = {"single_letter": singleLetterPatterns,
			"3-letter_combos": uniqueCombos }
# Dumps data into output file. Print success message
print("Saving data to file...")
with open("wordStats.json", "w") as out_file:
	json.dump(wordStats, out_file, indent=4)

print("Word stats have been successfully dumped in json format to this directory as 'wordStats.json'")
