'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';

interface FavoriteButtonProps {
  listingId: string;
}

export default function FavoriteButton({ listingId }: FavoriteButtonProps) {
  const { user, supabase } = useAuth();
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    supabase
      .from('favorites')
      .select('id')
      .eq('user_id', user.id)
      .eq('listing_id', listingId)
      .then(({ data }) => {
        if (data && data.length > 0) {
          setIsFavorited(true);
        }
      });
  }, [user, listingId, supabase]);

  const handleClick = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (!user) {
        router.push('/login');
        return;
      }

      if (isLoading) return;
      setIsLoading(true);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);

      if (isFavorited) {
        await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('listing_id', listingId);
        setIsFavorited(false);
      } else {
        await supabase
          .from('favorites')
          .insert({ user_id: user.id, listing_id: listingId });
        setIsFavorited(true);
      }

      setIsLoading(false);
    },
    [user, supabase, listingId, isFavorited, isLoading, router]
  );

  return (
    <button
      onClick={handleClick}
      className={`flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-transform duration-200 hover:bg-background ${
        isAnimating ? 'scale-125' : 'scale-100'
      }`}
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        className={`h-4 w-4 transition-colors ${
          isFavorited
            ? 'fill-red-500 text-red-500'
            : 'fill-none text-muted-foreground hover:text-red-400'
        }`}
      />
    </button>
  );
}
