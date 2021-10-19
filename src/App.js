import { Component } from 'react';
import './App.css';

export class App extends Component {

  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:4000', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query {
              categories {
                name
              }
            }
          `
        })
      });

      if (!response.ok) {
        throw Error('Something went wrong!');
      }
      const data = await response.json();
      console.log(data.data.categories);

    } catch (error) {
      console.log(error);
    }
  }
  

  render() {
    return (
      <h1>Hello World</h1>
    )
  }
}


export default App;
