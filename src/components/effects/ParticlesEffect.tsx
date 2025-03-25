"use client";

import React, { useState, useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  life: number;
  maxLife: number;
}

interface ParticlesEffectProps {
  count?: number;
  color?: string;
  mouseInteraction?: boolean;
  size?: number;
}

const ParticlesEffect: React.FC<ParticlesEffectProps> = ({
  count = 30, // Giảm số lượng particles
  color = '#ff4655', // Valorant red
  mouseInteraction = true,
  size = 2, // Giảm kích thước particles
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationFrameRef = useRef<number>(0);
  
  // Khởi tạo canvas và particles
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Tạo particles ban đầu
    const initialParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      initialParticles.push(createParticle());
    }
    setParticles(initialParticles);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [count, color, size]);
  
  // Theo dõi vị trí chuột
  useEffect(() => {
    if (!mouseInteraction) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseInteraction]);
  
  // Tạo particle mới
  const createParticle = (mx?: number, my?: number): Particle => {
    const useMousePosition = mx !== undefined && my !== undefined;
    
    return {
      x: useMousePosition ? mx : Math.random() * window.innerWidth,
      y: useMousePosition ? my : Math.random() * window.innerHeight,
      size: Math.random() * size + 1,
      speedX: (Math.random() - 0.5) * 1, // Giảm tốc độ
      speedY: (Math.random() - 0.5) * 1, // Giảm tốc độ
      color: color,
      opacity: Math.random() * 0.3 + 0.2, // Giảm độ mờ đục
      life: 0,
      maxLife: useMousePosition ? 50 + Math.random() * 30 : 100 + Math.random() * 100,
    };
  };
  
  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || particles.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      // Cập nhật và vẽ particles
      const updatedParticles = particles.map(particle => {
        // Cập nhật vị trí
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.life += 1;
        
        // Giảm opacity theo thời gian sống
        const lifeRatio = particle.life / particle.maxLife;
        const currentOpacity = particle.opacity * (1 - lifeRatio);
        
        // Vẽ particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hexToRgb(particle.color)}, ${currentOpacity})`;
        ctx.fill();
        
        // Tương tác với chuột nếu được bật (giảm cường độ tương tác)
        if (mouseInteraction) {
          const dx = particle.x - mousePosition.x;
          const dy = particle.y - mousePosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 80) { // Giảm phạm vi tương tác
            const angle = Math.atan2(dy, dx);
            const force = (80 - distance) / 80;
            
            particle.speedX += Math.cos(angle) * force * 0.1; // Giảm lực đẩy
            particle.speedY += Math.sin(angle) * force * 0.1; // Giảm lực đẩy
          }
        }
        
        return particle;
      });
      
      // Thay thế particles hết thời gian sống
      const finalParticles = updatedParticles.map(particle => {
        if (particle.life >= particle.maxLife) {
          return createParticle();
        }
        return particle;
      });
      
      setParticles(finalParticles);
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [particles, dimensions, mousePosition, mouseInteraction]);
  
  // Hàm chuyển đổi màu hex sang rgb
  const hexToRgb = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '255, 70, 85'; // Fallback to Valorant red
  };
  
  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className="fixed inset-0 pointer-events-none z-30"
      style={{ opacity: 0.5 }} // Giảm độ mờ đục tổng thể
    />
  );
};

export default ParticlesEffect;
