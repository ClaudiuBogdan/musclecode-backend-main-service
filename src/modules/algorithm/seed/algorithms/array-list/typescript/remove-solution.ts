import { ArrayList } from './exercise';

ArrayList.prototype.remove = function (index) {
  if (index >= 0 && index < this.data.length) {
    for (let i = index; i < this.data.length - 1; i++) {
      this.data[i] = this.data[i + 1];
    }
    this.data.pop();
  }
};
