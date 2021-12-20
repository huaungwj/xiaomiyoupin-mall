import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import qr from 'qr.js';

function getBackingStorePixelRatio(ctx) {
  return (
    ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio ||
    1
  );
}

let getDOMNode;
if (/^0\.14/.test(React.version)) {
  getDOMNode = function (ref) {
    return ref;
  };
} else {
  getDOMNode = function (ref) {
    return ReactDOM.findDOMNode(ref);
  };
}

class QrCode extends React.Component {
  shouldComponentUpdate(nextProps) {
    const that = this;
    if (QrCode.propTypes != 'object') return false;
    return Object.keys(QrCode.propTypes).some(function (k) {
      return that.props[k] !== nextProps[k];
    });
  }

  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  utf16to8(str) {
    let out, i, len, c;
    out = '';
    len = str.length;
    for (i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if (c >= 0x0001 && c <= 0x007f) {
        out += str.charAt(i);
      } else if (c > 0x07ff) {
        out += String.fromCharCode(0xe0 | ((c >> 12) & 0x0f));
        out += String.fromCharCode(0x80 | ((c >> 6) & 0x3f));
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
      } else {
        out += String.fromCharCode(0xc0 | ((c >> 6) & 0x1f));
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
      }
    }
    return out;
  }

  update() {
    const value = this.utf16to8(this.props.value);
    const qrcode = qr(value);
    const canvas = getDOMNode(this.refs.canvas);

    const ctx = canvas.getContext('2d');
    const cells = qrcode.modules;
    const tileW = this.props.size / cells.length;
    const tileH = this.props.size / cells.length;
    const scale =
      (window.devicePixelRatio || 1) / getBackingStorePixelRatio(ctx);
    canvas.height = canvas.width = this.props.size * scale;
    ctx.scale(scale, scale);

    cells.forEach(function (row, rdx) {
      row.forEach(function (cell, cdx) {
        ctx.fillStyle = cell ? this.props.fgColor : this.props.bgColor;
        const w = Math.ceil((cdx + 1) * tileW) - Math.floor(cdx * tileW);
        const h = Math.ceil((rdx + 1) * tileH) - Math.floor(rdx * tileH);
        ctx.fillRect(Math.round(cdx * tileW), Math.round(rdx * tileH), w, h);
      }, this);
    }, this);

    if (this.props.logo) {
      const self = this;
      const size = this.props.size;
      const image = document.createElement('img');
      image.src = this.props.logo;
      image.onload = function () {
        const dwidth = self.props.logoWidth || size * 0.2;
        const dheight =
          self.props.logoHeight || (image.height / image.width) * dwidth;
        const dx = (size - dwidth) / 2;
        const dy = (size - dheight) / 2;
        image.width = dwidth;
        image.height = dheight;
        ctx.drawImage(image, dx, dy, dwidth, dheight);
      };
    }
  }

  render() {
    return React.createElement('canvas', {
      style: { height: this.props.size, width: this.props.size },
      height: this.props.size,
      width: this.props.size,
      ref: 'canvas',
    });
  }
}

QrCode.propTypes = {
  value: PropTypes.string.isRequired,
  size: PropTypes.number,
  bgColor: PropTypes.string,
  fgColor: PropTypes.string,
  logo: PropTypes.string,
  logoWidth: PropTypes.number,
  logoHeight: PropTypes.number,
};

QrCode.defaultProps = {
  size: 128,
  bgColor: '#FFFFFF',
  fgColor: '#000000',
  value: 'http://facebook.github.io/react/',
};

export default QrCode;
