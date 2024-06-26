// src/SideBar.js
import React from 'react';
import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
    const [expanded, setExpanded] = React.useState(true);
    const [activeKey, setActiveKey] = React.useState('1');
    const navigate = useNavigate();

    const handleSelect = (eventKey) => {
        setActiveKey(eventKey);
        switch (eventKey) {
            case '1':
                navigate('/enviar-codigo-qr');
                break;
            case '2':
                navigate('/registrar-asistencia');
                break;
            default:
                break;
        }
    };

    return (
        <div className="h-full">
            <hr />
            <Sidenav expanded={expanded} defaultOpenKeys={['3', '4']} appearance="subtle">
                <Sidenav.Body>
                    <Nav activeKey={activeKey} onSelect={handleSelect}>
                        <Nav.Item eventKey="1" icon={<DashboardIcon />}>
                            Generar Código QR
                        </Nav.Item>
                        <Nav.Item eventKey="2" icon={<DashboardIcon />}>
                            Registrar Asistencia
                        </Nav.Item>
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        </div>
    );
};

export default SideBar;
