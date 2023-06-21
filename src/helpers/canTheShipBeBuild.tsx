import { getRandomInt } from './getRandomInt';
import { arraysAreEqual } from './arraysAreEqual';
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

const MAX_COLUMN_AND_ROW_INDEX = 9;

// поверяет может ли Корабль существовать по заданной координате

export const canTheShipBeBuild = (ship: Ship, coordinate: ShipCoordinates) => {
  const shipLength = ship.coordinates.length;
  const coordinateValue = coordinate[ship.orientation === 'horizontal' ? 1 : 0];
  return coordinateValue + shipLength - 1 <= 9;
};

// Возвращает рандомную ориентацию корабля, юзать в паре с canTheShipBeBuild. Сначала проверяем
// может ли корабль существовать, потом генерим рандом ориентацию
export const getRandomShipOrientation = (ship: Ship, coordinate: number[]) => {
  const randomValue: number = getRandomInt(1);
  const shipLength = ship.coordinates.length;
  const firstCoordinate = coordinate[Number(randomValue)];
  const secondCoordinate = coordinate[Number(!randomValue)];
  if (
    firstCoordinate + shipLength - 1 <= MAX_COLUMN_AND_ROW_INDEX ||
    secondCoordinate + shipLength - 1 <= MAX_COLUMN_AND_ROW_INDEX
  ) {
    return randomValue ? 'vertical' : 'horizontal';
  }
  return null;
};

//затем подсчитываем координаты корабля

export const calculateShipPlacement = (
  ship: Ship,
  coordinate: ShipCoordinates
): ShipCoordinates[] => {
  const orientation = ship.orientation;
  const shipLength = ship.coordinates.length;
  const [columnIndex, rowIndex] = coordinate;
  const shipCoordinates: ShipCoordinates[] = [];

  const orientationFunctions = {
    horizontal: (i: number) => [columnIndex, rowIndex + i],
    vertical: (i: number) => [columnIndex + i, rowIndex],
  };

  for (let i = 0; i < shipLength; i++) {
    const getCoordinates = orientationFunctions[orientation];
    const [column, row] = getCoordinates(i);
    shipCoordinates.push([column, row]);
  }

  return shipCoordinates;
};

export const checkIfAllCoordinatesExist = (
  shipCoordinates: ShipCoordinates[],
  availableCoordinatesArray: ShipCoordinates[]
) => {
  return shipCoordinates.every(shipCoordinate => {
    return availableCoordinatesArray.some(availableCoordinate =>
      arraysAreEqual(shipCoordinate, availableCoordinate)
    );
  });
};
