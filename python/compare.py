import json

firstDict, secondDict, newDict = [], [], []

print("This program takes two json lists of words as an array and returns the")
print("contents of the first array that don't exist in the second array.")
print("Output file will always be called comparison.json and will exist in directory that this script is called in.\n")

print("Please enter the name of the first .json file.")
print("This is the file that is checked against the other for words that don't exist in the latter.")
print("Do not include .json extension.")
firstFile = input() + ".json"

with open(firstFile) as file:
	firstDict = json.load(file)

print("\nPlease enter the name of the second .json file. Do not inlclude .json extension.")
secondFile = input() + ".json"

with open(secondFile) as file:
	secondDict = json.load(file)

print("Comparing lists...")

for word in firstDict:
	try:
		secondDict.index(word)
	except:
		newDict.append(word)

print(str(len(firstDict)) + " words in initial dictionary")
print(str(len(secondDict)) + " words in compared dictionary")
print(str(len(newDict)) + " words not in compared dictionary\n")

print("Saving new list to comparison.json")

with open("comparison.json", "w") as out_file:
	json.dump(newDict, out_file, indent=2)

print("Data dumped into file")
