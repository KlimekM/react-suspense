// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
import {fetchPokemon, PokemonDataView, PokemonErrorBoundary} from '../pokemon'

let pokemon
let pokemonError
// We don't need the app to be mounted to know that we want to fetch the pokemon
// named "pikachu" so we can go ahead and do that right here.
const pokemonPromise = fetchPokemon('pikacha').then(
  pokemonData => (pokemon = pokemonData),
  error => (pokemonError = error),
)

function PokemonInfo() {
  if (pokemonError) {
    throw pokemonError
  }

  if (!pokemon) {
    throw pokemonPromise
  }
  // if the code gets it this far, then the pokemon variable is defined and
  // rendering can continue!
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

function App() {
  return (
    <div className="pokemon-info-app">
      <div className="pokemon-info">
        <PokemonErrorBoundary>
          <React.Suspense fallback={<div>Loading...</div>}>
            <PokemonInfo />
          </React.Suspense>
        </PokemonErrorBoundary>
      </div>
    </div>
  )
}

export default App
