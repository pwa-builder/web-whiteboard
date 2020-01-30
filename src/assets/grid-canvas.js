

 let canvas;

 self.onmessage = (ev) => {
   console.log(ev);
 
   if (ev.data.canvas) {
     canvas = ev.data.canvas;
   }
   
   const context = canvas.getContext("2d");
 
   if (ev.data.draw === true) {
 
     context.globalAlpha = 0.6;
 
     const bw = canvas.width;
     const bh = canvas.height;
     const p = 2;
 
     for (let x = 0; x <= bw; x += 40) {
       context.moveTo(0.5 + x + p, p);
       context.lineTo(0.5 + x + p, bh + p);
     }
 
     for (let x = 0; x <= bh; x += 40) {
       context.moveTo(p, 0.5 + x + p);
       context.lineTo(bw + p, 0.5 + x + p);
     }
 
     context.lineWidth = 2;
     context.strokeStyle = "lightgrey";
     context.stroke();
   }
   else {
     context.clearRect(0, 0, canvas.width, canvas.height)
   }
 }