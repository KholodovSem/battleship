import { isEqualCoordinates } from '@/helpers';
import type { Ship } from '@/models';
import type { ColumnIndex, RowIndex } from '@/models/ShipCoordinates';

//Array.some() - Checks if at least one element of the array satisfies the condition
export const findShipByCoordinates = (
  ships: Ship[],
  coordinates: [RowIndex, ColumnIndex]
) =>
  ships.find(ship =>
    ship.coordinates.some(coord => isEqualCoordinates(coord, coordinates))
  );
