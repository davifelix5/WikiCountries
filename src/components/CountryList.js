import React from 'react'

import { Link } from 'react-router-dom'

export default function ConstriesList({ countries, activeCountryCode }) {
  return (
    <div className="list-group">
      {countries.map(country  => {
        let className = 'list-group-item list-group-item-action'
        className += activeCountryCode === country.alpha3Code ? ' bg-primary text-white' : ''
        return (
          <Link key={country.alpha3Code} className={className} to={`/${country.alpha3Code}`}>      
            <img style={{maxWidth: 25, marginRight: 5}} src={country.flag} alt={country.name} /> {country.name}
          </Link>
        )
      })}
    </div>
  )
}