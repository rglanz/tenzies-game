import React from 'react'
import Dice from './components/Dice'

let dice = []
for (let i = 1; i <= 10; i++) {
  const thisDie = {
    id: i,
    value: Math.ceil(Math.random() * 6)
  }
  dice.push(thisDie)
}

function App() {
  const diceArray = dice.map(die => {
    return <Dice key={die.id} value={die.value} />
  })

  return (
    <div className="App">
      <section className="main-container">
        <h1 className="title">Tenzies</h1>
        <p className="description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

        <div className="dice-container">
          {diceArray}
        </div>
        

        <button className="roll-btn">Roll</button>

      </section>
    </div>
  )
}

export default App
