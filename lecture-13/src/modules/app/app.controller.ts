import { Controller, Get } from 'routing-controllers';

import { AuthorData } from '@/types/author';

import { appService } from './app.service';

@Controller('/')
export class AppController {
  @Get()
  public getAuthor(): Promise<AuthorData> {
    return appService.getAuthor();
  }
}
