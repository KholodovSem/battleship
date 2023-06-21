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

const MAX_SHIPS_INDEX = 9;
const START_SHIPS_PULL: ShipType[] = [
  'Huge ship',
  'Big ship',
  'Big ship',
  'Medium ship',
  'Medium ship',
  'Medium ship',
  'Small ship',
  'Small ship',
  'Small ship',
  'Small ship',
];
const SHIP_LENGTH_PULL = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

class ShipConstructor implements Ship {
  damaged: ShipCoordinates[] = [];
  constructor(
    public type: ShipType,
    public coordinates: ShipCoordinates[],
    public orientation: ShipOrientation
  ) {
    this.type = type;
    this.coordinates = coordinates;
    this.orientation = orientation;
  }
}

//Возвращает скелет объекта, базовая ориентация кораблей горизонтальная , длина массива координат
//соответсвует длине корабля и наполнена стартовымы нулевыми точками.
export const createShipsStartObject = () => {
  const ShipsArray: Ship[] = [];

  for (let i = 0; i <= MAX_SHIPS_INDEX; i++) {
    const shipLength = SHIP_LENGTH_PULL[i];
    const shipCoordinates: ShipCoordinates[] = [];
    for (let j = 0; j < shipLength; j++) {
      shipCoordinates.push([0, 0]);
    }
    const ship = new ShipConstructor(
      START_SHIPS_PULL[i],
      shipCoordinates,
      'horizontal'
    );
    ShipsArray.push(ship);
  }
  return ShipsArray;
};
