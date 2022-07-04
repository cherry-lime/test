import { Module } from '@nestjs/common';
import { SaveService } from './save.service';

// NestJS Module System helps structure application code into domain areas
//  leading to better design and improved maintainability.
// Providers are responsible for executing business logic and returning data to the controller.
// Module for saving assessment related routes
@Module({
  providers: [SaveService],
})
export class SaveModule {}
