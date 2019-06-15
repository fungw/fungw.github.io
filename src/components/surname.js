import React from "react"

export default class Surname extends React.Component {
  constructor() {
    super();
    
    this._containerHeight = 4000;
    this._height = 0;
    this.letters = document.getElementsByTagName('span');
    this._movingElements = [];
    this._scrollHeight = 0;
    this._scrollPercent = 0;
    this._width = 0;

    // find prefix
    this.pre = this.prefix();
    this._jsPrefix  = this.pre.lowercase;
    if(this._jsPrefix === 'moz') this._jsPrefix = 'Moz'
    this._cssPrefix = this.pre.css;
  }

  componentDidMount() {
    this.resize();
    this.loop();
    window.addEventListener('resize', this.resize);
  }

  render() {
    return (
      <div id="surname-container">
        <h1>{this.props.title}</h1>
      </div>
    )
  }

  resize() {
    this._width = window.innerWidth;
    this._height = window.innerHeight;
    this._scrollHeight = this._containerHeight-this._height;
  }

  rotateLetters() {
    for (var i = 0; i < this.letters.length; i++) {
      this.letters[i].style[this._jsPrefix+'Transform'] = 'translate(-'+(this._scrollPercent*4000)+'px)'
    }
  }

  loop() {
    var _scrollOffset = window.pageYOffset || window.scrollTop || 0;
    this._scrollPercent = _scrollOffset/this._scrollHeight || 0;
    this.rotateLetters();
    
    requestAnimationFrame(this.loop.bind(this));
  }

  /* prefix detection http://davidwalsh.name/vendor-prefix */
  prefix() {
    var styles = window.getComputedStyle(document.documentElement, ''),
      pre = (Array.prototype.slice
        .call(styles)
        .join('') 
        .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
      )[1],
      dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
    return {
      dom: dom,
      lowercase: pre,
      css: '-' + pre + '-',
      js: pre[0].toUpperCase() + pre.substr(1)
    };
  }
}
