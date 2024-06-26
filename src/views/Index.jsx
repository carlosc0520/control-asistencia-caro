import React, { useState, useEffect } from 'react';
import { Form, Input, Button, SelectPicker } from 'rsuite';
import fun from './funciones'; 
import CustomTable from '../components/CustomTable';  
import columnsHeaders from '../headers/IndexAsistentes';
import asistenciaProxie from '../proxies/asistenciaProxie';
import { toast } from 'react-toastify';

const Index = () => {
    const [formData, setFormData] = useState({
        QR: '',
        IDEVENTO: null,
        CODIGO: '',
        NOMBRES: '',
        TIPO: 1,
    });
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        const cargarEventos = async () => {
            try {
                const response = await asistenciaProxie.getEventos();
                if (response.status === 200) {
                    setEventos(response.data?.map((evento) => ({
                        value: evento.ID,
                        label: evento.EVENTO,
                    })) || []);
                }
            } catch (error) {
                setEventos([]);
            }
        };

        cargarEventos();

        function hideError(e) {
            if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
                const resizeObserverErrDiv = document.getElementById(
                    'webpack-dev-server-client-overlay-div'
                );
                const resizeObserverErr = document.getElementById(
                    'webpack-dev-server-client-overlay'
                );
                if (resizeObserverErr) {
                    resizeObserverErr.setAttribute('style', 'display: none');
                }
                if (resizeObserverErrDiv) {
                    resizeObserverErrDiv.setAttribute('style', 'display: none');
                }
            }
        }

        window.addEventListener('error', hideError)
        return () => {
            window.addEventListener('error', hideError)
        }
    }, [])

    useEffect(() => {
        const actualizarFormulario = () => {
            let newQR = formData.QR.trim().toUpperCase();
            if (newQR.length > 0) {
                let textoCorregido = newQR
                    .replace(/Ã©/g, 'É')
                    .replace(/Ã±/g, 'Ñ')
                    .replace(/Ã³/g, 'Ó')
                    .replace(/Ã¡/g, 'Á')
                    .replace(/Ã­/g, 'Í')
                    .replace(/Â/g, '')
                    .replace(/Ãº/g, 'Ú');

                console.log('Texto corregido:', textoCorregido);
                textoCorregido = textoCorregido.trim();
                let datos = textoCorregido.split(';');
                let codigo = datos?.[0]?.split(':')?.[1] || "";
                let nombre = datos?.[1]?.split(':')?.[1] || "";

                setFormData((prevData) => ({
                    ...prevData,
                    CODIGO: codigo.replace(/'/g, ''),
                    NOMBRES: nombre.replace(/'/g, ''),
                    FECHA: new Date().toISOString().split('T')[0],
                    HORA: fun.formatearHora(new Date()),
                }));
            } else {
                setFormData((prevData) => ({
                    ...prevData,
                    CODIGO: '',
                    NOMBRES: '',
                }));
            }
        };

        actualizarFormulario();
    }, [formData.QR]);

    const handleChange = (value, name) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // valir que evento, codigo, y tipo tenga algo
        if (!formData.IDEVENTO) return toast.error('Seleccione un evento', { toastId: 'evento' });
        if (!formData.CODIGO) return toast.error('Ingrese un código', { toastId: 'codigo' });
        if (!formData.TIPO) return toast.error('Seleccione un tipo', { toastId: 'tipo' });

        // enviar datos al servidor
        asistenciaProxie.createAsistencia(formData)
            .then((response) => {
                console.log('Response:', response);
                if (response.status === 200) {
                    toast.success('Asistencia registrada correctamente', { toastId: 'asistencia' });
                    // setFormData({
                    //     QR: '',
                    //     IDEVENTO: null,
                    //     CODIGO: '',
                    //     NOMBRES: '',
                    //     TIPO: 1,
                    // });
                } else {
                    toast.error('Error al registrar la asistencia', { toastId: 'asistencia' });
                }
            })
            .catch((error) => {
                toast.error('Error al registrar la asistencia', { toastId: 'asistencia' });
            });
    };

    const renderColumnsTable = () => {
        return columnsHeaders.IndexTableAsistentes;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full p-8 bg-white rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Formulario de Registro</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col col-span-2">
                        <label className='mb-2'>Evento</label>
                        <SelectPicker
                            data={eventos}
                            value={formData.IDEVENTO}
                            onChange={(value) => setFormData((prevData) => ({
                                ...prevData,
                                IDEVENTO: value || null,
                            }))}
                            placeholder="Seleccionar"
                            locale={{ noResultsText: 'No hay resultados encontrados' }}
                        />
                    </div>
                    <div className="flex flex-col col-span-2">
                        <label className='mb-2'>Tipo</label>
                        <SelectPicker
                            data={[
                                { label: 'Entrada', value: 1 },
                                { label: 'Saluda', value: 2 },
                            ]}
                            value={formData?.TIPO || null}
                            onChange={(value) => {
                                try {
                                    setFormData((prevData) => ({
                                        ...prevData,
                                        TIPO: value || null,
                                    }));
                                } catch (error) {
                                    console.error('Error en handleChange de SelectPicker:', error);
                                }
                            }}
                            placeholder="Seleccionar"
                            locale={{ noResultsText: 'No hay resultados encontrados' }}
                        />
                    </div>
                    <div>
                        <label>QR</label>
                        <Input
                            style={{ color: "white" }}
                            name="QR"
                            autoComplete='off'
                            value={formData.QR}
                            onChange={(value) => handleChange(value, 'QR')}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label>Código</label>
                        <Input
                            name="CODIGO"
                            value={formData.CODIGO}
                            onChange={(value) => handleChange(value, 'CODIGO')}
                            className="w-full"
                            disabled
                        />
                    </div>
                    <div className="col-span-2">
                        <label>Nombres</label>
                        <Input
                            name="NOMBRES"
                            value={formData.NOMBRES}
                            onChange={(value) => handleChange(value, 'NOMBRES')}
                            className="w-full"
                            disabled
                        />
                    </div>
                    <div>
                        <label>Fecha</label>
                        <Input
                            name="FECHA"
                            type="date"
                            value={formData.FECHA}
                            onChange={(value) => handleChange(value, 'FECHA')}
                            className="w-full"
                            disabled
                        />
                    </div>
                    <div>
                        <label>Hora</label>
                        <Input
                            name="HORA"
                            value={formData.HORA}
                            onChange={(value) => handleChange(value, 'HORA')}
                            className="w-full"
                            disabled
                        />
                    </div>
                </div>
                <div className="flex items-center justify-center mt-6">
                    <Button appearance="primary" type="submit"
                        onClick={handleSubmit}
                    >
                        Registrar
                    </Button>
                </div>
            </div>
            <div className="w-full p-8 bg-white rounded-lg shadow-md mb-8">
                <CustomTable
                    title={"Asistencia de Hoy " + (new Date().toLocaleDateString())}
                    columns={renderColumnsTable()}
                    data={[]}
                    progressPending={false}  
                />
            </div>
        </div>
    );
};

export default Index;
