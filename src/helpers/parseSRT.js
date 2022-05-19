// 00:00:01,660 -> 1.66
export function getSecondsFromHumanFormat(timestamp) {
  const [time, ms] = timestamp.split(',');
  const [hh, mm, ss] = time.split(':');

  const seconds = Number(hh) * 60 + Number(mm) * 60 + Number(ss);
  return Number(`${seconds}.${ms}`);
}

// 1
// 00:00:01,660 --> 00:00:03,343
// In the spring of 2009
export default function parseSRT(source) {
  if (!source) {
    return '';
  }

  if (typeof source !== 'string') {
    throw new Error('Sorry, Parser accept string only.');
  }

  // eslint-disable-next-line no-param-reassign
  source = source.replace(/\r\n|\r|\n/g, '\n');

  return source.split('\n\n').map((block) => {
    const lines = block.split('\n');
    const [start, end] = lines[1].split(' --> ');
    return {
      line: lines[0],
      startTime: getSecondsFromHumanFormat(start),
      endTime: getSecondsFromHumanFormat(end),
      text: lines.slice(2),
    };
  });
}
