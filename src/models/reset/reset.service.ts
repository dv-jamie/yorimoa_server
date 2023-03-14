import { Injectable } from '@nestjs/common';
import { RefrigeratorsService } from '../refrigerators/refrigerators.service';

@Injectable()
export class ResetService {
  constructor(
    private refrigeratorsService: RefrigeratorsService,
  ) {}

  async resetData(userId: number): Promise<ResponseDto> {
    const result = await this.refrigeratorsService.deleteAllByUser(userId)
    return {
      status: 200,
      data: result
    };
  }
}
