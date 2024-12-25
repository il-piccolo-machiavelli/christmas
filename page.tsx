import React, { useState, useEffect } from 'react';

const ChristmasCard = () => {
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);

  useEffect(() => {
    const handleOrientation = (event) => {
      const x = event.gamma || 0;
      const y = event.beta || 0;
      
      setTiltX(Math.max(-15, Math.min(15, x / 3)));
      setTiltY(Math.max(-15, Math.min(15, y / 6)));
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  // 눈송이 레이어를 3개로 나누어 원근감 표현
  const createSnowflakes = (count, layer) => {
    const size = layer === 1 ? '4px' : layer === 2 ? '8px' : '12px';
    const blur = layer === 1 ? '1px' : layer === 2 ? '2px' : '3px';
    const speed = layer === 1 ? '15s' : layer === 2 ? '12s' : '10s';
    const opacity = layer === 1 ? '0.3' : layer === 2 ? '0.5' : '0.7';
    
    return Array.from({ length: count }, (_, i) => {
      const startPositionLeft = Math.random() * 100;
      const animationDelay = Math.random() * -20;
      
      return (
        <div
          key={`snow-${layer}-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            width: size,
            height: size,
            left: `${startPositionLeft}%`,
            top: '-20px',
            filter: `blur(${blur})`,
            opacity: opacity,
            animation: `fall-${layer} ${speed} linear ${animationDelay}s infinite`,
            transform: `translate3d(${tiltX * layer}px, 0, 0)`,
          }}
        />
      );
    });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-slate-800 to-purple-900">
      {/* 3개 레이어의 눈송이들 */}
      <div className="snow-layer-1">
        {createSnowflakes(30, 1)} {/* 뒤쪽 레이어 */}
      </div>
      <div className="snow-layer-2">
        {createSnowflakes(20, 2)} {/* 중간 레이어 */}
      </div>
      <div className="snow-layer-3">
        {createSnowflakes(10, 3)} {/* 앞쪽 레이어 */}
      </div>
      
      {/* 메시지 컨테이너 */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: `perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)`,
          transition: 'transform 0.2s ease-out',
        }}
      >
        <div className="text-center text-white font-serif">
          <p className="text-5xl font-normal mb-4" 
             style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.5)' }}>
            Merry Christmas
          </p>
          <p className="text-3xl font-light mb-3 italic"
             style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            and a
          </p>
          <p className="text-5xl font-normal mb-8"
             style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.5)' }}>
            Happy New Year!
          </p>
          <p className="text-lg font-light tracking-widest mt-12 opacity-80"
             style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
            from Caffeineworks Co Ltd.
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fall-1 {
          0% {
            transform: translate3d(${tiltX}px, 0, 0);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translate3d(${tiltX}px, 100vh, 0);
            opacity: 0;
          }
        }
        
        @keyframes fall-2 {
          0% {
            transform: translate3d(${tiltX * 2}px, 0, 0);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translate3d(${tiltX * 2}px, 100vh, 0);
            opacity: 0;
          }
        }
        
        @keyframes fall-3 {
          0% {
            transform: translate3d(${tiltX * 3}px, 0, 0);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translate3d(${tiltX * 3}px, 100vh, 0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ChristmasCard;