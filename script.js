// Wait for the document to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Element Selections ---
    const hourHand = document.querySelector('[data-hour-hand]');
    const minuteHand = document.querySelector('[data-minute-hand]');
    const secondHand = document.querySelector('[data-second-hand]');
    const digitalHours = document.getElementById('digital-hours');
    const digitalMinutes = document.getElementById('digital-minutes');
    const digitalSeconds = document.getElementById('digital-seconds');
    const digitalAmPm = document.getElementById('digital-ampm');
    const dateDisplay = document.getElementById('date-display');
    const analogClock = document.querySelector('.analog-clock');

    /**
     * Generates the hour markers for the analog clock face.
     */
    function createAnalogMarkers() {
        if (!analogClock) return; // Exit if the clock element doesn't exist
        
        for (let i = 1; i <= 12; i++) {
            const marker = document.createElement('div');
            marker.classList.add('marker');
            const rotation = i * 30;
            // Add specific classes for 3, 6, 9, 12 for bolder styling
            if (i % 3 === 0) {
                marker.classList.add(`marker-${i}`);
            }
            marker.style.transform = `rotate(${rotation}deg)`;
            analogClock.appendChild(marker);
        }
    }

    /**
     * Updates both the analog and digital clocks every second.
     */
    function setClocks() {
        const now = new Date();

        // --- Analog Clock Logic ---
        const seconds = now.getSeconds();
        const minutes = now.getMinutes();
        const hours = now.getHours();
        
        // Calculate rotation ratios
        const secondsRatio = seconds / 60;
        const minutesRatio = (secondsRatio + minutes) / 60; // Add seconds for smoother minute hand movement
        const hoursRatio = (minutesRatio + hours) / 12; // Add minutes for smoother hour hand movement

        setRotation(secondHand, secondsRatio);
        setRotation(minuteHand, minutesRatio);
        setRotation(hourHand, hoursRatio);

        // --- Digital Clock Logic ---
        let displayHours = hours % 12;
        displayHours = displayHours ? displayHours : 12; // The hour '0' should be '12'
        const amPm = hours >= 12 ? 'PM' : 'AM';

        // Update the text content of digital clock elements
        if (digitalHours) digitalHours.textContent = displayHours.toString().padStart(2, '0');
        if (digitalMinutes) digitalMinutes.textContent = minutes.toString().padStart(2, '0');
        if (digitalSeconds) digitalSeconds.textContent = seconds.toString().padStart(2, '0');
        if (digitalAmPm) digitalAmPm.textContent = amPm;
        
        // --- Date Display Logic ---
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        if (dateDisplay) dateDisplay.textContent = now.toLocaleDateString('en-US', options);
    }

    /**
     * Sets the rotation for a clock hand element.
     * @param {HTMLElement} element - The clock hand element.
     * @param {number} rotationRatio - The ratio of rotation (0 to 1).
     */
    function setRotation(element, rotationRatio) {
        if (!element) return; // Exit if the element doesn't exist
        const degrees = rotationRatio * 360;
        element.style.transform = `translateX(-50%) rotate(${degrees}deg)`;
    }

    // --- Initial Setup ---
    createAnalogMarkers();      // Create the markers on the analog clock face
    setClocks();                // Set the clocks immediately on load
    setInterval(setClocks, 1000); // Update the clocks every second
});
