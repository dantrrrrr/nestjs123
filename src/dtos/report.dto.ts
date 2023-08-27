import { Exclude, Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

import { ReportType } from 'src/data';
export class CreateReportDto {
  @IsNotEmpty()
  @IsString()
  source: string;

  @IsPositive()
  @IsNumber()
  amount: number;
}
export class UpdateReportDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  source: string;

  @IsPositive()
  @IsNumber()
  @IsOptional()
  amount: number;
}

export class ReportReponseDto {
  id: string;
  source: string;
  amount: number;
  // @Exclude: Used to mark a property that should be excluded(REMOVE) from serialization.
  //@Expose: Used to explicitly mark a property that should be included in serialization, even if it doesn't meet the default serialization criteria.
  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;

  type: ReportType;

  @Expose({ name: 'createdAt' })
  transformCreatedAt() {
    return this.created_at;
  }
  // you can create a "partial" version of an existing type where you're allowed to omit certain properties or provide them optionally without having to provide all properties that the original type requires.
  //some field can be optional ,partial means : mot phan
  // in this case :mot phan cua ReportReponseDto

  constructor(partial: Partial<ReportReponseDto>) {
    Object.assign(this, partial); //(target,source) copy from partial to this
  }
}
