/**
 * 文字转语音，利用H5的新特性SpeechSynthesisUtterance，speechSynthesis实现
 * eg.
 *    const speaker = new Speaker({ text: '这是一条神奇的天路啊' });
 *    speaker.start(); // 开时播放
 *    setTimeout(() => { speaker.pause(); }, 1000); // 一秒钟之后暂停，根据实际情况来
 *    setTimeout(() => { speaker.resume(); }, 2000); // 两秒秒钟之后暂停，根据实际情况来
 *    setTimeout(() => { speaker.change('我坐上火车就去拉萨，去看那神奇的唐古拉。'); }, 3000); // 三秒钟之后切换内容，根据实际情况来
 *    setTimeout(() => { speaker.cancel(); }, 10000); // 十秒钟之后暂停，根据实际情况来
 */
class Speaker {

  constructor(option) {
    const {
      lang = 'zh-CN',
      pitch = 1,
      rate = 1,
      volume = 1,
      text = ''
    } = option;
    this.utter = new window.SpeechSynthesisUtterance();
    this.utter.lang = lang; // 设置语言环境
    this.utter.pitch = pitch; // 设置语音的音调，默认为1
    this.utter.rate = rate; // 设置语音的语速，默认为1
    this.utter.volume = volume; // 设置语音的音量，0-1之间
    this.utter.text = text;
    this.getVoices(); // 获取所有声音的集合
  }

  // 获取当前可用的声音集合
  getVoices() {
    window.speechSynthesis.onvoiceschanged = () => {
      this.voices = window.speechSynthesis.getVoices();
      if(this.voices.length > 0) {
        this.utter.voice = this.voices[0]; // 设置声音来源
      }
    };
  }

  // 开始播放当前的语音
  start() {
    console.log('11')
    window.speechSynthesis.speak(this.utter);
  }

  // 暂停播放
  pause() {
    window.speechSynthesis.pause();
  }

  // 暂停之后继续播放
  resume() {
    window.speechSynthesis.resume();
  }

  // 清空所有播放
  cancel() {
    window.speechSynthesis.cancel();
  }

  // 切换语音的内容
  change(text) {
    this.utter.text = text;
    window.speechSynthesis.speak(this.utter);
  }
}