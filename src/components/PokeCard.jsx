import React from 'react'

export default function PokeCard( {poke} ) {
  return (
    <div>
      <h3>{poke.pokemon}</h3>
      <img src={poke.url_image} />
    </div>
  )
}
