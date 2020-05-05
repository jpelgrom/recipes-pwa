import React from 'react';
import { Link } from 'react-router-dom';

class DetailsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: null,
            loading: true,
            loadFailure: null
        };
    }

    componentDidMount() {
        this.getRecipe();
    }

    async getRecipe() {
        const { db } = this.props;
        const recipeId = this.props.match.params.id;

        let stateUpdate = {};
        try {
            const recipe = await db.getRecipeById(recipeId);
            console.log("received: ", recipe);
            stateUpdate.recipe = recipe;
        } catch (err) {
            console.error(err);
            stateUpdate.loadFailure = err;
        }

        this.setState({
            ...stateUpdate,
            loading: false
        });
    }

    render() {
        const { recipe } = this.state;

        if (recipe != null) {
            return (
                <div>
                    <div className="top-action-bar">
                        <Link to="/">&#x2039; Overzicht</Link>
                    </div>
                    <h2>{recipe.title}</h2>
                    <div>{recipe.ingredientsBody}</div>
                    <div>{recipe.instructionsBody}</div>
                </div>
            )
        } else if (this.state.loading) {
            return (<div>...</div>)
        } else {
            // TODO depending on error
            return (<div>Probleem bij laden</div>)
        }
    }
}

export default DetailsPage;