
const coursesByDate = {
  "2025-11-12": {
    text: "Insc. Cursos\nJavaScript",
    title: "Curso de JavaScript",
    description: "Aprende JavaScript desde cero y domina la lógica de la web dinámica.",
    id: 1
  },
  "2025-11-19": {
    text: "Insc. Cursos\n CSS",
    title: "Curso de CSS",
    description: "Aprendé diseño web moderno con CSS3, Flexbox, Grid y Responsive Design.",
    id: 2
  },
  "2025-11-25": {
    text: "Insc. Cursos\nExcel",
    title: "Curso de Excel",
    description: "Aprendé Excel desde cero hasta nivel avanzado con funciones y dashboards.",
    id: 4
  }
};

/* ============================
   ELEMENTOS DEL CALENDARIO
   ============================ */

const calendarBody = document.getElementById("calendar-body");
const monthLabel = document.getElementById("monthLabel");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");
const calendarHeader = document.getElementById("calendar-header");

/* ============================
   FUNCIONES AUXILIARES
   ============================ */


function formatKey(year, month, day) {
  const m = String(month + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

/* ============================
   CABECERA DE DÍAS (LUN, MAR...)
   ============================ */
function buildCalendarHeader() {
  if (!calendarHeader) return;

  calendarHeader.innerHTML = "";

  // 7 de enero 2024 es domingo
  const baseDate = new Date(2024, 0, 7);

  for (let i = 0; i < 7; i++) {
    const day = new Date(baseDate);
    day.setDate(baseDate.getDate() + i);

    let dayName = day.toLocaleDateString("es-AR", { weekday: "short" });
    dayName = dayName.replace(".", "").toUpperCase(); // "dom." -> "DOM"

    const th = document.createElement("th");
    th.textContent = dayName;
    calendarHeader.appendChild(th);
  }
}

/* ============================
   CONSTRUCCIÓN DEL CALENDARIO
   ============================ */

function buildCalendar(date) {
  if (!calendarBody || !monthLabel) return;

  const year = date.getFullYear();
  const month = date.getMonth();

  // Nombre del mes + año
  const monthName = date.toLocaleDateString("es-AR", {
    month: "long",
    year: "numeric"
  });
  monthLabel.textContent =
    monthName.charAt(0).toUpperCase() + monthName.slice(1);

  calendarBody.innerHTML = "";

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const totalDays = lastDay.getDate();
  const startDay = firstDay.getDay(); // 0 = domingo

  let row = document.createElement("tr");
  let cells = 0;

  // Celdas vacías antes del día 1
  for (let i = 0; i < startDay; i++) {
    row.appendChild(document.createElement("td"));
    cells++;
  }

  const today = new Date();

  for (let day = 1; day <= totalDays; day++) {
    if (cells === 7) {
      calendarBody.appendChild(row);
      row = document.createElement("tr");
      cells = 0;
    }

    const td = document.createElement("td");

    // número del día
    const dayNumber = document.createElement("div");
    dayNumber.className = "day-number";
    dayNumber.textContent = day;
    td.appendChild(dayNumber);

    const key = formatKey(year, month, day);
    const course = coursesByDate[key];

    // si hay curso ese día
    if (course) {
      td.classList.add("course-day");

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "course-badge boton-calendario";
      btn.name = "boton-accion";
      btn.innerText = course.text;

      // guardamos los datos del curso en el botón
      btn.dataset.title = course.title;
      btn.dataset.description = course.description;
      if (course.id) {
        btn.dataset.id = course.id;
      }

      td.appendChild(btn);
    }

    // marcar día actual
    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      td.classList.add("today");
    }

    row.appendChild(td);
    cells++;
  }

  // completar fila final
  if (cells > 0 && cells < 7) {
    for (let i = cells; i < 7; i++) {
      row.appendChild(document.createElement("td"));
    }
  }

  calendarBody.appendChild(row);

  // conectar los botones del calendario con el popup
  attachCourseHandlers();
}

/* ============================
   POPUP / MODAL DE CURSO
   ============================ */

const titulo_texto = document.getElementById("titulo-popup");
const descripcion = document.getElementById("descripcion-popup");
const modal_container = document.getElementById("modal-container");
const close = document.getElementById("close");
const vinculo = document.getElementById("vinculo");

function attachCourseHandlers() {
  const botones = document.getElementsByName("boton-accion");
  Array.from(botones).forEach((boton) => {
    boton.onclick = () => {
      const title = boton.dataset.title || "";
      const descriptionText = boton.dataset.description || "";
      const id = boton.dataset.id;
      let url = boton.dataset.url || "#";

      // Si tenemos id de curso, armamos la URL a detalle_curso
      if (id) {
        url = `../Paginas/detalle_curso.html?id=${id}`;
      }

      if (titulo_texto) titulo_texto.innerText = title;
      if (descripcion) descripcion.innerText = descriptionText;
      if (vinculo) vinculo.href = url;

      if (modal_container) {
        modal_container.classList.add("show");
      }
    };
  });
}

if (close && modal_container) {
  close.addEventListener("click", () => {
    modal_container.classList.remove("show");
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal_container) {
      modal_container.classList.remove("show");
    }
  });
}

/* ============================
   INICIALIZACIÓN
   ============================ */

document.addEventListener("DOMContentLoaded", () => {
  buildCalendarHeader();

  const currentDate = new Date();
  buildCalendar(currentDate);

  if (prevMonthBtn && nextMonthBtn) {
    prevMonthBtn.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      buildCalendar(currentDate);
    });

    nextMonthBtn.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      buildCalendar(currentDate);
    });
  }
});
