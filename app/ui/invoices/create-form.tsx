//app/ui/invoices/create-form.tsx
'use client';

import { CustomerField } from '@/app/lib/definitions';
import { createInvoice, State } from '@/app/lib/actions';
import { useActionState } from 'react';
import { Button } from '@/app/ui/button';
import { UserCircleIcon, CurrencyDollarIcon, ClockIcon, CheckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Form({ customers }: { customers: CustomerField[] }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createInvoice, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">Choose customer</label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="customer-error"
            >
              <option value="" disabled>Select a customer</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.customerId?.map(error => (
              <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
            ))}
          </div>
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">Amount</label>
          <div className="relative mt-2">
            <input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              placeholder="Enter USD amount"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <div aria-live="polite" aria-atomic="true">
            {state.errors?.amount?.map(error => (
              <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
            ))}
          </div>
        </div>

        {/* Status */}
        <fieldset className="mb-4">
          <legend className="mb-2 block text-sm font-medium">Invoice Status</legend>
          <div className="flex gap-4">
            <div className="flex items-center">
              <input id="pending" name="status" type="radio" value="pending" className="h-4 w-4" />
              <label htmlFor="pending" className="ml-2 flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">Pending <ClockIcon className="h-4 w-4" /></label>
            </div>
            <div className="flex items-center">
              <input id="paid" name="status" type="radio" value="paid" className="h-4 w-4" />
              <label htmlFor="paid" className="ml-2 flex items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white">Paid <CheckIcon className="h-4 w-4" /></label>
            </div>
          </div>
          <div aria-live="polite" aria-atomic="true">
            {state.errors?.status?.map(error => (
              <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
            ))}
          </div>
        </fieldset>
      </div>

      {state.message && <p className="mt-2 text-sm text-red-600">{state.message}</p>}

      <div className="mt-6 flex justify-end gap-4">
        <Link href="/dashboard/invoices" className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 hover:bg-gray-200">Cancel</Link>
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  );
}
