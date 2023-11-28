import React from 'react'

type Props = {}

const Opinions = (props: Props) => {
  return (
    <div className='grid place-items-center'>
        <div className='grid grid-cols-2 p-10 gap-10 mb-40'>
            <figure className='bg-white rounded-2xl shadow-lg overflow-hidden rotate-1 hover:rotate-0 transition duration-200'>
                <blockquote className='p-8'>
                <div className='mb-5 text-purple-500'>
                <svg width="45" height="36" className="fill-current"><path d="M13.415.001C6.07 5.185.887 13.681.887 23.041c0 7.632 4.608 12.096 9.936 12.096 5.04 0 8.784-4.032 8.784-8.784 0-4.752-3.312-8.208-7.632-8.208-.864 0-2.016.144-2.304.288.72-4.896 5.328-10.656 9.936-13.536L13.415.001zm24.768 0c-7.2 5.184-12.384 13.68-12.384 23.04 0 7.632 4.608 12.096 9.936 12.096 4.896 0 8.784-4.032 8.784-8.784 0-4.752-3.456-8.208-7.776-8.208-.864 0-1.872.144-2.16.288.72-4.896 5.184-10.656 9.792-13.536L38.183.001z"></path></svg>
                </div>
                    <p className='font-bold text-lg'>
                        Theres one thing aaaaaaaaaaaaaaaaaaaaaaaaaaaaa  - asdasndiasunduasi asd uasdiusabdi sabd ysab dasbd sayuibd asyubd uasybdys
                        sdasudsbayudasbuydasbu dsabd yuasbd uyasbdu asydbasuy
                    </p>
                </blockquote>
                <div className='flex items-center justify-between px-8 py-4 bg-gradient-to-br from-purple-500 to-blue-500'>
                     <div className='flex items-center gap-5'>
                        <div className='rounded-full border-4 w-14 h-14 border-white'>

                        </div>
                        <figcaption className='text-white font-semibold'>
                            <div>Janek Komandzior</div>
                            <div className='opacity-70'>Nigger</div>
                        </figcaption>
                     </div>
                </div>
            </figure>

            <figure className='bg-white rounded-2xl shadow-lg overflow-hidden -rotate-2 hover:-rotate-1 transition duration-200'>
                <blockquote className='p-8'>
                <div className='mb-5 text-purple-500'>
                <svg width="45" height="36" className="fill-current"><path d="M13.415.001C6.07 5.185.887 13.681.887 23.041c0 7.632 4.608 12.096 9.936 12.096 5.04 0 8.784-4.032 8.784-8.784 0-4.752-3.312-8.208-7.632-8.208-.864 0-2.016.144-2.304.288.72-4.896 5.328-10.656 9.936-13.536L13.415.001zm24.768 0c-7.2 5.184-12.384 13.68-12.384 23.04 0 7.632 4.608 12.096 9.936 12.096 4.896 0 8.784-4.032 8.784-8.784 0-4.752-3.456-8.208-7.776-8.208-.864 0-1.872.144-2.16.288.72-4.896 5.184-10.656 9.792-13.536L38.183.001z"></path></svg>
                </div>
                    <p className='font-bold text-lg'>
                        Theres one thing aaaaaaaaaaaaaaaaaaaaaaaaaaaaa  - asdasndiasunduasi asd uasdiusabdi sabd ysab dasbd sayuibd asyubd uasybdys
                        sdasudsbayudasbuydasbu dsabd yuasbd uyasbdu asydbasuy
                    </p>
                </blockquote>
                <div className='flex items-center justify-between px-8 py-4 bg-gradient-to-br from-purple-500 to-blue-500'>
                     <div className='flex items-center gap-5'>
                        <div className='rounded-full border-4 w-14 h-14 border-white'>

                        </div>
                        <figcaption className='text-white font-semibold'>
                            <div>Janek Komandzior</div>
                            <div className='opacity-70'>Nigger</div>
                        </figcaption>
                     </div>
                </div>
            </figure>
        </div>
    </div>
  )
}

export default Opinions;