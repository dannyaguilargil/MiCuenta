
import { Calendar, luxonLocalizer } from 'react-big-calendar';
import { DateTime, Settings } from 'luxon';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';


const CustomCalendar = ({ listaEventos, estilosDeEvento, handleEventoSeleccionado }) => {

  Settings.defaultLocale = "es-CO";

  const localizer = luxonLocalizer(DateTime, {
    firstDayOfWeek: 1,
  });

  const [currentDate, setCurrentDate] = useState(new Date());
  return (
    <>
      <div style={{ height:"500px", width:"100%", padding: "10px 20px" }}>
        <Calendar
          localizer={localizer}
          popup
          events={listaEventos || ""}
          startAccessor="start"
          endAccessor="end"
          date={currentDate}
          onNavigate={(newDate) => setCurrentDate(newDate)}
          views={['month', 'agenda']}
          eventPropGetter={estilosDeEvento || ""}
          step={60}
          timeslots={1}
          min={DateTime.fromObject({ hour: 6, minute: 0 }).toJSDate()}
          max={DateTime.fromObject({ hour: 18, minute: 59 }).toJSDate()}
          onSelectEvent={handleEventoSeleccionado}
          formats={{
            timeGutterFormat: (date, culture, localizer) =>
              localizer.format(date, "hh a", culture),
            eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
              `${localizer.format(
                start,
                "hh:mm a",
                culture
              )} - ${localizer.format(end, "hh:mm a", culture)}`,
          }}

          messages={{
            date: 'Fecha',
            time: 'Hora',
            event: 'Evento',
            allDay: 'Todo el día',
            previous: 'Anterior',
            next: 'Siguiente',
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Día',
            agenda: 'Agenda',
            noEventsInRange: 'No hay eventos en este rango.',
            showMore: (total) => `+ Ver más (${total})`,
          }}
        />
      </div>

    </>
  )
};

export default CustomCalendar;