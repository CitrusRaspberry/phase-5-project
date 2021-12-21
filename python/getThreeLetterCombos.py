import json

print("This program goes through a json array of words and looks for every 3-letter combination within every word.")
print("It counts each occurance of each combo and outputs a json object with this data.\n")

print("Output file will always be threeLetterComboStats.json in the directory this script was called in.")
print("Please enter the name of the input json file. Do not include .json extension.")
inputFile = input() + ".json"

##############################################
# Initializing variables and openeing input file
words = []
uniqueCombos = {}
totalCombos = 0
with open(inputFile) as file:
    words = json.load(file)

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
    uniqueCombos[combo]["ratio"] = float(format(
        uniqueCombos[combo]["total"] / totalCombos, ".15f"))

print("\n" + str(len(uniqueCombos))
      + " unique combos found in " + str(len(words)) + " words.")
print(str(totalCombos) + " total combos found.\n")
print("Saving data to file...")

##############################################
# Saving file
uniqueCombos = {"data": uniqueCombos}
with open("threeLetterComboStats.json", "w") as out_file:
    json.dump(uniqueCombos, out_file, indent=4)

print("\nData successfully dumped to threeLetterComboStats.json")
