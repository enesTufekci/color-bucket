import { Color } from '@renderer/screens/Projects';

export function hexToRgbA(hexCode: string) {
  let c: string[];
  if (validateHexCode(hexCode)) {
    c = hexCode.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    let cA: any = '0x' + c.join('');
    return 'rgba(' + [(cA >> 16) & 255, (cA >> 8) & 255, cA & 255].join(',') + ',1)';
  }
  throw new Error('Bad Hex');
}

export function validateHexCode(hexCode: string) {
  return /^#([A-Fa-f0-9]{3}){1,2}$/.test(hexCode);
}

export function createLinearGradient(colors: Color[]) {
  const length = colors.length;
  if (length === 1) {
    return colors[0].hexCode;
  }
  const step = 100 / length;
  const colorMap = colors.map((color, index) => `${hexToRgbA(color.hexCode)} ${index * step}%`);

  return `linear-gradient(135deg, ${colorMap.join(', ')})`;
}
