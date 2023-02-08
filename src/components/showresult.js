import React from 'react';

export default function ShowResults(props) {
    if (props.error !== null) {
        return <h1>An error occurred, try again later or check your internet connection.</h1>;
    }
    if (props.data === null) {
        return <h1>Loading...</h1>;
    }
    if (props.data !== null && props.error === null) {
        if (props.data.length === 0) {
            return(
                <div className="no-results-search">   
                    <h1>We couldn't find anything that matches your search. Maybe try something else?</h1>
                </div>
            );    
        }
       else { 
        var listItem = props.data.map((element) => {
            return (
                <li key={element.show.id} className="list-item">
                    <div className="link-container">
                        <a href={element.show.url} className="link">{element.show.name}</a>
                    </div>
                    <div>
                    {element.show.image ? (<img src={element.show.image.medium} alt={element.show.name} />
                    ) : (<div className="missing-img-div"><img src=""/><h1>no photo available</h1></div>)}
                    </div>
                </li>
            )
            });
        }  
    }
    return (
        <ul className="list-container">
            {listItem}
        </ul>
    ); 
} 