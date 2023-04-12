// ammount to add on each button press
const confettiCount = 50;
const sequinCount = 10;

// "physics" variables
const gravityConfetti = 0.3;
const gravitySequins = 0.55;
const dragConfetti = 0.075;
const dragSequins = 0.02;
const terminalVelocity = 3;

// helper function to pick a random number within a range
function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

// Sequin Class
class Sequin {
  constructor(props) {
    const {colors, canvas, target} = props;
    this.color = colors[Math.floor(randomRange(0, colors.length))].back,
      this.radius = randomRange(1, 2),
      this.position = {
        x: randomRange(canvas.width/2 - target.offsetWidth/3, canvas.width/2 + target.offsetWidth/3),
        y: randomRange(canvas.height/2 + target.offsetHeight/2 + 8, canvas.height/2 + (1.5 * target.offsetHeight) - 8),
      },
      this.velocity = {
        x: randomRange(-6, 6),
        y: randomRange(-8, -12)
      }
  }

  update() {
    // apply forces to velocity
    this.velocity.x -= this.velocity.x * dragSequins;
    this.velocity.y = this.velocity.y + gravitySequins;

    // set position
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}


// Confetto Class
class Confetto {
  constructor(opts) {
    const {colors, canvas, target} = opts;
    this.randomModifier = randomRange(0, 99);
    this.color = colors[Math.floor(randomRange(0, colors.length))];
    this.dimensions = {
      x: randomRange(5, 9),
      y: randomRange(8, 15),
    };
    this.position = {
      x: randomRange(canvas.width/2 - target.offsetWidth/4, canvas.width/2 + target.offsetWidth/4),
      y: randomRange(canvas.height/2 + target.offsetHeight/2 + 8, canvas.height/2 + (1.5 * target.offsetHeight) - 8),
    };
    this.rotation = randomRange(0, 2 * Math.PI);
    this.scale = {
      x: 1,
      y: 1,
    };
    this.velocity = this.initConfettoVelocity([-9, 9], [6, 11]);
  }

  // helper function to get initial velocities for confetti
  // this weighted spread helps the confetti look more realistic
  initConfettoVelocity (xRange, yRange) {
    const x = randomRange(xRange[0], xRange[1]);
    const range = yRange[1] - yRange[0] + 1;
    let y = yRange[1] - Math.abs(randomRange(0, range) + randomRange(0, range) - range);
    if (y >= yRange[1] - 1) {
      // Occasional confetto goes higher than the max
      y += (Math.random() < .25) ? randomRange(1, 3) : 0;
    }
    return {x: x, y: -y};
  }

  update() {
    // apply forces to velocity
    this.velocity.x -= this.velocity.x * dragConfetti;
    this.velocity.y = Math.min(this.velocity.y + gravityConfetti, terminalVelocity);
    this.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();

    // set position
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // spin confetto by scaling y and set the color, .09 just slows cosine frequency
    this.scale.y = Math.cos((this.position.y + this.randomModifier) * 0.09);
  }

}

class ExhibitionEffect {
  constructor() {
    // add Confetti/Sequince objects to arrays to draw them
    this.confetti = [];
    this.sequins = [];
    // colors, back side is darker for confetti flipping
    this.colors = [
      { front : '#7b5cff', back: '#6245e0' }, // Purple
      { front : '#b3c7ff', back: '#8fa5e5' }, // Light Blue
      { front : '#5c86ff', back: '#345dd1' }  // Darker Blue
    ];
    this.target = {
      offsetWidth: 100,
      offsetHeight: 50
    }
    this.render = this.render.bind(this);
    this.listenEvents();
    this.initCanvas();
    this.render();
  }

  initCanvas() {
    this.canvas = document.getElementById('exhibition_canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.cx = this.ctx.canvas.width / 2;
    this.cy = this.ctx.canvas.height / 2;
  }

  listenEvents() {
    // resize listenter
    window.addEventListener('resize', () => {
      this.resizeCanvas();
    });
  }

  // re-init canvas if the window size changes
  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.cx = this.ctx.canvas.width / 2;
    this.cy = this.ctx.canvas.height / 2;
  }

  // add elements to arrays to be drawn
  initBurst () {
    this.handleContainerVisible(true);
    for (let i = 0; i < confettiCount; i++) {
      this.confetti.push(new Confetto({
        target: this.target,
        canvas: this.canvas,
        colors: this.colors
      }));
    }
    for (let i = 0; i < sequinCount; i++) {
      this.sequins.push(new Sequin({
        target: this.target,
        canvas: this.canvas,
        colors: this.colors
      }));
    }
  }

  handleContainerVisible(visible) {
    this.canvas.style.display = visible ? 'block' : 'none';
  }

  // draws the elements on the canvas
  render() {
    const ctx = this.ctx;
    const canvas = this.canvas;
    const confetti = this.confetti;
    const sequins = this.sequins;
    const target = this.target;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // hide the container;
    if (confetti.length === 0 && sequins.length === 0) {
      this.handleContainerVisible(false);
      window.requestAnimationFrame(this.render);
      return;
    }

    confetti.forEach((confetto, index) => {
      let width = (confetto.dimensions.x * confetto.scale.x);
      let height = (confetto.dimensions.y * confetto.scale.y);

      // move canvas to position and rotate
      ctx.translate(confetto.position.x, confetto.position.y);
      ctx.rotate(confetto.rotation);

      // update confetto "physics" values
      confetto.update();

      // get front or back fill color
      ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;

      // draw confetto
      ctx.fillRect(-width / 2, -height / 2, width, height);

      // reset transform matrix
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      // clear rectangle where button cuts off
      if (confetto.velocity.y < 0) {
        ctx.clearRect(canvas.width/2 - target.offsetWidth/2, canvas.height/2 + target.offsetHeight/2, target.offsetWidth, target.offsetHeight);
      }
    })

    sequins.forEach((sequin, index) => {
      // move canvas to position
      ctx.translate(sequin.position.x, sequin.position.y);

      // update sequin "physics" values
      sequin.update();

      // set the color
      ctx.fillStyle = sequin.color;

      // draw sequin
      ctx.beginPath();
      ctx.arc(0, 0, sequin.radius, 0, 2 * Math.PI);
      ctx.fill();

      // reset transform matrix
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      // clear rectangle where button cuts off
      if (sequin.velocity.y < 0) {
        ctx.clearRect(canvas.width/2 - target.offsetWidth/2, canvas.height/2 + target.offsetHeight/2, target.offsetWidth, target.offsetHeight);
      }
    })

    // remove confetti and sequins that fall off the screen
    // must be done in seperate loops to avoid noticeable flickering
    confetti.forEach((confetto, index) => {
      if (confetto.position.y >= canvas.height) confetti.splice(index, 1);
    });
    sequins.forEach((sequin, index) => {
      if (sequin.position.y >= canvas.height) sequins.splice(index, 1);
    });

    window.requestAnimationFrame(this.render);
  }
}

export default ExhibitionEffect;
