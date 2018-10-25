import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    const grid = [];
    for (let row = 0; row < 20; row ++) {
      const cols = [];
      
      for (let col = 0; col < 20; col ++){
        cols.push({
          row,
          col
        });
      }
      grid.push(cols);
    }
    this.state = {
      grid,
      apple: {
        row: Math.floor(Math.random() * 20),
        col: Math.floor(Math.random() * 20)
      },
      snake: {
        head: {
          row: 9,
          col: 9
        },
        velocity: {
          x: 1,
          y: 0
        },
        tail: []
      }
    }
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.gameLoop()
    }, 1000);
    
  }
  
  gameLoop = () => {
    this.setState(({snake}) => ({
      snake: {
        head: {
          row: snake.row + this.snake.velocity.x,
          col: snake.col + this.snake.velocity.y
        }
      }
    }), () => {
      
    if (this.isOffEdge()) {
      this.setState({
        gameOver: true,
      })
      return;
    }

    if(this.collidesWithApples()) {
      this.setState(({tail, head}) => {
        return {
          snake: {
            tail: [head, ...tail],
          },
          apple: {
            row: Math.floor(Math.random() * 20),
            col: Math.floor(Math.random() * 20)
          }
        }
      });
      return;
    }


    setTimeout(() => {
      this.gameLoop()
    }, 1000);

    });

  }


  isOffEdge = () => {
    const { snake } = this.state;
    if (snake.head.col > 19
      || snake.head.col < 0
      || snake.head.row > 19 
      || snake.head.row < 0 ) {
        return true;
      } 
  }


  collidesWithApples = () => {
    const { apple, snake } = this.state;
    return apple.row === snake.head.row
      && apple.col === snake.head.col; 
  }

  isApple = (cell) => {
    const { apple } = this.state;
    return apple.row === cell.row
      && apple.col === cell.col; 
  }

  isHead = (cell) => {
    const { snake } = this.state;
    return snake.head.row === cell.row
      && snake.head.col === cell.col; 
  }

  isTail = (cell) => {
    
  }

  render() {
    const { grid } = this.state;
    return (
      <div className="App">
       <section class="grid">  
        {
          grid.map((row, i) => {
            row.map(cell => (
              <div className={`cell 
                ${
                  this.isApple(cell)
                  ? 'apple' : this.isHead(cell)
                  ? 'head' : ''
                }`
              }></div> 
            ))
          })
        }
       </section>
      </div> 
    );
  }
}

export default App;
