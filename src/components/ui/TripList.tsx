import TripCard from "./TripCard";
import { Trip } from "@/types/trip";

interface Props {
  trips: Trip[];
}

const TripList = ({ trips }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
};

export default TripList;
