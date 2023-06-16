import { join } from 'path';

type ShipType = 'Huge ship' | 'Big ship' | 'Medium ship' | 'Small ship';

//Possible orientation is "Horizontal" or "Vertical"
type ShipOrientation = 'horizontal' | 'vertical';

//Actually it's cell index
type RowIndex = number;
type ColumnIndex = number;

//RowIndex - each vertical cell
//ColumnIndex - each horizontal cell
type ShipCoordinates = [RowIndex, ColumnIndex];

interface Ship {
  type: ShipType;
  orientation: ShipOrientation;
  coordinates: number[][];
  damaged: ShipCoordinates[];
}
// получить рандомное число. ВНИМАНИЕ параметр max никогда не выпадет, поэтому максимально возможный + 1 указываем
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

//возвращает массив с массивами всех возможных координат игровых ячеек, 100 шт
const createAvailableCoordinatesArray = () => {
  let availableCoordinatesArray: number[][] = [];
  for (let i = 0; i <= 9; i++) {
    for (let j = 0; j <= 9; j++) {
      availableCoordinatesArray.push([i, j]);
    }
  }
  return availableCoordinatesArray;
};

//Возвращает скелет объекта, базовая ориентация кораблей горизонтальная , длина массива координат
//соответсвует длине корабля и наполнена стартовымы нулевыми точками.
const createShipsStartObject = () => {
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

// Функция принимает рандомную координату и проверяет поместится ли корабль по горизонтали и вертикали
// Проверка проходит путем допбавления к координате длины корабля, полученное значение должно быть меньше 9 (максимально возможное число координат)
// Ибо логично, если число больше 9- мы выходим за игоровое поле, что по вертикали , что по горизонтали.
// Для полного рандома - порядок выполнения проверки вместится ли корабль горизотально или вертикально происходит случайным образом.
// ПРИМЕР : Длина корабля - 4 , координата приходит [0,7] по горизонтали - проходим :[3,7], по вертикали - нет:[0,10].
// Возвращается первая успешная проверка, в случае если не подходит в обоих случаях - возвращаем null

const checkPossibleOrientation = (
  ship: Ship,
  coordinate: number[]
): ShipOrientation | null => {
  const shipLength = ship.coordinates.length;
  const randomValue: number = getRandomInt(2);

  if (coordinate[Number(randomValue)] + shipLength - 1 <= 9) {
    return randomValue
      ? (ship.orientation = 'vertical')
      : (ship.orientation = 'horizontal');
  } else if (coordinate[Number(!randomValue)] + shipLength - 1 <= 9) {
    return randomValue
      ? (ship.orientation = 'vertical')
      : (ship.orientation = 'horizontal');
  } else {
    return null;
  }
};
// удобная функция для сравнения 2ух масивов на равенство, в нашем случае для проверки координат мастхев
const arraysAreEqual = (arr1: number[], arr2: number[]): boolean => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
};

// получить рандомную координату из списка возможных
const getRandomCoordinate = (
  availableCoordinatesArray: number[][]
): number[] => {
  return availableCoordinatesArray[
    getRandomInt(availableCoordinatesArray.length)
  ];
};

//Функция которая возвращает массив координат корабля который может быть создан, на свободных ячейках
const buildShipFromRandomCoordinates = (
  availableCoordinatesArray: number[][],
  ship: Ship
): number[][] => {
  const shipLength = ship.coordinates.length;
  let randomCoordinate: number[] = getRandomCoordinate(
    availableCoordinatesArray
  );

  let ShipCoordinates: number[][] = [];
  const orientation: ShipOrientation | null = checkPossibleOrientation(
    ship,
    randomCoordinate
  );

  switch (orientation) {
    case null:
      return buildShipFromRandomCoordinates(availableCoordinatesArray, ship);
    case 'horizontal':
      for (let i = 0; i <= shipLength - 1; i++) {
        ShipCoordinates.push([randomCoordinate[0], randomCoordinate[1] + i]);
      }
      break;
    case 'vertical':
      for (let i = 0; i <= shipLength - 1; i++) {
        ShipCoordinates.push([randomCoordinate[0] + i, randomCoordinate[1]]);
      }
      break;
  }

  const allCoordinatesExist = ShipCoordinates.every(shipCoordinate => {
    return availableCoordinatesArray.some(availableCoordinate =>
      arraysAreEqual(shipCoordinate, availableCoordinate)
    );
  });

  if (allCoordinatesExist) {
    return ShipCoordinates;
  } else {
    return buildShipFromRandomCoordinates(availableCoordinatesArray, ship);
  }
};

//Функция расчитывает занятое место вокруг корабля, который прннимает.Помимо объекта ship принимает буль.
//Буль с переданным true добавляет в массив занятых координат также и координаты самого корабля.

const occupiedCoordinatesCheck = (
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

// Функция удаляет из первого массива , элементы второго
// Предназначена для удаления окуппированных ячеек из массива возможных координат
const deleteOccupiedCoordinatesFromAvailable = (
  availableCoordinates: number[][],
  occupiedCoordinates: number[][]
): number[][] => {
  return availableCoordinates.filter(coordinate => {
    return !occupiedCoordinates.some(occupiedCoordinate =>
      arraysAreEqual(coordinate, occupiedCoordinate)
    );
  });
};

//Core функция, генерирует рандомное расположение кораблей на поле боя.
export const battleFieldGenerate = () => {
  let availableCoordinatesArray: number[][] = createAvailableCoordinatesArray();
  const shipsObject: Ship[] = createShipsStartObject();
  for (let i = 0; i < shipsObject.length; i++) {
    const ship = shipsObject[i];
    let shipCoordinates: number[][] = buildShipFromRandomCoordinates(
      availableCoordinatesArray,
      ship
    );
    ship.coordinates = shipCoordinates;
    let occupiedCoordinates: number[][] = occupiedCoordinatesCheck(ship, true);
    availableCoordinatesArray = deleteOccupiedCoordinatesFromAvailable(
      availableCoordinatesArray,
      occupiedCoordinates
    );
  }

  return shipsObject;
};

export default battleFieldGenerate;
