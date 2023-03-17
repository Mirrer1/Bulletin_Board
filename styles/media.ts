const breakPoints = [480, 768, 1024];
const [mobile, tablet, desktop] = breakPoints.map(bp => `@media (max-width: ${bp}px)`);

const media = { mobile, tablet, desktop };

export default media;
