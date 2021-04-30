import React, { useState, useEffect } from 'react'

import './Tab.scss';

const  Tab = ({panes}) => {
    const [displayedComponent, setDisplayedComponent] = useState();
    const [defaultComponent, setDefaultComponent] = useState();
    const [activeTab, setActiveTab] = useState();
    useEffect(() => {
        if(panes){
            setDefaultComponent(panes[0].component)
            if(!displayedComponent)
              setActiveTab(panes[0].title)
        }
    }, [panes, displayedComponent])


    return (
        <div className="tabs-container">
        <div className="tab-container">
            {panes.map((content, index) => {
               return (
                   <button key={index} className={`tab-title ${activeTab === content.title && 'active'|| ''}`} onClick={() =>{ 
                       setDisplayedComponent(content.component)
                       setActiveTab(content.title)
                       }}>
                       {content.title}
                   </button>
               ) 
            })}
        </div>
            <div className="content">
                {displayedComponent &&  displayedComponent || defaultComponent }
            </div>
        </div>
    )
}

export default Tab
