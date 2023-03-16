const breakPoints = [360, 2560];
const [mobile, desktop] = breakPoints.map(bp => `@media (max-width: ${bp}px)`);

const media = { mobile, desktop };

export default media;
