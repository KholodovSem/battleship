// удобная функция для сравнения 2ух масивов на равенство, в нашем случае для проверки координат мастхев
export const arraysAreEqual = (arr1: number[], arr2: number[]): boolean => {
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
