const isSolved = (arr) => {
  const horizontal = () => {
    let result;
    arr.forEach((row) => {
      if (row[0] === row[1] && row[0] === row[2] && row[0] !== 0) {
        result = row[0];
      }
    });
    return result;
  };
  const vertical = () => {
    for (let i = 0; i < arr.length; i++) {
      if (
        arr[0][i] === arr[1][i] &&
        arr[1][i] === arr[2][i] &&
        arr[0][i] !== 0
      ) {
        return arr[0][i];
      }
    }
  };
  const diagonal = () => {
    if (
      (arr[0][0] === arr[1][1] && arr[1][1] === arr[2][2]) ||
      (arr[0][2] === arr[1][1] && arr[1][1] === arr[2][0])
    ) {
      return arr[1][1];
    }
  };

  const other = () => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (arr[i][j] === 0) {
          return -1;
        }
      }
    }
    return 0;
  };
  return horizontal() || vertical() || diagonal() || other();
};
