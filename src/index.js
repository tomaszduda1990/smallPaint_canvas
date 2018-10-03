const sketchpad = {
  drawLines: function(e) {
    if (!this.mouseDown) return;
    const x = this.getX(e),
      y = this.getY(e);

    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  },
  setupSidebar: function() {
    this.colors.forEach(color => {
      color.style.backgroundColor = color.dataset.color;
      color.onclick = this.changePenColor.bind(this);
    });
    this.range.onchange = e => {
      this.rangeOutput.textContent = e.target.value;
      this.changePenSize(e.target.value);
    };
  },
  getX: function(e) {
    var boundaries = this.canvas.getBoundingClientRect();
    if (e.offsetX) {
      return e.offsetX;
    } else if (e.clientX) {
      return e.clientX - boundaries.left;
    }
  },
  getY: function(e) {
    var boundaries = this.canvas.getBoundingClientRect();
    if (e.offsetY) {
      return e.offsetY;
    } else if (e.clientY) {
      return e.clientY - boundaries.top;
    }
  },
  changePenColor: function(e) {
    document.querySelector(".current").classList.remove("current");
    e.target.classList.add("current");
    this.ctx.strokeStyle = e.target.dataset.color;
  },
  changePenSize: function(penSize) {
    this.ctx.lineWidth = penSize;
  },
  setupCanvas: function() {
    this.canvas.width = this.canvasCon.offsetWidth;
    this.canvas.height = this.canvasCon.offsetHeight;
    this.ctx = this.canvas.getContext("2d");
    this.canvas.onmousedown = e => {
      this.mouseDown = true;
      this.ctx.beginPath();
      this.ctx.moveTo(this.getX(e), this.getY(e));
    };
    this.canvas.onmouseup = () => {
      this.mouseDown = false;
    };
    this.ctx.fillStyle = "#fff";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.lineWidth = this.range.value;
    this.ctx.lineJoin = "round";
    this.ctx.lineCap = "round";
    this.ctx.strokeStyle = this.con.querySelector(".current").dataset.current;
    this.canvas.onmousemove = this.drawLines.bind(this);
  },
  clearCanvas: function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  saveCanvas: function() {
    const img = new Image();
    img.src = this.canvas.toDataURL("image/png");
    this.con.appendChild(img);
  },
  init: function() {
    this.con = document.querySelector("#sketchpad");
    this.canvasCon = this.con.querySelector(".canvas");
    this.canvas = this.con.querySelector("canvas");

    this.colors = this.con.querySelectorAll(".colors div");
    this.range = this.con.querySelector('input[type="range"]');
    this.rangeOutput = document.querySelector(".value");
    this.mouseDown = false;
    this.setupSidebar();
    this.setupCanvas();
    this.clearButton = document.querySelector("#clear");
    this.clearButton.onclick = this.clearCanvas.bind(this);
    this.saveButton = document.querySelector("#save");
    this.saveButton.onclick = this.saveCanvas.bind(this);
  }
};

sketchpad.init();
