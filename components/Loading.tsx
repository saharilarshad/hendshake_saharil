import { Puff } from 'react-loader-spinner'

const Loading = () => {
    // const svgStyle = {
    //     stroke: '#243c5a',
    // };
    return (
        <div className="flex items-center justify-center h-screen w-full bg-slate-50">
            
            <Puff
                visible={true}
                // height="80"
                width="200"
                color="#4fa94d"
                ariaLabel="puff-loading"
            />
        </div>
    )
}

export default Loading