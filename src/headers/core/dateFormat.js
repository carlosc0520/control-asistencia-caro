const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

const FormatoFecha = (datestring) => {
  //12/11/2021 09:42:58
  let date = new Date(datestring);
  let day = (date.getDate() + "").padStart(2, "0");
  let month = (date.getMonth() + 1 + "").padStart(2, "0");
  let year = (date.getFullYear() + "").padStart(2, "0");
  let hour = (date.getHours() + "").padStart(2, "0");
  let minutes = (date.getMinutes() + "").padStart(2, "0");
  let seconds = (date.getSeconds() + "").padStart(2, "0");
  return `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`;
};

const fechaLarga = (fecha = null) => {
  let date = fecha != null ? new Date(fecha) : new Date();
  // formato 30 OCTUBRE 2021
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  let month = meses[date.getMonth()].toUpperCase();
  let year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

const ChangePicker = (fecha = null, simbolo = "-") => {
  let date = fecha != null ? new Date(fecha) : new Date();
  let day = (date.getDate() + "").padStart(2, "0");
  let month = (date.getMonth() + 1 + "").padStart(2, "0");
  let year = (date.getFullYear() + "").padStart(2, "0");
  return `${year}${simbolo}${month}${simbolo}${day}`.toString();
};

const setFechaString = (fecha, simbolo = "-") => {
  let day = fecha.getDate() < 10 ? `0${fecha.getDate()}` : fecha.getDate();
  let month =
    fecha.getMonth() + 1 < 10
      ? `0${fecha.getMonth() + 1}`
      : fecha.getMonth() + 1;
  let year =
    fecha.getFullYear() < 10 ? `0${fecha.getFullYear()}` : fecha.getFullYear();
  return `${day}${simbolo}${month}${simbolo}${year}`.toString();
};

const fechaFormat = (fecha = null, simbolo = "-") => {
  let date = fecha != null ? new Date(fecha) : new Date();
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  let month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  let year =
    date.getFullYear() < 10 ? `0${date.getFullYear()}` : date.getFullYear();
  return `${day}${simbolo}${month}${simbolo}${year}`.toString();
};

const fechaDateValidate = (fecha, simbolo = "-") => {
  if ([null, undefined, ""].includes(fecha)) return "0-0-0";
  let date = new Date(fecha);
  let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  let month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  let year =
    date.getFullYear() < 10 ? `0${date.getFullYear()}` : date.getFullYear();
  return `${day}${simbolo}${month}${simbolo}${year}`.toString();
}

const FormatoHora = (minutos) => {
  let hour = Math.floor(minutos / 60);
  let minutes = minutos % 60;
  return `${hour}Hrs ${minutes}Min`;
};

const FormatoHoraAmPm = (fecha = null) => {
  let date = fecha != null ? new Date(fecha) : new Date();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  hour = hour ? hour : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return `${hour}:${minutes} ${ampm}`;
};

const formtearFechaHora = (fechaHora) => {
  const hora =
    fechaHora.getHours() < 10
      ? `0${fechaHora.getHours()}`
      : fechaHora.getHours();
  const minutos =
    fechaHora.getMinutes() < 10
      ? `0${fechaHora.getMinutes()}`
      : fechaHora.getMinutes();
  const segundos =
    fechaHora.getSeconds() < 10
      ? `0${fechaHora.getSeconds()}`
      : fechaHora.getSeconds();
  return String(`${hora}:${minutos}:${segundos}${hora >= 12 ? " PM" : " AM"}`);
};

const stringTime = (time) => {
  let hours = parseInt(time.split(":")[0]);
  let minutes = parseInt(time.split(":")[1]);
  var obj = {
    hours: String(hours > 0 ? String(hours).padStart(2, "0") : ""),
    minutes: String(minutes).padStart(2, "0"),
    hoursLabel: String(hours > 0 ? String(hours > 1 ? "hrs." : "hr.") : ""),
    minutesLabel: String(minutes >= 1 ? "mins." : "min."),
    general: String(
      hours == 0
        ? `${minutes} ${minutes > 1 ? "minutos" : "minuto"}`
        : `${hours} ${hours > 1 ? "horas" : "hora"} ${minutes} ${minutes > 1 ? "minutos" : "minuto"
        }`
    ),
  };
  return obj;
};

const getDiaSemana = (year, month, day) => {
  // retorna primera letra del dia de la semana
  let date = new Date(year, month - 1, day);
  let dayWeek = date.getDay();
  return diasSemana[dayWeek].substring(0, 1);
}

const replaceCaracter = (fecha) => fecha.replace(/-/g, "/");

export default {
  FormatoFecha,
  FormatoHora,
  ChangePicker,
  FormatoHoraAmPm,
  formtearFechaHora,
  stringTime,
  setFechaString,
  fechaFormat,
  fechaDateValidate,
  fechaLarga,
  getDiaSemana,
  replaceCaracter
};
