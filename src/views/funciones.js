function formatearHora(ahora) {
    let horas = ahora.getHours();
    let minutos = ahora.getMinutes();
    let am_pm = horas >= 12 ? 'PM' : 'AM';
    horas = horas % 12;
    horas = horas ? horas : 12; // Las 12 en formato AM/PM es '12', no '0'
    minutos = minutos < 10 ? '0' + minutos : minutos;
    let horaFormateada = horas + ':' + minutos + ' ' + am_pm;
    return horaFormateada;
}

export default {
    formatearHora
}