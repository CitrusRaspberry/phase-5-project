 import json

wordStats = {}

for i in range(97, 123):
	wordStats[chr(i)] = {
		"startsWord": 0,
		"comesBefore": {},
		"endsWord": 0,
	}

with open("internet_words.json") as words	

with open("wordStats.json", "w") as out_file:
	json.dump(wordStats, out_file, indent = 2)
