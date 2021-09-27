import React, { useEffect, useState, useReducer, forwardRef, useImperativeHandle } from 'react'

const Board = forwardRef((props, refs) => {
  const forceUpdate = useReducer(() => ({}), {})[1]
  const [selCel, setSelCel] = useState(null)
  const [board, setBoard] = useState(props.board)

  useImperativeHandle(refs, () => ({
    getData() {
      return board
    },
  }))

  const cellClick = (e) => {
    setSelCel(e.target.id)
    console.log(e.target.id)
    e.target.classList.add("active-cell")
  }

  const numberBtnClick = (e) => {
    if (selCel !== null) {
      const cell = selCel.split("")
      board[cell[0]][cell[1]] = e.target.textContent
      setBoard(board)
      forceUpdate()
    }
  }

  useEffect(() => {
    if (selCel !== null) {
      document.getElementById(selCel).classList.add("active-cell")
    }
  }, [selCel])

  const RenderBoard = () => {
    return board.map((x, xIndex) => {
      return <div className={xIndex === 2 || xIndex === 5 ? "border-bottom" : ""} key={xIndex}>
        {x.map((y, yIndex) => {
          return <div
            key={yIndex}
            id={`${xIndex}${yIndex}`}
            className={(xIndex + yIndex) % 2 === 0 ?
              (yIndex === 2 || yIndex === 5 ? "cell-odd border-right" : "cell-odd") :
              (yIndex === 2 || yIndex === 5 ? "cell-even border-right" : "cell-even")}>
            {y}
          </div>
        })}
        <br clear="all" />
      </div>
    })
  }

  return (
    <>
      <div onClick={cellClick} className="board-container">
        <RenderBoard />
      </div>
      <div className="button-container" onClick={numberBtnClick}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
        <div>9</div>
      </div>
    </>
  )
})

export default Board