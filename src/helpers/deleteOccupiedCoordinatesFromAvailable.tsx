import { arraysAreEqual } from './arraysAreEqual';

// Функция удаляет из первого массива , элементы второго
// Предназначена для удаления окуппированных ячеек из массива возможных координат
export const deleteOccupiedCoordinatesFromAvailable = (
  availableCoordinates: number[][],
  occupiedCoordinates: number[][]
): number[][] => {
  return availableCoordinates.filter(coordinate => {
    return !occupiedCoordinates.some(occupiedCoordinate =>
      arraysAreEqual(coordinate, occupiedCoordinate)
    );
  });
};
