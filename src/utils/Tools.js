const Tools = (props) => {
    return {
      checkWin: (isWin,tempDiagonal,rowToUpdate) => {
        if (isWin) {
          tempDiagonal.forEach((curentTempBingo) => {
            props.bingoColumn[props.eachBingoMap[curentTempBingo]].win = true;
            props.bingoColumn[
              props.eachBingoMap[curentTempBingo]
            ].rowToUpdate = true;
          });
  
          if (tempDiagonal.length === 5) {
            const containsAll = tempDiagonal.every((element) => {
              return props.winArray.includes(element);
            });
            if (!containsAll) {
              props.setwinArray([...props.winArray, ...tempDiagonal]);
  
              props.setWinner(true);
              props.setbingoWinCount(props.bingoWinCount + 1);
            }
          }
  
          props.setbingoColumn([...props.bingoColumn]);
        }
      },
      checkHorizontalWin: (isWin,temp,rowToUpdate)=>{
        
        if (isWin) {
          temp.forEach((curentTempBingo) => {
            props.bingoColumn[props.eachBingoMap[curentTempBingo]].win = true;
            props.bingoColumn[props.eachBingoMap[curentTempBingo]].horizontalWin = true;
          });
    
          if (temp.length === 5) {
            const containsAll = temp.every((element) => {
              return props.winArray.includes(element);
            });
            if (!containsAll) {
              props.setwinArray([...props.winArray, ...temp]);
              props.setbingoWinCount(props.bingoWinCount + 1);
              props.setWinner(true);
            }
          }
        }
      },
      checkVerticalWin: (isWin,temp,rowToUpdate)=>{
        
        if (isWin) {
          temp.forEach((curentTempBingo) => {
            props.bingoColumn[props.eachBingoMap[curentTempBingo]].win = true;
            props.bingoColumn[props.eachBingoMap[curentTempBingo]].rowToUpdate = true;
          });
  
          if (temp.length === 5) {
            const containsAll = temp.every((element) => {
              return props.winArray.includes(element);
            });
            if (!containsAll) {
              props.setwinArray([...props.winArray, ...temp]);
  
              props.setWinner(true);
              props.setbingoWinCount(props.bingoWinCount + 1);
            }
          }
        }
      },
      UpdateColumn: ()=>props.setbingoColumn([...props.bingoColumn]),
      unCheckWin : (isWin,tempDiagonal,rowToUpdate)=> {
        if (!isWin) {
          tempDiagonal.forEach((curentTempBingo) => {
            props.bingoColumn[props.eachBingoMap[curentTempBingo]].win = false;
            props.bingoColumn[props.eachBingoMap[curentTempBingo]].rowToUpdate = false;
          });
      
          const updateWinArray = tempDiagonal.every((element) => {
            return props.winArray.filter((current) => current !== element);
          });
          if (Array.isArray(updateWinArray)) {
            props.setwinArray(updateWinArray);
          }
      
          props.setbingoColumn([...props.bingoColumn]);
        }
      }
  
  
  
  
  
    };
  };
  
  
  export default Tools;