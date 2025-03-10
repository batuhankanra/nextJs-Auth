import Header from "../components/header/Header";


export default function PageLayout({
    children
}:{children:React.ReactNode}){
    return (
        <div>
            <Header />
            {children}
            
        </div>
    )
}
