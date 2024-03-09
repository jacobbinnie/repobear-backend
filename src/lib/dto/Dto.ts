export class Dto<T> {
  constructor(data: T) {
    Object.assign(this, data);
  }
}
