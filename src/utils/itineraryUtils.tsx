export interface ApiItinerary {
  id: number;
  viagemId: number;
  tipoEvento: string;
  titulo: string;
  dataHora: string;
  descricao: string;
}

export interface Activity {
  id?: number;
  time: string;
  title: string;
  description: string;
  type: string;
  edited?: boolean;
  isNew?: boolean;
}

export interface ItineraryDay {
  day: number;
  date: string;
  activities: Activity[];
}

export interface ItineraryItem {
    id: number;
    idViagem: number;
    tipoEvento: string;
    titulo: string;
    dataHora: string;
    descricao: string;
}

const getComparableDate = (dateStr: string) => {
  if (dateStr.includes("/")) {
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
  return dateStr;
};

const getComparableTime = (timeStr: string) => {
  return timeStr.padStart(5, "0");
};

const compareActivityTimes = (a: Activity, b: Activity) =>
  getComparableTime(a.time).localeCompare(getComparableTime(b.time));

export const mapApiToItineraries = (
  apiData: ApiItinerary[]
): ItineraryDay[] => {
  const grouped: { [date: string]: Activity[] } = {};
  apiData.forEach((item) => {
    const [dateStr, timeStr] = item.dataHora.split("T");
    const [year, month, day] = dateStr.split("-");
    const displayDate = `${day.padStart(2, "0")}/${month.padStart(
      2,
      "0"
    )}/${year}`;
    if (!grouped[displayDate]) grouped[displayDate] = [];
    grouped[displayDate].push({
      id: item.id,
      time: timeStr.slice(0, 5),
      title: item.titulo,
      description: item.descricao,
      type: item.tipoEvento,
      edited: false,
      isNew: false,
    });
  });

  return Object.entries(grouped)
    .sort(([dateA], [dateB]) =>
      getComparableDate(dateA).localeCompare(getComparableDate(dateB))
    )
    .map(([date, activities], idx) => ({
      day: idx + 1,
      date,
      activities: activities.sort(compareActivityTimes),
    }));
};
