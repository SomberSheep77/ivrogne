export type Alcoholic =
  | 'Alcoholic'
  | 'Non alcoholic'
  | 'Optional alcohol'
  | 'All'

export type IBA = 'Contemporary Classics' | 'Unforgettables' | 'New Era Drinks'

export type Category =
  | 'Ordinary Drink'
  | 'Cocktail'
  | 'Shake'
  | 'Other/Unknown'
  | 'Cocoa'
  | 'Shot'
  | 'Coffee / Tea'
  | 'Homemade Liqueur'
  | 'Punch / Party Drink'
  | 'Beer'
  | 'Soft Drink'

export type Glass =
  | 'Highball glass'
  | 'Cocktail glass'
  | 'Old-fashioned glass'
  | 'Whiskey Glass'
  | 'Collins glass'
  | 'Pousse cafe glass'
  | 'Champagne flute'
  | 'Whiskey sour glass'
  | 'Cordial glass'
  | 'Brandy snifter'
  | 'White wine glass'
  | 'Nick and Nora Glass'
  | 'Hurricane glass'
  | 'Coffee mug'
  | 'Shot glass'
  | 'Jar'
  | 'Irish coffee cup'
  | 'Punch bowl'
  | 'Pitcher'
  | 'Pint glass'
  | 'Copper Mug'
  | 'Wine Glass'
  | 'Beer mug'
  | 'Margarita/Coupette glass'
  | 'Beer pilsner'
  | 'Beer Glass'
  | 'Parfait glass'
  | 'Mason jar'
  | 'Margarita glass'
  | 'Martini Glass'
  | 'Balloon Glass'
  | 'Coupe Glass'
  | 'Cocktail Glass'
  | 'Collins Glass'
  | 'Highball Glass'
  | 'Coffee Mug'
  | 'Punch Bowl'
  | 'Shot Glass'
  | 'Champagne Flute'
  | 'Old-Fashioned glass'

export interface Drink {
  id: string
  name: string
  tags: string | null
  category: Category
  iba: IBA | null
  alcoholic: Alcoholic
  glass: Glass
  instructions: string
  ingredients: string[]
  measures: string[]
  numIngredients: number
  thumbnail: string
}
