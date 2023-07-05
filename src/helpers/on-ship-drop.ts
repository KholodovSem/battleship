import { store } from '@/store/store';
import {
  selectShipsInHarbor,
  selectShipsOnBoard,
} from '@/store/selectors/ships-selectors';
import { changeShipLocation, changeShipCoordinates } from '@/store/ship-slice';
import { getInitialShipCoordinates } from '@/helpers';
import type { DraggableShip } from '@/models';
import { DropZones } from '@/utils';
import {
  calculateShipPlacement,
  type ShipPlacementData,
} from './calculate-ship-placement';

interface DropZoneInfo {
  row?: number;
  column?: number;
}

export interface DropZone {
  name: DropZones;
  zoneInfo: DropZoneInfo;
}

type onDropShipFn = (draggableShip: DraggableShip, dropZone: DropZone) => void;

const isHarborZone = (dropZone: DropZone) => dropZone.name === DropZones.HARBOR;
const isBoardCellZone = (dropZone: DropZone) =>
  dropZone.name === DropZones.BOARD_CELL;

export const onShipDrop: onDropShipFn = (draggableShip, dropZone: DropZone) => {
  const { ship, partOfShip } = draggableShip;
  const { id, orientation, size } = ship;

  console.log('Draggable Ship', draggableShip);
  console.log('Drop Zone', dropZone);

  if (isHarborZone(dropZone)) {
    const shipsInHarbor = selectShipsInHarbor(store.getState());

    const isShipAlreadyInHarbor = shipsInHarbor.find(ship => ship.id === id);
    if (isShipAlreadyInHarbor) {
      return;
    }

    store.dispatch(changeShipLocation({ id, location: 'Harbor' }));
    return;
  }

  if (isBoardCellZone(dropZone)) {
    if (!dropZone.zoneInfo.column || !dropZone.zoneInfo.row) {
      throw new Error(
        `${dropZone.name} drop zone must have row and column info!`
      );
    }

    const shipsOnBoard = selectShipsOnBoard(store.getState());
    console.log(shipsOnBoard);
    const { row, column } = dropZone.zoneInfo;

    const shipData: ShipPlacementData = {
      orientation,
      shipSize: size,
      coordinates: [row, column],
      partOfShip,
    };

    const coordiantesOnBoard = calculateShipPlacement(shipData);

    const isShipAlreadyOnBoard = shipsOnBoard.find(ship => ship.id === id);
    if (isShipAlreadyOnBoard) {
      store.dispatch(
        changeShipCoordinates({ id, coordinates: coordiantesOnBoard })
      );
      return;
    }

    store.dispatch(changeShipLocation({ id, location: 'Board' }));
    store.dispatch(
      changeShipCoordinates({ id, coordinates: coordiantesOnBoard })
    );
    return;
  }
};
