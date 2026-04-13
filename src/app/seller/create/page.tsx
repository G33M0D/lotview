import { redirect } from 'next/navigation';
export default function SellerCreateRedirect() {
  redirect('/admin/listings/create');
}
