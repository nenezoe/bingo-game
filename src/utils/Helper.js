const tools = require("./Tools");

const shuffle = (sourceObject) => {
  for (var i = 0; i < sourceObject.length - 1; i++) {
    var j = i + Math.floor(Math.random() * (sourceObject.length - i));
    if (i !== 12 && j !== 12) {
      var temp = sourceObject[j];
      sourceObject[j] = sourceObject[i];
      sourceObject[i] = temp;
    }
  }
  return sourceObject;
};
function chkDiagonal(bingoColumnMap, tool) {
  let tempDiagonal = [];
  let isWin = true;
  for (let j = 0; j < bingoColumnMap.length; j++) {
    if (j <= bingoColumnMap.length && bingoColumnMap[j][j].status !== 1) {
      isWin = false;
      break;
    }
    tempDiagonal.push(bingoColumnMap[j][j].id);
  }
  tool.checkWin(isWin, tempDiagonal, "diagonalWin");
}

function chkLeftDiagonal(bingoColumnMap, tool) {
  let tempDiagonal = [];
  let isWin = true;
  for (
    let j = 0, i = bingoColumnMap.length - 1;
    j < bingoColumnMap.length;
    j++, i--
  ) {
    if (j <= bingoColumnMap.length && bingoColumnMap[j][i].status !== 1) {
      isWin = false;
      break;
    }
    tempDiagonal.push(bingoColumnMap[j][i].id);
  }
  tool.checkWin(isWin, tempDiagonal, "leftDiagonalWin");
}

function chkVertical(bingoColumnMap, tool) {
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

    tool.checkVerticalWin(isWin, temp, "verticalWin");
  }

  tool.UpdateColumn();
}


function chkHorizontal(bingoColumnMap, tool) {
  for (let i = 0; i < bingoColumnMap.length; i++) {
    let isWin = true;
    let temp = [];
    for (let j = 0; j < bingoColumnMap.length; j++) {
      if (bingoColumnMap[i][j].status !== 1) {
        isWin = false;
        break;
      }
      temp.push(bingoColumnMap[i][j].id);
    }

   


    tool.checkHorizontalWin(isWin, temp, "horizontalWin");
    // sdsdsds
  }

  tool.UpdateColumn();
}



function unChkDiagonal(bingoColumnMap,tool) {
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
 

  tool.unCheckWin(!isWin, tempDiagonal, "diagonalWin");


}


module.exports = {
  shuffle,
  chkDiagonal,
  chkLeftDiagonal,
  chkHorizontal,
  chkVertical,
  unChkDiagonal,
};