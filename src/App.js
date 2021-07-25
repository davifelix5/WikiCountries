import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import CountryList from './components/CountryList'
import CountryDetails from './components/CountryDetails'

import api from './services/api'

export default function App() {

  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/all').then(res => {
      setCountries(res.data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return null
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-5" style={{maxHeight: '90vh', overflow: 'scroll'}}>
            <CountryList countries={countries} />
          </div>
          <div className="col-7">
            <Route path='/:code'>
              <CountryDetails />
            </Route>
          </div>
        </div>
      </div>
    </div>
  )
}

