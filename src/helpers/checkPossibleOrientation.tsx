import { getRandomInt } from './getRandomInt';
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

// Функция принимает рандомную координату и проверяет поместится ли корабль по горизонтали и вертикали
// Проверка проходит путем допбавления к координате длины корабля, полученное значение должно быть меньше 9 (максимально возможное число координат)
// Ибо логично, если число больше 9- мы выходим за игоровое поле, что по вертикали , что по горизонтали.
// Для полного рандома - порядок выполнения проверки вместится ли корабль горизотально или вертикально происходит случайным образом.
// ПРИМЕР : Длина корабля - 4 , координата приходит [0,7] по горизонтали - проходим :[3,7], по вертикали - нет:[0,10].
// Возвращается первая успешная проверка, в случае если не подходит в обоих случаях - возвращаем null

export const checkPossibleOrientation = (
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
// поменять чтоб принимало строку vertical, horizontal, both для проверки либо одного кейса, либо любое из двух
