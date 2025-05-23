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
            },
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

export const customStylesWithPagination = {
    table: {
        style: {
            width: "96%",
            marginLeft: "2%",
            borderRadius: "12px 12px 0 0",
            overflow: "hidden",
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
    pagination: {
        style: {
            backgroundColor: '#fff',
            width: "96%",
            marginLeft: "2%",
            padding: "8px 16px",
            borderRadius: "12px",
            fontWeight: 'bold',
            fontSize: '16px',
            color: "#7d7d7d",
            '&:hover': {
                backgroundColor: "#f5f5f5"
            }
        },
    }
}