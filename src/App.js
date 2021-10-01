import './App.less';
import { Button, Layout, Modal, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Board from './Board';
import CountDown from './CountDown';
import { useReducer, useRef } from 'react';
import { sudoku2, solveMe } from './lib/solver';
import { solveSuduko } from './lib/backtrack';

// const defaultBoard = [
//   ["", "", "6", "", "", "", "4", "1", "",],
//   ["", "", "1", "", "7", "", "", "2", "9",],
//   ["", "9", "2", "3", "", "1", "", "", "",],
//   ["6", "", "5", "", "3", "7", "", "", "2",],
//   ["", "", "8", "2", "", "5", "1", "", "",],
//   ["4", "", "", "1", "6", "", "5", "", "7",],
//   ["", "", "", "9", "", "3", "7", "6", "",],
//   ["9", "8", "", "", "1", "", "3", "", "",],
//   ["", "", "7", "3", "", "", "2", "", "",],
// ]

// const defaultBoard2 = [
//   ["", "2", "3", "4", "5", "6", "7", "8", "9"],
//   ["", "5", "6", "7", "8", "9", "1", "2", "3"],
//   ["7", "8", "", "1", "2", "3", "4", "5", "6"],
//   ["2", "3", "4", "", "", "", "", "", ""],
//   ["5", "", "", "", "", "", "", "", ""],
//   ["6", "", "", "", "", "", "", "", ""],
//   ["7", "", "", "", "", "", "", "", ""],
//   ["8", "", "", "", "", "", "", "", ""],
//   ["9", "", "", "", "", "", "", "", ""]
// ]

const defBoard = [
  [3, 0, 6, 5, 0, 8, 4, 0, 0],
  [5, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 8, 7, 0, 0, 0, 0, 3, 1],
  [0, 0, 3, 0, 1, 0, 0, 8, 0],
  [9, 0, 0, 8, 6, 3, 0, 0, 5],
  [0, 5, 0, 0, 9, 0, 6, 0, 0],
  [1, 3, 0, 0, 0, 0, 2, 5, 0],
  [0, 0, 0, 0, 0, 0, 0, 7, 4],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]
]

function App() {
  const boadRef = useRef()
  const forceUpdate = useReducer(() => ({}), {})[1]
  const newGame = () => {
    Modal.confirm({
      content: "Are Your Sure To New Game",
      onOk: () => {
        window.location.reload()
      }
    })
  }

  const solve = () => {
    let data = boadRef.current.getData()
    //solveMe(data)
    solveSuduko(data, 0, 0)
    forceUpdate()
  }

  const timesUp = (data) => {
    //setIsTimesUp(data)
    if (data === true) {
      const dataBoard = boadRef.current.getData()

      if (sudoku2(dataBoard) === true) {
        document.getElementById("result").innerHTML = "GOOG JOB, ANSWER IS CORRECT"
      } else {
        document.getElementById("result").innerHTML = "STILL INCORRECT"
      }

      dataBoard.forEach(el => {
        if (el.includes("")) {
          document.getElementById("result").innerHTML = "STILL INCORRECT"
        }
      })
    }
  }

  return (
    <>
      <Layout style={{ background: "#ffffff" }}>
        <Layout.Header className="header" style={{ paddingTop: 20 }}>
          <img src="sudoku-logo.png" alt="logo" />
        </Layout.Header>
        <Layout.Content className="content">
          <div className="content-body">
            <div className="explanation">
              <h1>Play <br />Sudoku!</h1>
              <p>
                You can complete this sudoku with your<br />
                abilities or click on the button below to<br />
                finish it automaticaly :)
              </p><br />
              <Button danger block type="primary" size="large" className="btn-solve" onClick={solve}>
                <span style={{ padding: 10 }}>SOLVE ME!</span>
              </Button>
            </div>

            <div className="game-container">
              <div style={{ float: 'left', paddingTop: 15 }}>
                <Button type="primary" onClick={newGame}>
                  <PlusOutlined /> NEW GAME
                </Button>
              </div>

              <div style={{ float: 'right', textAlign: 'right', color: '#fff' }}>
                <small>Time Remaining</small>
                <div className="time-remaining">
                  <CountDown onTimesUp={timesUp} />
                </div>
              </div><br clear="all" /><br />
              <div id="result"></div>
              <div>
                <Board board={defBoard} ref={boadRef} />
              </div>
            </div>
          </div>
          <div className="second-button">
            <Button danger block type="primary" size="large" className="btn-solve" onClick={solve}>
              <span style={{ padding: 10 }}>SOLVE ME!</span>
            </Button>
          </div>
        </Layout.Content>
      </Layout>
    </>
  );
}

export default App;
