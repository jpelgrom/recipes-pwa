import React from 'react';

class DetailsPage extends React.Component {
    render() {
        const { recipe } = this.props;

        if (recipe != null) {
            return (
                <div>
                    <h2>{recipe.title}</h2>
                    <div>{recipe.ingredientsBody}</div>
                    <div>{recipe.instructionsBody}</div>
                </div>
            )
        } else {
            return (<div></div>)
        }
    }
}

export default DetailsPage;