import React,{ useEffect, useState } from "react";
import { ListaDeRopa } from "./ropa";
import { VentasList } from "./ventas";

interface SelectedContentProps {
    content: string; 
    
}

export const SelectedContent:React.FC<SelectedContentProps> = ({content}) =>{
    const [mainComponent, setMainComponent] = useState<React.ReactNode>(<ListaDeRopa />);

    
    useEffect(() => {
        const Main = () => {
          switch (content) {
            case "Main":
              return <ListaDeRopa />;
            case "Ventas":
              return <VentasList />;
            default:
              return null;
          }
        };
    
        setMainComponent(<Main/>);
    }, [content]);

    return (mainComponent)
}