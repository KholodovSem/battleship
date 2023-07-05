import {
  ShipCoordinates,
  ShipOrientation,
  ShipType,
  ShipLocation,
} from '@/models';

export interface Ship {
  id: string;
  type: ShipType;
  size: number;
  location: ShipLocation;
  orientation: ShipOrientation;
  coordinates: ShipCoordinates[];
  damaged: ShipCoordinates[];
}
