// получить рандомное число. ВНИМАНИЕ параметр max никогда не выпадет, поэтому максимально возможный + 1 указываем

export const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * max);
};
