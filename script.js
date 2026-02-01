document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('openBtn');
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    const cardModal = document.getElementById('cardModal');
    const bgMusic = document.getElementById('bgMusic');

    // 1. Setup GSAP Timeline strictly paused
    const tl = gsap.timeline({ paused: true });

    tl
        // Step 1: Open the top flap
        .to('.top-flap', {
            rotationX: 180,
            transformOrigin: "top",
            duration: 0.8,
            ease: "power2.inOut",
            zIndex: 1 // Move behind
        })
        // Step 2: Fade out the seal/instruction
        .to('.wax-seal, .click-instruction', {
            opacity: 0,
            duration: 0.3
        }, "-=0.4")
        // Step 3: Slide the card out slightly (optional, simulation)
        // Step 4: Zoom out envelope and Fade In the Card Modal
        .to(envelopeWrapper, {
            scale: 1.5,
            opacity: 0,
            duration: 1,
            ease: "power2.in"
        })
        .set(envelopeWrapper, { display: 'none' }) // Remove from flow
        .set(cardModal, { display: 'block' }) // Make visible in DOM
        .to(cardModal, {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "back.out(1.2)"
        })
        // Step 5: Animate content inside card
        .from('.photo-frame', { scale: 0, opacity: 0, duration: 0.8 })
        .from('.title', { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from('.verse', { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from('.message-body', { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from('.sign', { opacity: 0, duration: 1 }, "-=0.2")
        .from('#celebrateBtn', { scale: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" }, "-=0.2");

    // 2. Click Handler
    openBtn.addEventListener('click', () => {
        // Play Music
        bgMusic.volume = 0.5;
        bgMusic.play().catch(e => console.log("Audio play failed (autoplay policy):", e));

        // Start Animation
        tl.play();

        // Confetti Burst
        setTimeout(() => {
            triggerConfetti();
        }, 2500); // Trigger when card appears
    });

    // 3. Celebrate Button
    document.getElementById('celebrateBtn').addEventListener('click', () => {
        triggerConfetti();
        gsap.to('#celebrateBtn', { scale: 1.1, yoyo: true, repeat: 1, duration: 0.1 });
    });

    // Confetti Logic
    function triggerConfetti() {
        const count = 200;
        const defaults = {
            origin: { y: 0.7 },
            colors: ['#e6b8a2', '#d4a373', '#e07a5f', '#ffffff'] // Custom Colors
        };

        function fire(particleRatio, opts) {
            confetti(Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio)
            }));
        }

        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });
    }
});
