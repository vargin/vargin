let l: string[] = [];
for (var i = 0; i < 256; i++) {
  l[i] = (i < 16 ? '0' : '') + (i).toString(16);
}

export class Deferred<T> {
  private internalResolve: Function;
  private internalReject: Function;
  private internalPromise: Promise<T>;

  constructor() {
    this.internalPromise = new Promise<T>((resolve, reject) => {
      this.internalResolve = resolve;
      this.internalReject = reject;
    });
  }

  resolve<T>(value?: T) {
    this.internalResolve(value);
  }

  reject(value?: any) {
    this.internalReject(value);
  }

  get promise() {
    return this.internalPromise;
  }
}

export class UtilsService {
  static uuid(): string {
    let d0 = Math.random() * 0xffffffff | 0;
    let d1 = Math.random() * 0xffffffff | 0;
    let d2 = Math.random() * 0xffffffff | 0;
    let d3 = Math.random() * 0xffffffff | 0;
    return l[d0 & 0xff] + l[d0 >> 8 & 0xff] + l[d0 >> 16 & 0xff] +
      l[d0 >> 24 & 0xff] + '-' + l[d1 & 0xff] + l[d1 >> 8 & 0xff] + '-' +
      l[d1 >> 16 & 0x0f | 0x40] + l[d1 >> 24 & 0xff] + '-' +
      l[d2 & 0x3f | 0x80] + l[d2 >> 8 & 0xff] + '-' + l[d2 >> 16 & 0xff] +
      l[d2 >> 24 & 0xff] + l[d3 & 0xff] + l[d3 >> 8 & 0xff] +
      l[d3 >> 16 & 0xff] + l[d3 >> 24 & 0xff];
  }
}

export default UtilsService;
