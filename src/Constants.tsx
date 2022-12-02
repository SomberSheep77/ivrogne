import { Alcoholic } from './data/types'

const SORT_VALS = ['A to Z', 'Z to A', 'Ingredients - Asc', 'Ingredients - Dsc']

const ALCOHOL_TYPES: Map<string, Set<string>> = new Map()
ALCOHOL_TYPES.set(
  'Vodka',
  new Set([
    'Vanilla vodka',
    'Lime vodka',
    'Raspberry vodka',
    'Absolut Kurant',
    'Vodka',
    'Cranberry vodka',
    'Absolut Peppar',
    'Absolut Citron',
    'Absolut Vodka',
    'Lemon vodka',
  ])
)
ALCOHOL_TYPES.set(
  'Rum',
  new Set([
    'Añejo rum',
    'Malibu rum',
    'Rum',
    'White rum',
    'Coconut rum',
    'blackstrap rum',
    'Spiced rum',
    'Light rum',
    'Dark Rum',
    'White Rum',
    'Dark rum',
    'Bacardi Limon',
    'Gold rum',
    '151 proof rum',
  ])
)
ALCOHOL_TYPES.set('Gin', new Set(['gin', 'Gin', 'Sloe gin']))
ALCOHOL_TYPES.set(
  'Whiskey',
  new Set([
    'Crown Royal',
    'Blended whiskey',
    'Irish whiskey',
    'Southern Comfort',
    'Blended Scotch',
    'Cognac',
    'Bourbon',
    'Wild Turkey',
    'Drambuie',
    'Jack Daniels',
    'Irish Whiskey',
    'Rye whiskey',
    'Islay single malt Scotch',
    'Yukon Jack',
    'Scotch',
    'Whiskey',
    'Firewater',
    'Jim Beam',
    'Whisky',
    'Tennessee whiskey',
    'Johnnie Walker',
  ])
)
ALCOHOL_TYPES.set(
  'Vermouth',
  new Set(['Rosso Vermouth', 'Vermouth', 'Sweet Vermouth', 'Dry Vermouth'])
)
ALCOHOL_TYPES.set(
  'Brandy',
  new Set([
    'Brandy',
    'Kirschwasser',
    'Blackberry brandy',
    'Apricot brandy',
    'Coffee brandy',
    'Apricot Brandy',
    'Grand Marnier',
    'Apple brandy',
    'Peach brandy',
    'Cherry brandy',
    'Pisco',
  ])
)

ALCOHOL_TYPES.set(
  'Wine',
  new Set([
    'Red wine',
    'Wine',
    'Champagne',
    'Dubonnet Rouge',
    'Ricard',
    'Prosecco',
    'Pernod',
    'Port',
  ])
)

ALCOHOL_TYPES.set('Tequila', new Set(['Mezcal', 'Tequila', 'Gold tequila']))
ALCOHOL_TYPES.set(
  'Beer',
  new Set(['Guinness stout', 'Corona', 'Lager', 'Ale', 'Beer'])
)
ALCOHOL_TYPES.set(
  'Fruit Liqueur',
  new Set([
    'Maraschino liqueur',
    'Strawberry liqueur',
    'Maraschino Liqueur',
    'Peach schnapps',
    'Orange spiral',
    'Triple Sec',
    'Peach Bitters',
    'Apfelkorn',
    'Melon liqueur',
    'Cointreau',
    'Chambord raspberry liqueur',
    'Banana liqueur',
    'Apple schnapps',
    'Applejack',
    'Campari',
    'Cherry Heering',
    'Strawberry schnapps',
    'Cider',
    'Cherry liqueur',
    'Surge',
    'Kiwi liqueur',
    'Orange Curacao',
    'Midori melon liqueur',
    'Falernum',
    'Passoa',
    'Curacao',
    'Peach Vodka',
    'Triple sec',
    'Orange bitters',
    'Blue Curacao',
    'Blackcurrant cordial',
    'Raspberry Liqueur',
    'Peachtree schnapps',
    'Creme de Banane',
    'Blueberry schnapps',
    'Coconut liqueur',
    'Creme de Cassis',
    'maraschino liqueur',
    'Creme de Mure',
    'Maui',
    'Aperol',
  ])
)
ALCOHOL_TYPES.set(
  'Herbal Liqueur',
  new Set([
    'Yellow Chartreuse',
    'Jägermeister',
    'Kummel',
    'Angostura Bitters',
    'Green Creme de Menthe',
    'Peppermint schnapps',
    'White Creme de Menthe',
    'Benedictine',
    'Rumple Minze',
    'Angostura bitters',
    'Jagermeister',
    'Galliano',
    'Frangelico',
  ])
)
ALCOHOL_TYPES.set('DEATH', new Set(['Grain alcohol', 'Everclear', 'Absinthe']))
ALCOHOL_TYPES.set(
  'Other',
  new Set([
    'Aquavit',
    'Sambuca',
    'Pisang Ambon',
    'Irish cream',
    'Goldschlager',
    'Amaretto',
    'Bitters',
    'Coffee liqueur',
    'Godiva liqueur',
    'Ouzo',
    'Butterscotch schnapps',
    'Tia maria',
    'Kahlua',
    'Lillet',
    'Hot Damn',
    'Chocolate liqueur',
    'Zima',
    'Cachaca',
    'Black Sambuca',
    'Peychaud bitters',
    'Baileys irish cream',
    'Anisette',
    'Erin Cream',
    'Lillet Blanc',
    'Advocaat',
    'Creme de Cacao',
    'Dark Creme de Cacao',
  ])
)

const ALC_TAGS: Alcoholic[] = [
  'All',
  'Alcoholic',
  'Non alcoholic',
  'Optional alcohol',
]

const MAX_ITEMS = 20

const NUM_PAGES = 9

export { SORT_VALS, ALCOHOL_TYPES, ALC_TAGS, MAX_ITEMS, NUM_PAGES }
