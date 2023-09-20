import { Link } from 'react-router-dom';
import '../index.css'

export default function Post() {
  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', maxWidth:'350px', padding:'10px', width:'100%'}}>
         <div className="div-img">
            <img className='post-img' src='/image.avif'/>
        </div>
        <div className='text-container'>
            <Link>
                <p className='post-category'>TECHNOLOGY</p>
            </Link>
            <Link>
                <p className='post-title'>Architectural Engineering Wonders of the modern era for your Inspiration</p>
            </Link>
            <Link >
                <p className='post-details'>Mario Sanchez &#8226; October 21, 2022</p>
            </Link>
        </div>     
    </div>
   

  );
}
