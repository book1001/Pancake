(function() {

  var sprite = document.querySelector('.sprite'),
    key = {left: false, right: false, up: false, down: false},
    transX = 0,
    transY = 0,
    property = getTransformProperty(sprite);

  function getTransformProperty(element) {
      var properties = [
          'transform',
          'WebkitTransform',
          'msTransform',
          'MozTransform',
          'OTransform'
      ];
      var p;
      while (p = properties.shift()) {
          if (typeof element.style[p] != 'undefined') {
              return p;
          }
      }
      return false;
  }

  function translate() {
    sprite.style[property] = 'translate(' + transX + 'px, ' + transY + 'px)';
  }

  function walk(e) {
    var keyCode = e.keyCode;
    if (keyCode === 39) {
      key.right = true;
    } 
    else if (keyCode === 37) {
      key.left = true;
      // console.log("ddd");
    }
    else if (keyCode === 38) {
      key.up = true;
    }
    else if (keyCode === 40) {
      key.down = true;
    }
    if (key.right === true) {
      transX += 10;
      translate();
      sprite.classList.remove('left');
      sprite.classList.remove('up');
      sprite.classList.remove('down');
      sprite.classList.add('right');
      sprite.classList.add('walk-right');
    } 
    else if (key.left === true) {
      transX -= 10;
      translate();
      sprite.classList.remove('right');
      sprite.classList.remove('up');
      sprite.classList.remove('down');
      sprite.classList.add('left');
      sprite.classList.add('walk-left');
    }
    else if (key.up === true) {
      transY -= 10;
      translate();
      sprite.classList.remove('left');
      sprite.classList.remove('right');
      sprite.classList.remove('down');
      sprite.classList.add('up');
      sprite.classList.add('walk-up');
    }
    else if (key.down === true) {
      transY += 10;
      translate();
      sprite.classList.remove('left');
      sprite.classList.remove('right');
      sprite.classList.remove('up');
      sprite.classList.add('down');
      sprite.classList.add('walk-down');
    }
  }

  function stop(e) {
    var keyCode = e.keyCode;
    if (keyCode === 39) {
      key.right = false;
    } 
    else if (keyCode === 37) {
      key.left = false;
    }
    else if (keyCode === 38) {
      key.up = false;
    }
    else if (keyCode === 40) {
      key.down = false;
    }
    if (key.right === false) {
      sprite.classList.remove('walk-right');
    } 
    if (key.left === false) {
      sprite.classList.remove('walk-left');
    }
    if (key.up === false) {
      sprite.classList.remove('walk-up');
    }
    if (key.down === false) {
      sprite.classList.remove('walk-down');
    }
  }

  document.addEventListener('keydown', walk, false);
  document.addEventListener('keyup', stop, false);

})();