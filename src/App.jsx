import React from 'react'
import Dice from './components/Dice'

function App() {
  // State
  const [dice, setDice] = React.useState(allNewDice())
  const [isFinished, setIsFinished] = React.useState(false)

  // Effects
  React.useEffect(() => {
    allNewDice()
  }, [])


  // Functions
  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push({
        id: i,
        value: Math.ceil(Math.random() * 6),
        isFrozen: false
      })
    }
    return newDice
  }

  function rollDice() {
    const newDice =  dice.map(item => {
        let frozenDice
        if (item.isFrozen) {
          frozenDice = item
        } else {
          frozenDice = {
            ...item,
            value: Math.ceil(Math.random() * 6)
          }
        }

        return frozenDice
      })
      return newDice
    }

  function freezeDice(diceId) {
    setDice(prevDice => prevDice.map(item => {
      const toFreeze = (item.id === diceId) ? !item.isFrozen : item.isFrozen
          return(
            {
              ...item,
              isFrozen: toFreeze
            }
          )
    }))
  }

  function checkForFinish() {
    let finish = true
    for (let i = 0; i < 10; i++) {
      if (!dice[i].isFrozen) {
        finish = false
      }
    }
    return finish
  }

  function handleClick() {
    setIsFinished(checkForFinish)
    if (isFinished) {
      setDice(allNewDice())
      setIsFinished(false)
    } else {
      setDice(rollDice())
    }
  }

  // Element Arrays
  const diceArray = dice.map(die => {
    return <Dice
              key={die.id}
              id={die.id}
              value={die.value}
              isFrozen={die.isFrozen}
              handleClick={freezeDice}
            />
  })

  // Initialize Components
  return (
    <div className="App">
      <section className="main-container">
        <h1 className="title">Tenzies</h1>
        <p className="description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

        <div className="dice-container">
          {diceArray}
        </div>
        

        <button
          className="roll-btn"
          onClick={handleClick}
        >{isFinished ? 'Play Again' : 'Roll'}</button>

      </section>
    </div>
  )
}

export default App
