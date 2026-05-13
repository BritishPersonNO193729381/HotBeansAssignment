window.addEventListener("DOMContentLoaded", () => {

    console.log("Fancy Required .js Background Loaded!");

    const background = document.getElementById("bean-background");

    const beanCount = 25;

    const beans = [];

    // CONTENT AREA SIZE

    const contentWidth = background.offsetWidth;
    const contentHeight = background.offsetHeight;

    // CREATE BEANS

    for (let i = 0; i < beanCount; i++) {

        const bean = document.createElement("div");

        bean.classList.add("bean");

        const x = Math.random() * contentWidth;
        const y = Math.random() * contentHeight;

        bean.style.left = `${x}px`;
        bean.style.top = `${y}px`;

        background.appendChild(bean);

        beans.push({
            element: bean,
            x: x,
            y: y,
            speedX: (Math.random() - 0.5) * 0.4,
            speedY: (Math.random() - 0.5) * 0.4
        });
    }

    // ANIMATION LOOP

    function animateBeans() {

        const width = background.offsetWidth;
        const height = background.offsetHeight;

        beans.forEach(bean => {

            bean.x += bean.speedX;
            bean.y += bean.speedY;

            // WRAP AROUND CONTENT AREA

            if (bean.x < -50) bean.x = width;
            if (bean.x > width) bean.x = -50;

            if (bean.y < -50) bean.y = height;
            if (bean.y > height) bean.y = -50;

            bean.element.style.left = `${bean.x}px`;
            bean.element.style.top = `${bean.y}px`;
        });

        requestAnimationFrame(animateBeans);
    }

    animateBeans();

    // MOUSE INTERACTION

    document.addEventListener("mousemove", (e) => {

        const rect = background.getBoundingClientRect();

        // MOUSE POSITION RELATIVE TO CONTENT

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        beans.forEach(bean => {

            const dx = mouseX - bean.x;
            const dy = mouseY - bean.y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 140) {

                bean.element.style.transform =
                    `rotate(${dx * 0.05}deg) scale(1.15)`;

            } else {

                bean.element.style.transform =
                    `rotate(25deg) scale(1)`;
            }
        });
    });
});