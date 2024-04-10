export const Magnetic = {
  mounted(el) {
    const lerp = (current, target, factor) =>
        current + (target - current) * factor;

    let mousePosition = { x: 0, y: 0 };
    window.addEventListener("mousemove", (e) => {
      mousePosition.x = e.pageX;
      mousePosition.y = e.pageY;
    });

    const calculateDistance = (x1, y1, x2, y2) => Math.hypot(x1 - x2, y1 - y2);

    const boundingClientRect = el.getBoundingClientRect();
    const triggerArea = 200;
    const interpolationFactor = 0.1; // Réduit pour une transition plus fluide

    let lerpingData = {
      x: { current: 0, target: 0 },
      y: { current: 0, target: 0 },
      scale: { current: 1, target: 1 },
      rotation: { current: 0, target: 0 },
    };

    const render = () => {
      const centerX = boundingClientRect.left + boundingClientRect.width / 2;
      const centerY = boundingClientRect.top + boundingClientRect.height / 2;
      const distanceFromMouseToCenter = calculateDistance(
          mousePosition.x,
          mousePosition.y,
          centerX,
          centerY
      );

      let targetHolder = { x: 0, y: 0, scale: 1, rotation: 0 };

      if (distanceFromMouseToCenter < triggerArea) {
        const distanceFactor = 1 - distanceFromMouseToCenter / triggerArea;
        targetHolder.scale = 1 + 0.1 * distanceFactor;
        targetHolder.rotation =
            10 * distanceFactor * (mousePosition.x < centerX ? -1 : 1);

        targetHolder.x = (mousePosition.x - centerX) * 0.1;
        targetHolder.y = (mousePosition.y - centerY) * 0.15; // Augmenté pour un mouvement plus prononcé en hauteur
      }

      lerpingData.x.target = targetHolder.x;
      lerpingData.y.target = targetHolder.y;
      lerpingData.scale.target = targetHolder.scale;
      lerpingData.rotation.target = targetHolder.rotation;

      for (const item in lerpingData) {
        lerpingData[item].current = lerp(
            lerpingData[item].current,
            lerpingData[item].target,
            interpolationFactor
        );
      }

      el.style.transform = `translate(${lerpingData.x.current}px, ${lerpingData.y.current}px) scale(${lerpingData.scale.current}) rotate(${lerpingData.rotation.current}deg)`;

      window.requestAnimationFrame(render);
    };

    render();
  },
};