import { Injectable } from '@nestjs/common';
import { Loan, LoanStatus } from './loan.interface';
import { createLoanDto } from './dto/create-loan.dto';

@Injectable()
export class LoansService {
  private loans: Loan[] = [
    {
      id: 1,
      student: 'Laura',
      equipment: 'Book of Bishanti',
      status: 'borrowed',
    },
    {
      id: 2,
      student: 'Mateo',
      equipment: 'Eye of Agamotho',
      status: 'returned',
    },
  ];

  getAllLoans(): Loan[] {
    return this.loans;
  }

  getLoansByStatus(status?: LoanStatus): Loan[] {
    if (!status) {
      return this.getAllLoans();
    }

    return this.loans.filter((loan) => loan.status === status);
  }

  getLoanByid(id: number): Loan | undefined {
    return this.loans.find((loan) => loan.id === id);
  }

  deleteLoanById(id: number) {
    const loanToDeleteIndex = this.loans.findIndex((loan) => loan.id === id);

    if (loanToDeleteIndex !== -1) {
      this.loans.splice(loanToDeleteIndex, 1);
    }
  }

  createLoan(data: createLoanDto): Loan {
    const newLoan: Loan = {
      id: this.loans.length + 1,
      student: data.student,
      equipment: data.equipment,
      status: 'borrowed',
    };

    this.loans.push(newLoan);

    return newLoan;
  }
}
