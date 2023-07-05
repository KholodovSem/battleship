import type { ShipCoordinates, ShipOrientation } from '@/models';

export interface ShipPlacementData {
  orientation: ShipOrientation;
  shipSize: number;
  coordinates: ShipCoordinates;
  partOfShip?: number;
}

export const calculateShipPlacement = ({
  orientation,
  shipSize,
  coordinates,
  partOfShip,
}: ShipPlacementData) => {
  let offset = 0;
  if (partOfShip) {
    offset = partOfShip;
  }

  const [columnIndex, rowIndex] = coordinates;
  const shipCoordinates: ShipCoordinates[] = [];

  const orientationFunctions = {
    horizontal: (i: number) => [columnIndex, rowIndex - offset + i],
    vertical: (i: number) => [columnIndex - offset + i, rowIndex],
  };

  for (let i = 0; i < shipSize; i += 1) {
    const getCoordinates = orientationFunctions[orientation];
    const [column, row] = getCoordinates(i);
    shipCoordinates.push([column, row]);
  }

  return shipCoordinates;
};
