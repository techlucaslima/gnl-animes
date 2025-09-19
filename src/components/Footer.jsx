import icone from '../assets/icone.png';

export default function Footer() {
    return (
        <footer className='bg-newBlack text-newWhite text-sm p-4'>
            <div className='flex text-3xl xl:text-4xl font-bold items-center'>
                <img className="h-15" src={icone} alt="Ícone da logo do site" />
                <h1>GNL</h1>
            </div>
            <div className='p-2 text-sm flex flex-col gap-4 text-center'>
                <p className=''>Bem-vindo à GNL, o lugar onde você encontrará os melhores animes para assistir de forma totalmente gratuita.</p>
                <hr />
                <p>&copy; 2025 GNL - Todos os Direitos Reservados</p>
            </div>
        </footer>
    )
}