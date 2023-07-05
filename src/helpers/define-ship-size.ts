import type { ShipType } from '@/models';

export const defineShipSize = (type: ShipType) => {
  switch (type) {
    case 'Small ship': {
      return 1;
    }

    case 'Medium ship': {
      return 2;
    }

    case 'Big ship': {
      return 3;
    }

    case 'Huge ship': {
      return 4;
    }
  }
};
