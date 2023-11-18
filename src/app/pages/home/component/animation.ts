export class homeAnimation {
  public animation1?: boolean;
  public animation2?: boolean;
  public animation3?: boolean;
  public animation4?: boolean;

  constructor({
    animation1 = false,
    animation2 = false,
    animation3 = false,
    animation4 = false,
  }: {
    animation1?: boolean;
    animation2?: boolean;
    animation3?: boolean;
    animation4?: boolean;
  }) {
    this.animation1 = animation1;
    this.animation2 = animation2;
    this.animation3 = animation3;
    this.animation4 = animation4;
  }
}

export class ScrollListener {
  static listen(callback: (booleans: object) => void): void {
    let animationHome = new homeAnimation({});
    const onScroll = () => {
      const scrollPercentage =
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

      switch (true) {
        case scrollPercentage >= 10 && scrollPercentage < 36:
          animationHome.animation1 = true;
          break;

        case scrollPercentage >= 36 && scrollPercentage < 61:
          animationHome.animation2 = true;
          break;

        case scrollPercentage >= 61 && scrollPercentage < 92:
          animationHome.animation3 = true;
          break;

        case scrollPercentage >= 92 && scrollPercentage <= 101:
          animationHome.animation4 = true;
          break;

        default:
          animationHome = new homeAnimation({});
          break;
      }

      callback(animationHome);
    };
    window.addEventListener('scroll', onScroll);
  }
}
