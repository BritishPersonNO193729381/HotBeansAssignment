window.addEventListener("DOMContentLoaded", () => {

    console.log("Fancy Required .js Background Loaded! (Needed for the assignment, but also just looks really cool ngl)");

    const background = document.getElementById("bean-background");

    const beanCount = 25;

    const beans = [];

    for (let i = 0; i < beanCount; i++) {

        const bean = document.createElement("div");

        bean.classList.add("bean");

        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;

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

    function animateBeans() {

        beans.forEach(bean => {

            bean.x += bean.speedX;
            bean.y += bean.speedY;

            if (bean.x < -50) bean.x = window.innerWidth;
            if (bean.x > window.innerWidth) bean.x = -50;

            if (bean.y < -50) bean.y = window.innerHeight;
            if (bean.y > window.innerHeight) bean.y = -50;

            bean.element.style.left = `${bean.x}px`;
            bean.element.style.top = `${bean.y}px`;
        });

        requestAnimationFrame(animateBeans);
    }

    animateBeans();

    document.addEventListener("mousemove", (e) => {

        beans.forEach(bean => {

            const dx = e.clientX - bean.x;
            const dy = e.clientY - bean.y;

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