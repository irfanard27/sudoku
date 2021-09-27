import './App.less';
import { Button, Layout, Modal, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Board from './Board';
import CountDown from './CountDown';
import { useRef } from 'react';
import { sudoku2 } from './lib/solver';

const defaultBoard = [
  ["", "", "6", "", "", "", "4", "1", "",],
  ["", "", "1", "", "7", "", "", "2", "9",],
  ["", "9", "2", "3", "", "1", "", "", "",],
  ["6", "", "5", "", "3", "7", "", "", "2",],
  ["", "", "8", "2", "", "5", "1", "", "",],
  ["4", "", "", "1", "6", "", "5", "", "7",],
  ["", "", "", "9", "", "3", "7", "6", "",],
  ["9", "8", "", "", "1", "", "3", "", "",],
  ["", "", "6", "3", "", "", "2", "", "",],
]


function App() {
  const boadRef = useRef()

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
    let isSolve = sudoku2(data)
    if (isSolve) {
      notification["success"]({
        message: "It's correct"
      })
    } else {
      notification["warning"]({
        message: "Still not resolve"
      })
    }
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
      <Layout>
        <Layout.Header className="header" style={{ paddingTop: 20 }}>
          <img src="sudoku-logo.png" alt="logo" />
        </Layout.Header>
        <Layout.Content className="content">
          <div className="content-body">
            <div style={{ marginTop: 70, width: 400 }}>
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
                <Board board={defaultBoard} ref={boadRef} />
              </div>
            </div>

          </div>
        </Layout.Content>
      </Layout>
    </>
  );
}

export default App;
