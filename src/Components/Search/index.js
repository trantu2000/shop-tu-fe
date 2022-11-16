import React, { useState } from 'react'
import './index.css'

const Search = ({history}) => {

    const [keyword, setKeword] = useState('');

    

    const searchHandle = (e) =>{
        e.preventDefault();

        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        }else{
            history.push('/')
        }
    }
    

    return (
        <form onSubmit={searchHandle}>
            <div className="input-group">
                <input
                    type="text"
                    id="search_field"
                    className="form-control"
                    placeholder="Enter Product Name ..."
                    onChange={(e)=>setKeword(e.target.value)}
                />
                <div className="input-group-append">
                    <button id="search_btn" className="btn">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </form>
    )
}

export default Search