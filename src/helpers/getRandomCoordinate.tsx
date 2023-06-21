import { getRandomInt } from './getRandomInt';
type ShipCoordinates = [RowIndex, ColumnIndex];
type RowIndex = number;
type ColumnIndex = number;

// получить рандомную координату из списка возможных
export const getRandomCoordinate = (
  availableCoordinatesArray: ShipCoordinates[]
): ShipCoordinates => {
  return availableCoordinatesArray[
    getRandomInt(availableCoordinatesArray.length - 1)
  ];
};
