import { join } from 'path';
import { createAvailableCoordinatesArray } from './createAvailableCoordinatesArray';
import { createShipsStartObject } from './createShipsStartObject';
import { occupiedCoordinatesCheck } from './occupiedCoordinatesCheck';
import { deleteOccupiedCoordinatesFromAvailable } from './deleteOccupiedCoordinatesFromAvailable';
import { buildShipFromRandomCoordinates } from './buildShipFromRandomCoordinates';

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

//Core функция, генерирует рандомное расположение кораблей на поле боя.
export const battleFieldGenerate = () => {
  let availableCoordinatesArray: ShipCoordinates[] =
    createAvailableCoordinatesArray();
  const shipsObject: Ship[] = createShipsStartObject();
  for (let i = 0; i < shipsObject.length; i++) {
    const ship = shipsObject[i];
    let shipCoordinates: ShipCoordinates[] = buildShipFromRandomCoordinates(
      availableCoordinatesArray,
      ship
    );
    ship.coordinates = shipCoordinates;
    let occupiedCoordinates: ShipCoordinates[] = occupiedCoordinatesCheck(
      ship,
      true
    );
    availableCoordinatesArray = deleteOccupiedCoordinatesFromAvailable(
      availableCoordinatesArray,
      occupiedCoordinates
    );
  }
  return shipsObject;
};

export default battleFieldGenerate;
