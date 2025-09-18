/*
import { IsOptional, IsString, IsNumber, IsArray } from 'class-validator';

export class EnterTargetDto {
  @IsOptional() @IsNumber() screenWidth?: number;
  @IsOptional() @IsNumber() screenHeight?: number;
  @IsOptional() @IsString() timezone?: string;
  @IsOptional() @IsString() language?: string;
  @IsOptional() @IsArray() languages?: string[];
  @IsOptional() @IsString() platform?: string;
  @IsOptional() @IsNumber() deviceMemory?: number;
  @IsOptional() @IsNumber() hardwareConcurrency?: number;
}
*/

export class EnterTargetDto {
  screenWidth?: number;
  screenHeight?: number;
  timezone?: string;
  language?: string;
  languages?: string[];
  platform?: string;
  deviceMemory?: number;
  hardwareConcurrency?: number;
}