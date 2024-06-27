import { Badge, Tooltip, Whisper } from 'rsuite';
import format from './core/dateFormat';
import Alignment from './styles/Alignment';

const IndexTableAsistentes = [
    {
        name: '',
        width: '70px',
        cell: row => <div style={{ width: '100%', textAlign: 'center' }}>{row.index}</div>,
    },
    {
        name: 'Nombres',
        cell: row => <div style={{ width: '100%' }}>{
            row.NOMBRES.replace(/[^a-zA-ZáéíóúÁÉÍÓÚ ]/g, "").toUpperCase()
        }</div>,
    },
    {
        name: <div style={{ width: '100%', textAlign: "center" }}>Ingreso</div>,
        cell: row => {
            return (<span style={Alignment.center}>{row.FINGRESO ? format.FormatoFecha(row.FINGRESO, '/') : ""}</span>)
        },
    },
    {
        name: <div style={{ width: '100%', textAlign: "center" }}>Salida</div>,
        cell: row => {
            return (<span style={Alignment.center}>{row.FSALIDA ? format.FormatoFecha(row.FSALIDA, '/') : ""}</span>)
        },
    }
];

const IndexTableAsistentesTxt = [
    {
        name: '',
        width: '70px',
        cell: row => <div style={{ width: '100%', textAlign: 'center' }}>{row.index}</div>,
    },
    {
        name: 'Nombres',
        cell: row => <div style={{ width: '100%' }}>{row.label}</div>,
    },
    {
        name: 'F. Carga',
        cell: row => {
            return (<span style={Alignment.center}>{format.ChangePicker(new Date(), '/')}</span>)
        },
    },
];


export default {
    IndexTableAsistentes,
    IndexTableAsistentesTxt
}