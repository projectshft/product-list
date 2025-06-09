import { Controller, Get, Route, SuccessResponse } from 'tsoa';
import { GenerateService } from './generateService';

@Route('generate')
export class GenerateController extends Controller {
  /**
   * Generates products and reviews then saves them to the database.
   */
  @SuccessResponse('201', 'Created')
  @Get()
  public async generateData(): Promise<void> {
    return new GenerateService().generateData();
  }
}
