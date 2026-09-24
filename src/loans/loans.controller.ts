import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { LoansService } from './loans.service';
import type { LoanStatus } from './loan.interface';
import { createLoanDto } from './dto/create-loan.dto';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansServices: LoansService) {}

  /*
  @Get()
  getLoans(@Query('student') student?: string) {
    return this.loansServices.getLoanByName(student);
  }
  */

  @Get()
  getLoans(@Query('status') status?: LoanStatus) {
    return this.loansServices.getLoanByName(status);
  }

  @Get(':id')
  getLoanById(@Param('id') id: string) {
    const loan = this.loansServices.getLoanByid(Number(id));

    if (!loan) {
      throw new NotFoundException('El prestamo con id ' + id + ' no existe');
    }

    return loan;
  }

  @Patch(':id/status')
  changeStatus(@Param('id') id: string) {
    const loan = this.loansServices.getLoanByid(Number(id));

    if (!loan) {
      throw new NotFoundException('El prestamo con id ' + id + ' no existe');
    }

    this.loansServices.changeStatus(Number(id));
    console.log('Prestamo eliminado con éxito!');

    return loan;
  }

  @Delete(':id')
  deleteLoanById(@Param('id') id: string) {
    const loan = this.loansServices.getLoanByid(Number(id));

    if (!loan) {
      throw new NotFoundException('El prestamo con id ' + id + ' no existe');
    }

    this.loansServices.deleteLoanById(Number(id));
    console.log('Prestamo eliminado con éxito!');

    return this.loansServices.getAllLoans();
  }

  @Post()
  createCourse(@Body() body: createLoanDto) {
    return this.loansServices.createLoan(body);
  }
}
