import {
  canTheShipBeBuild,
  getRandomShipOrientation,
  calculateShipPlacement,
  checkIfAllCoordinatesExist,
} from './canTheShipBeBuild';
import { getRandomCoordinate } from './getRandomCoordinate';

type ShipType = 'Huge ship' | 'Big ship' | 'Medium ship' | 'Small ship';
type ShipOrientation = 'horizontal' | 'vertical';
type RowIndex = number;
type ColumnIndex = number;
type ShipCoordinates = [RowIndex, ColumnIndex];

interface Ship {
  type: ShipType;
  orientation: ShipOrientation;
  coordinates: ShipCoordinates[];
  damaged: ShipCoordinates[];
}
//Функция которая возвращает рандомный массив координат корабля который может быть создан, на свободных ячейках
export const buildShipFromRandomCoordinates = (
  availableCoordinatesArray: ShipCoordinates[],
  ship: Ship
): ShipCoordinates[] => {
  let randomCoordinate: ShipCoordinates = getRandomCoordinate(
    availableCoordinatesArray
  );
  let shipCoordinates: ShipCoordinates[] = [];
  const canShipBeBuild: boolean = canTheShipBeBuild(ship, randomCoordinate);
  if (!canShipBeBuild) {
    return buildShipFromRandomCoordinates(availableCoordinatesArray, ship);
  }
  const orientation = getRandomShipOrientation(ship, randomCoordinate);
  if (orientation) {
    ship.orientation = orientation;
    shipCoordinates = calculateShipPlacement(ship, randomCoordinate);
  }

  const allCoordinatesExist = checkIfAllCoordinatesExist(
    shipCoordinates,
    availableCoordinatesArray
  );

  return allCoordinatesExist
    ? shipCoordinates
    : buildShipFromRandomCoordinates(availableCoordinatesArray, ship);
};
