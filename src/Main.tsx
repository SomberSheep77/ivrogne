import React, { useEffect, useState } from 'react'
import './global.sass'
import { DrinkCard } from './components/Drink'
import { Drinks } from './data/drinks'
import { Dropdown, MultipleDropdown } from './components/Dropdown'
import { ReactComponent as DropdownArrow } from './components/assets/icons/dropdown-arrow.svg'
import css from './Main.module.sass'
import { Drink, Alcoholic } from './data/types'
import {
  SORT_VALS,
  ALCOHOL_TYPES,
  ALC_TAGS,
  MAX_ITEMS,
  NUM_PAGES,
} from './Constants'

const ALL_ALC_TYPES = new Set(Array.from(ALCOHOL_TYPES.keys()))
export default function Main() {
  const [ingredientMap, setIngredientMap] = useState<Map<string, number>>(
    new Map()
  )
  const [ingredientList, setIngredientList] = useState<string[]>([])
  const [alcs, setAlcs] = useState(new Set(ALL_ALC_TYPES))
  const [sortKey, setSortKey] = useState(SORT_VALS[0])
  const [alcoholic, setAlcoholic] = useState<Alcoholic>('All')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [showFavorites, setShowFavorites] = useState(false)
  const [drinks, setDrinks] = useState([...Drinks])
  const [curPage, setCurPage] = useState(1)
  const [range, setRange] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9])

  let addDrink = (name: string, ingredients: string[]) => {
    if (favorites.has(name)) return
    let temp = favorites
    temp.add(name)
    setFavorites(new Set(temp))
    let map = ingredientMap
    for (let ingredient of ingredients) {
      map.set(ingredient, (map.get(ingredient) ?? 0) + 1)
    }
    setIngredientMap(map)
    setIngredientList(Array.from(ingredientMap.keys()))
  }

  let removeDrink = (name: string, ingredients: string[]) => {
    if (!favorites.has(name)) return
    let temp = favorites
    temp.delete(name)
    setFavorites(new Set(temp))
    let map = ingredientMap
    for (let ingredient of ingredients) {
      if (!map.has(ingredient)) continue
      map.set(ingredient, (map.get(ingredient) ?? 1) - 1)
      if ((map.get(ingredient) ?? 1) === 0) map.delete(ingredient)
    }
    setIngredientMap(map)
    setIngredientList(Array.from(ingredientMap.keys()))
  }

  let toggleCheckbox = (alc: string) => {
    if (alc === 'Select/Deselect All') {
      if (alcs.size === ALL_ALC_TYPES.size) setAlcs(new Set())
      else setAlcs(new Set(ALL_ALC_TYPES))
      return
    }
    let temp = alcs
    if (alcs.has(alc)) {
      temp.delete(alc)
    } else {
      temp.add(alc)
    }
    setAlcs(new Set(temp))
  }

  let filterTypes = () => {
    let ingredientSet = new Set()
    alcs.forEach((alc) => {
      ALCOHOL_TYPES.get(alc)?.forEach((a) => ingredientSet.add(a))
    })
    let temp = [...Drinks]
    if (showFavorites) temp = temp.filter((drink) => favorites.has(drink.name))
    if (alcoholic !== 'All')
      temp = temp.filter((drink) => drink.alcoholic === alcoholic)
    if (alcoholic === 'Non alcoholic' || alcoholic === 'Optional alcohol')
      return temp
    temp = temp.filter((drink) => {
      for (let i of drink.ingredients) {
        if (
          alcoholic === 'All' &&
          (drink.alcoholic === 'Non alcoholic' ||
            drink.alcoholic === 'Optional alcohol')
        )
          return true
        if (ingredientSet.has(i)) return true
      }
      return false
    })
    return temp
  }

  let sortData = (data: Drink[]) => {
    let fn: (a: Drink, b: Drink) => number
    switch (sortKey) {
      case 'A to Z':
        fn = (a: Drink, b: Drink) => a.name.localeCompare(b.name)
        break
      case 'Z to A':
        fn = (a: Drink, b: Drink) => b.name.localeCompare(a.name)
        break
      case 'Ingredients - Asc':
        fn = (a: Drink, b: Drink) => a.numIngredients - b.numIngredients
        break
      case 'Ingredients - Dsc':
        fn = (a: Drink, b: Drink) => b.numIngredients - a.numIngredients
        break
    }
    return data.sort((a: Drink, b: Drink) => fn(a, b))
  }

  let calcRange = (dataLen: number): number[] => {
    let totalPages = Math.ceil(dataLen / MAX_ITEMS)
    if (totalPages <= NUM_PAGES)
      return Array(totalPages)
        .fill(0)
        .map((_, i) => i + 1)
    if (curPage <= 5) return [1, 2, 3, 4, 5, 6, 7, -1, totalPages]
    if (curPage >= totalPages - 5)
      return [
        1,
        -1,
        totalPages - 6,
        totalPages - 5,
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ]
    return [
      1,
      -1,
      curPage - 2,
      curPage - 1,
      curPage,
      curPage + 1,
      curPage + 2,
      -1,
      totalPages,
    ]
  }

  let pageBtn = (page: number) => (
    <div
      className={`${css.pageBtn} ${page === curPage && css.selected}`}
      onClick={() => setCurPage(page)}
    >
      {page}
    </div>
  )
  let dots = <div className={css.dots}>. . .</div>

  let scrollTop = () => window.scrollTo({ top: 0, left: 0 })

  useEffect(() => {
    let temp = filterTypes()
    if (JSON.stringify(temp) !== JSON.stringify(drinks)) {
      setCurPage(1)
      scrollTop()
    }
    let sorted = sortData(temp)
    if (JSON.stringify(temp) !== JSON.stringify(sorted)) {
      scrollTop()
    }
    setDrinks(sorted)
    setRange(calcRange(sorted.length))
  }, [alcs, alcoholic, sortKey, showFavorites])

  useEffect(() => {
    if (!showFavorites) {
      return
    }
    let temp = filterTypes()
    setDrinks(temp)
    setRange(calcRange(temp.length))
  }, [favorites])

  useEffect(() => {
    setRange(calcRange(drinks.length))
    scrollTop()
  }, [curPage])

  return (
    <div className={css.container}>
      <div className={css.titleText}>
        <h1 className={css.title}>ivrogne</h1>
        <h2 className={css.subtitle}>
          find and make the perfect cocktails to drink alone
        </h2>
      </div>
      <div className={css.contentContainer}>
        <div className={css.menu}>
          <div>
            <p className={`${css.optionTitle} ${css.first}`}>Sort</p>
            <Dropdown
              curItem={sortKey}
              setItem={setSortKey}
              values={SORT_VALS}
            />
          </div>

          <div className={css.alcoholic}>
            <p className={css.optionTitle}>Alcoholic</p>
            {ALC_TAGS.map((alc) => {
              return (
                <div
                  className={css.inputGroup}
                  onClick={() => setAlcoholic(alc)}
                >
                  <span>
                    <input
                      type='radio'
                      value={alc}
                      name='alcType'
                      onChange={() => setAlcoholic(alc)}
                      checked={alcoholic === alc}
                    />
                  </span>
                  <label onClick={() => setAlcoholic(alc)}>{alc}</label>
                </div>
              )
            })}
          </div>
          <div>
            <div className={css.optionTitle}>Alcohol Type</div>
            <MultipleDropdown
              items={alcs}
              values={['Select/Deselect All'].concat(Array.from(ALL_ALC_TYPES))}
              disabled={alcoholic !== 'All' && alcoholic !== 'Alcoholic'}
              selectItem={(item) => toggleCheckbox(item)}
            />
          </div>

          <div className={css.favoriteGroup}>
            <div className={css.optionTitle}>Other</div>
            <div className={css.inputGroup}>
              <span>
                <input
                  type='checkbox'
                  value='false'
                  checked={showFavorites}
                  onChange={() => setShowFavorites(!showFavorites)}
                />
              </span>
              <label>Favorites</label>
            </div>
          </div>

          <MultipleDropdown
            title='Necessary Ingredients'
            values={ingredientList}
            disabled={false}
            selectItem={() => {}}
          />
        </div>
        <div>
          <div className={css.drinks}>
            {drinks.length ? (
              drinks
                .slice((curPage - 1) * MAX_ITEMS, curPage * MAX_ITEMS)
                .map((ele, _) => (
                  <DrinkCard
                    key={ele.name}
                    drink={ele}
                    add={addDrink}
                    remove={removeDrink}
                    addedInit={favorites.has(ele.name)}
                  />
                ))
            ) : (
              <div>
                Please select some alcohol types to get started or expand your
                filters
              </div>
            )}
          </div>
          {drinks.length > 0 && (
            <div className={css.pages}>
              <div
                className={css.arrow}
                onClick={() => setCurPage(Math.max(curPage - 1, 1))}
              >
                <DropdownArrow />
              </div>
              {range.map((n) => (n === -1 ? dots : pageBtn(n)))}
              <div
                className={css.arrow}
                onClick={() =>
                  setCurPage(
                    Math.min(curPage + 1, Math.ceil(drinks.length / MAX_ITEMS))
                  )
                }
              >
                <DropdownArrow />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
