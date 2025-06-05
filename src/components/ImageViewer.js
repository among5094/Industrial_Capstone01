import React, { useState } from 'react';

function ImageViewer({ src, alt = '', style = {}, imageStyle = {} }) {
    const [showModal, setShowModal] = useState(false);

    const handleImageClick = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <div style={{ position: 'relative', ...style }}>
                <img
                    src={src}
                    alt={alt}
                    onClick={handleImageClick}
                    style={{
                        width: '100%',
                        borderRadius: 10,
                        objectFit: 'cover',
                        cursor: 'zoom-in',
                        ...imageStyle
                    }}
                />
                <div
                    onClick={handleImageClick}
                    style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        borderRadius: 4,
                        padding: 4,
                        cursor: 'pointer',
                        color: 'white',
                        fontSize: 20,
                    }}
                >
                    ⛶
                </div>
            </div>

            {showModal && (
                <div
                    onClick={handleCloseModal}
                    style={{
                        position: 'fixed',
                        top: 0, left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 9999,
                        cursor: 'zoom-out'
                    }}
                >
                    <img
                        src={src}
                        alt={alt}
                        style={{
                            maxWidth: '90%',
                            maxHeight: '90%',
                            borderRadius: 10,
                        }}
                    />
                </div>
            )}
        </>
    );
}

export default ImageViewer;
