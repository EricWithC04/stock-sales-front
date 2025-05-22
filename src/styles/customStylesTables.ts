export const customStyles = {
    table: {
        style: {
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid #b3b3b353",
        }
    },
    headRow: {
        style: {
            backgroundColor: '#fff',
            fontWeight: 'bold',
            fontSize: '16px',
            color: "#7d7d7d",
            '&:hover': {
                backgroundColor: "#f5f5f5"
            }
        },
    },
    rows: {
        style: {
            fontSize: "16px",
            '&:hover': {
                backgroundColor: "#f5f5f5"
            }
        }
    },
    headCells: {
        style: {
            whiteSpace: 'normal' as const,   // permite saltos de línea
            wordBreak: 'break-word' as const, // rompe palabras largas
            maxWidth: '100%'
        }
    },
    cells: {
        style: {
            whiteSpace: 'normal' as const,   // permite saltos de línea
            wordBreak: 'break-word' as const, // rompe palabras largas
            maxWidth: '100%'
        } 
    },
}