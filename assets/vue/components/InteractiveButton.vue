<template>
  <div ref="scene" class="scene"></div>
</template>

<script>
import { onMounted, ref, watchEffect } from "vue";
import Matter from "matter-js";
import { useI18n } from "vue-i18n";

export default {
  setup() {
    const scene = ref(null);
    const balls = ref([]);
    const { t } = useI18n();

    onMounted(() => {
      const engine = Matter.Engine.create({ gravity: { x: 0, y: 0.3 } });

      const render = Matter.Render.create({
        element: scene.value,
        engine: engine,
        options: {
          width: window.innerWidth / 5,
          height: window.innerHeight / 2,
          wireframes: false,
          background: "transparent",
        },
      });

      Matter.Render.run(render);

      const createPhysicalButton = (key) => {
        const buttonWidth = 165;
        const buttonHeight = 45;
        const cornerRadius = 20;

        const x =
            Math.random() * (window.innerWidth / 8 - buttonWidth * 2 - 100) +
            buttonWidth +
            50;
        const y =
            Math.random() * (window.innerHeight / 2 - buttonHeight * 2 - 100) +
            buttonHeight +
            50;
        const angle = Math.random() * Math.PI * 2;

        const body = Matter.Bodies.rectangle(x, y, buttonWidth, buttonHeight, {
          chamfer: { radius: cornerRadius },
          angle: angle,
          isStatic: false,
          restitution: 0.4,
          frictionAir: 0.004,
          density: 0.01,
          render: { visible: false },
        });
        body.initialPosition = { x, y };

        const button = document.createElement("button");
        button.style.padding = "10px";
        button.style.borderRadius = `${cornerRadius}px`;
        button.style.border = "1px solid #333";
        button.style.backgroundColor = "transparent";
        button.style.position = "absolute";
        button.style.left = `${x - buttonWidth / 2}px`;
        button.style.top = `${y - buttonHeight / 2}px`;
        button.style.width = `${buttonWidth}px`;
        button.style.height = `${buttonHeight}px`;
        scene.value.appendChild(button);

        const limiterVitesse = (corps, vitesseMax) => {
          const vitesse = Matter.Vector.magnitude(corps.velocity);
          if (vitesse > vitesseMax) {
            Matter.Body.setVelocity(
                corps,
                Matter.Vector.mult(
                    Matter.Vector.normalise(corps.velocity),
                    vitesseMax
                )
            );
          }
        };

        Matter.Events.on(engine, "afterUpdate", () => {
          button.style.left = `${body.position.x - buttonWidth / 2}px`;
          button.style.top = `${body.position.y - buttonHeight / 2}px`;
          button.style.transform = `rotate(${body.angle}rad)`;
          [...balls.value].forEach((corps) =>
              limiterVitesse(corps, 10)
          );

          const maxSpeed = 10;
          const speed = Matter.Vector.magnitude(body.velocity);
          if (speed > maxSpeed) {
            Matter.Body.setVelocity(
                body,
                Matter.Vector.mult(
                    Matter.Vector.normalise(body.velocity),
                    maxSpeed
                )
            );
          }
        });

        watchEffect(() => {
          button.innerText = t(key);
        });

        return body;
      };

      const buttons = [
        createPhysicalButton("button.fun"),
        createPhysicalButton("button.awareness"),
        createPhysicalButton("button.act"),
        createPhysicalButton("button.enjoy"),
        createPhysicalButton("button.learn"),
        createPhysicalButton("button.ecology"),
        createPhysicalButton("button.education"),
      ];

      Matter.World.add(engine.world, buttons);

      const colors = ["#551126", "#C1DD13", "#ABCDFF"];

      const createBall = (color) => {
        const ballSize = 6;
        const x =
            Math.random() * (window.innerWidth / 8 - ballSize * 2 - 100) +
            ballSize +
            50;
        const y =
            Math.random() * (window.innerHeight / 2 - ballSize * 2 - 100) +
            ballSize +
            50;
        const angle = Math.random() * Math.PI * 2;

        const ball = Matter.Bodies.circle(x, y, ballSize, {
          angle: angle,
          isStatic: false,
          restitution: 0.4,
          frictionAir: 0.004,
          density: 0.01,
          render: {
            fillStyle: color,
            strokeStyle: "transparent",
          },
        });

        balls.value.push(ball);
        Matter.World.add(engine.world, ball);

        return ball;
      };

      const createdBalls = colors.map((color) => createBall(color));

      Matter.World.add(engine.world, createdBalls);

      const wallOptions = {
        isStatic: true,
        render: { visible: false },
      };

      const wallThickness = 200; // Augmentez l'épaisseur des murs pour empêcher le passage des balles

      // Assurez-vous que la position et la taille des murs couvrent correctement les bords de la scène
      const leftWall = Matter.Bodies.rectangle(-wallThickness / 2, window.innerHeight / 4, wallThickness, window.innerHeight * 2, wallOptions);
      const rightWall = Matter.Bodies.rectangle(window.innerWidth / 5 + wallThickness / 2, window.innerHeight / 4, wallThickness, window.innerHeight * 2, wallOptions);

      const topWall = Matter.Bodies.rectangle(
          window.innerWidth / 16,
          -wallThickness / 2,
          window.innerWidth * 2,
          wallThickness,
          wallOptions
      );
      const bottomWall = Matter.Bodies.rectangle(
          window.innerWidth / 16,
          window.innerHeight / 2 + wallThickness / 2,
          window.innerWidth * 2,
          wallThickness,
          wallOptions
      );

      Matter.World.add(engine.world, [
        leftWall,
        rightWall,
        topWall,
        bottomWall,
      ]);

      Matter.Events.on(engine, "collisionStart", (event) => {
        event.pairs.forEach((pair) => {
          const { bodyA, bodyB } = pair;

          if (
              balls.value.includes(bodyA) &&
              (leftWall === bodyB ||
                  rightWall === bodyB ||
                  topWall === bodyB ||
                  bottomWall === bodyB)
          ) {
            Matter.Body.setVelocity(bodyA, {
              x: -bodyA.velocity.x * 0.5,
              y: -bodyA.velocity.y * 0.5,
            });
          }

          if (
              balls.value.includes(bodyB) &&
              (leftWall === bodyA ||
                  rightWall === bodyA ||
                  topWall === bodyA ||
                  bottomWall === bodyA)
          ) {
            Matter.Body.setVelocity(bodyB, {
              x: -bodyB.velocity.x * 0.5,
              y: -bodyB.velocity.y * 0.5,
            });
          }
        });
      });

      let lastMousePosition = { x: 0, y: 0 };

      window.addEventListener("mousemove", (event) => {
        const sceneRect = scene.value.getBoundingClientRect();
        const mousePosition = {
          x: event.clientX - sceneRect.left,
          y: event.clientY - sceneRect.top,
        };
        const mouseVelocity = {
          x: mousePosition.x - lastMousePosition.x,
          y: mousePosition.y - lastMousePosition.y,
        };

        buttons.forEach((button) => {
          const distance = Matter.Vector.magnitude(
              Matter.Vector.sub(button.position, mousePosition)
          );
          if (distance < 50 && Matter.Vector.magnitude(mouseVelocity) > 0) {
            const maxMouseSpeed = 20;
            const buttonSpeed = Matter.Vector.magnitude(mouseVelocity);
            if (buttonSpeed > maxMouseSpeed) {
              Matter.Body.setVelocity(
                  button,
                  Matter.Vector.mult(
                      Matter.Vector.normalise(mouseVelocity),
                      maxMouseSpeed
                  )
              );
            } else {
              Matter.Body.setVelocity(button, mouseVelocity);
            }
          }
        });

        balls.value.forEach((ball) => {
          const distance = Matter.Vector.magnitude(
              Matter.Vector.sub(ball.position, mousePosition)
          );
          if (distance < 50 && Matter.Vector.magnitude(mouseVelocity) > 0) {
            const maxMouseSpeed = 20;
            const ballSpeed = Matter.Vector.magnitude(mouseVelocity);
            if (ballSpeed > maxMouseSpeed) {
              Matter.Body.setVelocity(
                  ball,
                  Matter.Vector.mult(
                      Matter.Vector.normalise(mouseVelocity),
                      maxMouseSpeed
                  )
              );
            } else {
              Matter.Body.setVelocity(ball, mouseVelocity);
            }
          }
        });

        lastMousePosition = mousePosition;
      });

      const runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);
    });

    return { scene };
  },
};
</script>

<style>
.scene {
  width: 50vw;
  height: 30vh;
  position: absolute; /* ou 'relative' selon le besoin */
  top: 60%;
  left: 73%;
  transform: translate(-50%, -50%);
  margin-top: 100px;
}

button {
  z-index: 10;
  border-radius: 20px;
  border: 1px solid #333;
  background-color: transparent;
  transform-origin: center center;
  cursor: auto;
}

</style>
