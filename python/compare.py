import json

osDict, internetDict, newDict = {}, {}, {}

with open("mac_words.json") as osWords:
	osDict = json.load(osWords)

with open("internet_words.json") as internetWords:
	internetDict = json.load(internetWords)


for word in internetDict:
	try:
		osDict[word]
	except:
		newDict[word] = 1

print(str(len(internetDict)) + " words in initial dictionary")
print(str(len(osDict)) + " words in compared dictionary")
print(str(len(newDict)) + " words not in compared dictionary")

out_file = open("comparison.json", "w")
json.dump(newDict, out_file, indent = 2)
print("Data dumped into file")
out_file.close()
