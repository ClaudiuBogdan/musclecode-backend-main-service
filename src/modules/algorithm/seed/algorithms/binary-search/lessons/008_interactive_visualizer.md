---
title: Interactive Binary Search Visualizer
---

# 👁️ Visualizing Binary Search in Action

## Learning Objectives
By the end of this lesson, you will be able to:
- Visualize how binary search operates step by step
- Understand the search space reduction at each iteration
- Experiment with different inputs and observe the algorithm's behavior
- Create your own visualizations to reinforce your understanding
- Share and explain binary search through visual demonstrations

Understanding binary search becomes much easier when you can visualize it. This interactive visualizer will help you see exactly how the algorithm works step by step.

## Interactive Visualization Tools

To see binary search in action, visit one of these interactive visualization tools:

1. [VisuAlgo Binary Search](https://visualgo.net/en/binarysearch) - Comprehensive visualization with step controls
2. [USFCA Visualization](https://www.cs.usfca.edu/~galles/visualization/Search.html) - Compare with other search algorithms
3. [Algorithm Visualizer](https://algorithm-visualizer.org/branch-and-bound/binary-search) - Code and visualization side by side

These tools allow you to:
- Generate random arrays or create your own
- Choose different target values to search for
- Step through the algorithm one comparison at a time
- See the left, right, and mid pointers move
- Visualize how the search space narrows with each step

## Create Your Own Visualization

For a deeper understanding, try implementing this simple binary search visualizer using HTML canvas and JavaScript:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Binary Search Visualizer</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
        }
        canvas {
            border: 1px solid #ccc;
            margin: 20px 0;
        }
        .controls {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }
        button {
            padding: 8px 16px;
            background: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background: #45a049;
        }
        .info {
            width: 800px;
            margin-top: 20px;
        }
        .current-state {
            margin-top: 20px;
            padding: 10px;
            background: #f5f5f5;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <h1>Binary Search Visualizer</h1>
    <div class="controls">
        <button id="generateArray">Generate New Array</button>
        <button id="resetSearch">Reset Search</button>
        <button id="nextStep">Next Step</button>
        <button id="autoPlay">Auto Play</button>
        <input type="number" id="targetInput" placeholder="Target value" min="1" max="100">
        <button id="setTarget">Set Target</button>
    </div>
    <canvas id="binarySearchCanvas" width="800" height="300"></canvas>
    <div class="current-state" id="stateInfo">
        Click "Generate New Array" to start.
    </div>
    <div class="info">
        <h2>How to use this visualizer:</h2>
        <ol>
            <li>Click "Generate New Array" to create a sorted array</li>
            <li>Enter a target value and click "Set Target"</li>
            <li>Click "Next Step" to see each step of the binary search</li>
            <li>Or click "Auto Play" to automatically go through all steps</li>
            <li>Use "Reset Search" to start over with the same array</li>
        </ol>
    </div>

    <script>
        class BinarySearchVisualizer {
            constructor(canvasId) {
                this.canvas = document.getElementById(canvasId);
                this.ctx = this.canvas.getContext('2d');
                this.array = [];
                this.left = 0;
                this.right = 0;
                this.mid = 0;
                this.target = null;
                this.found = false;
                this.searchComplete = false;
                this.step = 0;
                this.barWidth = 0;
                this.barMaxHeight = 200;
                this.barSpacing = 2;
                this.colors = {
                    bar: '#3498db',
                    activeRegion: '#d5f5e3',
                    leftPointer: '#e74c3c',
                    rightPointer: '#9b59b6',
                    midPointer: '#f1c40f',
                    foundTarget: '#2ecc71',
                    eliminated: '#ecf0f1'
                };
            }
            
            generateRandomArray(size = 15, min = 1, max = 100) {
                this.array = Array.from({length: size}, () => 
                    Math.floor(Math.random() * (max - min + 1)) + min
                ).sort((a, b) => a - b);
                this.resetSearch();
                this.draw();
                return this.array;
            }
            
            resetSearch() {
                this.left = 0;
                this.right = this.array.length - 1;
                this.mid = Math.floor((this.left + this.right) / 2);
                this.found = false;
                this.searchComplete = false;
                this.step = 0;
                this.draw();
                this.updateStateInfo();
            }
            
            setTarget(target) {
                this.target = target;
                this.resetSearch();
            }
            
            nextStep() {
                if (this.searchComplete) return false;
                
                this.step++;
                
                if (this.left > this.right) {
                    this.searchComplete = true;
                    this.updateStateInfo("Target not found!");
                    this.draw();
                    return false;
                }
                
                this.mid = Math.floor((this.left + this.right) / 2);
                
                if (this.array[this.mid] === this.target) {
                    this.found = true;
                    this.searchComplete = true;
                    this.updateStateInfo(`Found target ${this.target} at index ${this.mid}!`);
                    this.draw();
                    return false;
                }
                
                if (this.array[this.mid] < this.target) {
                    this.updateStateInfo(`Step ${this.step}: ${this.array[this.mid]} < ${this.target}, search right half`);
                    this.left = this.mid + 1;
                } else {
                    this.updateStateInfo(`Step ${this.step}: ${this.array[this.mid]} > ${this.target}, search left half`);
                    this.right = this.mid - 1;
                }
                
                this.draw();
                return true;
            }
            
            updateStateInfo(message) {
                const stateInfo = document.getElementById('stateInfo');
                if (message) {
                    stateInfo.innerHTML = message;
                } else {
                    stateInfo.innerHTML = `
                        Array: [${this.array.join(', ')}]<br>
                        Target: ${this.target !== null ? this.target : 'Not set'}<br>
                        Current state: left=${this.left}, right=${this.right}, mid=${this.mid}
                    `;
                }
            }
            
            draw() {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                
                if (this.array.length === 0) return;
                
                this.barWidth = (this.canvas.width - (this.array.length + 1) * this.barSpacing) / this.array.length;
                
                // Draw search region background
                if (!this.searchComplete) {
                    const startX = this.left * (this.barWidth + this.barSpacing) + this.barSpacing;
                    const width = (this.right - this.left + 1) * (this.barWidth + this.barSpacing);
                    this.ctx.fillStyle = this.colors.activeRegion;
                    this.ctx.fillRect(startX, 0, width, this.barMaxHeight + 50);
                }
                
                // Draw array bars
                for (let i = 0; i < this.array.length; i++) {
                    const barHeight = (this.array[i] / Math.max(...this.array)) * this.barMaxHeight;
                    const x = i * (this.barWidth + this.barSpacing) + this.barSpacing;
                    const y = this.canvas.height - 50 - barHeight;
                    
                    // Determine bar color
                    if (this.found && i === this.mid) {
                        this.ctx.fillStyle = this.colors.foundTarget;
                    } else if (this.searchComplete || i < this.left || i > this.right) {
                        this.ctx.fillStyle = this.colors.eliminated;
                    } else {
                        this.ctx.fillStyle = this.colors.bar;
                    }
                    
                    // Draw bar
                    this.ctx.fillRect(x, y, this.barWidth, barHeight);
                    
                    // Draw value on top of bar
                    this.ctx.fillStyle = '#000';
                    this.ctx.textAlign = 'center';
                    this.ctx.font = '12px Arial';
                    this.ctx.fillText(this.array[i], x + this.barWidth/2, y - 5);
                    
                    // Draw index below bar
                    this.ctx.fillText(i, x + this.barWidth/2, this.canvas.height - 25);
                }
                
                // Draw pointers
                if (!this.searchComplete) {
                    this.drawPointer(this.left, 'L', this.colors.leftPointer);
                    this.drawPointer(this.right, 'R', this.colors.rightPointer);
                    this.drawPointer(this.mid, 'M', this.colors.midPointer);
                }
            }
            
            drawPointer(index, label, color) {
                const x = index * (this.barWidth + this.barSpacing) + this.barSpacing + this.barWidth/2;
                
                // Draw pointer arrow
                this.ctx.fillStyle = color;
                this.ctx.beginPath();
                this.ctx.moveTo(x, this.canvas.height - 15);
                this.ctx.lineTo(x - 8, this.canvas.height - 5);
                this.ctx.lineTo(x + 8, this.canvas.height - 5);
                this.ctx.fill();
                
                // Draw pointer label
                this.ctx.fillStyle = '#000';
                this.ctx.textAlign = 'center';
                this.ctx.font = 'bold 14px Arial';
                this.ctx.fillText(label, x, this.canvas.height - 5);
            }
        }

        // Initialize visualizer when document is loaded
        document.addEventListener('DOMContentLoaded', () => {
            const visualizer = new BinarySearchVisualizer('binarySearchCanvas');
            
            // Button event handlers
            document.getElementById('generateArray').addEventListener('click', () => {
                visualizer.generateRandomArray();
            });
            
            document.getElementById('resetSearch').addEventListener('click', () => {
                visualizer.resetSearch();
            });
            
            document.getElementById('nextStep').addEventListener('click', () => {
                visualizer.nextStep();
            });
            
            document.getElementById('setTarget').addEventListener('click', () => {
                const targetValue = parseInt(document.getElementById('targetInput').value);
                if (!isNaN(targetValue)) {
                    visualizer.setTarget(targetValue);
                }
            });
            
            let autoPlayInterval = null;
            document.getElementById('autoPlay').addEventListener('click', function() {
                if (autoPlayInterval) {
                    clearInterval(autoPlayInterval);
                    autoPlayInterval = null;
                    this.textContent = 'Auto Play';
                } else {
                    this.textContent = 'Stop';
                    autoPlayInterval = setInterval(() => {
                        const continueSearch = visualizer.nextStep();
                        if (!continueSearch) {
                            clearInterval(autoPlayInterval);
                            autoPlayInterval = null;
                            this.textContent = 'Auto Play';
                        }
                    }, 1000);
                }
            });
            
            // Generate initial array
            visualizer.generateRandomArray();
        });
    </script>
</body>
</html>
```

You can copy this code into an HTML file and open it in your browser to see binary search in action!

## Visualization Exercises

Try these exercises with the visualizer:

1. **Compare array sizes**: Generate arrays of different sizes and observe how the number of steps changes logarithmically.

2. **Search for extremes**: Try searching for values at the beginning, middle, and end of the array. Notice the difference in steps required.

3. **Search for non-existent values**: What happens when you search for a value that's not in the array? Observe how the algorithm narrows down to where the value would be.

4. **Predict the next step**: Before clicking "Next Step," try to predict:
   - Which half of the array will be eliminated
   - What the new values of `left`, `right`, and `mid` will be

5. **Count the steps**: For an array of size n, verify that it takes at most log₂(n) steps to find any value.

## Visualization Challenge

Modify the visualizer to implement and show other binary search variations:

1. **First Occurrence**: Adapt the visualizer to show how to find the first occurrence of a value in an array with duplicates.

2. **Rotated Array**: Modify the code to visualize binary search in a rotated sorted array.

3. **3D Visualization**: For the ambitious, extend the concept to visualize binary search in 2D or 3D data (like searching in a sorted grid).

## Teaching with Visualization

Visualizations are powerful teaching tools. If you're explaining binary search to someone else:

1. Start with a physical demonstration (like searching for a page in a book)
2. Use the visualizer to show the algorithm in action
3. Have them predict each step before revealing it
4. Explain why each decision is made
5. Compare with linear search to emphasize the efficiency gain

## Conclusion

Visualization is one of the most effective ways to understand algorithms. By seeing binary search in action, you develop an intuitive sense of how it works and why it's so efficient.

As you continue your journey in algorithm learning, remember that visualizing the process can often lead to deeper understanding and even help you discover optimizations or variations.

Happy visualizing! 