import React, { useState, useEffect } from 'react';
import { Form, Input, Button, SelectPicker, DatePicker } from 'rsuite';
import fun from './funciones';
import CustomTable from '../components/CustomTable';
import columnsHeaders from '../headers/IndexAsistentes';
import asistenciaProxie from '../proxies/asistenciaProxie';
import { toast } from 'react-toastify';

const Reporte = () => {
    const [formData, setFormData] = useState({
        IDEVENTO: null,
        FECHA: null
    });
    const [eventos, setEventos] = useState([]);
    const [registros, setRegistros] = useState([]);

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

        onSearch();
        window.addEventListener('error', hideError)
        return () => {
            window.addEventListener('error', hideError)
        }
    }, [])

    const handleChange = (value, name) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const renderColumnsTable = () => {
        return columnsHeaders.IndexTableAsistentesMap;
    };

    const onSearch = (value = null) => {
        if (!formData.IDEVENTO) {
            toast.error('Seleccione un evento', { toastId: 'evento' });
            return
        }

        if (!formData.FECHA) {
            toast.error('Seleccione una fecha', { toastId: 'fecha' });
        }

        if (!value) toast.info('Buscando asistentes', { toastId: 'buscando' });
        asistenciaProxie.getAsistentesFull({
            IDEVENTO: formData.IDEVENTO,
            FECHA: new Date(formData.FECHA).toISOString().split('T')[0]
        })
            .then((response) => {

                if (response.status === 200) {
                    setRegistros(response?.data || []);
                    toast.dismiss('buscando');
                } else {
                    setRegistros([]);
                    toast.error('Error al buscar asistentes', { toastId: 'buscando' });
                }
            })
            .catch((error) => {
                setRegistros([]);
                toast.error('Error al buscar asistentes', { toastId: 'buscando' });
            });
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full p-8 bg-white rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Reporte</h2>
                <div className="grid grid-cols-12 gap-4">
                    <div className="flex flex-col col-span-12 md:col-span-6">
                        <label className='mb-2'>Evento<span className="text-red-500"> *</span></label>
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
                    <div className="flex flex-col col-span-12 md:col-span-6">
                        <label className='mb-2'>Participante</label>
                        <Input
                            style={{ color: "white" }}
                            name="QR"
                            autoComplete='off'
                            value={formData.QR}
                            onChange={(value) => handleChange(value, 'QR')}
                            className="w-full"
                        />
                    </div>
                    <div className="col-span-12 flex justify-end">
                        <Button appearance="default" type="submit"
                            style={{ background: '#4caf50', color: 'white' }}
                            onClick={() => {
                                onSearch();
                            }}
                            className="ml-4"
                        >
                            Buscar
                        </Button>
                        <Button appearance="default"
                            onClick={() => {
                                setRegistros([]);
                                setFormData({
                                    IDEVENTO: null,
                                    FECHA: '',
                                });
                            }}
                            style={{ background: '#f44336', color: 'white' }}
                            className="ml-4">
                            Limpiar
                        </Button>
                    </div>
                </div>
            </div>
            <div className="w-full p-8 bg-white rounded-lg shadow-md mb-8">
                <CustomTable
                    title={!formData.FECHA ? "Registros ingresados" : "Registros ingresados con fecha " + (formData.FECHA ? new Date(formData.FECHA).toLocaleDateString() : '')}
                    columns={renderColumnsTable()}
                    data={registros}
                    progressPending={false}
                />
            </div>
        </div>
    );
};

export default Reporte;
