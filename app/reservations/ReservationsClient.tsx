"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listing/ListingCard";
import { SafeReservation, SafeUser } from "../types";

interface ReservationsClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}
const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Listing reservation cancelled");
          router.refresh();
        })
        .catch(() => {
          toast.error("Something went wrong.");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div
        className="
            mt-10
            grid
            grid-cols-1
            gap-8
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
        "
      >
        {reservations.map((r) => (
          <ListingCard
            key={r.id}
            data={r.listing}
            reservation={r}
            actionId={r.id}
            onAction={onCancel}
            disabled={deletingId === r.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
