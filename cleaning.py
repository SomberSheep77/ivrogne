import json
f = open('wat.json')

data = json.load(f)

new = []
for drink in data:
	d = {}
	d['id'] = drink['idDrink']
	d['name'] = drink['strDrink']
	d['tags'] = drink['strTags']
	d['category'] = drink['strCategory']
	d['iba'] = drink['strIBA']
	d['alcoholic'] = drink['strAlcoholic']
	d['glass'] = drink['strGlass']
	d['instructions'] = drink['strInstructions']
	ingredients = [drink['strIngredient1'],drink['strIngredient2'],drink['strIngredient3'],drink['strIngredient4'],drink['strIngredient5'],drink['strIngredient6'],drink['strIngredient7'],drink['strIngredient8'],drink['strIngredient9'],drink['strIngredient10'],drink['strIngredient11'],drink['strIngredient12'],drink['strIngredient13'],drink['strIngredient14'],drink['strIngredient15']]
	measures = [drink['strMeasure1'],drink['strMeasure2'],drink['strMeasure3'],drink['strMeasure4'],drink['strMeasure5'],drink['strMeasure6'],drink['strMeasure7'],drink['strMeasure8'],drink['strMeasure9'],drink['strMeasure10'],drink['strMeasure11'],drink['strMeasure12'],drink['strMeasure13'],drink['strMeasure14'],drink['strMeasure15']]
	i = 0
	while ingredients[i] != None:
		i += 1
	d['numIngredients'] = i
	d['thumbnail'] = drink['thumbnailFilename']
	m = []
	for x in range(i):
		m.append(measures[x] if measures[x] != None else '')
	d['ingredients'] = ingredients[:i]
	d['measures'] = m
	new.append(d)
	# print(d, drink)

f.close()

with open('new_data.json', 'w') as json_file:
	json.dump(new, json_file)