import React from 'react'

import { Link, withRouter } from 'react-router-dom'

import api from '../services/api'

class CountryDetails extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      country: {},
      borders: [],
      loading: true,
      code: this.props.match.params.code
    }
  }

  async fetchData() {

    this.setState({
      loading: true,
    })
    this.props.setActiveCountryCode(this.state.code)

    const countryRes = await api.get(`/alpha/${this.state.code}`)
    const country = countryRes.data
    const borders = []
    
    for (let border of country.borders) {
      const res = await api.get(`/alpha/${border}`)
      borders.push(res.data)
    }
    
    this.setState({
      borders,
      country,
      loading: false,
    })
  }

  static getDerivedStateFromProps(props, state) {
    const code = props.match.params.code
    if (code !== state.code) {
      return {
        code,
      }
    }
    return null
  }

  componentDidUpdate(preProps) {
    if (preProps.match.params.code !== this.state.code) {
      this.fetchData()
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  render() {
    if (this.state.loading) {
      return <div className="spinner-border" role="status" />
    }
    return (
      <>
        <h1>{this.state.country.name}</h1>
              <table className="table">
                <thead></thead>
                <tbody>
                  <tr>
                    <td style={{width: '30%'}}>Capital</td>
                    <td>{this.state.country.capital}</td>
                  </tr>
                  <tr>
                    <td>Area</td>
                    <td>
                      {this.state.country.area} km
                      <sup>2</sup>
                    </td>
                  </tr>
                  <tr>
                    <td>Borders</td>
                    <td>
                      {this.state.borders.length > 0 ? (
                        <ul>
                          {this.state.borders.map(border => (
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
}

export default withRouter(CountryDetails)
