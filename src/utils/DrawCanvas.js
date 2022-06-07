import React, { useEffect, useRef } from "react";

function DrawCanvas(props) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particlesArray = [];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.width;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) {
          this.size -= 0.1;
        }
      }
      draw() {
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    function init() {
      for (let i = 0; i < 100; i++) {
        particlesArray.push(new Particle());
      }
    }
    function handleParticles() {
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        if (particlesArray[i].size <= 0.6) {
          particlesArray.splice(i, 1);
          i--;
        }
      }
    }

    init();
    const animate = () => {
      // drawCircle();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      handleParticles();
      requestAnimationFrame(animate);
    };

    if(props.winner){
    animate();

   setTimeout(() => {
      canvas.width = 0;
      canvas.height = 0;
       props.setWinner(false)
    }, 1000);}
  }, [props.winner]);

  return (
    <canvas id="canvas1" className="position-absolute" ref={canvasRef}></canvas>
  );
}

export default DrawCanvas;