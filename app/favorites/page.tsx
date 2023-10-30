import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoritesListings";
import EmptyState from "../components/EmptyState";
import FavoritesClient from "./FavoritesClient";

const FavoritesListingPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const favoriteListings = await getFavoriteListings();
  if (favoriteListings.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listings."
      />
    );
  }

  return (
    <FavoritesClient listings={favoriteListings} currentUser={currentUser} />
  );
};

export default FavoritesListingPage;
