'use client';

import { Session } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/ui/data-table';
import Link from 'next/link';

const columns: ColumnDef<Session>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'id',
    header: 'Action',
    cell: (info) => (
      <Link href={`/sessions/${info.getValue() as any}`}>See detail</Link>
    ),
  },
];

export default function Table({ data }: { data: Session[] }) {
  return <DataTable columns={columns} data={data} />;
}
