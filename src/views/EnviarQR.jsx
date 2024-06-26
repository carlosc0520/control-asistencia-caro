import React, { useState, useEffect } from 'react';
import { Button, SelectPicker } from 'rsuite';
import CustomTable from '../components/CustomTable';
import columnsHeaders from '../headers/IndexAsistentes';
import asistenciaProxie from '../proxies/asistenciaProxie';
import { toast } from 'react-toastify';
import { saveAs } from 'file-saver';

const EnviarQR = () => {
    const [formData, setFormData] = useState({
        IDEVENTO: null,
        FILE: null,
        ARCHIVO: null,
    });

    const [asistentes, setAsistentes] = useState([]);
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
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.IDEVENTO) return toast.error('Seleccione un evento', { toastId: 'evento' });
        if (!formData.ARCHIVO) return toast.error('Seleccione un archivo', { toastId: 'archivo' });
        if (asistentes.length === 0) return toast.error('No hay asistentes para generar QR', { toastId: 'asistentes' });

        const data = {
            IDEVENTO: formData.IDEVENTO,
            ASISTENTES: JSON.stringify(asistentes?.map((asistente) => {
                return { NOMBRES: asistente.label }
            })),
        };

        try {
            const response = await asistenciaProxie.createQR(data)
            const blob = new Blob([response.data], { type: 'application/zip' });
            saveAs(blob, 'qr-codes.zip');
        } catch (error) {

        }
    };

    const renderColumnsTable = () => {
        return columnsHeaders.IndexTableAsistentesTxt;
    };

    const handleUpload = (value) => {
        if (value.target.files.length > 0) {
            setFormData((prevData) => ({
                ...prevData,
                ARCHIVO: value
            }));

            const reader = new FileReader();
            reader.onload = function (e) {
                const result = e.target.result;
                const lines = result.split('\n');
                let asistentes = [];
                lines.forEach((line, index) => {
                    line = line.replace('\r', '').trim();
                    if (line.length === 0) return;
                    asistentes.push({
                        value: index,
                        label: line,
                    });
                });

                setAsistentes(asistentes);
            };
            reader.readAsText(value.target.files[0]);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full p-8 bg-white rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Generar Código QR
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex flex-col">
                        <label className='mb-2'>Evento</label>
                        <SelectPicker
                            data={eventos}
                            value={formData.IDEVENTO}
                            onChange={(value) => setFormData((prevData) => ({
                                ...prevData,
                                IDEVENTO: value,
                            }))}
                            placeholder="Seleccionar"
                            locale={{ noResultsText: 'No hay resultados encontrados' }}
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="md:col-span-5 col-span-12">
                            <div className="flex flex-col">
                                <label className="rs-form-control-label block mb-2 text-sm font-normal  dark:text-gray-500" htmlFor="file_input">Archivo<span className="ml-3 text-red-600">*</span></label>
                                <input
                                    className={"text-sm choose text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer "
                                        + " dark:text-gray-400 focus:outline-none "
                                        + " dark:placeholder-gray-400"}
                                    type="file"
                                    id="file_picker"
                                    accept=".txt"
                                    name="FILE"
                                    onChange={(value) => handleUpload(value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center mt-6">
                    <Button appearance="primary" type="submit"
                        onClick={handleSubmit}
                    >
                        Generar QR
                    </Button>
                    <Button appearance="default"
                        onClick={() => {
                            setAsistentes([]);
                            setFormData({
                                IDEVENTO: null,
                                FILE: null,
                                ARCHIVO: null,
                            });
                            document.getElementById('file_picker').value = '';
                        }}
                        style={{ background: '#f44336', color: 'white' }}
                        className="ml-4">
                        Limpiar
                    </Button>
                </div>
            </div>
            <div className="w-full p-8 bg-white rounded-lg shadow-md mb-8">
                <CustomTable
                    title="Listado de Asistentes"
                    columns={renderColumnsTable()}
                    data={asistentes}
                    progressPending={false}
                />
            </div>
        </div>
    );
};

export default EnviarQR;
