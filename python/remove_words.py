import json

original, wordsToRemove, newList = [], [], []

print("This program inputs a json array of words to remove from another json array of words.")
print("The program will not modify the original array of words. Instead, it will create a new")
print("json array of words with the modifications. The output file is named modifiedArray.json\n")

print("Please enter the name of the json file that contains the original array of words. .json extension is not needed.")
originalFile = input() + ".json"

with open(originalFile) as file:
    original = json.load(file)

print("Please enter the name of the json file that contains an array of words that will be removed from the previously inputted file.")
wordsToRemoveFile = input() + ".json"

with open(wordsToRemoveFile) as file:
    wordsToRemove = json.load(file)

print("Creating array with removed words...")

for word in original:
    try:
        wordsToRemove.index(word)
    except:
        newList.append(word)

print("Length of original array: " + str(len(original)))
print("Length of new array: " + str(len(newList)))
print("Saving new array to output file...")

with open("modifiedArray.json", "w") as out_file:
    json.dump(newList, out_file, indent=4)

print("Modified array successfully dumped to modifiedArray.json")
