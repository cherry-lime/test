import { SetMetadata } from '@nestjs/common';

export const Unauthorized = () => SetMetadata('isUnauthorized', true);
