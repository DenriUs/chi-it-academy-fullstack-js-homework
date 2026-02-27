import { UseGuards, createParamDecorator } from '@nestjs/common';

import JwtAuthGuard from './jwt-auth.guard';

export const ForAuthorized = () => UseGuards(JwtAuthGuard);

export const User = createParamDecorator((_data, context) => {
  const request = context.switchToHttp().getRequest();
  return request.user;
});
