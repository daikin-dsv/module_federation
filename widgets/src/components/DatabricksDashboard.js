import React, { useEffect, useRef } from 'react';

/**
 * Simple iframe wrapper for Databricks embed URLs.
 *
 * @param {{src: string, width?: string, height?: number, onLoad?: function, onError?: function}} props
 * @param {string} props.src - Embed URL with embedded credentials or one-time token.
 * @param {string} [props.width='100%'] - CSS width for the iframe.
 * @param {number} [props.height='100%'] - Height in pixels for the iframe.
 * @param {Function} [props.onLoad] - Callback when iframe loads.
 * @param {Function} [props.onError] - Callback when iframe errors.
 */
const DatabricksWidget = ({ src, width = '100%', height = '100%', onLoad, onError }) => {
    const iframeRef = useRef(null);
    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;
        const handleLoad = () => {
            if (onLoad) onLoad();
        };
        const handleError = () =>
            onError && onError(new Error('Databricks iframe failed to load'));
        iframe.addEventListener('load', handleLoad);
        iframe.addEventListener('error', handleError);

        return () => {
            iframe.removeEventListener('load', handleLoad);
            iframe.removeEventListener('error', handleError);
        };
    }, [onLoad, onError]);

    return (
        <iframe
            title="Databricks widget"
            ref={iframeRef}
            src={src}
            width={width}
            height={height}
            allowFullScreen
        />
    );
};

export default DatabricksWidget;
