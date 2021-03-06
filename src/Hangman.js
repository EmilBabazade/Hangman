import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import randomWord from "./words";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
    imageAlts: ['0/6', '1/6', '2/6', '3/6', '4/6', '5/6', '6/6']
  };

  constructor(props) {
    super(props);
    this.state = { 
      nWrong: 0, 
      guessed: new Set(), 
      answer: randomWord() 
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.restart = this.restart.bind(this);
  }

  restart() {
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord()
    });
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    if(this.state.nWrong === this.props.maxWrong) return;
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  /** render: render game */
  render() {
    const {nWrong, answer} = this.state;
    const {maxWrong, images, imageAlts} = this.props;
    const guessedWord = this.guessedWord();
    let endgame = <p className='Hangman-btns'>{this.generateButtons()}</p>;
    if(nWrong === maxWrong) endgame = <p className="Hangman-word">You Lose!</p>;
    if(guessedWord.join('') === answer && nWrong < maxWrong)
      endgame = <p className="Hangman-word">You Win!</p>;
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={images[nWrong]} alt={imageAlts[nWrong]} />
        {nWrong > 0 && <p className='Hangman-word'>Number wrong: {nWrong}</p> }
        {
          nWrong === maxWrong
            ? <p className='Hangman-word'>{this.state.answer}</p>
            : <p className='Hangman-word'>{guessedWord}</p>
        }
        { endgame }
        <button onClick={this.restart} style={{
          width: 'auto',
          marginRight: '-70px'
        }}>Restart</button>
      </div>
    );
  }
}

export default Hangman;
