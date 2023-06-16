import { getRandomInt } from './getRandomInt';

// получить рандомную координату из списка возможных
export const getRandomCoordinate = (
  availableCoordinatesArray: number[][]
): number[] => {
  return availableCoordinatesArray[
    getRandomInt(availableCoordinatesArray.length)
  ];
};
