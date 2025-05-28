// TruckAnimation.jsx
import React, {
  useEffect,
  useRef,
} from 'react';

import Lottie from 'lottie-web';

import animationData
  from '../../assets/truck-delivery-service.json'; // Adjust path

const TruckAnimation = () => {
  const containerRef = useRef(null);
  const position = useRef(0);
  const frame = useRef();

  useEffect(() => {
    const anim = Lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData,
    });

    const move = () => {
      position.current += 2;
      if (position.current > window.innerWidth) position.current = -100;
      if (containerRef.current)
        containerRef.current.style.left = `${position.current}px`;
      frame.current = requestAnimationFrame(move);
    };

    move();

    return () => {
      anim.destroy();
      cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '80px', overflow: 'hidden' }}>
      <hr style={{ position: 'absolute', top: '50%', width: '100%', border: '1px solid #ccc' }} />
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          top: '0px',
          left: 0,
          width: '80px',
          height: '80px',
        }}
      />
    </div>
  );
};

export default TruckAnimation;
