import tinycolor from "tinycolor2";

interface IGradientStop {
  color: string;
  position?: number;
}

interface IParsedGraient {
  stops: IGradientStop[];
  angle: string;
  original: string;
  line: string;
  side?: string;
  sideCorner?: string;
  parseWarning?: boolean;
}

const combineRegExp = (
  regexpList: ReadonlyArray<string | RegExp>,
  flags: string
): RegExp => {
  return new RegExp(
    regexpList.reduce<string>(
      (result, item) =>
        result + (typeof item === 'string' ? item : item.source),
      ''
    ),
    flags
  );
};

const generateRegExp = () => {
  const searchFlags = 'gi',
    rAngle = /(?:[+-]?\d*\.?\d+)(?:deg|grad|rad|turn)/,
    rSideCornerCapture = /to\s+((?:(?:left|right)(?:\s+(?:top|bottom))?))/,
    rRadial = /circle at\s+((?:(?:left|right|center|top|bottom)(?:\s+(?:left|right|center|top|bottom))?))/,
    rComma = /\s*,\s*/,
    rColorHex = /\#(?:[a-f0-9]{6}|[a-f0-9]{3})/,
    rDigits3 = /\(\s*(?:\d{1,3}\s*,\s*){2}\d{1,3}\s*\)/,
    rDigits4 = /\(\s*(?:\d{1,3}\s*,\s*){2}\d{1,3}\s*,\s*\d*\.?\d+\)/,
    rValue = /(?:[+-]?\d*\.?\d+)(?:%|[a-z]+)?/,
    rKeyword = /[_a-z-][_a-z0-9-]*/,
    rColor = combineRegExp(
      [
        '(?:',
        rColorHex,
        '|',
        '(?:rgb|hsl)',
        rDigits3,
        '|',
        '(?:rgba|hsla)',
        rDigits4,
        '|',
        rKeyword,
        ')'
      ],
      ''
    ),
    rColorStop = combineRegExp(
      [rColor, '(?:\\s+', rValue, '(?:\\s+', rValue, ')?)?'],
      ''
    ),
    rColorStopList = combineRegExp(
      ['(?:', rColorStop, rComma, ')*', rColorStop],
      ''
    ),
    rLineCapture = combineRegExp(
      ['(?:(', rAngle, ')|', rSideCornerCapture, '|', rRadial, ')'],
      ''
    ),
    rGradientSearch = combineRegExp(
      ['(?:(', rLineCapture, ')', rComma, ')?(', rColorStopList, ')'],
      searchFlags
    ),
    rColorStopSearch = combineRegExp(
      [
        '\\s*(',
        rColor,
        ')',
        '(?:\\s+',
        '(',
        rValue,
        '))?',
        '(?:',
        rComma,
        '\\s*)?'
      ],
      searchFlags
    );

  return {
    gradientSearch: rGradientSearch,
    colorStopSearch: rColorStopSearch
  };
};

const parseGradient = (regExpLib: any, input: string) => {
  let result: IParsedGraient = {
    stops: [],
    angle: '',
    line: '',
    original: ''
  };
  let matchGradient, matchColorStop, stopResult: IGradientStop;

  regExpLib.gradientSearch.lastIndex = 0;

  matchGradient = regExpLib.gradientSearch.exec(input);
  if (matchGradient !== null) {
    result = {
      ...result,
      original: matchGradient[0],
    };

    if (!!matchGradient[1]) {
      result.line = matchGradient[1];
    }

    if (!!matchGradient[2]) {
      result.angle = matchGradient[2];
    }

    if (!!matchGradient[3]) {
      result.sideCorner = matchGradient[3];
    }

    regExpLib.colorStopSearch.lastIndex = 0;

    matchColorStop = regExpLib.colorStopSearch.exec(matchGradient[5]);
    while (matchColorStop !== null) {
      const tinyColor = tinycolor( matchColorStop[1]);
      stopResult = {
        color: tinyColor.toRgbString(),
      };

      if (!!matchColorStop[2]) {
        stopResult.position = parseInt(matchColorStop[2], 10) / 100;
      }
      result.stops.push(stopResult);

      matchColorStop = regExpLib.colorStopSearch.exec(matchGradient[5]);
    }
  }

  return result;
};

export default (input: string) => {
  const regExpLib = generateRegExp();
  let result,
    rGradientEnclosedInBrackets = /.*gradient\s*\(((?:\([^\)]*\)|[^\)\(]*)*)\)/,
    match = rGradientEnclosedInBrackets.exec(input);

  if (match !== null) {
    result = parseGradient(regExpLib, match[1]);

    if (result.original.trim() !== match[1].trim()) {
      result.parseWarning = true;
    }

    if (result.stops.every((item) => item.hasOwnProperty('position')) === false) {
      result = 'Not correct position';
    }
  } else {
    result = 'Failed to find gradient';
  }

  return result;
};
