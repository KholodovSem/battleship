import type { ShipCoordinates } from '@/models';

export const getInitialShipCoordinates = (
  shipSize: number
): ShipCoordinates[] => {
  return Array.from({ length: shipSize }, () => [0, 0]);
};
