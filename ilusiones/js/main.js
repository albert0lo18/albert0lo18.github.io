// ─── Card factory ─────────────────────────────────────────────────────────────

function makeCard(label, drawFn, animate) {
  const card = document.createElement('div');
  card.className = 'card';

  const wrap = document.createElement('div');
  wrap.className = 'canvas-wrap';

  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 400;
  wrap.appendChild(canvas);

  const lbl = document.createElement('div');
  lbl.className = 'card-label';
  lbl.textContent = label;

  card.appendChild(wrap);
  card.appendChild(lbl);

  const ctx = canvas.getContext('2d');

  if (animate) {
    function loop(t) {
      ctx.clearRect(0, 0, 400, 400);
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, 400, 400);
      drawFn(ctx, t * 0.001);
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  } else {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, 400, 400);
    drawFn(ctx, 0);
  }

  return card;
}

function drawVertLines(ctx) {
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 1.1;

  for (let x = 0; x <= 400; x += 14) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 400);
    ctx.stroke();
  }
}

function drawHorizLines(ctx) {
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 1.2;

  for (let y = 0; y <= 400; y += 14) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(400, y);
    ctx.stroke();
  }
}

function drawGrid(ctx) {
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 1.1;

  for (let x = 0; x <= 400; x += 14) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 400);
    ctx.stroke();
  }

  for (let y = 0; y <= 400; y += 14) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(400, y);
    ctx.stroke();
  }
}

function drawHourglass(ctx) {
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 1.1;

  const n = 44;
  const cx = 200;

  for (let i = 0; i <= n; i++) {
    const x =(400 / n) * i;

    ctx.beginPath();
    ctx.moveTo(cx, 200);
    ctx.lineTo(x, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx, 200);
    ctx.lineTo(x, 400);
    ctx.stroke();
  }
}

function drawDiag(ctx) {
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 1.1;

  for (let d = -400; d <= 400; d += 14) {
    ctx.beginPath();
    ctx.moveTo(d, 400);
    ctx.lineTo(d + 400, 0);
    ctx.stroke();
  }
}

function drawStringArt(ctx) {
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 0.9;

  const n = 20;


  for (let i = 0; i <= n; i++) {
    const t = i / n;

    const a = t * 400;
    const b = 400 - t * 400;

    ctx.beginPath();
    ctx.moveTo(0 + a,0);
    ctx.lineTo(400, 0+a );
    ctx.stroke();
    
  }
}

function drawAstroid(ctx) {
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 0.9;

  const n = 20;


  for (let i = 0; i <= n; i++) {
    const t = i / n;

    const a = t * 400;
    const b = 400 - t * 400;

    ctx.beginPath();
    ctx.moveTo(0 + a, 0);
    ctx.lineTo(400, 0+a );
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 0 + a);
    ctx.lineTo(0 + a, 400);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(400 - a, 0);
    ctx.lineTo(0,0 + a);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(400, 0 +a);
    ctx.lineTo(400 - a, 400);
    ctx.stroke();
     
  }
}

function drawXRadial(ctx) {
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 1.1;

  const n = 42;
  const cx = 200;
  const cy = 200;

  for (let i = 0; i <= n; i++) {
    const y =(400 / n) * i;

    ctx.beginPath();
    ctx.moveTo(200, cy);
    ctx.lineTo(400, y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(200, cy);
    ctx.lineTo(0, y);
    ctx.stroke();
  }
}

function draw4Petal(ctx) {
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 0.9;

  const n = 16;


  for (let i = 0; i <= n; i++) {
    const t = i / n;

    const a = t * 400;
    const b = 400 - t * 400;

    ctx.beginPath();
    ctx.moveTo(200, a/2);
    ctx.lineTo(200 + a/2, 200 );
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(200, a/2);
    ctx.lineTo(200 - a/2, 200 );
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(b/2 , 200);
    ctx.lineTo(200, 200 + b/2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(400 - b/2, 200); 
    ctx.lineTo(200,200 + b/2);
    ctx.stroke();
    
  }
}

function drawConcentricDiamonds(ctx) {
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 1.1;

  for (let r = 0; r <= 200; r+= 15) {
    ctx.beginPath();
    ctx.moveTo(200, 200 - r);
    ctx.lineTo(200 + r, 200);
    ctx.lineTo(200, 200 + r);
    ctx.lineTo(200 - r, 200);
    ctx.closePath();
    ctx.stroke();
  }
}

function drawMoonPetals(ctx) {
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 1.1;

  const n = 16;


  for (let i = 0; i <= n; i++) {
    const t = i / n;

    const a = t * 400;
    const b = 400 - t * 400;

    ctx.beginPath();
    ctx.moveTo(200, 200+ a/2);
    ctx.lineTo(200+ a/2, 400 );
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(200, 200 + a/2);
    ctx.lineTo(200 - a/2, 400 );
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(200 , 200 - b/2 );
    ctx.lineTo(200 + b/2 , 0 );
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(200 , 200 - b/2 );
    ctx.lineTo(200 - b/2 , 0 );
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0 + a/2 , 0 + a/2);
    ctx.lineTo(200 - a/2, 200 + a/2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(400 - a/2 , 400 - a/2);
    ctx.lineTo(200 + a/2, 200 - a/2);
    ctx.stroke();

  }
}

function drawFlowerPetals(ctx) {
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 1.1;

  const n = 16;


  for (let i = 0; i <= n; i++) {
    const t = i / n;

    const a = t * 400;
    const b = 400 - t * 400;

    ctx.beginPath();
    ctx.moveTo(200, 200+ a/2);
    ctx.lineTo(200+ a/2, 400 );
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(200 + a/2 , 200);
    ctx.lineTo(400, 200 + a/2);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(200, 200 + a/2);
    ctx.lineTo(200 - a/2, 400 );
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(200 + a/2 , 200);
    ctx.lineTo(400, 200 - a/2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(200 , 200 - b/2 );
    ctx.lineTo(200 + b/2 , 0 );
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0 , 0 + b/2);
    ctx.lineTo(0 + b/2, 200);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(200 , 200 - b/2 );
    ctx.lineTo(200 - b/2 , 0 );
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(200 - b/2, 200 );
    ctx.lineTo(0 , 200 + b/2 );
    ctx.stroke();


  }
}

function drawStar4(ctx) {
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 1.1;

  const n = 16;


  for (let i = 0; i < n; i++) {
    const t = i / n;

    const a = t * 400;
    const b = 400 - t * 400;

    ctx.beginPath();
    ctx.moveTo(200 - a/2, 0);
    ctx.lineTo(0, 0 + a/2 );
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(200 + a/2, 0);
    ctx.lineTo(400, 0 + a/2 );
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(200, 200 - a/2);
    ctx.lineTo(0 + a/2, 400 - a/2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(200, 200 - a/2);
    ctx.lineTo(400 - a/2, 400 - a/2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0 + a/2, 400 - a/2);
    ctx.lineTo(200 + a/2,200 + a/2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(200,300 + a/4);
    ctx.lineTo(200 - a/4 ,400);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(200,300 + a/4);
    ctx.lineTo(200 + a/4 , 400);
    ctx.stroke();

  }
}

function drawConcentricSquares(ctx) {
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 1.1;

  for (let m = 0; m <= 200; m += 12) {
    ctx.strokeRect(m, m, 400 - m * 2, 400 - m * 2);
  }
}

function drawConcentricTriangles(ctx) {
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 1.1;

  for (let m = 0; m <= 200; m += 10) {
    ctx.beginPath();
    ctx.moveTo(200, m);
    ctx.lineTo(400 - m, 400 - m);
    ctx.lineTo(m, 400 - m);
    ctx.closePath();
    ctx.stroke();
  }
}

function drawConcentricCircles(ctx) {
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 1.1;

  for (let r = 0; r <= 200; r += 6) {
    ctx.beginPath();
    ctx.arc(200, 200, r, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function drawZ(ctx) {
 ctx.strokeStyle = '#111';
  ctx.lineWidth = 1.1;

  const n = 20;


  for (let i = 0; i <= n; i++) {
    const t = i / n;

    const a = t * 400;
    const b = 400 - t * 400;

    ctx.beginPath();
    ctx.moveTo(0+a, 400);
    ctx.lineTo(400 - a, 400 - a);
    ctx.stroke();

    
    ctx.beginPath();
    ctx.moveTo(400 - a,0);
    ctx.lineTo(0 + a,0 + a);
    ctx.stroke();

  }
}

function draweye(ctx) {
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 1.1;

  const n = 16;


  for (let i = 0; i <= n; i++) {
    const t = i / n;

    const a = t * 400;
    const b = 400 - t * 400;

    ctx.beginPath();
    ctx.moveTo(200 - a/2, 400 - a/2);
    ctx.lineTo(400 - a/2, 200 + a/2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0 + a/2,200 - a/2);
    ctx.lineTo(200+a/2,0 + a/2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(200, 200, b/6, 0, Math.PI * 2);
    ctx.stroke();

  }

}

function drawEyes(ctx) {
 ctx.strokeStyle = '#111';
  ctx.lineWidth = 1.1;

  const n = 20;


  for (let i = 0; i <= n; i++) {
    const t = i / n;

    const a = t * 400;
    const b = 400 - t * 400;

    ctx.beginPath();
    ctx.moveTo(0+a, 400);
    ctx.lineTo(400 - a, 400 - a);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0,400 - a);
    ctx.lineTo(0 + a,0 + a);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(300, 100, a/10, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(400 - a,0);
    ctx.lineTo(0 + a,0 + a);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(400,0 + a);
    ctx.lineTo(400 -a, 400 - a);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(100, 300, a/10, 0, Math.PI * 2);
    ctx.stroke();


  }
}

function drawS(ctx) {
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 1.1;

  const n = 16;


  for (let i = 0; i <= n; i++) {
    const t = i / n;

    const a = t * 400;
    const b = 400 - t * 400;

    ctx.beginPath();
    ctx.moveTo(200-a/2, 200);
    ctx.lineTo(0+a, 200-a/2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(200+a/2, 200);
    ctx.lineTo(400-a, 200+a/2);
    ctx.stroke();

  }
}

function drawTrebol(ctx) {
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 1.1;

  const n = 16;


  for (let i = 0; i <= n; i++) {
    const t = i / n;

    const a = t * 400;
    const b = 400 - t * 400;

    ctx.beginPath();
    ctx.moveTo(200 - a/2, 200 - a/4);
    ctx.lineTo(0,100 + a/2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(200 - a/2, 200 - a/4);
    ctx.lineTo(0 + a/2,100 - a/4);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(200 + a/2,200 - a/4);
    ctx.lineTo(400 - a/2,100 - a/4);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(200 + a/2, 200 - a/4);
    ctx.lineTo(400,100 + a/2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(200, 200 + a/2);
    ctx.lineTo(200 + a/2,400 - a/4);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(200, 200 + a/2);
    ctx.lineTo(200 - a/2 ,400 - a/4);
    ctx.stroke();



  }
}

function drawTriangulo(ctx) {
 ctx.strokeStyle = '#111';
  ctx.lineWidth = 1.1;

  const n = 20;


  for (let i = 0; i <= n; i++) {
    const t = i / n;

    const a = t * 400;
    const b = 400 - t * 400;

    ctx.beginPath();
    ctx.moveTo(200-a/2,0 + a);
    ctx.lineTo(0 + a, 400);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(200+a/2,0 + a);
    ctx.lineTo(400 - a, 400);
    ctx.stroke();

  }
}

function drawStar(ctx) {
 ctx.strokeStyle = '#111';
  ctx.lineWidth = 1.1;

  const n = 20;


  for (let i = 0; i <= n; i++) {
    const t = i / n;

    const a = t * 400;
    const b = 400 - t * 400;

    ctx.beginPath();
    ctx.moveTo(200 - a/2 ,0 + 3*a/4);
    ctx.lineTo(0 + a, 300);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(200 + a/2,0 + 3*a/4);
    ctx.lineTo(400 - a, 300);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0 + a, 100);
    ctx.lineTo(200 - a/2, 400 - 3*a/4);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(400 - a, 100);
    ctx.lineTo(200 + a/2,400 - 3*a/4);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(200 - a/8 ,250 - a/8);
    ctx.lineTo(250 - a/8,200 + a/8);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(200 + a/8 ,150 + a/8);
    ctx.lineTo(150 + a/8,200 - a/8);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(200, 200, b/20, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function drawUFO(ctx) {
 ctx.strokeStyle = '#111';
  ctx.lineWidth = 1.1;

  const n = 16;

  for (let i = 0; i <= n; i++) {
    const t = i / n;

    const a = t * 400;
    const b = 400 - t * 400;

    ctx.beginPath();
    ctx.moveTo(0 + a/2,400 - a/2);
    ctx.lineTo(400 ,300 + a/4);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(400 - a/2, 0 + a/2);
    ctx.lineTo(300 + a/4,400);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0+ 3*a/4, 400 );
    ctx.lineTo(400 ,300- 3*a/4);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(400 - a/2, 0 + a/2);
    ctx.lineTo(0, 100 - a/4);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0 + a/2, 400 - a/2);
    ctx.lineTo(100 -a/4 , 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0,400 - 3*a/4);
    ctx.lineTo(100 + 3*a/4,0);
    ctx.stroke();


    
    

    
    

  }
}


// ─── Build grids ──────────────────────────────────────────────────────────────

const grids = {
  grid1: [
    ['01 · Líneas verticales',      drawVertLines,           false],
    ['02 · Líneas horizontales',    drawHorizLines,          false],
    ['03 · Cuadrícula',             drawGrid,                false],
    ['04 · Reloj de arena',  drawHourglass,           false],
    ['05 · Diagonales',             drawDiag,                false],
    ['06 · Cuarto de circulo',   drawStringArt,           false],
    ['07 · Malla circular',   drawAstroid,             false],
    ['08 · X',               drawXRadial,             false],
  ],
  grid2: [
    ['09 · Estrella',    draw4Petal,              false],
    ['10 · Rombos',    drawConcentricDiamonds,  false],
    ['11 · Pétalos luna',           drawMoonPetals,          false],
    ['12 · Flor',          drawFlowerPetals,        false],
    ['13 · Punta en perspectiva',      drawStar4,               false],
    ['14 · Cuadrados', drawConcentricSquares,   false],
    ['15 · Triángulos',drawConcentricTriangles, false],
    ['16 · Círculos',  drawConcentricCircles,   false],


  ],
  grid3: [
      ['1 · Cinta de Moebius ', drawZ, false],
      ['2 · Ojo', draweye, false],
      ['3 · Ojos', drawEyes, false],
      ['4 · S', drawS, false],
      ['5 · Trebol', drawTrebol, false],
      ['6 · Triángulo', drawTriangulo, false],
      ['7 · Estrella', drawStar, false],
      ['8 · Ufo', drawUFO, false],
      
  ],


};

Object.entries(grids).forEach(([id, items]) => {
  const container = document.getElementById(id);
  items.forEach(([label, fn, anim]) => container.appendChild(makeCard(label, fn, anim)));
});
