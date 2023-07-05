import type { ShipCoordinates } from '@/models';

//Function takes two corteges with coordinates and makes array decomposition
//then it compares rowIndex & columnIndex from each tuple
export const isEqualCoordinates = (
  coordinates1: ShipCoordinates,
  coordinates2: ShipCoordinates
) => {
  const [rowIndex1, columnIndex1] = coordinates1;
  const [rowIndex2, columnIndex2] = coordinates2;
  return rowIndex1 === rowIndex2 && columnIndex1 === columnIndex2;
};
