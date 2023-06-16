import { arraysAreEqual } from './arraysAreEqual';
import { checkPossibleOrientation } from './checkPossibleOrientation';
import { getRandomCoordinate } from './getRandomCoordinate';

type ShipType = 'Huge ship' | 'Big ship' | 'Medium ship' | 'Small ship';
type ShipOrientation = 'horizontal' | 'vertical';
type RowIndex = number;
type ColumnIndex = number;
type ShipCoordinates = [RowIndex, ColumnIndex];

interface Ship {
  type: ShipType;
  orientation: ShipOrientation;
  coordinates: number[][];
  damaged: ShipCoordinates[];
}
//Функция которая возвращает рандомный массив координат корабля который может быть создан, на свободных ячейках
export const buildShipFromRandomCoordinates = (
  availableCoordinatesArray: number[][],
  ship: Ship
): number[][] => {
  const shipLength = ship.coordinates.length;
  let randomCoordinate: number[] = getRandomCoordinate(
    availableCoordinatesArray
  );

  let ShipCoordinates: number[][] = [];
  const orientation: ShipOrientation | null = checkPossibleOrientation(
    ship,
    randomCoordinate
  );

  switch (orientation) {
    case null:
      return buildShipFromRandomCoordinates(availableCoordinatesArray, ship);
    case 'horizontal':
      for (let i = 0; i <= shipLength - 1; i++) {
        ShipCoordinates.push([randomCoordinate[0], randomCoordinate[1] + i]);
      }
      break;
    case 'vertical':
      for (let i = 0; i <= shipLength - 1; i++) {
        ShipCoordinates.push([randomCoordinate[0] + i, randomCoordinate[1]]);
      }
      break;
  }

  const allCoordinatesExist = ShipCoordinates.every(shipCoordinate => {
    return availableCoordinatesArray.some(availableCoordinate =>
      arraysAreEqual(shipCoordinate, availableCoordinate)
    );
  });

  if (allCoordinatesExist) {
    return ShipCoordinates;
  } else {
    return buildShipFromRandomCoordinates(availableCoordinatesArray, ship);
  }
};
