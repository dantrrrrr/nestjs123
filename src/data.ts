export enum ReportType {
  INCOME = 'income',
  EXPENSE = 'expense',
}
export const data: Data = {
  report: [
    {
      id: 'uuid1',
      source: 'Salary',
      amount: 7500,
      created_at: new Date('2023-08-01'),
      updated_at: new Date('2023-08-01'),
      type: ReportType.INCOME,
    },
    {
      id: 'uuid2',
      source: 'Rent',
      amount: 1200,
      created_at: new Date('2023-08-05'),
      updated_at: new Date('2023-08-05'),
      type: ReportType.EXPENSE,
    },
    {
      id: 'uuid3',
      source: 'Freelance Project',
      amount: 2500,
      created_at: new Date('2023-08-10'),
      updated_at: new Date('2023-08-10'),
      type: ReportType.INCOME,
    },
    {
      id: 'uuid4',
      source: 'Groceries',
      amount: 150,
      created_at: new Date('2023-08-15'),
      updated_at: new Date('2023-08-15'),
      type: ReportType.EXPENSE,
    },
  ],
};

interface Data {
  report: {
    id: string;
    source: string;
    amount: number;
    created_at: Date;
    updated_at: Date;
    type: ReportType;
  }[];
}
