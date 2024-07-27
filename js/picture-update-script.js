const images = [
    { src: '/images/beach-harry.png', duration: 5000 },
    { src: '/images/beach-harry.png', duration: 4000 },
    { src: '/images/beach-harry.png', duration: 3000 },
    { src: '/images/beach-harry.png', duration: 6000 },
    { src: '/images/beach-harry.png', duration: 8000 },
    { src: '/images/beach-harry.png', duration: 9000 }
    // Add more image paths and durations as needed
];

const gallery = document.getElementById('image-gallery');
const imgElements = gallery.getElementsByClassName('img-fluid');
let usedIndices = new Set();

function getRandomIndex() {
    if (usedIndices.size === images.length) {
        usedIndices.clear(); // Reset the set when all images have been used
    }

    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * images.length);
    } while (usedIndices.has(newIndex));

    usedIndices.add(newIndex);
    return newIndex;
}

function updateImage(imgElement) {
    const newIndex = getRandomIndex();
    const { src, duration } = images[newIndex];

    imgElement.classList.remove('loaded');
    setTimeout(() => {
        // Append a unique query string to the image URL to force reload
        const uniqueSrc = `${src}?${new Date().getTime()}`;
        imgElement.src = uniqueSrc;
        imgElement.onload = () => {
            imgElement.classList.add('loaded');
        };
    }, 500); // Match this with the transition duration

    // Schedule the next update after the duration of the current GIF plus a random interval
    setTimeout(() => updateImage(imgElement), duration + getRandomInterval());
}

function getRandomInterval() {
    return Math.floor(Math.random() * 5000) + 2000; // Random interval between 2 and 7 seconds
}

// Initialize the image updates with random intervals
for (let i = 0; i < imgElements.length; i++) {
    setTimeout(() => updateImage(imgElements[i]), getRandomInterval());
}
