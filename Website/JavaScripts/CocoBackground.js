window.addEventListener("DOMContentLoaded", () => {

    console.log("Bean Background System Loaded");

    const background = document.getElementById("bean-background");

    // SAFETY CHECK
    if (!background) {
        console.error("Bean background container missing.");
        return;
    }

    // SETTINGS (ONLY WHAT STILL EXISTS)
    const beansEnabled =
        document.body.dataset.beansEnabled !== "false";

    const beanStyle =
        "BrownBeansCurrent.png"; // fixed (no more dropdown system)

    // STOP SYSTEM IF DISABLED
    if (!beansEnabled) {
        background.style.display = "none";
        console.log("Beans disabled via settings.");
        return;
    }

    const beanCount = 25;
    const beans = [];

    const width = background.offsetWidth;
    const height = background.offsetHeight;

    // CREATE BEANS
    for (let i = 0; i < beanCount; i++) {

        const bean = document.createElement("div");
        bean.classList.add("bean");

        const img = document.createElement("img");
        img.src = `images/Beans/${beanStyle}`;
        img.alt = "Cocoa Bean";
        img.draggable = false;

        bean.appendChild(img);

        const x = Math.random() * width;
        const y = Math.random() * height;

        bean.style.left = `${x}px`;
        bean.style.top = `${y}px`;

        background.appendChild(bean);

        beans.push({
            element: bean,
            x,
            y,
            speedX: (Math.random() - 0.5) * 0.4,
            speedY: (Math.random() - 0.5) * 0.4
        });
    }

    // ANIMATION LOOP
    function animateBeans() {

        const w = background.offsetWidth;
        const h = background.offsetHeight;

        for (let i = 0; i < beans.length; i++) {

            const b = beans[i];

            b.x += b.speedX;
            b.y += b.speedY;

            // WRAP AROUND EDGES
            if (b.x < -50) b.x = w;
            else if (b.x > w) b.x = -50;

            if (b.y < -50) b.y = h;
            else if (b.y > h) b.y = -50;

            b.element.style.left = `${b.x}px`;
            b.element.style.top = `${b.y}px`;
        }

        requestAnimationFrame(animateBeans);
    }

    animateBeans();
});