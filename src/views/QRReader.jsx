// src/QRReader.js
import React, { useRef, useEffect } from 'react';
import { BrowserBarcodeReader } from '@zxing/library';

const QRReader = ({ onQRCodeRead }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const codeReader = new BrowserBarcodeReader();
        codeReader
            .decodeFromInputVideoDevice(undefined, videoRef.current)
            .then((result) => {
                onQRCodeRead(result.text);
            })
            .catch((err) => {
                console.error('Error al leer el código QR:', err);
            });

        return () => {
            codeReader.reset();
        };
    }, [onQRCodeRead]);

    return (
        <div className="flex justify-center">
            <video ref={videoRef} className="max-w-full" playsInline autoPlay muted></video>
        </div>
    );
};

export default QRReader;
