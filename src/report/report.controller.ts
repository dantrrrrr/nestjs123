import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
  HttpCode,
  ParseEnumPipe,
  ParseUUIDPipe,
} from '@nestjs/common';

import { ReportType } from '../data';

import { ReportService } from './report.service';
import {
  CreateReportDto,
  ReportReponseDto,
  UpdateReportDto,
} from '../dtos/report.dto';

@Controller('report/:type')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}
  // GET ALL REPORT
  @Get('')
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportReponseDto[] {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.reportService.getAllReports(reportType);
  }
  // GET 1 REPORT
  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportReponseDto {
    console.log(id, typeof id);
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.getReportById(reportType, id);
  }
  // CREATE REPORT
  @Post()
  createReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Body() { source, amount }: CreateReportDto,
  ): ReportReponseDto {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.reportService.createReport(reportType, { source, amount });
  }

  // UPDATE REPORT
  @Put(':id')
  updateReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateReportDto,
  ): ReportReponseDto {
    console.log(body);
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.updateReport(reportType, id, body);
  }
  // DELETE REPORT
  @HttpCode(204) //no content
  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    return this.reportService.deleteReport(id);
  }
}
