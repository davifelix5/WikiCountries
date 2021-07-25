import React from 'react'

import { Link } from 'react-router-dom'

export default function ConstriesList({ countries }) {
  return (
    <div className="list-group">
      {countries.map(country  => (
        <Link key={country.alpha3Code} className="list-group-item list-group-item-action" to={`/${country.alpha3Code}`}>      
          <img style={{maxWidth: 25, marginRight: 5}} src={country.flag} alt={country.name} /> {country.name}
        </Link>
      ))}
    </div>
  )
}