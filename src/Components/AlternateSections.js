import '../CSS/alternateSection.css'


const AlternateSections = ({geometry, imgUrl, heading, desc, btnText }) => {
  return (
    <div className="container-alternate">
      {
        geometry === 'right' ?

          <div className='md-12 flex-r'>
            <img src={imgUrl} className='md-5'/>
            <div className='text-block md-5 offset-md-1 flex-c align-center justify-spc-between'>
                <h2>{heading}</h2>
                <p className='semi-bold'>{desc}</p>
                <div className='btn pointer'>
                  {`Explore ${btnText}`}
                </div>
            </div>
          </div>

          :

          <div className='md-12 flex-r'>
            <div className='text-block flex-c md-5 align-center justify-spc-between'>
                <h2>{heading}</h2>
                <p className='semi-bold'>{desc}</p>
                <div className='btn pointer'>
                  {`Explore ${btnText}`}
                </div>
            </div>
            <img src={imgUrl} className='md-5 offset-md-1'/>
          </div>

      }
    </div>
  )
}

export default AlternateSections;
