import React from 'react'
import '../../styles/pageloader.css'
const PageLoader = () => {
    return (
        <div id="preloader" aria-busy="true" aria-label="Loading, please wait." role="progressbar">
            <img className="icon" src="https://raziraz.github.io/codepen/img/bolt.svg" />
        </div>
    )
}

export default PageLoader
