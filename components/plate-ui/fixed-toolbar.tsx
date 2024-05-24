import { withCn } from '@udecode/cn';

import { Toolbar } from './toolbar';

export const FixedToolbar = withCn(
  Toolbar,
  'supports-backdrop-blur:bg-background/60 sticky left-0 top-[57px] z-50 justify-between overflow-x-auto rounded-t-md border border-b-0 bg-background/95 backdrop-blur'
);
