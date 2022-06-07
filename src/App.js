import { useEffect, useState } from "react";
import { bingo } from "./data";
import DrawCanvas from './utils/DrawCanvas'
import {  shuffle ,chkDiagonal,chkLeftDiagonal,chkHorizontal} from "./utils/Helper";
import Tools from "./utils/Tools";


function App() {
  const [winner, setWinner] = useState(false);
  const [bingoColumn, setbingoColumn] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  const [bingoWinCount, setbingoWinCount] = useState(0);
  const [activeCardPosition, setActiveCardPosition] = useState({});
  const [winArray, setwinArray] = useState([]);
  const [boardClickEventType, setboardClickEventType] = useState(0);
  const chunkSize = 5;
  let bingoColumnMap = [];
  const eachBingoMap = {};

  const allProps = {
    bingoColumn,
    setbingoColumn,
    winner,
    setWinner,
    activeCard,
    setActiveCard,
    bingoWinCount,
    setbingoWinCount,
    activeCardPosition,
    setActiveCardPosition,
    winArray,
    setwinArray,
    boardClickEventType,
    setboardClickEventType,
    bingoColumnMap,
    eachBingoMap,
  };
 let tool=  Tools(allProps)
  useEffect(() => {
    setbingoColumn(shuffle(bingo || []));
  }, []);
  bingoColumn.forEach(({ id }, index) => {
    eachBingoMap[id] = index;
  });

  for (let i = 0; i < bingoColumn.length; i += chunkSize) {
    const chunk = bingoColumn.slice(i, i + chunkSize);
    bingoColumnMap.push(chunk);
  }
  
 
  function unChkDiagonal(bingoColumnMap) {
    let tempDiagonal = [];
    let isWin = true;
    for (let j = 0; j < bingoColumnMap.length; j++) {
      if (bingoColumnMap[j][j].status !== 1) {
        isWin = false;
      }
      if (
        !bingoColumnMap[j][j].verticalWin &&
        !bingoColumnMap[j][j].horizontalWin &&
        !bingoColumnMap[j][j].leftDiagonalWin
      ) {
        tempDiagonal.push(bingoColumnMap[j][j].id);
      }
    }
    if (!isWin) {
      tempDiagonal.forEach((curentTempBingo) => {
        bingoColumn[eachBingoMap[curentTempBingo]].win = false;
        bingoColumn[eachBingoMap[curentTempBingo]].diagonalWin = false;
      });

      const updateWinArray = tempDiagonal.every((element) => {
        return winArray.filter((current) => current !== element);
      });
      if (Array.isArray(updateWinArray)) {
        setwinArray(updateWinArray);
      }

      setbingoColumn([...bingoColumn]);
    }
  }
  function chkVertical(bingoColumnMap) {
    for (let i = 0; i < bingoColumnMap.length; i++) {
      let isWin = true;
      let temp = [];
      for (let j = 0; j < bingoColumnMap.length; j++) {
        if (bingoColumnMap[j][i].status !== 1) {
          isWin = false;
          break;
        }
        temp.push(bingoColumnMap[j][i].id);
      }

      if (isWin) {
        temp.forEach((curentTempBingo) => {
          bingoColumn[eachBingoMap[curentTempBingo]].win = true;
          bingoColumn[eachBingoMap[curentTempBingo]].verticalWin = true;
        });

        if (temp.length === 5) {
          const containsAll = temp.every((element) => {
            return winArray.includes(element);
          });
          if (!containsAll) {
            setwinArray([...winArray, ...temp]);
            setbingoWinCount(bingoWinCount + 1);
            setWinner(true);
          }
        }
      }
    }

    setbingoColumn([...bingoColumn]);
  }
  

  function unChkLeftDiagonal(bingoColumnMap) {
    let tempDiagonal = [];
    let isWin = true;
    for (
      let j = 0, i = bingoColumnMap.length - 1;
      j < bingoColumnMap.length;
      j++, i--
    ) {
      if (bingoColumnMap[j][i].status !== 1) {
        isWin = false;
      }
      if (
        !bingoColumnMap[j][i].verticalWin &&
        !bingoColumnMap[j][i].horizontalWin &&
        !bingoColumnMap[j][i].diagonalWin
      ) {
        tempDiagonal.push(bingoColumnMap[j][i].id);
      }
    }

    if (!isWin) {
      tempDiagonal.forEach((curentTempBingo) => {
        bingoColumn[eachBingoMap[curentTempBingo]].win = false;
        bingoColumn[eachBingoMap[curentTempBingo]].leftDiagonalWin = false;
      });

      const updateWinArray = tempDiagonal.every((element) => {
        return winArray.filter((current) => current !== element);
      });
      if (Array.isArray(updateWinArray)) {
        setwinArray(updateWinArray);
      }

      setbingoColumn([...bingoColumn]);
    }
  }

 

  function unChkHorizontal(bingoColumnMap, rowToUncheck) {
    let isWin = true;
    let temp = [];
    for (let j = 0; j < bingoColumnMap[rowToUncheck].length; j++) {
      if (bingoColumnMap[rowToUncheck][j].status !== 1) {
        isWin = false;
      }
      if (
        !bingoColumnMap[rowToUncheck][j].verticalWin &&
        !bingoColumnMap[rowToUncheck][j].diagonalWin &&
        !bingoColumnMap[rowToUncheck][j].leftDiagonalWin
      ) {
        temp.push(bingoColumnMap[rowToUncheck][j].id);
      }
    }

    if (!isWin) {
      temp.forEach((curentTempBingo) => {
        bingoColumn[eachBingoMap[curentTempBingo]].win = false;
        bingoColumn[eachBingoMap[curentTempBingo]].horizontalWin = false;
      });

      const updateWinArray = temp.every((element) => {
        return winArray.filter((current) => current !== element);
      });
      if (Array.isArray(updateWinArray)) {
        setwinArray(updateWinArray);
      }

      setbingoColumn([...bingoColumn]);
    }
  }

  

  function unChkVertical(bingoColumnMap, columnToUncheck) {
    let isWin = true;
    let temp = [];
    for (let j = 0; j < bingoColumnMap.length; j++) {
      if (bingoColumnMap[j][columnToUncheck].status !== 1) {
        isWin = false;
      }
      if (
        !bingoColumnMap[j][columnToUncheck].horizontalWin &&
        !bingoColumnMap[j][columnToUncheck].diagonalWin &&
        !bingoColumnMap[j][columnToUncheck].leftDiagonalWin
      ) {
        temp.push(bingoColumnMap[j][columnToUncheck].id);
      }
    }

    if (!isWin) {
      temp.forEach((curentTempBingo) => {
        bingoColumn[eachBingoMap[curentTempBingo]].win = false;
        bingoColumn[eachBingoMap[curentTempBingo]].verticalWin = false;
      });

      const updateWinArray = temp.every((element) => {
        return winArray.filter((current) => current !== element);
      });
      if (Array.isArray(updateWinArray)) {
        setwinArray(updateWinArray);
      }

      setbingoColumn([...bingoColumn]);
    }
  }
  useEffect(() => {
    const { i = 0, j = 0 } = activeCardPosition;
    if (Number(boardClickEventType) > 0) {
      setbingoColumn(
        bingoColumn.map((currentBingo) => {
          if (String(currentBingo.id) === "12") {
            currentBingo.status = 1;
          }
          if (
            String(currentBingo.id) === String(activeCard) &&
            String(currentBingo.id) !== "12"
          ) {
            currentBingo.status = 1;
          }
          return currentBingo;
        })
      );

      if (i + j === 4) {
        chkLeftDiagonal(bingoColumnMap,tool);
      } else if (i === j) {
        chkDiagonal(bingoColumnMap,tool)
      }

      chkHorizontal(bingoColumnMap,tool);
      chkVertical(bingoColumnMap,tool);
    } else if (Number(boardClickEventType < 0)) {
      setbingoColumn(
        bingoColumn.map((currentBingo) => {
          if (String(currentBingo.id) === "12") {
            currentBingo.status = 1;
          }
          if (
            String(currentBingo.id) === String(activeCard) &&
            currentBingo.status == 1 &&
            String(currentBingo.id) !== "12"
          ) {
            currentBingo.status = 0;
            currentBingo.win = false;
          }
          return currentBingo;
        })
      );
      if (i + j === 4) {
        unChkLeftDiagonal(bingoColumnMap);
      } else if (i === j) {
        unChkDiagonal(bingoColumnMap);
      }
      unChkHorizontal(bingoColumnMap, i);

      unChkVertical(bingoColumnMap, j);
    }
  }, [activeCard, boardClickEventType]);
  return (
    <div className="bgdds d-flex justify-content-center">
      <div className="shadow-sm overflow-hidden rounded-lg text-white yellow-border board-wrapper m-auto mt-5 justify-content-center">
        <div className=" bg-red text-center d-flex align-items-center justify-content-center position-relative">
          <h3 className="m-0 p-3">Online Conferencing </h3>
          <p className=" position-absolute score-text">
            {" "}
            score:{" "}
            <span className=" bg-wne px-1 rounded"> {bingoWinCount} </span>
          </p>
        </div>

        <div className=" bg-wne p-0 p-md-3 ">
          {!!bingoColumnMap &&
            bingoColumnMap.map((currentRow, index) => {
              return (
                <div key={index} className="table-wrapper">
                  {!!currentRow &&
                    currentRow.map((currentColumn, columnIndex) => {
                      return (
                        <div
                          key={columnIndex}
                          id={`card-${currentColumn.id}`}
                          onClick={() => {
                            setboardClickEventType(
                              Number(currentColumn.status) == 1 ? -1 : 1
                            );
                            setActiveCard(currentColumn.id);
                            activeCardPosition.i = index;
                            activeCardPosition.j = columnIndex;

                            setActiveCardPosition(activeCardPosition);
                          }}
                          className={`p-0 mb-2 ${
                            !!bingoColumn[eachBingoMap[currentColumn.id]]
                              .status &&
                            bingoColumn[eachBingoMap[currentColumn.id]]
                              .status === 1
                              ? "active-card"
                              : ""
                          }  ${
                            !!bingoColumn[eachBingoMap[currentColumn.id]]
                              .win === true
                              ? "win-card"
                              : ""
                          }`}
                        >
                          <div className=" m-1 mark bg-red p-1  lh-sm shadow-sm rounded overflow-hidden">
                            <div className="inner-border h-100 p-0 px-md-1 py-md-1 fw-bold">
                              <div className=" text-end px-1">
                                {" "}
                                {/* {currentColumn.id} */}
                                {index * 5 + columnIndex}
                              </div>
                              <div className=" overflow-hidden">
                                {currentColumn.text}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              );
            })}
        </div>
      </div>
      {winner ? <DrawCanvas winner={winner} setWinner={setWinner} /> : null}
    </div>
  );
}

export default App;