# 🌐 Web-based Interactive Algorithm Visualizer

A visual and interactive tool for understanding how the **A\*** Pathfinding Algorithm works — built with HTML, CSS, and JavaScript. This application lets users customize the grid, place weighted nodes and obstacles, adjust visualization speed, and more.

---

## 🧠 Part 1: How A\* Pathfinding Algorithm Works

Imagine A\* as a smart robot trying to reach its goal. It avoids walls and always chooses the most promising path.

### 🧩 Key Concepts

- `g`: Cost from the **start** to the current node.
- `h`: Estimated cost from the current node to the **end**.
- `f = g + h`: Total estimated cost of the path through this node — **lower is better**.

### 🔄 How It Works (Step-by-Step)

1. Begin at the **start node**.
2. Explore its **up, down, left, right** neighbors (no diagonals).
3. For each neighbor:
   - Skip if it’s a **wall**.
   - If the new path is shorter:
     - Update `g`, `h`, and `f` values.
     - Record the current node as its **previous**.
4. Pick the node with the **lowest `f`** value.
5. Repeat until you reach the **end**.
6. Backtrack from the end node to the start node to form the **shortest path**.

---

## 🕹️ Part 2: How to Use the Visualizer

### 📌 Step-by-Step Instructions

1. **Open the Web Page**  
   The app displays a grid (default: 10x10) of cells.

2. **Set Grid Points by Clicking:**
   - **1st Click** → Sets the **Start Node** (🟩 Green)
   - **2nd Click** → Sets the **End Node** (🟥 Red)
   - **Next Clicks** → Toggle **walls** (⬛ Black)

3. **Use `Shift + Click`** on any cell to set a **Weighted Node**  
   Weighted nodes cost more to travel through and appear **🟪 Purple**.

4. **Adjust Grid Settings:**
   - Input number of **rows/columns**
   - Use the **Speed Control** slider to slow down or speed up the animation

5. **Click "Start"**  
   The A\* algorithm will begin searching:
   - 🟦 **Light Blue** → Visited nodes
   - 🟨 **Yellow** → Final shortest path

6. **Click "Reset"**  
   Clears all markings and lets you start over.

7. **Click "Save Grid"**  
   Saves the current grid configuration (start/end nodes, walls, and weights) to your browser’s `localStorage`.

8. **Click "Load Grid"**  
   Loads the saved configuration and rebuilds the grid exactly as you saved it.

---

## 🎨 Cell Color Legend

| Color        | Meaning                 |
|--------------|--------------------------|
| 🟩 Green      | Start Node               |
| 🟥 Red        | End Node                 |
| ⬛ Black      | Wall/Obstacle            |
| 🟦 Light Blue | Visited by Algorithm     |
| 🟨 Yellow     | Final Shortest Path      |
| 🟪 Purple     | Weighted Node (cost = 5) |

---

## ⚙️ Features

- ✅ A\* pathfinding with Manhattan Distance
- ✅ Adjustable grid size
- ✅ Adjustable animation speed
- ✅ Weighted nodes
- ✅ Save/Load grid to/from browser
- ✅ Responsive and interactive UI
- ✅ Optimized for clarity and educational use

---

## 💡 Tech Stack

- HTML
- CSS (custom styles, grid layout, button effects)
- JavaScript (DOM manipulation, pathfinding logic, async animations via `await`/`setTimeout`)

---

## 📂 How to Run Locally

```bash
git clone https://github.com/RonanZairel/Web-based-Interactive-Algorithm-Visualizer.git
cd Web-based-Interactive-Algorithm-Visualizer
open index.html  # or simply double-click in your file explorer
