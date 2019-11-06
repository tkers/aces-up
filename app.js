const gb = new Gameboy();
const lcd = document.getElementById("lcd").getContext("2d");

gb.gpu.on("frame", img => {
  lcd.drawImage(img, 0, 0);
});

document.addEventListener("keydown", e => {
  gb.joypad.keyDown(e.keyCode);
});

document.addEventListener("keyup", e => {
  gb.joypad.keyUp(e.keyCode);
});

fetch(new Request("./aces-up.gb"))
  .then(res => res.arrayBuffer())
  .then(rom => {
    gb.loadCart(rom);
    gb.start();
  });
