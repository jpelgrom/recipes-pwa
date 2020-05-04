import React from 'react';
import Recipecard from '../components/recipecard';

class ListPage extends React.Component {
    render() {
        const { recipes } = this.props;

        return (
            <div>
                {recipes.map(recipe => (
                    <Recipecard recipe={recipe} key={recipe._id} />
                ))}
            </div>
        );
    }
}

export default ListPage;