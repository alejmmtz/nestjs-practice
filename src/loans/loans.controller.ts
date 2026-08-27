import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { LoansService } from './loans.service';
import type { LoanStatus } from './loan.interface';
import { createLoanDto } from './dto/create-loan.dto';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansServices: LoansService) {}

  @Get()
  getLoans(@Query('status') status?: LoanStatus) {
    return this.loansServices.getLoansByStatus(status);
  }

  @Get(':id')
  getLoanById(@Param('id') id: number) {
    const loan = this.loansServices.getLoanByid(Number(id));

    if (!loan) {
      throw new NotFoundException('El prestamo con id ' + id + ' no existe');
    }

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
