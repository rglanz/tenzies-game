import React from 'react'
import Dice from './components/Dice'

function App() {
  // State
  const [dice, setDice] = React.useState(allNewDice())
  const [isFinished, setIsFinished] = React.useState(false)
  const [isError, setIsError] = React.useState(false)

  // Effects
  React.useEffect(() => {
    const diceValues = dice.map(die => die.value)
    const frozenCheck = dice.every(die => die.isFrozen)
    const valueCheck = diceValues.every(die => die === diceValues[0])

    if (frozenCheck && valueCheck) {
      setIsFinished(true)
    } else if (frozenCheck && !valueCheck) {
      setIsError(true)
    } else if (!frozenCheck) {
      setIsFinished(false)
      setIsError(false)
    }
  }, [dice])

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
      return item.isFrozen ? item : makeNewDie(item)
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

  function makeNewDie(die) {
    return(
      {
        ...die,
        value: Math.ceil(Math.random() * 6)
      }
    )
  }

  function handleClick() {
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
    <div className="main-container">
      <h1 className="title">Tenzies</h1>
      <p className="description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

      <section className="dice-container">
        {diceArray}
      </section>
      

      <button
        className="roll-btn"
        onClick={handleClick}
      >{isError ? 'Try Again' :
      isFinished? 'Play Again?' : 'Roll'}</button>

    </div>
  )
}

export default App
