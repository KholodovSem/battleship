//возвращает массив с массивами всех возможных координат игровых ячеек, 100 шт
export const createAvailableCoordinatesArray = () => {
  let availableCoordinatesArray: number[][] = [];
  for (let i = 0; i <= 9; i++) {
    for (let j = 0; j <= 9; j++) {
      availableCoordinatesArray.push([i, j]);
    }
  }
  return availableCoordinatesArray;
};
