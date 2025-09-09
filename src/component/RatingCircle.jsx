import { useEffect, useRef } from "react";

const RatingCircle = ({ percent }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 30;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 8;
    ctx.stroke();

    // Progress circle
    ctx.beginPath();
    ctx.arc(
      centerX,
      centerY,
      radius,
      -Math.PI / 2,
      (2 * Math.PI * percent) / 100 - Math.PI / 2
    );
    ctx.strokeStyle = percent > 70 ? "#4caf50" : percent > 40 ? "#ff9800" : "#f44336"; // green/orange/red
    ctx.lineWidth = 8;
    ctx.stroke();

    // Text
    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${percent}%`, centerX, centerY);
  }, [percent]);

  return (
    <canvas
      ref={canvasRef}
      width={75}
      height={75}
      style={{ width: "40px", height: "40px", fontSize:"bold", backgroundColor:"black", borderRadius:"50% "}}
    />
  );
};

export default RatingCircle;
