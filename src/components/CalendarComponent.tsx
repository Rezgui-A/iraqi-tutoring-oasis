import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { enUS, arSA } from "date-fns/locale";

const locales = {
  en: enUS,
  ar: arSA,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface CalendarComponentProps {
  events: Array<{
    id: number;
    title: string;
    date: string;
    duration: number;
    teacher: string;
  }>;
  language: "en" | "ar";
}

const CalendarComponent = ({ events, language }: CalendarComponentProps) => {
  const calendarEvents = events.map((event) => ({
    title: `${event.title} (${event.teacher})`,
    start: new Date(event.date),
    end: new Date(new Date(event.date).getTime() + event.duration * 60000),
    allDay: false,
  }));

  return (
    <div className="h-[600px]">
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        culture={language}
        messages={
          language === "ar"
            ? {
                today: "اليوم",
                previous: "السابق",
                next: "التالي",
                month: "شهر",
                week: "أسبوع",
                day: "يوم",
                agenda: "جدول",
                date: "التاريخ",
                time: "الوقت",
                event: "حدث",
                noEventsInRange: "لا توجد أحداث في هذا النطاق.",
              }
            : undefined
        }
      />
    </div>
  );
};

export default CalendarComponent;