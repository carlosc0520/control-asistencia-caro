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
        name: 'Grupo',
        cell: row => <div style={{ width: '100%' }}>{row.dscrpcn}</div>,
    },
    {
        name: 'Estado',
        cell:
            row => {
                return (
                    <div className='items-center' style={{ width: '100%', textAlign: 'center' }}>
                        <Whisper
                            style={{ width: '100%', height: '100%' }} trigger="hover"
                            placement={"top"} controlId={"control-id-bottom"}
                            speaker={
                                <Tooltip>{row.gdestdo === 'A' ? "Activo" : "Inactivo"}</Tooltip>
                            }
                        >
                            {row.gdestdo === 'A' ?
                                <Badge style={{ background: '#4caf50' }} /> : <Badge />
                            }
                        </Whisper>
                    </div >
                );
            },
    },
    {
        name: 'F. Edición',
        cell: row => {
            return (<span style={Alignment.center}>{format.ChangePicker(row.fedcn, '/')}</span>)
        },
    },
    {
        name: 'U. Edición',
        width: '150px',
        cell: row => <span style={Alignment.center}>{row.uedcn}</span>
    },
];


export default {
    IndexTableAsistentes
}