import React, { useState, useEffect } from 'react'

import { Link, useParams } from 'react-router-dom'

import api from '../services/api'

export default function CountryDetails({ setActiveCountryCode }) {

  const { code } = useParams()
  
  const [country, setCountry] = useState({})
  const [borders, setBorders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setActiveCountryCode(code)
    async function fetchData() {
      const countryRes = await api.get(`/alpha/${code}`)
      setCountry(countryRes.data)

      const borders = []
      for (let border of countryRes.data.borders) {
        const res = await api.get(`/alpha/${border}`)
        borders.push(res.data)
      }
      setBorders(borders)

      setLoading(false)
    }
    fetchData()
  }, [code, setCountry, setBorders, setLoading, setActiveCountryCode])

  if (loading) {
    return <div className="spinner-border" role="status" />
  }

  return (
    <>
      <h1>{country.name.common}</h1>
            <table className="table">
              <thead></thead>
              <tbody>
                <tr>
                  <td>Country</td>
                  <td>{country.name}</td>
                </tr>
                <tr>
                  <td style={{width: '30%'}}>Capital</td>
                  <td>{country.capital}</td>
                </tr>
                <tr>
                  <td>Area</td>
                  <td>
                    {country.area} km
                    <sup>2</sup>
                  </td>
                </tr>
                <tr>
                  <td>Borders</td>
                  <td>
                    {borders.length > 0 ? (
                      <ul>
                        {borders.map(border => (
                          <li key={border.alpha3Code}>
                            <Link to={`/${border.alpha3Code}`}>{border.name}</Link>
                          </li>
                        ))}
                      </ul>
                    ) : 'No borders'}
                  </td>
                </tr>
              </tbody>
            </table>
    </>
  )
}