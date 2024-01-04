import { IoMailUnread, IoMail} from "react-icons/io5";
import '../index.css'



export const AccueilEntreprise = () => {

    return (
     <>
        
        <section className="AccueilAucunMail">        
            <IoMail  style={{ fontSize: '8rem',color: '#025892'}} />
            <p>Aucun courrier en attente</p>
            <button className="noReceptionner">Réceptionner</button>
        </section>


        {/* <section className="AccueilMailRecu">        
        <IoMailUnread style={{ fontSize: '8rem',color: '#025892'}} />
            <p>Vous avez du courrier en attente</p>
            <button className="Receptionner">Réceptionner</button>
        </section> */}
    </>
    )
}
