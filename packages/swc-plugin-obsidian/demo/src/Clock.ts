export class Clock {
  isDayTime() {
    const now = new Date();
    const hours = now.getHours();
    return hours >= 6 && hours < 18;
  }
}