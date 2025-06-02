export const customStyles = {
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
            maxWidth: '100%',
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

export const customStylesForSales = {
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
            },
            maxHeight: "40px",
            borderBottom: "1px solid #e0e0e0"
        }
    },
    tableWrapper: {
        style: {
            height: "400px",
            maxHeight: '400px', // altura fija para la tabla
            overflow: 'hidden', // sin scroll interno
        },
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

export const customStylesForSalesDetails = {
    table: {
        style: {
            backgroundColor: "#f5f5f5 !important",
        }
    },
    headRow: {
        style: {
            fontWeight: 'bold',
            fontSize: '16px',
            color: "#7d7d7d",
            backgroundColor: "#f5f5f5 !important",
        },
    },
    headCell: {
        style: {
            backgroundColor: "#f5f5f5 !important",
        }
    },
    cells: {
        style: {
            backgroundColor: "#f5f5f5 !important",
            fontSize: "16px"
        }
    }
}