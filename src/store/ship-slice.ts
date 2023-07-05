import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { ShipConstructor } from '@/classes/ShipConstructor';
import type { Ship, ShipType } from '@/models';

interface ShipsMap {
  [key: string]: number;
}

// It's map where property = 'ship type', value = 'ship quantity that type'
const shipMap: ShipsMap = {
  'Huge ship': 1,
  'Big ship': 2,
  'Medium ship': 3,
  'Small ship': 4,
};

const shipTypesArray = Object.keys(shipMap).flatMap(
  shipType =>
    Array.from({ length: shipMap[shipType] }).fill(shipType) as string[]
);

type ShipsState = Ship[];

const initialState: ShipsState = shipTypesArray.map(shipType => ({
  ...new ShipConstructor(shipType as ShipType),
}));

type ShipPartial<K extends keyof Ship> = Pick<Ship, 'id' | K>;

const shipsSlice = createSlice({
  name: 'ships',
  initialState,
  reducers: {
    changeShipLocation: (
      ships,
      { payload }: PayloadAction<ShipPartial<'location'>>
    ) => {
      return ships.map(ship => {
        if (ship.id === payload.id) {
          if (payload.location === 'Harbor') {
            const defaultShip = new ShipConstructor(ship.type);

            return {
              ...defaultShip,
            };
          }

          return {
            ...ship,
            location: payload.location,
          };
        }
        return ship;
      });
    },
    changeShipCoordinates: (
      ships,
      { payload }: PayloadAction<ShipPartial<'coordinates'>>
    ) => {
      return ships.map(ship => {
        if (ship.id === payload.id) {
          return {
            ...ship,
            coordinates: payload.coordinates,
          };
        }
        return ship;
      });
    },
    changeShipDamagedCoordinates: (
      ships,
      { payload }: PayloadAction<ShipPartial<'damaged'>>
    ) => {
      return ships.map(ship => {
        if (ship.id === payload.id) {
          return {
            ...ship,
            damaged: payload.damaged,
          };
        }
        return ship;
      });
    },
    changeShipOrientation: (
      ships,
      { payload }: PayloadAction<ShipPartial<'orientation'>>
    ) => {
      return ships.map(ship => {
        if (ship.id === payload.id) {
          return {
            ...ship,
            orientation: payload.orientation,
          };
        }
        return ship;
      });
    },
  },
});

export const {
  changeShipCoordinates,
  changeShipDamagedCoordinates,
  changeShipLocation,
  changeShipOrientation,
} = shipsSlice.actions;
export default shipsSlice.reducer;
