import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}
const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        if (hasFavorited) {
          await axios.delete(`/api/favorites/${listingId}`);
          toast.success(`Removed from favorites.`);
        } else {
          await axios.post(`/api/favorites/${listingId}`);
          toast.success(`Added to favorites.`);
        }
        router.refresh();
      } catch (_) {
        toast.error("Something went wrong.");
      }
    },
    [currentUser, hasFavorited, router, loginModal, listingId]
  );

  return { hasFavorited, toggleFavorite };
};

export default useFavorite;
