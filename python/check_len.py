import json

print("Checks length of specified json file")

print("Enter json file name. Do not enter .json file extension.")
fileInput = input() + ".json"

with open(fileInput) as file:
	print(len(json.load(file)))
