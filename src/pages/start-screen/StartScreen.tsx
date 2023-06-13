import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';

const navigation = [
  { label: 'Singleplayer', path: '/singleplayer' },
  { label: 'Multiplayer', path: '/multiplayer' },
  { label: 'Inventory', path: '/inventory' },
  { label: 'Shop', path: '/shop' },
  { label: 'Settings', path: '/settings' },
];

export const StartScreen = () => {
  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center">
      <Card width="100%" maxWidth="800" margin="0 auto">
        <CardHeader
          margin="0 auto"
          fontSize="30"
          fontWeight="800"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <span>Battleship</span>
          <span>LOGO</span>
        </CardHeader>
        <CardBody>
          <Box display="flex" flexDirection="column" gap="10px">
            {navigation.map(({ label, path }) => (
              <Link to={path}>
                <Button
                  variant="solid"
                  size="lg"
                  colorScheme="twitter"
                  width="100%"
                  textColor="white"
                  fontWeight="600"
                >
                  {label}
                </Button>
              </Link>
            ))}
          </Box>
        </CardBody>
      </Card>
    </div>
  );
};
