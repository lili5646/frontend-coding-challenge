// import logo from './logo.svg';
// import './App.css';
import React, { Component } from 'react';
import RepoList from '../Components/RepoList';
import axios from 'axios';
import moment from 'moment';


class App extends Component {
    constructor(){
        super();
        this.state = {
            repo: [],
            error: ''
        }
    }


    componentDidMount(){
        // Getting the data from Github API

        const DATE_30_DAYS_BEFORE = moment().subtract(30, 'days').format('YYYY-MM-DD')

        axios.get(
            ` https://api.github.com/search/repositories?q=created:>${ DATE_30_DAYS_BEFORE }&sort=stars&order=desc&page=3 `
        )

        .then(resp => {
            // console.log(resp);
            this.setState({
              repo: resp.data.items,
            });
        })

        .catch((error) => {
            // console.log('Catch Here... : ', error)
            this.setState({
              error: error,
            });
        })

    }


  render() {

    const { repo } = this.state

    return (
      <div>
        <RepoList repo={ repo }/>
      </div>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;