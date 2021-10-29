/* ' ' + g for just space gratitudes.map(g => <li>{g}</li>*/
export default function History({ gratitudes, isFilled }) {
    return (
        <div>
            <p className = "text-white text-2xl">
                Previously, you were grateful for <span className = "text-purple-300 font-bold">{gratitudes.map(g => ' ' + g.entry).toString()}</span> 
                
            </p>
             
       
        </div>
        

        

    )
}