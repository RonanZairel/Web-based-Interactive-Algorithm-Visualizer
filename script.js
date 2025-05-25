let rows = 10;
let cols = 10;
let grid = [];
let startNode = null;
let endNode = null;
let visualizationSpeed = 50;
const gridContainer = document.getElementById('grid');

function generateGrid() {
  // Get new dimensions
  rows = parseInt(document.getElementById('rowInput').value);
  cols = parseInt(document.getElementById('colInput').value);
  visualizationSpeed = parseInt(document.getElementById('speedControl').value);

  gridContainer.innerHTML = '';
  gridContainer.style.gridTemplateColumns = `repeat(${cols}, 35px)`;
  gridContainer.style.gridTemplateRows = `repeat(${rows}, 35px)`;

  grid = [];
  startNode = null;
  endNode = null;

  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.row = i;
      cell.dataset.col = j;

      cell.addEventListener('click', (e) => {
        if (e.shiftKey) {
          grid[i][j].weight = 5;
          cell.style.backgroundColor = '#a29bfe';
        } else {
          toggleCell(i, j);
        }
      });

      gridContainer.appendChild(cell);

      grid[i][j] = {
        row: i,
        col: j,
        isWall: false,
        g: Infinity,
        h: 0,
        f: Infinity,
        weight: 1,
        previous: null,
        element: cell
      };
    }
  }
}

function toggleCell(row, col) {
  const node = grid[row][col];
  if (!startNode) {
    startNode = node;
    node.element.classList.add('start');
  } else if (!endNode && node !== startNode) {
    endNode = node;
    node.element.classList.add('end');
  } else if (node !== startNode && node !== endNode) {
    node.isWall = !node.isWall;
    node.element.classList.toggle('wall');
  }
}

function resetGrid() {
  for (let row of grid) {
    for (let node of row) {
      node.element.className = 'cell';
      node.isWall = false;
      node.weight = 1;
      node.g = Infinity;
      node.h = 0;
      node.f = Infinity;
      node.previous = null;
    }
  }
  startNode = null;
  endNode = null;
}

function heuristic(a, b) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

function getNeighbors(node) {
  const neighbors = [];
  const { row, col } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < rows - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < cols - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(n => !n.isWall);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function startAlgorithm() {
  if (!startNode || !endNode) return alert('Set both start and end nodes.');

  for (let row of grid) {
    for (let node of row) {
      node.g = Infinity;
      node.h = 0;
      node.f = Infinity;
      node.previous = null;
      if (!['start', 'end', 'wall'].some(cls => node.element.classList.contains(cls))) {
        node.element.className = 'cell';
      }
    }
  }

  let openSet = [];
  let closedSet = [];

  startNode.g = 0;
  startNode.h = heuristic(startNode, endNode);
  startNode.f = startNode.h;
  openSet.push(startNode);

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.f - b.f);
    const current = openSet.shift();

    if (current === endNode) {
      await reconstructPath(current);
      return;
    }

    closedSet.push(current);
    if (current !== startNode && current !== endNode) {
      current.element.classList.add('visited');
      await sleep(visualizationSpeed);
    }

    for (let neighbor of getNeighbors(current)) {
      if (closedSet.includes(neighbor)) continue;

      const tentativeG = current.g + neighbor.weight;
      if (tentativeG < neighbor.g) {
        neighbor.previous = current;
        neighbor.g = tentativeG;
        neighbor.h = heuristic(neighbor, endNode);
        neighbor.f = neighbor.g + neighbor.h;

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }
    }
  }

  alert('No path found!');
}

async function reconstructPath(endNode) {
  let current = endNode;
  while (current.previous) {
    current = current.previous;
    if (current !== startNode) {
      current.element.classList.remove('visited');
      current.element.classList.add('path');
      await sleep(visualizationSpeed);
    }
  }
}

function saveGrid() {
  const data = {
    rows,
    cols,
    cells: grid.map(row => row.map(cell => ({
      isWall: cell.isWall,
      weight: cell.weight,
      isStart: cell === startNode,
      isEnd: cell === endNode
    })))
  };
  localStorage.setItem('savedGrid', JSON.stringify(data));
  alert('Grid saved!');
}

function loadGrid() {
  const saved = localStorage.getItem('savedGrid');
  if (!saved) return alert('No saved grid found.');

  const data = JSON.parse(saved);
  document.getElementById('rowInput').value = data.rows;
  document.getElementById('colInput').value = data.cols;
  generateGrid();

  for (let i = 0; i < data.rows; i++) {
    for (let j = 0; j < data.cols; j++) {
      const cellData = data.cells[i][j];
      const node = grid[i][j];

      if (cellData.isWall) {
        node.isWall = true;
        node.element.classList.add('wall');
      }
      if (cellData.weight > 1) {
        node.weight = cellData.weight;
        node.element.style.backgroundColor = '#a29bfe';
      }
      if (cellData.isStart) {
        startNode = node;
        node.element.classList.add('start');
      }
      if (cellData.isEnd) {
        endNode = node;
        node.element.classList.add('end');
      }
    }
  }

  alert('Grid loaded!');
}

// Initial grid
generateGrid();
