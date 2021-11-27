import json

print("This program tests the getWordStats.py program for accuracy.")

print("Please type name of word .json file. Do not include .json extension.")
wordsFile = input() + ".json"

print("Please type name of stats .json file. Do not include .json extension.")
statsFile = input() + ".json"

print("Please enter letter to test.")
letterInput = input()

canPass = False
while not canPass:
	print("Are you testing for A, starting letter, B, ending letter, or C, letter combinations?")
	testMethod = input()
	if testMethod == "a" or testMethod == "A":
		testMethod = "startsWord"
		canPass = True
	elif testMethod == "b" or testMethod == "B":
		testMethod = "endsWord"
		canPass = True
	elif testMethod == "c" or testMethod == "C":
		testMethod = "c"
		canPass = True
	else:
		print("Try again")



# Test begins

print("Test Method => " + testMethod)
testResults = 0
words = ""
wordStats = ""
with open(wordsFile) as file:
	words = json.load(file)	
with open(statsFile) as file:
	wordStats = json.load(file)

for word in words:
	if testMethod == "startsWord" and word[0] == letterInput:
		testResults += 1
	if testMethod == "endsWord" and word[-1] == letterInput:
		testResults += 1

compared = wordStats[letterInput][testMethod]

print("Test results for " + testMethod + " " + letterInput +  ": " + str(testResults))
print("Stats from data show: " + str(compared))
