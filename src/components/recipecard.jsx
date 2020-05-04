import React from 'react';
import { Link } from 'react-router-dom';

class Recipecard extends React.Component {
    render() {
        const { recipe } = this.props;

        return (
            <Link to={`/recipe/${recipe._id}`}>
                <div className="card-recipe">
                    <h3>{recipe.title}</h3>
                </div>
            </Link>
        );
    }

}

export default Recipecard;