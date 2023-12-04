/*eslint-disable */
export default function Error({message}) {
    return (
        <>
            <div id='body-div'>
                <div className='centered-form'>
                    <form action="">
                        <h3>{message}</h3>
                    </form>
                </div>
            </div>
        </>
    )
}