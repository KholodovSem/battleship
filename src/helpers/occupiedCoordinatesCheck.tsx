type ShipType = 'Huge ship' | 'Big ship' | 'Medium ship' | 'Small ship';
type ShipOrientation = 'horizontal' | 'vertical';
type RowIndex = number;
type ColumnIndex = number;
type ShipCoordinates = [RowIndex, ColumnIndex];

interface Ship {
  type: ShipType;
  orientation: ShipOrientation;
  coordinates: ShipCoordinates[];
  damaged: ShipCoordinates[];
}

//Функция расчитывает занятое место вокруг корабля, который прннимает.Помимо объекта ship принимает буль.
//Буль с переданным true добавляет в массив занятых координат также и координаты самого корабля.

export const occupiedCoordinatesCheck = (
  ship: Ship,
  shipsOwnCoordinatesIncluded?: boolean
): ShipCoordinates[] => {
  const { orientation, coordinates } = ship;
  const shipLength = coordinates.length - 1;
  const occupiedCoordinates: ShipCoordinates[] = [];

  if (orientation === 'horizontal') {
    for (let i = 0; i <= shipLength; i++) {
      occupiedCoordinates.push(
        [coordinates[i][0], coordinates[i][1] - 1],
        [coordinates[i][0] - 1, coordinates[i][1] - 1],
        [coordinates[i][0] + 1, coordinates[i][1] - 1],
        [coordinates[i][0], coordinates[i][1] + 1],
        [coordinates[i][0] - 1, coordinates[i][1] + 1],
        [coordinates[i][0] + 1, coordinates[i][1] + 1]
      );
    }
  } else {
    for (let i = 0; i <= shipLength; i++) {
      occupiedCoordinates.push(
        [coordinates[i][0] - 1, coordinates[i][1]],
        [coordinates[i][0] - 1, coordinates[i][1] - 1],
        [coordinates[i][0] - 1, coordinates[i][1] + 1],
        [coordinates[i][0] + 1, coordinates[i][1]],
        [coordinates[i][0] + 1, coordinates[i][1] - 1],
        [coordinates[i][0] + 1, coordinates[i][1] + 1]
      );
    }
  }

  if (shipsOwnCoordinatesIncluded) {
    occupiedCoordinates.push(...coordinates);
  }

  return occupiedCoordinates.filter(
    ([row, col]) => row >= 0 && row <= 9 && col >= 0 && col <= 9
  );
};
