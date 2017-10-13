class Flip {
  constructor(id, debug) {
    this.id = id;
  }

  first(element, options) {
    if (process.env.NODE_ENV === "development" && !element) {
      throw new Error("An element should be passed to `flip.last()`");
    }
    this._first = options.getElementStyle(element);
    if (process.env.NODE_ENV === "development" && this.debug) {
      console.debug(this.id, this._first);
    }
  }

  isReady() {
    return !!this._first;
  }

  last(element, options) {
    if (process.env.NODE_ENV === "development" && !element) {
      throw new Error("An element should be passed to `flip.last()`");
    }
    this._last = options.getElementStyle(element);
    if (process.env.NODE_ENV === "development" && this.debug) {
      console.debug(this.id, this._last);
    }
  }

  invert(element, options) {
    if (!this._first || !this._last) {
      if (process.env.NODE_ENV === "development" && this.debug) {
        console.warn(
          this.options.id,
          "Make sure to call `flip.first()` and `flip.last()` before calling `flip.invert()`"
        );
      }
      return;
    }

    this._invert = {
      translateX: 0,
      translateY: 0,
      scaleX: 0,
      scaleY: 0,
      opacity: 0
    };

    if (options.updateTranslate) {
      this._invert.translateX =
        this._first.left - this._last.left - this._last.translateX;
      this._invert.translateY =
        this._first.top - this._last.top - this._last.translateY;
    }
    if (options.updateScale) {
      if (
        this._first.width / this._first.scaleX ===
        this._last.width / this._last.scaleX
      ) {
        this._invert.scaleX = this._first.scaleX - this._last.scaleX;
      } else {
        this._invert.scaleX =
          -this._first.width / this._last.width + this._last.scaleX;
      }

      if (
        this._first.height / this._first.scaleY ===
        this._last.height / this._last.scaleY
      ) {
        this._invert.scaleY = this._first.scaleY - this._last.scaleY;
      } else {
        this._invert.scaleY =
          -this._first.height / this._last.height + this._last.scaleY;
      }
    }

    if (options.updateOpacity) {
      this._invert.opacity = this._first.opacity - this._last.opacity;
    }

    if (
      this._invert.translateX === 0 &&
      this._invert.translateY === 0 &&
      this._invert.scaleX === 1 &&
      this._invert.scaleY === 1 &&
      this._invert.opacity === 0
    ) {
      if (process.env.NODE_ENV === "development" && this.debug) {
        console.warn(this.id, "Nothing to animate", element);
      }
      this.resetStyle(element);
      return;
    }

    this.updateStyle(element, 0);
    element.style.zIndex = Math.max(this._first.zIndex, this._last.zIndex);
    element.style.transformOrigin = "0 0";
    element.style.willChange = "transform, opacity";
    if (process.env.NODE_ENV === "development" && this.debug) {
      console.debug(this.id, "Ready to animate", this._invert);
    }

    return true;
  }

  play(element, options) {
    if (!this._invert) {
      if (process.env.NODE_ENV === "development" && this.debug) {
        console.warn(
          this.id,
          "Make sure to call `flip.invert()` before calling `flip.play()`"
        );
      }
      return Promise.reject(
        "Make sure to call `flip.invert()` before calling `flip.play()`"
      );
    }

    this._start =
      window.performance.now() + options.delay * options.durationMultiplier;

    const promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });

    if (process.env.NODE_ENV === "development" && this.debug) {
      console.debug(this.id, "Starting animation at", this._start);
    }
    window.requestAnimationFrame(this.animate.bind(this, element, options));

    return promise;
  }

  animate(element, options) {
    const end = window.performance.now();
    let time =
      (end - this._start) / (options.duration * options.durationMultiplier);
    time = Math.min(1, Math.max(0, time));

    if (!this._invert) {
      this.resetStyle(element);
      return;
    }
    this.updateStyle(element, options.easing(time));

    if (time < 1) {
      window.requestAnimationFrame(this.animate.bind(this, element, options));
    } else {
      if (process.env.NODE_ENV === "development" && this.debug) {
        console.debug(this.id, "Ending animation at", end);
        console.debug(this.id, "Total duration:", end - this._start);
        console.debug(
          this.id,
          "Actual duration:",
          options.duration * options.durationMultiplier
        );
      }
      this.resetStyle(element);
    }
  }

  updateStyle(element, time) {
    const transform = {
      translateX: this._last.translateX + this._invert.translateX * (1 - time),
      translateY: this._last.translateY + this._invert.translateY * (1 - time),
      scaleX: this._last.scaleX + this._invert.scaleX * (1 - time),
      scaleY: this._last.scaleY + this._invert.scaleY * (1 - time),
      opacity: this._last.opacity + this._invert.opacity * (1 - time)
    };
    element.style.transform = `
      translate(${transform.translateX}px, ${transform.translateY}px)
      scale(${transform.scaleX}, ${transform.scaleY})
    `;
    element.style.opacity = transform.opacity;
  }

  resetStyle(element) {
    this._invert = null;
    element.style.transformOrigin = null;
    element.style.transform = null;
    element.style.opacity = null;
    element.style.willChange = null;
    element.style.zIndex = null;
    this.resolve && this.resolve();
  }
}

export default Flip;
