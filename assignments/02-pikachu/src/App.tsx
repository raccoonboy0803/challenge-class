import styled, { css, keyframes } from 'styled-components';
import { useEffect, useState } from 'react';
import pikachu from './assets/pikachu.png';
import grass from './assets/grass.png';

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isJumping, setIsJumping] = useState(false);
  const [isFacingRight, setIsFacingRight] = useState(true);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === ' ') {
      if (!isJumping) {
        setIsJumping(true);
        setTimeout(() => {
          setIsJumping(false);
        }, 500);
      }
    } else {
      setPosition((prevPosition) => {
        let newX = prevPosition.x;
        let newY = prevPosition.y;

        switch (e.key) {
          case 'ArrowUp':
            newY = Math.max(newY - 50, 0);
            break;
          case 'ArrowDown':
            newY = Math.min(newY + 50, 450);
            break;
          case 'ArrowLeft':
            newX = Math.max(newX - 50, 0);
            setIsFacingRight(false);
            break;
          case 'ArrowRight':
            newX = Math.min(newX + 50, 450);
            setIsFacingRight(true);
            break;
          default:
            break;
        }

        return { x: newX, y: newY };
      });
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Container>
      <Grass>
        <Pikachu
          x={position.x}
          y={position.y}
          $isJumping={isJumping}
          $isFacingRight={isFacingRight}
        />
      </Grass>
    </Container>
  );
}
export default App;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Grass = styled.div`
  width: 500px;
  height: 500px;
  background-image: url(${grass});
  background-size: 50px 50px;
  background-repeat: repeat;
  position: relative;
`;

const Pikachu = styled.div<{
  x: number;
  y: number;
  $isJumping: boolean;
  $isFacingRight: boolean;
}>`
  width: 50px;
  height: 50px;
  background-image: url(${pikachu});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
  transform: ${({ $isFacingRight }) =>
    $isFacingRight ? 'none' : 'rotateY(180deg)'};
  animation: ${({ $isJumping }) =>
    $isJumping &&
    css`
      ${jumpAnimation} 0.5s ease
    `};
`;

const jumpAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-50px); 
  }
`;
