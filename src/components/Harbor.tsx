import { useDrop } from 'react-dnd';
import { useSelector } from 'react-redux';
import { selectShipsInHarbor } from '@/store/selectors/ships-selectors';
import { DraggableShip } from '@/models';
import { ShipComponent } from '@/components/ShipComponent';
import { onShipDrop } from '@/helpers';
import { type DropZone } from '@/helpers/on-ship-drop';
import { DropZones } from '@/utils';

/* 
Number of ships

Huge ship - 1;
Big ship - 2;
Medium ship - 3;
Small ship - 4;

TOTAL = 10;
*/

export const Harbor = () => {
  const [collected, dropRef] = useDrop<DraggableShip>({
    accept: 'ship',
    drop: ship => {
      const dropZone: DropZone = {
        name: DropZones.HARBOR,
        zoneInfo: {},
      };
      onShipDrop(ship, dropZone);
    },
  });

  const shipsInHarbor = useSelector(selectShipsInHarbor);

  return (
    <div
      ref={dropRef}
      className="flex flex-col gap-[12px] w-[15%] py-[10px] px-[5px] border border-dark"
    >
      {shipsInHarbor.map(ship => {
        const { id, type, size } = ship;

        return (
          <div
            key={id}
            style={{
              height: 'calc(100% / 10 - 10px)',
              width: '100%',
              padding: 5,
            }}
            className="flex flex-col gap-[5px]"
          >
            <p>{type}</p>
            <div
              style={{
                height: '100%',
                width: `calc(100% / 4 * ${size})`,
              }}
            >
              <ShipComponent ship={ship} isOnBoard={false} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
