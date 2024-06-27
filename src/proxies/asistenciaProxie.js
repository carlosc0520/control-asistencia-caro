import axios from 'axios';

// const URL = "http://ec2-54-147-61-67.compute-1.amazonaws.com:3000";
const URL = "http://localhost:3000";

const asistenciaProxie = {
    async getEventos() {
        return axios.get(URL + '/control/asistencias/eventos?INIT=0&ROWS=10000');
    },
    async getAsistentes(data) {
        return axios.get(URL + '/control/asistencias/list?INIT=0&ROWS=10000&IDEVENTO=' + data.IDEVENTO);
    },
    async createAsistencia(data) {
        return axios.post(URL + '/control/asistencias/add', data);
    },
    async createQR(formData) {
        return axios.post(URL + '/control/asistencias/addMasivo', formData, {
            responseType: 'blob',
            headers: {
                Accept: 'application/pdf'
            }
        });
    },
}

export default asistenciaProxie;