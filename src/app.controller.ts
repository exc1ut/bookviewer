import { nextHandle } from './main';
import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  @Get('/*')
  index(@Req() req: Request, @Res() res: Response) {
    return nextHandle(req, res);
  }
}
