// получить рандомное число учитывая макс значение

export const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * (max + 1));
};
