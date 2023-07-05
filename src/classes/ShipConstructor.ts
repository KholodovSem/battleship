import { nanoid } from 'nanoid';
import type {
  Ship,
  ShipCoordinates,
  ShipOrientation,
  ShipType,
  ShipLocation,
} from '@/models';
import { defineShipSize, getInitialShipCoordinates } from '@/helpers';

export class ShipConstructor implements Ship {
  id: string;
  size: number;
  location: ShipLocation;

  orientation: ShipOrientation = 'horizontal';
  coordinates: ShipCoordinates[] = [];
  damaged: ShipCoordinates[] = [];

  constructor(public type: ShipType, coordinates?: ShipCoordinates[]) {
    this.id = nanoid();
    this.size = defineShipSize(type);
    this.location = 'Harbor';

    this.type = type;

    this.coordinates = getInitialShipCoordinates(this.size);

    if (coordinates) {
      this.coordinates = coordinates;
    }
  }
}
