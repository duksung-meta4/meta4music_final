// Note: In this script i'm using vars and not let/consts because we're
// re-evaling these values in the demo. You could totally use const
// everywhere instead.

// These are all variables used in the demos.
import {saveAs} from 'file-saver';

// 동요 6곡 변수 선언
var YOGI, ZOO, ELEPHANT, WHITE_COUNTRY, SNOW, PIG;

// 키워드 입력값
// var keyword;

// var player, visualizer, viz, vizPLayer;
var music_rnn, rnnPlayer;
createSampleSequences();
//createSamplePlayers();
setupMusicRNN();
//setupMusicVAE();

// CodeMirrorify all the code snippets.
//const codeMirrorSamples = {};
//doTheCodeMirrors();

function createSampleSequences() {
  // 동요 5곡 sequences

  YOGI = {
    notes: [
      { pitch: 64, startTime: 0.0, endTime: 1.0 },
      { pitch: 67, startTime: 1.0, endTime: 2.0 },
      { pitch: 65, startTime: 2.0, endTime: 2.5 },
      { pitch: 64, startTime: 2.5, endTime: 3.0 },
      { pitch: 62, startTime: 3.0, endTime: 3.5 },
      { pitch: 60, startTime: 3.5, endTime: 4.0 },
      { pitch: 69, startTime: 4.0, endTime: 6.0 },
      { pitch: 67, startTime: 6.0, endTime: 7.0 },

      { pitch: 64, startTime: 7.0, endTime: 8.0 },
      { pitch: 67, startTime: 8.0, endTime: 9.0 },
      { pitch: 65, startTime: 9.0, endTime: 9.5 },
      { pitch: 64, startTime: 9.5, endTime: 10.0 },
      { pitch: 62, startTime: 10.0, endTime: 10.5 },
      { pitch: 60, startTime: 10.5, endTime: 11.0 },
      { pitch: 62, startTime: 11.0, endTime: 13.0 },
      { pitch: 62, startTime: 13.0, endTime: 14.0 },

      { pitch: 64, startTime: 14.0, endTime: 15.0 },
      { pitch: 67, startTime: 15.0, endTime: 16.0 },
      { pitch: 65, startTime: 16.0, endTime: 17.5 },
      { pitch: 64, startTime: 17.5, endTime: 18.0 },
      { pitch: 62, startTime: 18.0, endTime: 18.5 },
      { pitch: 60, startTime: 18.5, endTime: 19.0 },
      { pitch: 69, startTime: 19.0, endTime: 21.0 },
      { pitch: 72, startTime: 21.0, endTime: 22.0 },

      { pitch: 71, startTime: 22.0, endTime: 22.5 },
      { pitch: 69, startTime: 22.5, endTime: 23.0 },
      { pitch: 67, startTime: 23.0, endTime: 23.5 },
      { pitch: 65, startTime: 23.5, endTime: 24.0 },
      { pitch: 64, startTime: 24.0, endTime: 25.0 },
      { pitch: 62, startTime: 25.0, endTime: 26.0 },
      { pitch: 60, startTime: 26.0, endTime: 28.0 },
    ],
    tempos: [
      {
        time: 0,
        qpm: 120,
      },
    ],
    totalTime: 28,
  };

  ZOO = {
    notes: [
      { pitch: 64, startTime: 0.0, endTime: 0.5 },
      { pitch: 67, startTime: 0.5, endTime: 1.5 },
      { pitch: 64, startTime: 1.5, endTime: 2.0 },
      { pitch: 67, startTime: 2.0, endTime: 4.0 },
      { pitch: 60, startTime: 4.0, endTime: 5.0 },
      { pitch: 60, startTime: 5.0, endTime: 6.0 },
      { pitch: 60, startTime: 6.0, endTime: 7.0 },

      { pitch: 64, startTime: 7.0, endTime: 7.5 },
      { pitch: 67, startTime: 7.5, endTime: 8.5 },
      { pitch: 64, startTime: 8.5, endTime: 9.0 },
      { pitch: 67, startTime: 9.0, endTime: 11.0 },
      { pitch: 62, startTime: 11.0, endTime: 12.0 },
      { pitch: 62, startTime: 12.0, endTime: 13.0 },
      { pitch: 62, startTime: 13.0, endTime: 15.0 },

      { pitch: 64, startTime: 15.0, endTime: 15.5 },
      { pitch: 67, startTime: 15.5, endTime: 16.5 },
      { pitch: 64, startTime: 16.5, endTime: 17.0 },
      { pitch: 67, startTime: 17.0, endTime: 19.0 },
      { pitch: 65, startTime: 19.0, endTime: 20.0 },
      { pitch: 65, startTime: 20.0, endTime: 21.0 },
      { pitch: 65, startTime: 21.0, endTime: 22.0 },
      { pitch: 65, startTime: 22.0, endTime: 22.5 },
      { pitch: 65, startTime: 22.5, endTime: 23.0 },

      { pitch: 64, startTime: 23.0, endTime: 24.0 },
      { pitch: 64, startTime: 24.0, endTime: 25.0 },
      { pitch: 62, startTime: 25.0, endTime: 26.0 },
      { pitch: 62, startTime: 26.0, endTime: 27.0 },
      { pitch: 60, startTime: 27.0, endTime: 29.5 },

      { pitch: 65, startTime: 29.5, endTime: 31.5 },
      { pitch: 69, startTime: 31.5, endTime: 33.5 },
      { pitch: 67, startTime: 33.5, endTime: 34.0 },
      { pitch: 69, startTime: 34.0, endTime: 34.5 },
      { pitch: 67, startTime: 34.5, endTime: 35.0 },
      { pitch: 64, startTime: 35.0, endTime: 37.5 },

      { pitch: 65, startTime: 37.5, endTime: 38.0 },
      { pitch: 64, startTime: 38.0, endTime: 38.5 },
      { pitch: 62, startTime: 38.5, endTime: 39.0 },
      { pitch: 64, startTime: 39.0, endTime: 39.5 },
      { pitch: 65, startTime: 39.5, endTime: 41.0 },
      { pitch: 62, startTime: 41.0, endTime: 41.5 },
      { pitch: 64, startTime: 41.0, endTime: 41.5 },
      { pitch: 62, startTime: 41.5, endTime: 42.0 },
      { pitch: 64, startTime: 42.0, endTime: 42.5 },
      { pitch: 67, startTime: 42.5, endTime: 45.0 },

      { pitch: 69, startTime: 45.0, endTime: 45.5 },
      { pitch: 69, startTime: 45.5, endTime: 46.0 },
      { pitch: 69, startTime: 46.0, endTime: 46.5 },
      { pitch: 69, startTime: 46.5, endTime: 47.0 },
      { pitch: 69, startTime: 47.0, endTime: 48.0 },
      { pitch: 72, startTime: 48.0, endTime: 48.5 },
      { pitch: 72, startTime: 48.5, endTime: 49.0 },
      { pitch: 67, startTime: 49.0, endTime: 50.0 },
      { pitch: 67, startTime: 50.0, endTime: 51.0 },

      { pitch: 72, startTime: 51.0, endTime: 51.5 },
      { pitch: 72, startTime: 51.5, endTime: 52.0 },
    ],
    tempos: [
      {
        time: 0,
        qpm: 120,
      },
    ],
    totalTime: 52,
  };

  ELEPHANT = {
    notes: [
      { pitch: 62, startTime: 0.0, endTime: 1.0 },
      { pitch: 71, startTime: 1.0, endTime: 1.5 },
      { pitch: 71, startTime: 1.5, endTime: 2.0 },
      { pitch: 69, startTime: 2.0, endTime: 2.5 },
      { pitch: 67, startTime: 2.5, endTime: 3.0 },
      { pitch: 64, startTime: 3.0, endTime: 3.5 },
      { pitch: 62, startTime: 3.5, endTime: 4.0 },

      { pitch: 59, startTime: 4.0, endTime: 4.75 },
      { pitch: 59, startTime: 4.75, endTime: 5.0 },
      { pitch: 62, startTime: 5.0, endTime: 5.5 },
      { pitch: 64, startTime: 5.5, endTime: 6.0 },
      { pitch: 62, startTime: 6.0, endTime: 7.5 },

      { pitch: 67, startTime: 7.5, endTime: 8.5 },
      { pitch: 64, startTime: 8.5, endTime: 9.0 },
      { pitch: 62, startTime: 9.0, endTime: 9.5 },
      { pitch: 67, startTime: 9.5, endTime: 10.0 },
      { pitch: 69, startTime: 10.0, endTime: 10.5 },
      { pitch: 71, startTime: 10.5, endTime: 11.5 },

      { pitch: 74, startTime: 11.5, endTime: 12.25 },
      { pitch: 71, startTime: 12.25, endTime: 12.5 },
      { pitch: 69, startTime: 12.5, endTime: 13.0 },
      { pitch: 62, startTime: 13.0, endTime: 13.5 },
      { pitch: 67, startTime: 13.5, endTime: 15.0 },
    ],
    tempos: [
      {
        time: 0,
        qpm: 120,
      },
    ],
    totalTime: 15,
  };

  WHITE_COUNTRY = {
    notes: [
      { pitch: 60, startTime: 0.0, endTime: 0.5 },
      { pitch: 60, startTime: 0.5, endTime: 1.0 },
      { pitch: 60, startTime: 1.0, endTime: 1.5 },
      { pitch: 62, startTime: 1.5, endTime: 2.0 },
      { pitch: 64, startTime: 2.0, endTime: 3.0 },
      { pitch: 60, startTime: 3.0, endTime: 4.0 },
      { pitch: 62, startTime: 4.0, endTime: 6.5 },

      { pitch: 62, startTime: 7.5, endTime: 8.0 },
      { pitch: 62, startTime: 8.0, endTime: 8.5 },
      { pitch: 62, startTime: 8.5, endTime: 9.0 },
      { pitch: 64, startTime: 9.0, endTime: 9.5 },
      { pitch: 65, startTime: 9.5, endTime: 10.5 },
      { pitch: 62, startTime: 10.5, endTime: 11.5 },
      { pitch: 64, startTime: 11.5, endTime: 14.0 },

      { pitch: 64, startTime: 15.0, endTime: 15.5 },
      { pitch: 64, startTime: 15.5, endTime: 16.0 },
      { pitch: 64, startTime: 16.0, endTime: 16.5 },
      { pitch: 64, startTime: 16.5, endTime: 17.0 },
      { pitch: 64, startTime: 17.0, endTime: 18.0 },
      { pitch: 67, startTime: 18.0, endTime: 19.0 },

      { pitch: 65, startTime: 19.0, endTime: 19.5 },
      { pitch: 65, startTime: 19.5, endTime: 20.0 },
      { pitch: 65, startTime: 20.0, endTime: 20.5 },
      { pitch: 65, startTime: 20.5, endTime: 21.0 },
      { pitch: 65, startTime: 21.0, endTime: 22.0 },
      { pitch: 69, startTime: 22.0, endTime: 23.0 },

      { pitch: 67, startTime: 23.0, endTime: 23.5 },
      { pitch: 67, startTime: 23.5, endTime: 24.5 },
      { pitch: 67, startTime: 24.5, endTime: 25.0 },
      { pitch: 65, startTime: 25.0, endTime: 26.0 },
      { pitch: 62, startTime: 26.0, endTime: 27.0 },
      { pitch: 60, startTime: 27.0, endTime: 29.5 },

      { pitch: 62, startTime: 29.5, endTime: 30.0 },
      { pitch: 62, startTime: 30.0, endTime: 30.5 },
      { pitch: 62, startTime: 30.5, endTime: 31.0 },
      { pitch: 62, startTime: 31.5, endTime: 32.0 },
      { pitch: 62, startTime: 32.0, endTime: 34.0 },

      { pitch: 64, startTime: 34.0, endTime: 34.5 },
      { pitch: 64, startTime: 34.5, endTime: 35.0 },
      { pitch: 64, startTime: 35.0, endTime: 35.5 },
      { pitch: 64, startTime: 35.5, endTime: 36.0 },
      { pitch: 64, startTime: 36.0, endTime: 38.0 },

      { pitch: 65, startTime: 38.0, endTime: 38.5 },
      { pitch: 65, startTime: 38.5, endTime: 39.5 },
      { pitch: 65, startTime: 39.5, endTime: 40.0 },
      { pitch: 65, startTime: 40.0, endTime: 40.5 },
      { pitch: 64, startTime: 40.5, endTime: 41.0 },
      { pitch: 62, startTime: 41.0, endTime: 41.5 },
      { pitch: 62, startTime: 41.5, endTime: 42.0 },
      { pitch: 64, startTime: 42.0, endTime: 42.5 },
      { pitch: 64, startTime: 42.5, endTime: 43.0 },
      { pitch: 69, startTime: 43.0, endTime: 44.0 },
      { pitch: 67, startTime: 44.0, endTime: 46.0 },
    ],
    tempos: [
      {
        time: 0,
        qpm: 120,
      },
    ],
    totalTime: 46,
  };

  SNOW = {
    notes: [
      { pitch: 62, startTime: 0.0, endTime: 0.5 },
      { pitch: 65, startTime: 0.5, endTime: 1.0 },
      { pitch: 69, startTime: 1.0, endTime: 1.5 },
      { pitch: 70, startTime: 1.5, endTime: 2.5 },
      { pitch: 67, startTime: 2.5, endTime: 3.0 },
      { pitch: 69, startTime: 3.0, endTime: 4.0 },
      { pitch: 69, startTime: 4.0, endTime: 4.5 },
      { pitch: 65, startTime: 4.5, endTime: 6.0 },

      { pitch: 62, startTime: 6.0, endTime: 6.5 },
      { pitch: 65, startTime: 6.5, endTime: 7.0 },
      { pitch: 69, startTime: 7.0, endTime: 7.5 },
      { pitch: 70, startTime: 7.5, endTime: 8.5 },
      { pitch: 67, startTime: 8.5, endTime: 9.0 },
      { pitch: 69, startTime: 9.0, endTime: 11.5 },

      { pitch: 74, startTime: 12.0, endTime: 13.0 },
      { pitch: 74, startTime: 13.0, endTime: 13.5 },
      { pitch: 72, startTime: 13.5, endTime: 14.5 },
      { pitch: 65, startTime: 14.5, endTime: 15.0 },

      { pitch: 70, startTime: 15.0, endTime: 16.0 },
      { pitch: 70, startTime: 16.0, endTime: 16.5 },
      { pitch: 69, startTime: 16.5, endTime: 18.0 },

      { pitch: 62, startTime: 18.0, endTime: 18.5 },
      { pitch: 64, startTime: 18.5, endTime: 19.0 },
      { pitch: 65, startTime: 19.0, endTime: 19.5 },
      { pitch: 65, startTime: 19.5, endTime: 20.5 },
      { pitch: 64, startTime: 20.5, endTime: 21.0 },
      { pitch: 62, startTime: 21.0, endTime: 23.5 },
    ],
    tempos: [
      {
        time: 0,
        qpm: 120,
      },
    ],
    totalTime: 23.5,
  };

  PIG = {
    notes: [
      { pitch: 69, startTime: 0.0, endTime: 0.5 },
      { pitch: 69, startTime: 0.5, endTime: 1.0 },
      { pitch: 69, startTime: 1.0, endTime: 1.5 },
      { pitch: 69, startTime: 1.5, endTime: 2.0 },
      { pitch: 69, startTime: 2.0, endTime: 3.0 },
      { pitch: 71, startTime: 3.0, endTime: 3.5 },

      { pitch: 69, startTime: 4.0, endTime: 5.0 },
      { pitch: 67, startTime: 5.0, endTime: 6.0 },
      { pitch: 66, startTime: 6.0, endTime: 7.0 },

      { pitch: 67, startTime: 8.0, endTime: 8.5 },
      { pitch: 67, startTime: 8.5, endTime: 9.0 },
      { pitch: 67, startTime: 9.0, endTime: 9.5 },
      { pitch: 69, startTime: 9.5, endTime: 10.0 },
      { pitch: 67, startTime: 10.0, endTime: 10.5 },
      { pitch: 66, startTime: 11.0, endTime: 11.5 },
      { pitch: 64, startTime: 12.0, endTime: 14.0 },

      { pitch: 69, startTime: 16.0, endTime: 16.5 },
      { pitch: 69, startTime: 16.5, endTime: 17.0 },
      { pitch: 69, startTime: 17.0, endTime: 17.5 },
      { pitch: 69, startTime: 17.5, endTime: 18.0 },
      { pitch: 69, startTime: 18.0, endTime: 19.0 },
      { pitch: 71, startTime: 19.0, endTime: 19.5 },

      { pitch: 69, startTime: 20.0, endTime: 21.0 },
      { pitch: 67, startTime: 21.0, endTime: 22.0 },
      { pitch: 66, startTime: 22.0, endTime: 23.0 },

      { pitch: 64, startTime: 24.0, endTime: 24.5 },
      { pitch: 64, startTime: 24.5, endTime: 25.0 },
      { pitch: 64, startTime: 25.0, endTime: 25.5 },
      { pitch: 67, startTime: 25.5, endTime: 26.0 },
      { pitch: 66, startTime: 26.0, endTime: 26.5 },
      { pitch: 64, startTime: 27.0, endTime: 27.5 },
      { pitch: 62, startTime: 27.5, endTime: 29.5 },

      { pitch: 69, startTime: 31.5, endTime: 32.0 },
      { pitch: 69, startTime: 32.5, endTime: 33.0 },
      { pitch: 57, startTime: 33.5, endTime: 34.0 },
      { pitch: 57, startTime: 34.5, endTime: 35.0 },

      { pitch: 69, startTime: 35.0, endTime: 35.5 },
      { pitch: 69, startTime: 36.0, endTime: 36.5 },
      { pitch: 57, startTime: 37.0, endTime: 37.5 },
      { pitch: 57, startTime: 38.0, endTime: 38.5 },

      { pitch: 69, startTime: 39.0, endTime: 39.5 },
      { pitch: 69, startTime: 39.5, endTime: 40.0 },
      { pitch: 69, startTime: 40.0, endTime: 40.5 },
      { pitch: 69, startTime: 40.5, endTime: 41.0 },
      { pitch: 57, startTime: 41.0, endTime: 41.5 },
      { pitch: 57, startTime: 41.5, endTime: 42.0 },
      { pitch: 57, startTime: 42.0, endTime: 42.5 },
      { pitch: 57, startTime: 42.5, endTime: 43.0 },

      { pitch: 69, startTime: 43.0, endTime: 43.5 },
      { pitch: 69, startTime: 43.5, endTime: 44.0 },
      { pitch: 69, startTime: 44.0, endTime: 44.5 },
      { pitch: 69, startTime: 44.5, endTime: 45.0 },
      { pitch: 69, startTime: 45.0, endTime: 45.5 },

      { pitch: 69, startTime: 47.0, endTime: 47.5 },
      { pitch: 69, startTime: 47.5, endTime: 48.0 },
      { pitch: 69, startTime: 48.0, endTime: 48.5 },
      { pitch: 69, startTime: 48.5, endTime: 49.0 },
      { pitch: 69, startTime: 49.0, endTime: 50.0 },
      { pitch: 71, startTime: 50.0, endTime: 50.5 },

      { pitch: 69, startTime: 51.0, endTime: 52.0 },
      { pitch: 67, startTime: 52.0, endTime: 53.0 },
      { pitch: 66, startTime: 53.0, endTime: 54.0 },

      { pitch: 67, startTime: 55.0, endTime: 55.5 },
      { pitch: 67, startTime: 55.5, endTime: 56.0 },
      { pitch: 67, startTime: 56.0, endTime: 56.5 },
      { pitch: 69, startTime: 56.5, endTime: 57.0 },
      { pitch: 67, startTime: 57.0, endTime: 57.5 },
      { pitch: 66, startTime: 58.0, endTime: 58.5 },
      { pitch: 64, startTime: 59.0, endTime: 61.0 },

      { pitch: 69, startTime: 63.0, endTime: 63.5 },
      { pitch: 69, startTime: 63.5, endTime: 64.0 },
      { pitch: 69, startTime: 64.0, endTime: 64.5 },
      { pitch: 69, startTime: 64.5, endTime: 65.0 },
      { pitch: 69, startTime: 65.0, endTime: 66.0 },
      { pitch: 71, startTime: 66.0, endTime: 66.5 },

      { pitch: 69, startTime: 67.0, endTime: 68.0 },
      { pitch: 67, startTime: 68.0, endTime: 69.0 },
      { pitch: 66, startTime: 69.0, endTime: 70.0 },

      { pitch: 64, startTime: 71.0, endTime: 71.5 },
      { pitch: 64, startTime: 71.5, endTime: 72.0 },
      { pitch: 64, startTime: 72.0, endTime: 72.5 },
      { pitch: 67, startTime: 72.5, endTime: 73.0 },
      { pitch: 66, startTime: 73.0, endTime: 73.5 },
      { pitch: 64, startTime: 74.0, endTime: 74.5 },
      { pitch: 62, startTime: 75.0, endTime: 77.0 },
    ],
    tempos: [
      {
        time: 0,
        qpm: 100, // 노래 템포
      },
    ],
    totalTime: 77,
  };
}

/*
// 동요 5곡 pitch 재생 함수
function createSamplePlayers() {
  // A plain NoteSequence player
  player = new mm.Player();
  // A Visualizer
  viz = new mm.Visualizer(PIG, document.getElementById('canvas2'));
  visualizer = new mm.Visualizer(PIG, document.getElementById('canvas'));
  // This player calls back two functions: 
  // - run, after a note is played. This is where we update the visualizer.
  // - stop, when it is done playing the note sequence.
  vizPlayer = new mm.Player(false, {
    run: (note) => viz.redraw(note),
    stop: () => {}
  });
}
*/
// 생성할 곡의 길이
var rnn_steps = 100; // How many steps to continue.

// 작곡될 음들의 기존 입력값 연관도 (값이 높을수록 랜덤한 값 생성됨)
var rnn_temperature = 1.3;

// MusicRNN에 대한 셋팅 함수
function setupMusicRNN() {
  // Initialize model
  music_rnn = new mm.MusicRNN(
    "https://storage.googleapis.com/magentadata/js/checkpoints/music_rnn/melody_rnn"
  );
  music_rnn.initialize();

  // Create a player to play the sampled sequence.  // 피아노 음으로 재생
  rnnPlayer = new mm.SoundFontPlayer(
    "https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus"
  );
}

// 설정한 모델로 작곡하는 함수
function playRNN(event) {
  if (rnnPlayer.isPlaying()) {
    rnnPlayer.stop();
    event.target.textContent = "Play";
    return;
  } else {
    event.target.textContent = "Stop";
  }
  // The model expects a quantized sequence, and ours was unquantized:
  const qns = mm.sequences.quantizeNoteSequence(PIG, 4);

    
  music_rnn
    .continueSequence(qns, rnn_steps, rnn_temperature)
    .then((sample) => rnnPlayer.start(sample));
}

/*
vae_temperature = 1.5;
function setupMusicVAE() {
  // Initialize model.
  music_vae = new mm.MusicVAE('https://storage.googleapis.com/magentadata/js/checkpoints/music_vae/mel_4bar_small_q2');
  music_vae.initialize();
  
  // Create a player to play the sampled sequence.
  vaePlayer = new mm.Player();
}*/
/*
function playVAE(event) {
  if (vaePlayer.isPlaying()) {
    vaePlayer.stop();
    event.target.textContent = 'Play';
    return;
  } else {
    event.target.textContent = 'Stop';
  }
  music_vae
  .sample(1, vae_temperature)
  .then((sample) => vaePlayer.start(sample[0]));
}
function playInterpolation() {
  if (vaePlayer.isPlaying()) {
    vaePlayer.stop();
    return;
  }
  // Music VAE requires quantized melodies, so quantize them first.
  const star = mm.sequences.quantizeNoteSequence(YOGI, 4);
  
  music_vae
  .interpolate([star, LITTLE_TEAPOT], 3 )
  .then((sample) => {
    const concatenated = mm.sequences.concatenate(sample);
    vaePlayer.start(concatenated);
  });
}*/
/*
// 재생, 정지 버튼 함수
function startOrStop(event, p, seq = PIG) {
  if (p.isPlaying()) {
    p.stop();
    event.target.textContent = 'Play';
  } else {
    p.start(seq).then(() => {
      // Stop all buttons.
      const btns = document.querySelectorAll('.controls > button');
      for (let btn of btns) {
        btn.textContent = 'Play';
      }
    });
    event.target.textContent = 'Stop';
  }
}*/

/*
function doTheCodeMirrors() {
  const codeMirrorConfig = {
    theme:'dracula',
    tabSize: 2,
    indentUnit: 2,
    lineNumbers: false,
    viewportMargin: Infinity,
  };
  
  // Make an editable code mirror for the code snippets.
  const samples = document.querySelectorAll('textarea.sample');
  
  for (let i = 0; i < samples.length; i++) {
    samples[i].value = samples[i].value.trim();
    
    codeMirrorConfig.readOnly = !samples[i].hasAttribute('editable');
    codeMirrorConfig.mode = samples[i].getAttribute('mode');
    
    const sample = CodeMirror.fromTextArea(samples[i], codeMirrorConfig);
    codeMirrorSamples[samples[i]] = sample;
    sample.on('change', (block) => {
      player.stop();
      runSnippet(block.getValue());
    });
  }
}
function runSnippet(value) {
  try {
    window.eval(value);
  } catch (e) {
    console.log(e);
  }
}*/
