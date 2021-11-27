import json

print("Takes list of words and logs patterns into a json file")

print("Please specify input file name. Do not include .json extension in name. It is assumed by the program.")
inputFile = input() + ".json"


# Initializes main dictionary (used in resulting json file)
wordStats = {}
for i in range(97, 123):
	wordStats[chr(i)] = {
		"startsWord": 0,
		"comesBefore": {},
		"endsWord": 0,
	}

with open(inputFile) as in_file:
	words = json.load(in_file)
	for word in words:
		firstLetter, lastLetter = word[0], word[-1]
		wordStats[firstLetter]["startsWord"] += 1
		wordStats[lastLetter]["endsWord"] += 1
		print(word)
		if len(word) > 1:
			for i in range(0, len(word) - 1):
				letter = word[i]
				letterAfter = word[i + 1]
				try:
					wordStats[letter]["comesBefore"][letterAfter] += 1
				except:
					wordStats[letter]["comesBefore"][letterAfter] = 1

with open("wordStats.json", "w") as out_file:
	json.dump(wordStats, out_file, indent = 2)
