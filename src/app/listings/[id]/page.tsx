import { notFound } from 'next/navigation';
import { MOCK_LISTINGS } from '@/lib/mock-data';
import ListingDetail from '@/components/ListingDetail';

export default async function ListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = MOCK_LISTINGS.find((l) => l.id === id);

  if (!listing) {
    notFound();
  }

  return <ListingDetail listing={listing} />;
}
