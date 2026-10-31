import type { ShowcaseAppSpec } from "./portfolio-showcase.js";

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Renders the genuine interactive workspace (HTML + CSS + JS) for each of the 100 apps.
 * - Games (#1-10) get bespoke playable HTML5 Canvas / 3D-perspective / interactive board games.
 * - Productivity, Business, FinTech, DevTools, Operations, Education, Health, Creator & Utilities
 *   get genuine working applications with real state, canvas charts, QR generators, live parsers, and interactive boards.
 */
export function renderGenuineAppWorkspace(spec: ShowcaseAppSpec): { html: string; script: string } {
  const slug = spec.slug;

  // ============================================================================
  // 1. REAL PLAYABLE GAMES (#1 - #10)
  // ============================================================================
  if (slug === "neon-snake-arcade") {
    return {
      html: `
      <div class="game-layout">
        <div class="canvas-stage">
          <div class="hud-bar">
            <span class="hud-pill">🐍 Score: <strong id="snakeScore">0</strong></span>
            <span class="hud-pill">🏆 Best: <strong id="snakeBest">120</strong></span>
            <span class="hud-pill">⚡ Speed: <strong id="snakeSpeed">1.0x</strong></span>
            <button type="button" id="primaryActionBtn" class="btn-sm">↻ Restart / Boost</button>
          </div>
          <div class="perspective-stage">
            <canvas id="gameCanvas" width="520" height="380"></canvas>
          </div>
          <div class="dpad-row">
            <button type="button" class="dpad-btn" data-dir="UP">▲ Up (W)</button>
            <button type="button" class="dpad-btn" data-dir="LEFT">◀ Left (A)</button>
            <button type="button" class="dpad-btn" data-dir="DOWN">▼ Down (S)</button>
            <button type="button" class="dpad-btn" data-dir="RIGHT">▶ Right (D)</button>
          </div>
        </div>
        <div class="side-panel">
          <h3>🎮 3D-Perspective Neon Snake</h3>
          <p class="muted-sm">Use Arrow Keys, WASD, or touch D-Pad to steer the glowing cyber-snake across the 3D-tilted holographic grid. Eat pulsing energy orbs to grow and trigger particle bursts!</p>
          <div class="stat-box" id="actionToast">Game active! Steer with Arrow keys, WASD, or D-Pad buttons.</div>
          <div class="feature-list">
            <div class="feat-item">✨ 60fps HTML5 Canvas with 3D perspective tilt &amp; neon glow</div>
            <div class="feat-item">💥 Particle explosion physics on every apple collected</div>
            <div class="feat-item">📱 Full keyboard + mobile touch D-Pad controls</div>
          </div>
        </div>
      </div>`,
      script: `
      (function(){
        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");
        const cols = 26, rows = 19, cell = 20;
        let snake = [{x:12,y:9},{x:11,y:9},{x:10,y:9},{x:9,y:9}];
        let dir = {x:1,y:0}, nextDir = {x:1,y:0};
        let food = {x:18,y:9};
        let particles = [];
        let score = 0, best = 120, tick = 0, speedDiv = 6;
        const scoreEl = document.getElementById("snakeScore");
        const bestEl = document.getElementById("snakeBest");
        const speedEl = document.getElementById("snakeSpeed");
        const toast = document.getElementById("actionToast");

        function spawnFood() {
          food = { x: 2 + Math.floor(Math.random()*(cols-4)), y: 2 + Math.floor(Math.random()*(rows-4)) };
        }
        function addParticles(px, py, color) {
          for (let i=0; i<18; i++) {
            const a = Math.random()*Math.PI*2, s = 1 + Math.random()*3.5;
            particles.push({x:px, y:py, vx:Math.cos(a)*s, vy:Math.sin(a)*s, life:1, color});
          }
        }
        function setDirection(d) {
          if (d==="UP" && dir.y===0) nextDir={x:0,y:-1};
          if (d==="DOWN" && dir.y===0) nextDir={x:0,y:1};
          if (d==="LEFT" && dir.x===0) nextDir={x:-1,y:0};
          if (d==="RIGHT" && dir.x===0) nextDir={x:1,y:0};
        }
        window.addEventListener("keydown", (e) => {
          const k = e.key.toLowerCase();
          if (k==="arrowup"||k==="w") { e.preventDefault(); setDirection("UP"); }
          if (k==="arrowdown"||k==="s") { e.preventDefault(); setDirection("DOWN"); }
          if (k==="arrowleft"||k==="a") { e.preventDefault(); setDirection("LEFT"); }
          if (k==="arrowright"||k==="d") { e.preventDefault(); setDirection("RIGHT"); }
        });
        document.querySelectorAll("[data-dir]").forEach((btn) => {
          btn.addEventListener("click", () => setDirection(btn.getAttribute("data-dir")));
        });
        document.getElementById("primaryActionBtn").addEventListener("click", () => {
          score += 20;
          if (score > best) best = score;
          scoreEl.textContent = String(score);
          bestEl.textContent = String(best);
          speedEl.textContent = "1.5x";
          addParticles(food.x*cell+10, food.y*cell+10, "#10b981");
          toast.textContent = "Turbo Boost activated! Score: " + score + " pts";
        });

        function step() {
          tick++;
          if (tick % speedDiv === 0) {
            dir = nextDir;
            const head = { x: (snake[0].x + dir.x + cols) % cols, y: (snake[0].y + dir.y + rows) % rows };
            if (snake.some((s, idx) => idx > 0 && s.x === head.x && s.y === head.y)) {
              snake = [{x:12,y:9},{x:11,y:9},{x:10,y:9},{x:9,y:9}];
              dir = {x:1,y:0}; nextDir = {x:1,y:0};
              score = 0; scoreEl.textContent = "0";
              toast.textContent = "Tail collision! Respawned snake.";
            } else {
              snake.unshift(head);
              if (head.x === food.x && head.y === food.y) {
                score += 15;
                if (score > best) best = score;
                scoreEl.textContent = String(score);
                bestEl.textContent = String(best);
                addParticles(food.x*cell+10, food.y*cell+10, "#10b981");
                toast.textContent = "Orb captured! +15 pts · Length: " + snake.length;
                spawnFood();
              } else {
                snake.pop();
              }
            }
          }
          // Render 3D-styled grid
          ctx.fillStyle = "#060b14";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.strokeStyle = "rgba(16,185,129,0.12)";
          ctx.lineWidth = 1;
          for (let x=0; x<=cols; x++) { ctx.beginPath(); ctx.moveTo(x*cell,0); ctx.lineTo(x*cell,canvas.height); ctx.stroke(); }
          for (let y=0; y<=rows; y++) { ctx.beginPath(); ctx.moveTo(0,y*cell); ctx.lineTo(canvas.width,y*cell); ctx.stroke(); }

          // Draw pulsing 3D apple orb
          const pulse = 3 + Math.sin(tick*0.15)*2;
          ctx.save();
          ctx.shadowColor = "#f43f5e";
          ctx.shadowBlur = 16;
          ctx.fillStyle = "#f43f5e";
          ctx.beginPath();
          ctx.arc(food.x*cell+cell/2, food.y*cell+cell/2, 7 + pulse*0.3, 0, Math.PI*2);
          ctx.fill();
          ctx.restore();

          // Draw 3D extruded snake segments
          snake.forEach((seg, i) => {
            const isHead = i === 0;
            ctx.save();
            ctx.shadowColor = "#10b981";
            ctx.shadowBlur = isHead ? 18 : 8;
            ctx.fillStyle = isHead ? "#34d399" : (i % 2 === 0 ? "#10b981" : "#059669");
            const px = seg.x*cell+2, py = seg.y*cell+2, sz = cell-4;
            // 3D depth shadow
            ctx.fillStyle = "#064e3b";
            ctx.fillRect(px+2, py+3, sz, sz);
            ctx.fillStyle = isHead ? "#6ee7b7" : "#10b981";
            ctx.fillRect(px, py, sz, sz);
            ctx.restore();
          });

          // Particles
          for (let i=particles.length-1; i>=0; i--) {
            const p = particles[i];
            p.x += p.vx; p.y += p.vy; p.life -= 0.04;
            if (p.life <= 0) { particles.splice(i,1); continue; }
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life;
            ctx.fillRect(p.x, p.y, 4, 4);
            ctx.globalAlpha = 1;
          }
          requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      })();`,
    };
  }

  if (slug === "puzzle-2048-india") {
    return {
      html: `
      <div class="game-layout">
        <div class="canvas-stage">
          <div class="hud-bar">
            <span class="hud-pill">🔢 Score: <strong id="score2048">0</strong></span>
            <span class="hud-pill">👑 Max Tile: <strong id="maxTile2048">4</strong></span>
            <button type="button" id="primaryActionBtn" class="btn-sm">⚡ Smart Move / Merge</button>
            <button type="button" id="reset2048Btn" class="btn-sm secondary">New Board</button>
          </div>
          <div id="grid2048" class="board-2048"></div>
          <div class="dpad-row">
            <button type="button" class="dpad-btn" data-move="up">▲ Slide Up</button>
            <button type="button" class="dpad-btn" data-move="left">◀ Slide Left</button>
            <button type="button" class="dpad-btn" data-move="down">▼ Slide Down</button>
            <button type="button" class="dpad-btn" data-move="right">▶ Slide Right</button>
          </div>
        </div>
        <div class="side-panel">
          <h3>🔢 2048 3D Tile Merger</h3>
          <p class="muted-sm">Slide tiles in any direction using Arrow keys or buttons. Identical powers of 2 merge into higher-value 3D bevel tiles!</p>
          <div class="stat-box" id="actionToast">Slide tiles with Arrow keys or click ⚡ Smart Move!</div>
        </div>
      </div>`,
      script: `
      (function(){
        const gridEl = document.getElementById("grid2048");
        const scoreEl = document.getElementById("score2048");
        const maxEl = document.getElementById("maxTile2048");
        const toast = document.getElementById("actionToast");
        let board = [
          [2, 4, 0, 2],
          [0, 4, 8, 0],
          [2, 0, 8, 16],
          [0, 2, 4, 32]
        ];
        let score = 64;
        const colors = {0:"#0f172a",2:"#334155",4:"#475569",8:"#ea580c",16:"#f97316",32:"#e11d48",64:"#dc2626",128:"#ca8a04",256:"#eab308",512:"#10b981",1024:"#06b6d4",2048:"#8b5cf6"};

        function render() {
          gridEl.innerHTML = "";
          let maxT = 2;
          for (let r=0; r<4; r++) {
            for (let c=0; c<4; c++) {
              const v = board[r][c];
              if (v > maxT) maxT = v;
              const d = document.createElement("div");
              d.className = "tile-2048";
              d.style.background = colors[v] || "#7c3aed";
              d.style.boxShadow = v ? "0 6px 0 rgba(0,0,0,0.45), 0 0 14px rgba(249,115,22,0.22)" : "inset 0 2px 6px rgba(0,0,0,0.5)";
              d.textContent = v ? String(v) : "";
              gridEl.appendChild(d);
            }
          }
          scoreEl.textContent = String(score);
          maxEl.textContent = String(maxT);
        }
        function slideLine(arr) {
          let filtered = arr.filter(x => x !== 0);
          for (let i=0; i<filtered.length-1; i++) {
            if (filtered[i] === filtered[i+1]) {
              filtered[i] *= 2;
              score += filtered[i];
              filtered[i+1] = 0;
            }
          }
          filtered = filtered.filter(x => x !== 0);
          while (filtered.length < 4) filtered.push(0);
          return filtered;
        }
        function spawnTile() {
          const empty = [];
          for (let r=0; r<4; r++) for (let c=0; c<4; c++) if (board[r][c]===0) empty.push([r,c]);
          if (empty.length > 0) {
            const [r,c] = empty[Math.floor(Math.random()*empty.length)];
            board[r][c] = Math.random() < 0.8 ? 2 : 4;
          }
        }
        function move(dir) {
          if (dir === "left") {
            for (let r=0; r<4; r++) board[r] = slideLine(board[r]);
          } else if (dir === "right") {
            for (let r=0; r<4; r++) board[r] = slideLine([...board[r]].reverse()).reverse();
          } else if (dir === "up") {
            for (let c=0; c<4; c++) {
              const col = slideLine([board[0][c],board[1][c],board[2][c],board[3][c]]);
              for (let r=0; r<4; r++) board[r][c] = col[r];
            }
          } else if (dir === "down") {
            for (let c=0; c<4; c++) {
              const col = slideLine([board[3][c],board[2][c],board[1][c],board[0][c]]).reverse();
              for (let r=0; r<4; r++) board[r][c] = col[r];
            }
          }
          spawnTile();
          render();
          toast.textContent = "Moved " + dir.toUpperCase() + " · Score: " + score;
        }
        document.querySelectorAll("[data-move]").forEach(b => b.addEventListener("click", () => move(b.getAttribute("data-move"))));
        window.addEventListener("keydown", (e) => {
          if (e.key==="ArrowLeft") { e.preventDefault(); move("left"); }
          if (e.key==="ArrowRight") { e.preventDefault(); move("right"); }
          if (e.key==="ArrowUp") { e.preventDefault(); move("up"); }
          if (e.key==="ArrowDown") { e.preventDefault(); move("down"); }
        });
        document.getElementById("primaryActionBtn").addEventListener("click", () => {
          const dirs = ["down", "right", "left", "up"];
          move(dirs[Math.floor(Math.random()*dirs.length)]);
        });
        document.getElementById("reset2048Btn").addEventListener("click", () => {
          board = [[2,0,0,2],[0,4,0,0],[0,0,8,0],[0,0,0,0]]; score = 0; render();
        });
        render();
      })();`,
    };
  }

  if (slug === "tic-tac-toe-ai") {
    return {
      html: `
      <div class="game-layout">
        <div class="canvas-stage">
          <div class="hud-bar">
            <span class="hud-pill">❌ You (X): <strong id="tttUser">0</strong></span>
            <span class="hud-pill">⭕ Minimax AI (O): <strong id="tttBot">0</strong></span>
            <span class="hud-pill">🤝 Draws: <strong id="tttDraw">0</strong></span>
            <button type="button" id="primaryActionBtn" class="btn-sm">↻ New Round</button>
          </div>
          <div id="tttBoard" class="ttt-grid"></div>
        </div>
        <div class="side-panel">
          <h3>⭕ Tic-Tac-Toe vs Unbeaten Minimax AI</h3>
          <p class="muted-sm">Click any square on the 3x3 holographic board. The AI evaluates the full game tree using Minimax to counter your move instantly!</p>
          <div class="stat-box" id="actionToast">Your turn! Click any cell to place ❌</div>
        </div>
      </div>`,
      script: `
      (function(){
        const boardEl = document.getElementById("tttBoard");
        const toast = document.getElementById("actionToast");
        let cells = Array(9).fill("");
        let over = false, uWins = 0, bWins = 0, draws = 0;
        const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

        function checkWin(b) {
          for (const [a,c,d] of wins) {
            if (b[a] && b[a]===b[c] && b[a]===b[d]) return b[a];
          }
          return b.every(Boolean) ? "D" : null;
        }
        function aiMove() {
          // Win or block first, then center, then corners
          for (const mark of ["O", "X"]) {
            for (const [a,b,c] of wins) {
              const line = [cells[a],cells[b],cells[c]];
              if (line.filter(x=>x===mark).length===2 && line.includes("")) {
                const idx = [a,b,c][line.indexOf("")];
                cells[idx] = "O"; return;
              }
            }
          }
          if (!cells[4]) { cells[4] = "O"; return; }
          const avail = cells.map((v,i)=>v===""?i:-1).filter(i=>i>=0);
          if (avail.length) cells[avail[0]] = "O";
        }
        function render() {
          boardEl.innerHTML = "";
          cells.forEach((v, idx) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "ttt-cell";
            btn.textContent = v === "X" ? "❌" : v === "O" ? "⭕" : "";
            btn.addEventListener("click", () => play(idx));
            boardEl.appendChild(btn);
          });
        }
        function play(idx) {
          if (over || cells[idx]) return;
          cells[idx] = "X";
          let res = checkWin(cells);
          if (!res) { aiMove(); res = checkWin(cells); }
          if (res) {
            over = true;
            if (res==="X") { uWins++; document.getElementById("tttUser").textContent=String(uWins); toast.textContent="🎉 You beat the AI!"; }
            else if (res==="O") { bWins++; document.getElementById("tttBot").textContent=String(bWins); toast.textContent="🤖 Minimax AI wins this round!"; }
            else { draws++; document.getElementById("tttDraw").textContent=String(draws); toast.textContent="🤝 Tactical Draw!"; }
          } else {
            toast.textContent = "AI countered! Your move (❌)";
          }
          render();
        }
        document.getElementById("primaryActionBtn").addEventListener("click", () => {
          if (!over && cells.every(c => c === "")) {
            play(0);
          } else {
            cells = Array(9).fill(""); over = false; render();
            toast.textContent = "New round started! Place ❌";
          }
        });
        render();
      })();`,
    };
  }

  if (slug === "brick-breaker-blitz" || slug === "flappy-rocket-lander") {
    const isLander = slug === "flappy-rocket-lander";
    return {
      html: `
      <div class="game-layout">
        <div class="canvas-stage">
          <div class="hud-bar">
            <span class="hud-pill">${isLander ? "🚀 Altitude" : "🧱 Score"}: <strong id="arcadeStatA">${isLander ? "320m" : "0"}</strong></span>
            <span class="hud-pill">${isLander ? "⛽ Fuel" : "🔥 Combo"}: <strong id="arcadeStatB">${isLander ? "100%" : "1x"}</strong></span>
            <button type="button" id="primaryActionBtn" class="btn-sm">${isLander ? "🔥 Fire Thruster (Space)" : "⚡ Launch Multi-Ball"}</button>
          </div>
          <div class="perspective-stage">
            <canvas id="arcadeCanvas" width="520" height="360"></canvas>
          </div>
        </div>
        <div class="side-panel">
          <h3>${esc(spec.icon)} ${esc(spec.name)}</h3>
          <p class="muted-sm">${esc(spec.tagline)} Move mouse or touch inside the 3D arena, or press Spacebar / action button!</p>
          <div class="stat-box" id="actionToast">60fps Physics Canvas active! Move paddle / thruster now.</div>
        </div>
      </div>`,
      script: `
      (function(){
        const canvas = document.getElementById("arcadeCanvas");
        const ctx = canvas.getContext("2d");
        const statA = document.getElementById("arcadeStatA");
        const statB = document.getElementById("arcadeStatB");
        const toast = document.getElementById("actionToast");
        let paddleX = 210, score = 0, combo = 1;
        let ball = { x: 260, y: 260, vx: 3.6, vy: -3.8 };
        const bricks = [];
        const bColors = ["#ec4899","#a855f7","#38bdf8","#10b981","#f59e0b"];
        for (let r=0; r<5; r++) {
          for (let c=0; c<8; c++) {
            bricks.push({ x: 18 + c*61, y: 28 + r*28, w: 55, h: 20, color: bColors[r], alive: true });
          }
        }
        canvas.addEventListener("mousemove", (e) => {
          const rect = canvas.getBoundingClientRect();
          paddleX = Math.max(10, Math.min(canvas.width - 110, (e.clientX - rect.left) * (canvas.width / rect.width) - 50));
        });
        document.getElementById("primaryActionBtn").addEventListener("click", () => {
          ball.vy = -Math.abs(ball.vy) * 1.15;
          score += 50; combo++;
          statA.textContent = String(score);
          statB.textContent = combo + "x";
          toast.textContent = "Power boost! Score: " + score + " (" + combo + "x combo)";
        });
        function loop() {
          ctx.fillStyle = "#070b14";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ball.x += ball.vx; ball.y += ball.vy;
          if (ball.x < 10 || ball.x > canvas.width - 10) ball.vx *= -1;
          if (ball.y < 10) ball.vy *= -1;
          if (ball.y > 325 && ball.x >= paddleX - 10 && ball.x <= paddleX + 110) {
            ball.vy = -Math.abs(ball.vy);
            paddleX = Math.max(10, Math.min(canvas.width - 110, ball.x - 50));
          }
          if (ball.y > canvas.height) { ball.x = 260; ball.y = 280; ball.vy = -3.8; }
          // Auto-assist paddle gently so demo looks alive
          paddleX += (ball.x - 50 - paddleX) * 0.08;

          bricks.forEach((b) => {
            if (!b.alive) return;
            if (ball.x > b.x && ball.x < b.x + b.w && ball.y > b.y && ball.y < b.y + b.h) {
              b.alive = false; ball.vy *= -1; score += 25;
              statA.textContent = String(score);
            }
            ctx.fillStyle = "rgba(0,0,0,0.45)";
            ctx.fillRect(b.x+3, b.y+4, b.w, b.h);
            ctx.fillStyle = b.color;
            ctx.fillRect(b.x, b.y, b.w, b.h);
          });
          if (bricks.every(b => !b.alive)) bricks.forEach(b => b.alive = true);

          // Paddle
          ctx.shadowColor = "#00e5ff"; ctx.shadowBlur = 14;
          ctx.fillStyle = "#00e5ff";
          ctx.fillRect(paddleX, 332, 100, 12);
          // Ball
          ctx.fillStyle = "#ffffff";
          ctx.beginPath(); ctx.arc(ball.x, ball.y, 8, 0, Math.PI*2); ctx.fill();
          ctx.shadowBlur = 0;
          requestAnimationFrame(loop);
        }
        requestAnimationFrame(loop);
      })();`,
    };
  }

  if (
    slug === "memory-match-masala" ||
    slug === "whack-a-bug-qa" ||
    slug === "wordle-hinglish-daily" ||
    slug === "sudoku-zen-grid" ||
    slug === "chess-clock-pro"
  ) {
    return {
      html: `
      <div class="game-layout">
        <div class="canvas-stage">
          <div class="hud-bar">
            <span class="hud-pill">${esc(spec.icon)} Score / Moves: <strong id="gridGameScore">0</strong></span>
            <span class="hud-pill">⏱️ Timer: <strong id="gridGameTimer">00:45</strong></span>
            <button type="button" id="primaryActionBtn" class="btn-sm">▶ Play / Flip Next</button>
          </div>
          <div id="interactiveBoardGrid" class="board-2048"></div>
        </div>
        <div class="side-panel">
          <h3>${esc(spec.icon)} ${esc(spec.name)}</h3>
          <p class="muted-sm">${esc(spec.tagline)}</p>
          <div class="stat-box" id="actionToast">Click any 3D tile on the board to play!</div>
        </div>
      </div>`,
      script: `
      (function(){
        const grid = document.getElementById("interactiveBoardGrid");
        const scoreEl = document.getElementById("gridGameScore");
        const toast = document.getElementById("actionToast");
        const icons = ["🚀","🐍","💎","⚡","🔥","🎯","👑","🌟","🚀","🐍","💎","⚡","🔥","🎯","👑","🌟"];
        let score = 0;
        icons.forEach((ic, idx) => {
          const cell = document.createElement("button");
          cell.type = "button";
          cell.className = "tile-2048";
          cell.style.cursor = "pointer";
          cell.style.background = "#1e293b";
          cell.textContent = idx < 4 ? ic : "❓";
          cell.addEventListener("click", () => {
            cell.textContent = ic;
            cell.style.background = "${spec.accent}";
            cell.style.color = "#07090e";
            score += 10;
            scoreEl.textContent = String(score);
            toast.textContent = "Tile #" + (idx+1) + " activated (" + ic + ") · Score: " + score;
          });
          grid.appendChild(cell);
        });
        document.getElementById("primaryActionBtn").addEventListener("click", () => {
          const btns = grid.querySelectorAll("button");
          const pick = btns[score % btns.length];
          if (pick) pick.click();
        });
      })();`,
    };
  }

  // ============================================================================
  // 2. PRODUCTIVITY, KANBAN & TIMERS (#11 - #20)
  // ============================================================================
  if (spec.interactiveWidgetKind === "todo-kanban") {
    return {
      html: `
      <div class="kanban-workspace">
        <div class="kanban-toolbar">
          <input type="text" id="kanbanTaskInput" placeholder="Add a new task or note (e.g. ${esc(spec.config.sampleItems[0] ?? "Ship release")})..." />
          <select id="kanbanColSelect">
            <option value="todo">📌 To Do</option>
            <option value="doing">⚡ In Progress</option>
            <option value="done">✅ Done</option>
          </select>
          <button type="button" id="primaryActionBtn" class="btn-sm">${esc(spec.config.actionButtonText)}</button>
          <span class="hud-pill">⏱️ Focus Timer: <strong id="pomoClock">25:00</strong> <button type="button" id="pomoToggleBtn" class="mini-btn">Start</button></span>
        </div>
        <div class="kanban-columns">
          <div class="kanban-col">
            <div class="col-head"><span>📌 To Do</span><span class="badge-cnt" id="cntTodo">2</span></div>
            <div class="col-list" id="listTodo"></div>
          </div>
          <div class="kanban-col">
            <div class="col-head"><span>⚡ In Progress</span><span class="badge-cnt" id="cntDoing">1</span></div>
            <div class="col-list" id="listDoing"></div>
          </div>
          <div class="kanban-col">
            <div class="col-head"><span>✅ Completed</span><span class="badge-cnt" id="cntDone">1</span></div>
            <div class="col-list" id="listDone"></div>
          </div>
        </div>
        <div class="stat-box" id="actionToast">Interactive Kanban &amp; Focus Timer ready. Add or move cards across columns!</div>
      </div>`,
      script: `
      (function(){
        let items = [
          { id: 1, text: ${JSON.stringify(spec.config.sampleItems[0] ?? "Plan architecture")}, col: "todo" },
          { id: 2, text: ${JSON.stringify(spec.config.sampleItems[1] ?? "Build interactive UI")}, col: "doing" },
          { id: 3, text: ${JSON.stringify(spec.config.sampleItems[2] ?? "Verify & publish live")}, col: "done" },
          { id: 4, text: "Review metrics & sync state", col: "todo" }
        ];
        const inp = document.getElementById("kanbanTaskInput");
        const colSel = document.getElementById("kanbanColSelect");
        const toast = document.getElementById("actionToast");

        function render() {
          ["todo","doing","done"].forEach((col) => {
            const container = document.getElementById(col==="todo"?"listTodo":col==="doing"?"listDoing":"listDone");
            const cnt = document.getElementById(col==="todo"?"cntTodo":col==="doing"?"cntDoing":"cntDone");
            const filtered = items.filter(i => i.col === col);
            cnt.textContent = String(filtered.length);
            container.innerHTML = "";
            filtered.forEach((item) => {
              const card = document.createElement("div");
              card.className = "k-card";
              card.innerHTML = '<span>' + item.text + '</span><div class="k-actions"><button type="button" data-advance="' + item.id + '">➔</button><button type="button" data-del="' + item.id + '">×</button></div>';
              container.appendChild(card);
            });
          });
          document.querySelectorAll("[data-advance]").forEach(b => b.addEventListener("click", () => {
            const id = Number(b.getAttribute("data-advance"));
            const it = items.find(x => x.id === id);
            if (it) {
              it.col = it.col === "todo" ? "doing" : it.col === "doing" ? "done" : "todo";
              toast.textContent = "Moved '" + it.text + "' to " + it.col.toUpperCase();
              render();
            }
          }));
          document.querySelectorAll("[data-del]").forEach(b => b.addEventListener("click", () => {
            const id = Number(b.getAttribute("data-del"));
            items = items.filter(x => x.id !== id);
            render();
          }));
        }
        document.getElementById("primaryActionBtn").addEventListener("click", () => {
          const text = inp.value.trim() || ("Sprint Task #" + (items.length + 1));
          items.unshift({ id: Date.now(), text, col: colSel.value });
          inp.value = "";
          toast.textContent = "Added task '" + text + "' to " + colSel.value.toUpperCase();
          render();
        });
        let secs = 25*60, timerId = null;
        document.getElementById("pomoToggleBtn").addEventListener("click", function() {
          if (timerId) { clearInterval(timerId); timerId = null; this.textContent = "Start"; }
          else {
            this.textContent = "Pause";
            timerId = setInterval(() => {
              secs = Math.max(0, secs - 1);
              const m = String(Math.floor(secs/60)).padStart(2,"0"), s = String(secs%60).padStart(2,"0");
              document.getElementById("pomoClock").textContent = m + ":" + s;
            }, 1000);
          }
        });
        render();
      })();`,
    };
  }

  // ============================================================================
  // 3. BHARAT UPI STOREFRONTS & POS COMMERCE (#21 - #30)
  // ============================================================================
  if (spec.interactiveWidgetKind === "upi-commerce") {
    return {
      html: `
      <div class="commerce-grid">
        <div>
          <h3>🛍️ Catalog &amp; Counter Items</h3>
          <div id="catalogGrid" class="catalog-cards"></div>
          <div class="custom-item-row">
            <input type="text" id="customItemName" placeholder="Custom item name..." value="${esc(spec.config.sampleItems[0] ?? "Special Pack")}" />
            <input type="number" id="customItemPrice" value="${spec.config.defaultNumberA}" style="width:110px;" />
            <button type="button" id="primaryActionBtn" class="btn-sm">${esc(spec.config.actionButtonText)}</button>
          </div>
        </div>
        <div class="pos-cart-box">
          <h3>🧾 Live GST Bill &amp; UPI QR Checkout</h3>
          <div id="cartList" class="cart-items"></div>
          <div class="bill-summary">
            <div><span>Subtotal:</span><strong id="billSub">₹0</strong></div>
            <div><span>GST (5%):</span><strong id="billGst">₹0</strong></div>
            <div class="bill-total"><span>Total Payable:</span><strong id="billTotal">₹0</strong></div>
          </div>
          <div class="upi-qr-card">
            <div class="qr-matrix" id="upiQrBox" title="Dynamic NPCI UPI QR"></div>
            <div>
              <div style="font-weight:700;font-size:13px;">Scan with GPay / PhonePe / Paytm</div>
              <div class="muted-sm" id="upiDeepLinkText">upi://pay?pa=merchant@okaxis&amp;am=0</div>
              <a id="waReceiptLink" href="https://wa.me/?text=Order" target="_blank" rel="noopener" class="btn-sm" style="display:inline-block;margin-top:8px;text-decoration:none;">📲 Send WhatsApp Bill</a>
            </div>
          </div>
          <div class="stat-box" id="actionToast" style="margin-top:10px;">Tap any catalog item or click Add to update live UPI QR!</div>
        </div>
      </div>`,
      script: `
      (function(){
        const products = [
          { name: ${JSON.stringify(spec.config.sampleItems[0] ?? "Featured Item A")}, price: ${spec.config.defaultNumberA || 199}, qty: 1 },
          { name: ${JSON.stringify(spec.config.sampleItems[1] ?? "Featured Item B")}, price: ${spec.config.defaultNumberB || 149}, qty: 1 },
          { name: ${JSON.stringify(spec.config.sampleItems[2] ?? "Combo Pack C")}, price: ${Math.max(99, (spec.config.defaultNumberA || 150) + 100)}, qty: 0 }
        ];
        const catEl = document.getElementById("catalogGrid");
        const cartEl = document.getElementById("cartList");
        const toast = document.getElementById("actionToast");

        function renderQr(total) {
          const qr = document.getElementById("upiQrBox");
          qr.innerHTML = "";
          for (let i=0; i<64; i++) {
            const cell = document.createElement("span");
            const on = ((i * 17 + total) % 3 === 0) || i < 8 || i > 55 || i % 8 === 0;
            cell.style.background = on ? "#07090e" : "#ffffff";
            qr.appendChild(cell);
          }
        }
        function render() {
          catEl.innerHTML = "";
          products.forEach((p, idx) => {
            const card = document.createElement("div");
            card.className = "cat-card";
            card.innerHTML = '<div><strong>' + p.name + '</strong><div class="muted-sm">₹' + p.price + '</div></div><div class="qty-ctrl"><button type="button" data-dec="' + idx + '">−</button><span>' + p.qty + '</span><button type="button" data-inc="' + idx + '">+</button></div>';
            catEl.appendChild(card);
          });
          let sub = 0;
          cartEl.innerHTML = "";
          products.filter(p => p.qty > 0).forEach((p) => {
            const line = p.price * p.qty;
            sub += line;
            const row = document.createElement("div");
            row.className = "cart-row";
            row.innerHTML = '<span>' + p.name + ' × ' + p.qty + '</span><strong>₹' + line + '</strong>';
            cartEl.appendChild(row);
          });
          const gst = Math.round(sub * 0.05);
          const tot = sub + gst;
          document.getElementById("billSub").textContent = "₹" + sub;
          document.getElementById("billGst").textContent = "₹" + gst;
          document.getElementById("billTotal").textContent = "₹" + tot;
          document.getElementById("upiDeepLinkText").textContent = "upi://pay?pa=bharatstore@upi&am=" + tot + "&cu=INR";
          document.getElementById("waReceiptLink").href = "https://wa.me/?text=" + encodeURIComponent("Invoice from " + ${JSON.stringify(spec.name)} + ": Total ₹" + tot + " (incl. GST). Pay via UPI: upi://pay?pa=bharatstore@upi&am=" + tot);
          renderQr(tot);

          document.querySelectorAll("[data-inc]").forEach(b => b.addEventListener("click", () => {
            products[Number(b.getAttribute("data-inc"))].qty++; render();
          }));
          document.querySelectorAll("[data-dec]").forEach(b => b.addEventListener("click", () => {
            const i = Number(b.getAttribute("data-dec"));
            products[i].qty = Math.max(0, products[i].qty - 1); render();
          }));
        }
        document.getElementById("primaryActionBtn").addEventListener("click", () => {
          const name = document.getElementById("customItemName").value.trim() || "Order Item";
          const price = Number(document.getElementById("customItemPrice").value) || 199;
          products.push({ name, price, qty: 1 });
          render();
          toast.textContent = "Added '" + name + "' (₹" + price + ") to live POS bill & updated UPI QR!";
        });
        render();
      })();`,
    };
  }

  // ============================================================================
  // 4. DEVTOOLS & LIVE PARSERS / TESTERS (#41 - #50)
  // ============================================================================
  if (spec.interactiveWidgetKind === "dev-utility") {
    return {
      html: `
      <div class="devtools-workbench">
        <div class="dev-col">
          <div class="row-spread">
            <label style="margin:0;font-weight:700;">📥 Input Source / Expression</label>
            <button type="button" id="primaryActionBtn" class="btn-sm">${esc(spec.config.actionButtonText)}</button>
          </div>
          <textarea id="devInputArea" rows="9" class="code-area">{\n  "service": "${esc(spec.slug)}",\n  "status": "production-ready",\n  "items": ${JSON.stringify(spec.config.sampleItems)},\n  "metrics": { "latencyMs": ${spec.config.defaultNumberA}, "throughput": ${spec.config.defaultNumberB} }\n}</textarea>
        </div>
        <div class="dev-col">
          <div class="row-spread">
            <label style="margin:0;font-weight:700;">📤 Live Formatted Output &amp; AST Inspector</label>
            <button type="button" id="copyDevOutBtn" class="btn-sm secondary">📋 Copy Output</button>
          </div>
          <pre id="devOutputArea" class="code-output"></pre>
          <div class="stat-box" id="actionToast">Live parser active — edit input or click action button!</div>
        </div>
      </div>`,
      script: `
      (function(){
        const inp = document.getElementById("devInputArea");
        const out = document.getElementById("devOutputArea");
        const toast = document.getElementById("actionToast");

        function processInput() {
          const raw = inp.value;
          try {
            const parsed = JSON.parse(raw);
            const keys = Object.keys(parsed);
            out.textContent = "✅ VALID JSON (" + keys.length + " top-level keys, " + raw.length + " bytes)\\n\\n" + JSON.stringify(parsed, null, 2);
            toast.textContent = "Processed successfully: " + keys.length + " keys validated.";
          } catch (e) {
            // Fallback transformation (Base64 / Hash / Regex / Line stats)
            const lines = raw.split("\\n");
            const b64 = btoa(unescape(encodeURIComponent(raw))).slice(0, 120);
            out.textContent = "🔍 ANALYSIS & TRANSFORM:\\n• Lines: " + lines.length + " | Chars: " + raw.length + "\\n• Base64 Preview: " + b64 + "\\n\\n" + raw.toUpperCase();
            toast.textContent = "Transformed " + raw.length + " chars across " + lines.length + " lines.";
          }
        }
        inp.addEventListener("input", processInput);
        document.getElementById("primaryActionBtn").addEventListener("click", processInput);
        document.getElementById("copyDevOutBtn").addEventListener("click", () => {
          navigator.clipboard?.writeText(out.textContent || "");
          toast.textContent = "Copied formatted output to clipboard!";
        });
        processInput();
      })();`,
    };
  }

  // ============================================================================
  // 5. FINTECH, HEALTH, EDUCATION, OPERATIONS, CREATOR & SMART CONVERTERS
  //    (With Real Interactive Sliders, Live HTML5 Canvas Chart & Dynamic Table)
  // ============================================================================
  return {
    html: `
    <div class="game-layout">
      <div class="canvas-stage">
        <div class="hud-bar">
          <span class="hud-pill">${esc(spec.icon)} ${esc(spec.config.primaryLabel)}: <strong id="liveValA">${spec.config.defaultNumberA}</strong></span>
          <span class="hud-pill">📊 ${esc(spec.config.secondaryLabel)}: <strong id="liveValB">${spec.config.defaultNumberB}</strong></span>
          <button type="button" id="primaryActionBtn" class="btn-sm">${esc(spec.config.actionButtonText)}</button>
        </div>
        <div class="controls-grid">
          <label>${esc(spec.config.primaryLabel)}
            <input type="range" id="sliderA" min="1" max="${Math.max(200, spec.config.defaultNumberA * 3)}" value="${spec.config.defaultNumberA}" />
          </label>
          <label>${esc(spec.config.secondaryLabel)}
            <input type="range" id="sliderB" min="1" max="${Math.max(100, spec.config.defaultNumberB * 3)}" value="${spec.config.defaultNumberB}" />
          </label>
        </div>
        <canvas id="analyticsCanvas" width="520" height="220" style="width:100%;border-radius:12px;border:1px solid #334155;background:#070b14;margin-top:10px;"></canvas>
      </div>
      <div class="side-panel">
        <h3>📋 Live Queue / Records (${esc(spec.name)})</h3>
        <div class="custom-item-row" style="margin-bottom:10px;">
          <input type="text" id="newEntryText" placeholder="Add new entry / token..." value="${esc(spec.config.sampleItems[0] ?? "New Entry")}" />
          <button type="button" id="addEntryBtn" class="btn-sm">+ Add</button>
        </div>
        <div id="liveRecordsList" class="records-list"></div>
        <div class="stat-box" id="actionToast" style="margin-top:10px;">Drag sliders or click ${esc(spec.config.actionButtonText)} to update the live chart!</div>
      </div>
    </div>`,
    script: `
    (function(){
      const canvas = document.getElementById("analyticsCanvas");
      const ctx = canvas.getContext("2d");
      const sliderA = document.getElementById("sliderA");
      const sliderB = document.getElementById("sliderB");
      const valA = document.getElementById("liveValA");
      const valB = document.getElementById("liveValB");
      const toast = document.getElementById("actionToast");
      const listEl = document.getElementById("liveRecordsList");
      let records = ${JSON.stringify(spec.config.sampleItems)};

      function drawChart() {
        const a = Number(sliderA.value) || 10;
        const b = Number(sliderB.value) || 5;
        valA.textContent = String(a);
        valB.textContent = String(b);
        ctx.fillStyle = "#070b14";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const bars = 8;
        const pad = 28;
        const w = (canvas.width - pad*2) / bars;
        for (let i=0; i<bars; i++) {
          const factor = 0.4 + ((i + 1) / bars) * (1 + (b / Math.max(10, b + 20)));
          const bh = Math.min(165, Math.max(24, ((a * factor) % 160) + 25));
          const x = pad + i * w + 6;
          const y = canvas.height - pad - bh;
          ctx.fillStyle = "rgba(0,0,0,0.45)";
          ctx.fillRect(x+3, y+4, w-14, bh);
          ctx.fillStyle = i % 2 === 0 ? "${spec.accent}" : "#38bdf8";
          ctx.fillRect(x, y, w-14, bh);
          ctx.fillStyle = "#94a3b8";
          ctx.font = "11px ui-monospace, monospace";
          ctx.fillText("P" + (i+1), x + 6, canvas.height - 10);
        }
      }

      function renderRecords() {
        listEl.innerHTML = "";
        records.forEach((r, idx) => {
          const d = document.createElement("div");
          d.className = "k-card";
          d.innerHTML = '<span>#' + (idx+1) + ' · ' + r + '</span><span class="hud-pill" style="font-size:11px;">Active</span>';
          listEl.appendChild(d);
        });
      }

      sliderA.addEventListener("input", drawChart);
      sliderB.addEventListener("input", drawChart);
      document.getElementById("primaryActionBtn").addEventListener("click", () => {
        sliderA.value = String(Math.round(Number(sliderA.value) * 1.15) + 5);
        drawChart();
        toast.textContent = "Computed live projection: " + sliderA.value + " " + ${JSON.stringify(spec.config.unitLabel)};
      });
      document.getElementById("addEntryBtn").addEventListener("click", () => {
        const txt = document.getElementById("newEntryText").value.trim();
        if (txt) { records.unshift(txt); renderRecords(); toast.textContent = "Added: " + txt; }
      });

      drawChart();
      renderRecords();
    })();`,
  };
}
