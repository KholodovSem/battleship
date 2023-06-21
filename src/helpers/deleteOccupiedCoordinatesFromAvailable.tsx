import { arraysAreEqual } from './arraysAreEqual';
type RowIndex = number;
type ColumnIndex = number;
type ShipCoordinates = [RowIndex, ColumnIndex];

// Функция удаляет из первого массива , элементы второго
// Предназначена для удаления окуппированных ячеек из массива возможных координат
export const deleteOccupiedCoordinatesFromAvailable = (
  availableCoordinates: ShipCoordinates[],
  occupiedCoordinates: ShipCoordinates[]
): ShipCoordinates[] => {
  return availableCoordinates.filter(coordinate => {
    return !occupiedCoordinates.some(occupiedCoordinate =>
      arraysAreEqual(coordinate, occupiedCoordinate)
    );
  });
};
