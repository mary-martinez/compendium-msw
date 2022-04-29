import React from 'react'
import { useState } from 'react';

export default function Search( {callback} ) {
  const [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    console.log(e.target.value);
    callback(e.target.value);
    setSearch(e.target.value);
  }

  return (
    <div>
      <input value={search} onChange={(e) => handleSearchChange(e)} />
    </div>
  )
}
