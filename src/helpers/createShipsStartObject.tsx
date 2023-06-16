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

//Возвращает скелет объекта, базовая ориентация кораблей горизонтальная , длина массива координат
//соответсвует длине корабля и наполнена стартовымы нулевыми точками.
export const createShipsStartObject = () => {
  const shipsObject: Ship[] = [];

  for (let i = 0; i <= 9; i++) {
    switch (i) {
      case 0:
        shipsObject.push({
          type: 'Huge ship',
          orientation: 'horizontal',
          coordinates: [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
          ],
          damaged: [],
        });
        break;
      case 1:
      case 2:
        shipsObject.push({
          type: 'Big ship',
          orientation: 'horizontal',
          coordinates: [
            [0, 0],
            [0, 0],
            [0, 0],
          ],
          damaged: [],
        });
        break;

      case 3:
      case 4:
      case 5:
        shipsObject.push({
          type: 'Medium ship',
          orientation: 'horizontal',
          coordinates: [
            [0, 0],
            [0, 0],
          ],
          damaged: [],
        });
        break;

      case 6:
      case 7:
      case 8:
      case 9:
        shipsObject.push({
          type: 'Small ship',
          orientation: 'horizontal',
          coordinates: [[0, 0]],
          damaged: [],
        });
        break;
    }
  }
  return shipsObject;
};
