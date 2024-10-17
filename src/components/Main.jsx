export default function Main(props) {
    const { data } = props;
    return (
        <div className='imgContainer'>
            <img src ={data?.url} alt={data?.title || 'bg-image'} className="bgImg"/>
        </div>
    )
}