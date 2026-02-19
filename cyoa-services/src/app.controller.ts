import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return "Hello, working...";
  }

  @Post('chat')
  async chat(@Body() body: { message: string }) {
    return { reply: await this.appService.chat(body.message)};
  }
}
