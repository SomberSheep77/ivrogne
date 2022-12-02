# ivrogne

A website to find cocktail recipes and the necessary ingredients to make your favorite drinks.  
Visit it [here](https://sombersheep77.github.io/ivrogne)

## Inspiration & Goal

I don't drink alcohol, but simply chose this theme because [this](https://www.thecocktaildb.com/api.php) was the first api that popped up when looking for free apis, and I thought all the data and images would make for a good set of item cards.  
I used [this repository](https://github.com/lauriharpf/thecocktaildb-downloader) to download the information into a json, then cleaned the data up using cleaning.py.

You can filter the drinks by whether or not it is alcoholic as well as using a list of ingredients that a cocktail contains. Additionally, you can sort the filtered data alphabetically or by number of ingredients.

You can also favorite a drink and the site will show all the necessary ingredients to make all your favorite drinks

## Components

Main contains all the filter, sort, and pagination related logic.

data/drinks.ts and data/types.ts were just data files generated from the aforementioned repository and then cleaned by me.  
Constants.tsx just exports all the constants used by Main

I created two components, Drink, and Dropdown. The Drink component displays each drink's card. There are two variations of the Dropdown component, one that allows for only 1 selection, and one that allows for multiple, the former used for sorting, and the latter for filtering. While those are technically the only two React components, the site also uses buttons used for pagination, which could have been abstracted to be a separate component.

## Layout & Hierarchy Considerations

I created dropdown menus since there are a lot of different sort and filter options. While sort and the alcoholic radio buttons both have 4 options and are mutually exclusive, I opted to make sort a dropdown since I see sort dropdowns a lot online and followed convention. Additionally, having the radio buttons for alcoholic options broke up the flow of the menu and looked better than having many dropdown menus. I chose to make the alcohol type filter and ingredients list both dropdowns since the former contains 13 types and the latter could exceed hundreds.

I decided it was necessary to paginate the results since having all 500+ drinks on one page made for a rough browsing experience. I chose to cap it at 20 after playing around for a bit and feeling like it was similar in height to sites like google that also paginate results. Additionally 20 allows for some amount of scrolling without bringing one too far away from the sort menu. I opted to not make the side menu sticky as it interfered with the dropdown menu scrolling experience.

## Props

The Drink component takes in a `drink` type which contains each field from the json, two `function`s used when favoriting and unfavoritng, and `addedInit` a boolean representing whether this drink is already in favorites. Each Drink component maintains a state `added` to toggle the add to favorites button and is initially set to `addedInit`.

The two dropdown components both take in list of values, and a function that runs when one of those values is clicked. The other fields like `disabled`, and `items` are optional. `disabled` is used to disable the alchol type filter dropdown when the user selects non alcoholic beverages as those are mutually exclusive cases.

## State & State Changes

I maintain 8 different state variables in Main: `ingredientMap, ingredientList, alcs, sortKey, alcoholic, favorites, showFavorites, drinks, curPage, range`

`ingredientMap` is a map of ingredient as a string to count as a number since multiple drinks could have the same ingredient but I need to make sure that if I add or remove one, it does not affect the other collisions.  
`ingredientList` is just the array of keys of `ingredientMap`  
`alcs` is a set of alcohol types used for filtering  
`sortKey` is the sort key used to sort the drinks  
`favorites` is a set of favorited drink names  
`showFavorites` is a boolean used for filtering only favorited drinks  
`drinks` is an array of `drink` types and is the array of drinks displayed on the page  
`curPage` is an 1-indexed int for the current page  
`range` is an array of page numbers used for pagination  

I use three useEffects within Main to trigger state changes. One when changing sort or filter options, one when adding to favorites, and one when changing the page.

When filtering or sorting, the `drinks` state array is changed according to the filter/sort options, then the `curPage` is reset back to 1 and the user is brought back up to the top to view a new set of drinks.

When adding to favorites, a state change is required when the user is viewing only the favorites list as those that are unfavorited, should be removed from the screen and thus a rerender is required.

When changing the page, a state change is also required to recalculate the page buttons at the buttons.
