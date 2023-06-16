type ShipType = 'Huge ship' | 'Big ship' | 'Medium ship' | 'Small ship';
type ShipOrientation = 'horizontal' | 'vertical';
type RowIndex = number;
type ColumnIndex = number;
type ShipCoordinates = [RowIndex, ColumnIndex];

interface Ship {
  type: ShipType;
  orientation: ShipOrientation;
  coordinates: number[][];
  damaged: ShipCoordinates[];
}

//Функция расчитывает занятое место вокруг корабля, который прннимает.Помимо объекта ship принимает буль.
//Буль с переданным true добавляет в массив занятых координат также и координаты самого корабля.

export const occupiedCoordinatesCheck = (
  ship: Ship,
  shipsOwnCoordinatesIncluded: boolean
): number[][] => {
  const orientation: string = ship.orientation;
  const shipCoordinates: number[][] = ship.coordinates;
  const shipLength: number = shipCoordinates.length - 1;

  let occupiedCoordinates: number[][] = [];
  if (orientation === 'horizontal') {
    occupiedCoordinates.push(
      [shipCoordinates[0][0], shipCoordinates[0][1] - 1],
      [shipCoordinates[0][0] - 1, shipCoordinates[0][1] - 1],
      [shipCoordinates[0][0] + 1, shipCoordinates[0][1] - 1],
      [shipCoordinates[shipLength][0], shipCoordinates[shipLength][1] + 1],
      [shipCoordinates[shipLength][0] - 1, shipCoordinates[shipLength][1] + 1],
      [shipCoordinates[shipLength][0] + 1, shipCoordinates[shipLength][1] + 1]
    );

    for (let i = 0; i <= shipLength; i++) {
      occupiedCoordinates.push(
        [shipCoordinates[i][0] - 1, shipCoordinates[i][1]],
        [shipCoordinates[i][0] + 1, shipCoordinates[i][1]]
      );
    }
  }

  if (orientation === 'vertical') {
    occupiedCoordinates.push(
      [shipCoordinates[0][0] - 1, shipCoordinates[0][1]],
      [shipCoordinates[0][0] - 1, shipCoordinates[0][1] - 1],
      [shipCoordinates[0][0] - 1, shipCoordinates[0][1] + 1],
      [shipCoordinates[shipLength][0] + 1, shipCoordinates[shipLength][1]],
      [shipCoordinates[shipLength][0] + 1, shipCoordinates[shipLength][1] - 1],
      [shipCoordinates[shipLength][0] + 1, shipCoordinates[shipLength][1] + 1]
    );

    for (let i = 0; i <= shipLength; i++) {
      occupiedCoordinates.push(
        [shipCoordinates[i][0], shipCoordinates[i][1] - 1],
        [shipCoordinates[i][0], shipCoordinates[i][1] + 1]
      );
    }
  }

  if (shipsOwnCoordinatesIncluded) {
    occupiedCoordinates.push(...shipCoordinates);
  }

  return occupiedCoordinates.filter(coordinate => {
    return coordinate.every(el => el >= 0 && el <= 9);
  });
};
