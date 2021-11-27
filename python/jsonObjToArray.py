import json


print("Type input file name. Do not type .json extension. It is assumed.")
fileInput = input() + ".json"

print("Type output file name. Do not type .json extension.")
fileOutput = input() + ".json"

inputJSON = {}
with open(fileInput) as in_file:
	inputJSON = json.load(in_file)

outputJSON = list(inputJSON.keys())

with open(fileOutput, "w") as out_file:
	json.dump(outputJSON, out_file, indent = 2)
