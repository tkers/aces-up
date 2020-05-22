const gb = new Gameboy();

// Keyboard input
document.addEventListener("keydown", e => {
  gb.joypad.keyDown(e.keyCode);
});

document.addEventListener("keyup", e => {
  gb.joypad.keyUp(e.keyCode);
});

// Virtual button input
const registerVirtualKey = (id, keyCode) => {
  const elem = document.getElementById(id);
  elem.addEventListener("touchstart", e => {
    e.preventDefault();
    gb.joypad.keyDown(keyCode);
  });
  elem.addEventListener("touchend", e => {
    e.preventDefault();
    gb.joypad.keyUp(keyCode);
  });
};

registerVirtualKey("k-up", 38);
registerVirtualKey("k-down", 40);
registerVirtualKey("k-left", 37);
registerVirtualKey("k-right", 39);
registerVirtualKey("k-a", 90);
registerVirtualKey("k-b", 88);
registerVirtualKey("k-start", 13);
registerVirtualKey("k-select", 16);

// Rendering
const lcd = document.getElementById("lcd").getContext("2d");
gb.gpu.on("frame", img => {
  lcd.drawImage(img, 0, 0);
});

// Load the ROM
fetch(new Request("./aces-up.gb"))
  .then(res => res.arrayBuffer())
  .then(rom => {
    gb.loadCart(rom);
    gb.start();
  });
