import { css, CSSObject, InterpolationFunction, ThemeProps } from 'styled-components';

enum Methods {
  every = 'every',
  some = 'some'
}

type FN = (name: string) => boolean;

interface Names {
  [key: string]: (fn: FN) => boolean;
}

interface Props {
  [key: string]: boolean;
}

type Args = CSSObject | TemplateStringsArray | InterpolationFunction<ThemeProps<any>>;

const styledIf = (method: string, condition: boolean) => (...params: string[]) => (args: Args) => (
  props: Props
) => {
  // const fn = names[method];
  console.log(Boolean(props[params[0]]));
  return Boolean(props[params[0]]) === condition && css(args);
};

const is = styledIf('every', true);
const isNot = styledIf('every', false);

export { isNot, is };
