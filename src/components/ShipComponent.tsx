import { useState, useCallback } from 'react';
import { useDrag } from 'react-dnd';
import { useAppDispatch } from '@/hooks';
import { changeShipDamagedCoordinates } from '@/store/ship-slice';
import type { Ship, ShipCoordinates } from '@/models';
import { isEqualCoordinates } from '@/helpers';
import classNames from 'classnames';

interface ShipProps {
  ship: Ship;
  isOnBoard?: boolean;
}

export const ShipComponent = ({ ship, isOnBoard = true }: ShipProps) => {
  const [partOfShip, setPartOfShip] = useState<number>(0);
  const { id, orientation, location, coordinates, damaged } = ship;

  const dispatch = useAppDispatch();

  const [collected, dragRef] = useDrag({
    type: 'ship',
    item: { ship, partOfShip },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const shipContainerStyle =
    'flex justify-between w-full h-full bg-blue outline outline-[1px] outline-dark cursor-grab';
  const lineStyle = 'absolute block bg-red w-full h-[10%] top-[50%] left-[50%]';

  const shipWrapperDynamicStyle = {
    'flex-row': orientation === 'horizontal',
    'flex-col': orientation === 'vertical',
  };

  const handleMouseDownOnShipPart = (partOfShip: number) => {
    setPartOfShip(partOfShip);
  };

  const handleClickOnPartOfShip = useCallback(
    (coordinates: ShipCoordinates) => {
      if (location === 'Harbor') return;

      const coordinatesIsAlreadyDamaged = damaged.some(coord =>
        isEqualCoordinates(coord, coordinates)
      );

      if (coordinatesIsAlreadyDamaged) return;

      const newDamagedCoordinates: ShipCoordinates[] = [
        ...damaged,
        coordinates,
      ];

      dispatch(
        changeShipDamagedCoordinates({ id, damaged: newDamagedCoordinates })
      );
    },
    [damaged]
  );

  return (
    <div
      ref={dragRef}
      className={classNames(shipContainerStyle, shipWrapperDynamicStyle)}
    >
      {coordinates.map((coordinates, index) => {
        const partOfShip = index;
        const [row, column] = coordinates;

        const isHitted = damaged.some(coord =>
          isEqualCoordinates(coordinates, coord)
        );

        return (
          <div
            className={`relative h-full w-full ${
              isHitted && 'cursor-not-allowed'
            }`}
            key={isOnBoard ? `${row}-${column}` : index}
            onClick={() => handleClickOnPartOfShip(coordinates)}
            onMouseDown={() => handleMouseDownOnShipPart(partOfShip)}
          >
            {isHitted && (
              <>
                <span
                  style={{
                    transform: 'translate(-50%, -50%) rotate(-45deg)',
                  }}
                  className={lineStyle}
                ></span>
                <span
                  style={{
                    transform: 'translate(-50%, -50%) rotate(45deg)',
                  }}
                  className={lineStyle}
                ></span>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
