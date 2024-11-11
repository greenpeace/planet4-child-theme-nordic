// Build the frontend here
export const ChartFrontend = ({ title, description, url, className }) => (
    <canvas className={`block chart-block ${className ?? ''}`}>
        {title &&
            <header>
                <h2 className="page-section-header">{title}</h2>
            </header>
        }
        {description &&
            <p className="page-section-description" dangerouslySetInnerHTML={{ __html: description }} />
        }
        {url &&
            <input className="page-section-url" value={url} readOnly />
        }
    </canvas>

    // Your code .. 
);
