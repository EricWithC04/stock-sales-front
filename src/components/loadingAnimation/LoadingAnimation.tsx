import { BarLoader } from "react-spinners"

export default function LoadingAnimation() {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h1>Cargando...</h1>
            <BarLoader 
                color={"#a7217f"}
                width={"100%"}
            />
        </div>
    )
}