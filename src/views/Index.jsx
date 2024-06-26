import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'rsuite';
import fun from './funciones';  // Importa tus funciones necesarias
import CustomTable from '../components/CustomTable';  // Asegúrate de importar tu tabla personalizada
import columnsHeaders from '../headers/IndexAsistentes';

const Index = () => {
    const [formData, setFormData] = useState({
        QR: '',
        CODIGO: '',
        NOMBRE: '',
        APELLIDOS: '',
        DNI: '',
        FECHA: '',
        HORA: '',
    });

    useEffect(() => {
        // Función para actualizar el formulario basado en QR
        const actualizarFormulario = () => {
            let newQR = formData.QR.trim().toUpperCase();
            if (newQR.length > 0) {
                let textoCorregido = newQR
                    .replace(/Ã©/g, 'É')
                    .replace(/Ã±/g, 'Ñ');

                let datos = textoCorregido.split(';');
                let codigo = datos?.[0]?.split(':')?.[1] || "";
                let nombre = datos?.[1]?.split(':')?.[1] || "";
                let apellidos = datos?.[2]?.split(':')?.[1] || "";
                let dni = datos?.[3]?.split(':')?.[1] || "";

                setFormData((prevData) => ({
                    ...prevData,
                    CODIGO: codigo.replace(/'/g, ''),
                    NOMBRE: nombre.replace(/'/g, ''),
                    APELLIDOS: apellidos.replace(/'/g, ''),
                    DNI: dni.replace(/'/g, ''),
                    FECHA: new Date().toISOString().split('T')[0],
                    HORA: fun.formatearHora(new Date()),
                }));
            } else {
                setFormData((prevData) => ({
                    ...prevData,
                    CODIGO: '',
                    NOMBRE: '',
                    APELLIDOS: '',
                    DNI: '',
                    FECHA: '',
                    HORA: '',
                }));
            }
        };

        actualizarFormulario(); // Llama a la función al montar y cuando QR cambia
    }, [formData.QR]); // Dependencia para ejecutar cuando QR cambia

    const handleChange = (value, name) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes agregar lógica para enviar los datos del formulario
        console.log('Datos del formulario:', formData);
        // Por ejemplo, puedes llamar a una función para enviar los datos a una API
        // enviarDatos(formData);
    };

    // Función para renderizar las columnas de la tabla (ajusta según tus necesidades)
    const renderColumnsTable = () => {
        return columnsHeaders.IndexTableAsistentes;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full p-8 bg-white rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Formulario de Registro</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                        <label>QR</label>
                        <Input
                            style={{ color: "white" }}
                            name="QR"
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
                    <div>
                        <label>Nombre</label>
                        <Input
                            name="NOMBRE"
                            value={formData.NOMBRE}
                            onChange={(value) => handleChange(value, 'NOMBRE')}
                            className="w-full"
                            disabled
                        />
                    </div>
                    <div>
                        <label>Apellidos</label>
                        <Input
                            name="APELLIDOS"
                            value={formData.APELLIDOS}
                            onChange={(value) => handleChange(value, 'APELLIDOS')}
                            className="w-full"
                            disabled
                        />
                    </div>
                    <div>
                        <label>DNI</label>
                        <Input
                            name="DNI"
                            value={formData.DNI}
                            onChange={(value) => handleChange(value, 'DNI')}
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
                    <Button appearance="primary" type="submit">
                        Registrar
                    </Button>
                </div>
            </div>
            <div className="w-full p-8 bg-white rounded-lg shadow-md mb-8">
                <CustomTable
                    title="Listado de Asistentes"
                    columns={renderColumnsTable()}
                    data={
                        [
                            {
                                CODIGO: '001',
                                NOMBRE: 'Juan',
                                APELLIDOS: 'Pérez',
                                DNI: '12345678',
                                FECHA: '2021-08-01',
                                HORA: '08:00:00',
                            },
                            {
                                CODIGO: '002',
                                NOMBRE: 'María',
                                APELLIDOS: 'Gómez',
                                DNI: '87654321',
                                FECHA: '2021-08-01',
                                HORA: '08:30:00',
                            },
                            {
                                CODIGO: '002',
                                NOMBRE: 'María',
                                APELLIDOS: 'Gómez',
                                DNI: '87654321',
                                FECHA: '2021-08-01',
                                HORA: '08:30:00',
                            }, {
                                CODIGO: '002',
                                NOMBRE: 'María',
                                APELLIDOS: 'Gómez',
                                DNI: '87654321',
                                FECHA: '2021-08-01',
                                HORA: '08:30:00',
                            }, {
                                CODIGO: '002',
                                NOMBRE: 'María',
                                APELLIDOS: 'Gómez',
                                DNI: '87654321',
                                FECHA: '2021-08-01',
                                HORA: '08:30:00',
                            }, {
                                CODIGO: '002',
                                NOMBRE: 'María',
                                APELLIDOS: 'Gómez',
                                DNI: '87654321',
                                FECHA: '2021-08-01',
                                HORA: '08:30:00',
                            }, {
                                CODIGO: '002',
                                NOMBRE: 'María',
                                APELLIDOS: 'Gómez',
                                DNI: '87654321',
                                FECHA: '2021-08-01',
                                HORA: '08:30:00',
                            },

                        ]

                    }
                    progressPending={false}  // Ajusta según el estado de carga de tus datos
                />
            </div>
        </div>
    );
};

export default Index;
