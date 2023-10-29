import prisma from "@/app/libs/prismadb";

export interface IListingParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: IListingParams) {
  const {
    userId,
    guestCount,
    roomCount,
    bathroomCount,
    startDate,
    endDate,
    locationValue,
    category,
  } = params;
  const query: any = {};

  if (userId) {
    query.userId = userId;
  }
  if (guestCount) {
    query.guestCount = { gte: +guestCount };
  }
  if (roomCount) {
    query.roomCount = { gte: +roomCount };
  }
  if (bathroomCount) {
    query.bathroomCount = { gte: +bathroomCount };
  }
  if (locationValue) {
    query.locationValue = locationValue;
  }
  if (category) {
    query.category = category;
  }

  if (startDate && endDate) {
    query.NOT = {
      reservations: {
        some: {
          OR: [
            {
              startDate: { gte: new Date(startDate), lte: new Date(endDate) },
            },
            {
              endDate: { gte: new Date(startDate), lte: new Date(endDate) },
            },
          ],
        },
      },
    };
  }

  try {
    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });
    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));
    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
