import type { ReactNode } from 'react';

import { InputGroup, InputGroupAddon, InputGroupInput } from './InputGroup';

type InputWithAddonsProps = React.ComponentProps<'input'> & {
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
};

export function InputWidthAddons({
  leftAddon,
  rightAddon,
  className,
  ...props
}: InputWithAddonsProps) {
  return (
    <InputGroup>
      {leftAddon && <InputGroupAddon align='inline-start'>{leftAddon}</InputGroupAddon>}
      <InputGroupInput className={className} {...props} />
      {rightAddon && <InputGroupAddon align='inline-end'>{rightAddon}</InputGroupAddon>}
    </InputGroup>
  );
}
