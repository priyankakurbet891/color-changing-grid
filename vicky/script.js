const gridContainer = document.querySelector('.grid-container');
let intervalIds = []; // To store all timeout IDs
let currentIndex = 0; // To track the current animation index
let isAnimating = false; // To track if the animation is currently running

// Create 60 boxes dynamically
for (let i = 0; i < 60; i++) {
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    gridContainer.appendChild(gridItem);
}

const gridItems = document.querySelectorAll('.grid-item');
const intervalInput = document.getElementById('interval');

// Function to generate random colors
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to start the box color animation
function startAnimation() {
    if (currentIndex >= gridItems.length) {
        return; // Stop if all boxes have been animated
    }
    
    isAnimating = true; // Mark animation as running

    const item = gridItems[currentIndex]; // Get the current item
    item.style.backgroundColor = getRandomColor(); // Change color

    // Set timeout for the next color change
    intervalIds.push(setTimeout(() => {
        currentIndex++; // Move to the next item
        if (isAnimating) { // Check if still animating
            startAnimation(); // Recursively call to animate next item
        }
    }, parseInt(intervalInput.value))); // Use the interval input value
}

// Play button functionality
document.getElementById('play').addEventListener('click', () => {
    if (!isAnimating) { // Only start if not currently animating
        startAnimation(); // Start animation from the current index
    }
});

// Stop button functionality
document.getElementById('stop').addEventListener('click', () => {
    isAnimating = false; // Mark animation as stopped
    intervalIds.forEach(id => clearTimeout(id)); // Clear all timeouts
    intervalIds = []; // Reset the array
});

// Reset button functionality
document.getElementById('reset').addEventListener('click', () => {
    isAnimating = false; // Mark animation as stopped
    intervalIds.forEach(id => clearTimeout(id)); // Clear all timeouts
    intervalIds = []; // Reset the array
    currentIndex = 0; // Reset the current index

    // Reset all boxes to the original color
    gridItems.forEach(item => {
        item.style.backgroundColor = 'lightgray';
    });
});
