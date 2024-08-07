import React, { useState, useEffect } from 'react';
import { Form, Input, Button, SelectPicker } from 'rsuite';
import fun from './funciones';
import CustomTable from '../components/CustomTable';
import columnsHeaders from '../headers/IndexAsistentes';
import asistenciaProxie from '../proxies/asistenciaProxie';
import { toast } from 'react-toastify';

const Index2 = () => {
    const [formData, setFormData] = useState({
        QR: '',
        IDEVENTO: null,
        CODIGO: '',
        NOMBRES: '',
        TIPO: 1,
    });
    const [eventos, setEventos] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [asistentes, setAsistentes] = useState([]);
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

        window.addEventListener('error', hideError)
        return () => {
            window.addEventListener('error', hideError)
        }
    }, [])

    
    useEffect(() => {
        if(formData.QR){
            const asistente = asistentes.find((asistente) => asistente.CODIGO === formData.QR);
            if (asistente) {
                setFormData((prevData) => ({
                    ...prevData,
                    CODIGO: asistente.CODIGO,
                    NOMBRES: asistente.NOMBRES,
                    FECHA: new Date().toISOString().split('T')[0],
                    HORA: fun.formatearHora(new Date()),
                }));
            }
        }else{
            setFormData((prevData) => ({
                ...prevData,
                CODIGO: '',
                NOMBRES: '',
                FECHA: '',
                HORA: '',
            }));
        }
    }, [formData.QR]);

    const handleChange = (value, name) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.dismiss('asistencia');
        if (!formData.IDEVENTO) return toast.error('Seleccione un evento', { toastId: 'evento' });
        if (!formData.CODIGO) return toast.error('Ingrese un código', { toastId: 'codigo' });
        if (!formData.TIPO) return toast.error('Seleccione un tipo', { toastId: 'tipo' });
        if (formData.CODIGO.length !== 20) return toast.error('Código incorrecto', { toastId: 'codigo' });

        // enviar datos al servidor
        asistenciaProxie.createAsistencia(formData)
            .then((response) => {
                if ([201, 200].includes(response.status)) {
                    if (response.data.STATUS == false) {
                        toast.error(response.data?.MESSAGE || "Error al registrar", { toastId: 'asistencia' });
                        return;
                    }

                    if (formData.TIPO == 1) {
                        toast.success('Asistencia registrada correctamente', { toastId: 'asistencia' });
                    }

                    if (formData.TIPO == 2) {
                        toast.success('Salida registrada correctamente', { toastId: 'asistencia' });
                    }

                    setFormData({
                        QR: '',
                        IDEVENTO: formData.IDEVENTO,
                        CODIGO: '',
                        NOMBRES: '',
                        HORA: '',
                        FECHA: '',
                        TIPO: formData.TIPO,
                    });

                    onSearch(true);
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

    const onSearch = (value = null) => {
        if (!formData.IDEVENTO) {
            toast.error('Seleccione un evento', { toastId: 'evento' });
            return
        }

        if (!value) toast.info('Buscando asistentes', { toastId: 'buscando' });
        asistenciaProxie.getAsistentes({
            IDEVENTO: formData.IDEVENTO
        })
            .then((response) => {
                if (response.status === 200) {
                    setIsSubmitting(true);
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

        asistenciaProxie.getAsistentesModel({
            IDEVENTO: formData.IDEVENTO
        })
            .then((response) => {
                if (response.status === 200) {
                    setAsistentes(response?.data || []);
                } else {
                    setAsistentes([]);
                }
            })
            .catch((error) => {
                setAsistentes([]);
            });
    }



    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full p-8 bg-white rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Formulario de Registro</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col col-span-2">
                        <label className='mb-2'>Evento</label>
                        <SelectPicker
                            disabled={isSubmitting}
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
                                { label: 'Salida', value: 2 },
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
                    <div className="flex flex-col col-span-2">
                        <label className=''>QR</label>
                        {/* <Input
                            disabled={!isSubmitting}
                            style={{ color: "white" }}
                            name="QR"
                            autoComplete='off'
                            value={formData.QR}
                            onChange={(value) => handleChange(value, 'QR')}
                            className="w-full"
                        /> */}

                        <SelectPicker
                            data={asistentes.map((asistente) => {
                                return {
                                    label: asistente.NOMBRES,
                                    value: asistente.CODIGO,
                                }
                            })}
                            name="QR"
                            value={formData.QR}
                            onChange={(value) => handleChange(value, 'QR')}
                            placeholder="Seleccionar"
                            locale={{ noResultsText: 'No hay resultados encontrados' }}
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
                                QR: '',
                                IDEVENTO: null,
                                CODIGO: '',
                                NOMBRES: '',
                                TIPO: formData.TIPO,
                                HORA: '',
                                FECHA: '',
                            });
                            setIsSubmitting(false);
                        }}
                        style={{ background: '#f44336', color: 'white' }}
                        className="ml-4">
                        Limpiar
                    </Button>
                </div>
            </div>
            <div className="w-full p-8 bg-white rounded-lg shadow-md mb-8">
                <CustomTable
                    title={"Asistencia de Hoy " + (new Date().toLocaleDateString())}
                    columns={renderColumnsTable()}
                    data={registros}
                    progressPending={false}
                />
            </div>
        </div>
    );
};

export default Index2