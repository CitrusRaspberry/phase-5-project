import json

dict1 = {}

with open('words') as rawDict:
	for line in rawDict:
		wordInList = line.split()
		word = wordInList[0].lower()
		dict1[word] = "1"
		
print(len(dict1))

out_file = open('mac_words.json', 'w')
json.dump(dict1, out_file, indent = 2)
out_file.close()
