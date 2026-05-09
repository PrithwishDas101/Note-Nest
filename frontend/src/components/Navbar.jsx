import React from 'react'
import { Link } from 'react-router-dom'
import { NotebookPen, PlusIcon } from 'lucide-react'

const Navbar = () => {
    return (
        <>
            <header className='border-b border-base-content/10 bg-base-100'>
                <div className='mx-auto max-w-6xl px-4 py-4'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2 cursor-auto'>
                            <NotebookPen className='size-5'/>

                            <span className='text-lg font-bold tracking-tight'>
                                NOTENEST
                            </span>
                        </div>

                        <div className='flex items-center gap-4'>
                            <Link to={"/create"} className='btn btn-outline btn-success'>
                                <PlusIcon className='size-4' />
                                <span>New Note</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Navbar