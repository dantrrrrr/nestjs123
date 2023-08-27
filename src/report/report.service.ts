import { Injectable } from '@nestjs/common';
import { ReportType, data } from '../data';
import { v4 as uuid } from 'uuid';
import { ReportReponseDto } from '../dtos/report.dto';
interface ReportData {
  source: string;
  amount: number;
}
interface UpdateReportData {
  source: string;
  amount: number;
}
@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ReportReponseDto[] {
    return data.report
      .filter((report) => report.type === type)
      .map((report) => new ReportReponseDto(report));
  }

  getReportById(type: ReportType, id: string): ReportReponseDto {
    const report = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

    if (!report) return;

    return new ReportReponseDto(report);
  }

  createReport(
    type: ReportType,
    { amount, source }: ReportData,
  ): ReportReponseDto {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === 'income' ? ReportType.INCOME : ReportType.EXPENSE,
    };
    data.report.push(newReport);
    return new ReportReponseDto(newReport);
  }
  updateReport(
    type: ReportType,
    id: string,
    body: UpdateReportData,
  ): ReportReponseDto {
    const reportToUpdate = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

    if (!reportToUpdate) return;
    const reportIndex = data.report.findIndex(
      (report) => report.id === reportToUpdate.id,
    );
    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      updated_at: new Date(),
    };

    return new ReportReponseDto(data.report[reportIndex]);
  }
  deleteReport(id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);

    if (reportIndex === -1) return;

    data.report.splice(reportIndex, 1); //(start index , amount to remove)
  }
}
