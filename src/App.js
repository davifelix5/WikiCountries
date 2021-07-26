import React from 'react'
import { Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import CountryList from './components/CountryList'
import CountryDetails from './components/CountryDetails'

import api from './services/api'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      loading: true,
      activeCountryCode: '',
    }
    this.setActiveCountryCode = this.setActiveCountryCode.bind(this)
  }

  componentDidMount() {
    api.get('/all').then(res => {
      this.setState({
        countries: res.data,
        loading: false,
      })
    })
  }

  setActiveCountryCode(code) {
    this.setState({
      activeCountryCode: code
    })
  }

  render() {
    if (this.state.loading) {
      return null
    }
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-5" style={{maxHeight: '90vh', overflow: 'scroll'}}>
              <CountryList activeCountryCode={this.state.activeCountryCode} countries={this.state.countries} />
            </div>
            <div className="col-7">
              <Route path='/:code'>
                <CountryDetails setActiveCountryCode={this.setActiveCountryCode} />
              </Route>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
}

export default App